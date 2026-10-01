import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { Resend } from "resend";
import site from "../data/site.json";
import contact from "../data/contact.json";

/**
 * Resend client, created lazily so a missing RESEND_API_KEY surfaces as a
 * readable error from the action (not a module-eval crash).
 */
let resend: Resend | undefined;
const getClient = () => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new ActionError({
      code: "NOT_IMPLEMENTED",
      message: "RESEND_API_KEY is not set. Copy .env.example to .env and add a key from https://resend.com/api-keys",
    });
  }
  resend ??= new Resend(apiKey);
  return resend;
};

const sendTo = () => import.meta.env.EMAIL_TO ?? site.footer.email;
const sendFrom = () =>
  import.meta.env.EMAIL_FROM ?? `La Luce Estetica <${site.footer.email}>`;

/**
 * Escape untrusted form values before dropping them into HTML.
 */
const esc = (value: string) =>
  value
    .replaceAll("&", "\u0026amp;")
    .replaceAll("<", "\u0026lt;")
    .replaceAll(">", "\u0026gt;")
    .replaceAll('"', "\u0026quot;")
    .replaceAll("'", "\u0026#039;");

/**
 * Friendly display value for the treatment select ("-" when skipped).
 */
const treatmentLabel = (input: string) =>
  input === "-" ? "—" : esc(input);

/**
 * One editorial row (label + value) used in the email body.
 */
const row = (label: string, value: string) =>
  `<tr>
    <td style="padding:8px 0;font:400 11px/1.4 Helvetica,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#b8977e;">${label}</td>
    <td style="padding:8px 0 8px 24px;font:300 15px/1.5 Georgia,'Times New Roman',serif;color:#1c1917;">${value}</td>
  </tr>`;

export const server = {
  sendEnquiry: defineAction({
    accept: "form",
    input: z.object({
      // Honeypot: real users never fill this in (CSS-hidden field).
      // Astro converts empty form fields to null, so validators are null-tolerant.
      company: z
        .string()
        .nullish()
        .transform((v) => v ?? ""),
      name: z.string().nullish().transform((v) => v ?? "").pipe(
        z.string().trim().min(2, contact.errors.name)
      ),
      email: z.string().nullish().transform((v) => v ?? "").pipe(
        z.string().trim().pipe(z.email(contact.errors.email))
      ),
      phone: z
        .string()
        .nullish()
        .transform((v) => v ?? "")
        .pipe(
          z.string().trim().refine(
            (v) => v === "" || /^[+\d][\d ()-]{5,20}$/.test(v),
            "Phone number looks off."
          )
        ),
      treatment: z.string().nullish().transform((v) => v ?? "").pipe(
        z.string().trim().min(2, contact.errors.treatment)
      ),
      message: z.string().nullish().transform((v) => v ?? "").pipe(
        z.string().trim().min(10, contact.errors.message)
      ),
    }),
    handler: async (input) => {
      // Honeypot filled -> pretend success so bots gain nothing.
      if (input.company) {
        return { id: "ok" };
      }

      const { data, error } = await getClient().emails.send({
        from: sendFrom(),
        to: [sendTo()],
        replyTo: input.email,
        subject: `New enquiry — ${input.name}`,
        text: [
          `Name: ${input.name}`,
          `Email: ${input.email}`,
          `Phone: ${input.phone ?? "—"}`,
          `Treatment: ${treatmentLabel(input.treatment)}`,
          "",
          input.message,
        ].join("\n"),
        html: `<div style="background:#faf9f7;padding:32px;">
          <div style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e5d4c0;">
            <div style="padding:24px 32px;border-bottom:1px solid #e5d4c0;">
              <p style="margin:0;font:500 11px/1.4 Helvetica,Arial,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:#b8977e;">La Luce Estetica — new enquiry</p>
              <p style="margin:8px 0 0;font:300 22px/1.3 Georgia,'Times New Roman',serif;color:#1c1917;">${esc(input.name)}</p>
            </div>
            <table style="width:100%;border-collapse:collapse;">
              ${row("Email", `<a href="mailto:${esc(input.email)}" style="color:#1c1917;">${esc(input.email)}</a>`)}
              ${row("Phone", input.phone ? esc(input.phone) : "—")}
              ${row("Treatment", treatmentLabel(input.treatment))}
            </table>
            <div style="padding:24px 32px 32px;border-top:1px solid #e5d4c0;">
              <p style="margin:0;font:400 11px/1.4 Helvetica,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#b8977e;">Message</p>
              <p style="margin:8px 0 0;font:300 15px/1.7 Georgia,'Times New Roman',serif;color:#1c1917;white-space:pre-line;">${esc(input.message)}</p>
            </div>
          </div>
        </div>`,
      });

      if (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error.message ?? "The message could not be sent.",
        });
      }

      return data;
    },
  }),
};
