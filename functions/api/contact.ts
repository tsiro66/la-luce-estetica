import { z } from "zod";
import { Resend } from "resend";
import site from "../../src/data/site.json";
import contact from "../../src/data/contact.json";

/**
 * Pages Function: POST /api/contact — sends a Resend email for the contact
 * form. Runs in the Cloudflare Pages Functions runtime, so all environment
 * values come from `context.env` (dashboard bindings / .dev.vars locally);
 * `import.meta.env` does not exist here.
 *
 * Classic form POST (no client JS): responses are 303 redirects to
 * /contact?sent=1 (success) or /contact?err={field} (failure), which
 * contact.astro turns into banners.
 */

type Env = {
  RESEND_API_KEY?: string;
  EMAIL_TO?: string;
  EMAIL_FROM?: string;
};

type EventContext = { request: Request; env: Env };

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
    <td style="padding:8px 0 8px 32px;font:400 11px/1.4 Helvetica,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#b8977e;">${label}</td>
    <td style="padding:8px 32px 8px 24px;font:300 15px/1.5 Georgia,'Times New Roman',serif;color:#1c1917;vertical-align:top;">${value}</td>
  </tr>`;

const schema = z.object({
  // Honeypot: real users never fill this in (CSS-hidden field).
  company: z.string(),
  name: z.string().trim().min(2, contact.errors.name),
  email: z.string().trim().pipe(z.email(contact.errors.email)),
  phone: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || /^[+\d][\d ()-]{5,20}$/.test(v),
      "Phone number looks off."
    ),
  treatment: z.string().trim().min(2, contact.errors.treatment),
  message: z.string().trim().min(10, contact.errors.message),
});

/**
 * FormData -> plain strings ("" when missing); unchecked/malformed entries
 * become empty strings so validators stay null-tolerant like before.
 */
const collect = (fd: FormData) => {
  const val = (key: string) => {
    const v = fd.get(key);
    return typeof v === "string" ? v : "";
  };
  return {
    company: val("company"),
    name: val("name"),
    email: val("email"),
    phone: val("phone"),
    treatment: val("treatment"),
    message: val("message"),
  };
};

export const onRequestPost = async ({
  request,
  env,
}: EventContext): Promise<Response> => {
  const redirect = (path: string) =>
    Response.redirect(new URL(path, request.url), 303);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return redirect("/contact?err=send");
  }

  const parsed = schema.safeParse(collect(form));
  if (!parsed.success) {
    const field = String(parsed.error.issues[0]?.path[0] ?? "message");
    return redirect(`/contact?err=${field}`);
  }
  const input = parsed.data;

  // Honeypot filled -> pretend success so bots gain nothing.
  if (input.company) {
    return redirect("/contact?sent=1");
  }

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set. Add it in the Cloudflare Pages dashboard (or .dev.vars locally): https://resend.com/api-keys"
    );
    return redirect("/contact?err=send");
  }

  const sendTo = env.EMAIL_TO ?? site.footer.email;
  const sendFrom =
    env.EMAIL_FROM ?? `La Luce Estetica <${site.footer.email}>`;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: sendFrom,
      to: [sendTo],
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
      console.error("Resend error:", error.message ?? "The message could not be sent.");
      return redirect("/contact?err=send");
    }

    return redirect("/contact?sent=1");
  } catch (e) {
    console.error("Resend request failed:", e instanceof Error ? e.message : e);
    return redirect("/contact?err=send");
  }
};
