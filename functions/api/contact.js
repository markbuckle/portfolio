/* Cloudflare Pages Function — the file path maps to the route, so this serves
   /api/contact. It runs on the Workers runtime rather than Node: bindings
   arrive on `env` (there is no process.env), and the handler takes and returns
   web-standard Request/Response objects.

   Resend's REST API is called directly instead of via the `resend` SDK. The
   SDK eagerly pulls in a MIME parser and a webhook verifier we never use, and
   declares engines.node >= 20 — needless bundle weight and Node-compat risk
   for what amounts to a single authenticated POST. */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

const MAX_LENGTH = { name: 100, email: 200, message: 5000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);

const readField = (body, key) => (typeof body?.[key] === 'string' ? body[key].trim() : '');

const json = (body, status, headers) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });

/* A single onRequest handles every method. Splitting this into onRequestPost
   would leave the non-POST case to Pages' default routing; keeping it explicit
   means the 405 is ours and is guaranteed. */
export async function onRequest({ request, env }) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405, { Allow: 'POST' });
  }

  if (!env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is missing from the environment.');
    return json({ error: 'Email is not configured.' }, 500);
  }

  /* Resend's shared sender needs no DNS setup, but only ever delivers to the
     Resend account owner's own address. Once a domain is verified, set
     CONTACT_FROM to an address on it to reach anyone. */
  const from = env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>';
  const to = env.CONTACT_TO || 'markbuckle92@gmail.com';

  // Malformed JSON rejects rather than throwing past the validation below.
  const body = await request.json().catch(() => null);

  const name = readField(body, 'name');
  const email = readField(body, 'email');
  const message = readField(body, 'message');

  if (!name || !email || !message) {
    return json({ error: 'Name, email, and message are all required.' }, 400);
  }
  if (!EMAIL_PATTERN.test(email)) {
    return json({ error: 'That email address looks invalid.' }, 400);
  }
  /* The form caps nothing itself, and the endpoint is public — without these a
     script could push megabyte payloads through the account. */
  for (const [field, value] of Object.entries({ name, email, message })) {
    if (value.length > MAX_LENGTH[field]) {
      return json({ error: `That ${field} is too long.` }, 400);
    }
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        // Snake_case is what the REST API expects; the SDK's replyTo is a wrapper.
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        html:
          `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>` +
          `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      }),
    });

    if (!response.ok) {
      // Logged server-side only — the upstream reason never reaches the browser.
      console.error('Resend rejected the send:', response.status, await response.text());
      return json({ error: 'The email service rejected the message.' }, 502);
    }

    const data = await response.json().catch(() => ({}));
    return json({ id: data?.id }, 200);
  } catch (err) {
    console.error('Resend request failed:', err);
    return json({ error: 'Could not send the message.' }, 500);
  }
}
