import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendKeyEmail(to: string, serials: string[]) {
  await resend.emails.send({
    from: "Hachihi <noreply@yourdomain.com>",
    to,
    subject: "Thông tin key điện tử của bạn",
    html: `
      <h2>Cảm ơn bạn đã thanh toán</h2>
      <p>Dưới đây là key của bạn:</p>
      <ul>
        ${serials.map(s => `<li>${s}</li>`).join("")}
      </ul>
    `,
  });
}
