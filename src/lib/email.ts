import nodemailer from 'nodemailer';
import { siteConfig } from '@/data/siteConfig';

interface SendDriveEmailParams {
  toEmail: string;
  customerName: string;
  productName: string;
  driveLink: string;
  price?: number;
}

export async function sendAccessEmail({
  toEmail,
  customerName,
  productName,
  driveLink,
  price,
}: SendDriveEmailParams): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = (process.env.SMTP_USER || '').trim();
    const smtpPass = (process.env.SMTP_PASS || '').trim();
    const fromAddress = `"Prep Library" <${smtpUser || 'learnalways93@gmail.com'}>`;

    if (!smtpUser || !smtpPass) {
      console.warn(
        `[Email Notice]: SMTP credentials missing in .env.local.`
      );
      return { success: false, error: 'SMTP credentials missing.' };
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const formattedName = customerName && customerName.trim() ? customerName.trim() : 'Learner';
    const paidPrice = price && price > 0 ? price : siteConfig.allAccessPrice;
    const currentDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    // Clean, anti-spam subject line (no emojis or trigger words)
    const subject = `Your Prep Library Access - ${productName}`;

    // Plain text version (CRITICAL to avoid Gmail Spam filter)
    const textContent = `
Hello ${formattedName},

Thank you for your purchase of ${productName} (₹${paidPrice}).

You can access and download your complete handwritten PDF notes collection on Google Drive here:
${driveLink}

Order Details:
- Item: ${productName}
- Amount: ₹${paidPrice} (Paid)
- Access: Lifetime Unlimited Access

If you have any questions or need assistance, reply to this email or contact us at learnalways93@gmail.com.

Best regards,
Prep Library Team
https://preplibrary.com
`.trim();

    // Premium anti-spam HTML email template
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prep Library Access</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f5f7; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 580px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); border: 1px solid #e5e7eb;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #09090b; padding: 32px 30px; text-align: center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <span style="background-color: #10b981; color: #ffffff; font-size: 10px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 12px; border-radius: 9999px; display: inline-block; margin-bottom: 12px;">
                      VERIFIED ORDER CONFIRMED
                    </span>
                    <h1 style="color: #ffffff; font-size: 24px; font-weight: 900; margin: 0; letter-spacing: -0.5px;">
                      Prep Library
                    </h1>
                    <p style="color: #a1a1aa; font-size: 13px; margin: 6px 0 0 0; font-weight: 500;">
                      Technical Study Notes & Interview Guides
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 30px; color: #18181b;">
              
              <h2 style="font-size: 18px; font-weight: 800; margin: 0 0 12px 0; color: #09090b;">
                Welcome, ${formattedName}! 👋
              </h2>
              
              <p style="font-size: 14px; color: #52525b; line-height: 1.6; margin: 0 0 24px 0;">
                Thank you for your payment. Your purchase of <strong>${productName}</strong> has been successfully verified. You now have lifetime access to the complete Google Drive folder.
              </p>

              <!-- CTA Access Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #065f46; margin: 0 0 8px 0;">
                      YOUR GOOGLE DRIVE ACCESS LINK
                    </p>
                    <p style="font-size: 13px; color: #047857; margin: 0 0 16px 0; font-weight: 500;">
                      Click the button below to view and download all handwritten PDF notes:
                    </p>
                    <a href="${driveLink}" target="_blank" style="display: inline-block; background-color: #059669; color: #ffffff; font-size: 14px; font-weight: 800; text-decoration: none; padding: 14px 28px; border-radius: 10px; box-shadow: 0 2px 8px rgba(5, 150, 105, 0.3);">
                      Open Google Drive Folder &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Order Summary Details -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #fafafa; border: 1px solid #f4f4f5; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #71717a; margin: 0 0 14px 0; border-bottom: 1px solid #e4e4e7; padding-bottom: 8px;">
                      Order Summary
                    </h3>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size: 13px; color: #3f3f46;">
                      <tr>
                        <td style="padding: 4px 0; font-weight: 600;">Product:</td>
                        <td style="padding: 4px 0; text-align: right; font-weight: 700; color: #09090b;">${productName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-weight: 600;">Amount Paid:</td>
                        <td style="padding: 4px 0; text-align: right; font-weight: 800; color: #059669;">₹${paidPrice}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-weight: 600;">Access Level:</td>
                        <td style="padding: 4px 0; text-align: right; font-weight: 700; color: #09090b;">Lifetime Unlimited Access</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-weight: 600;">Date:</td>
                        <td style="padding: 4px 0; text-align: right; color: #71717a;">${currentDate}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Direct URL Backup -->
              <p style="font-size: 12px; color: #71717a; line-height: 1.5; margin: 0; word-break: break-all;">
                If the button above does not work, copy and paste this link into your browser:<br>
                <a href="${driveLink}" style="color: #0284c7; text-decoration: underline;">${driveLink}</a>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #fafafa; border-top: 1px solid #f4f4f5; padding: 20px 30px; text-align: center;">
              <p style="font-size: 12px; color: #71717a; margin: 0 0 6px 0; font-weight: 500;">
                Need help or have questions about your purchase?
              </p>
              <p style="font-size: 12px; margin: 0;">
                Contact Support: <a href="mailto:learnalways93@gmail.com" style="color: #09090b; font-weight: 700; text-decoration: none;">learnalways93@gmail.com</a>
              </p>
              <p style="font-size: 11px; color: #a1a1aa; margin: 14px 0 0 0;">
                &copy; ${new Date().getFullYear()} Prep Library. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

    const mailOptions = {
      from: fromAddress,
      replyTo: 'learnalways93@gmail.com',
      to: toEmail,
      subject: subject,
      text: textContent,
      html: htmlContent,
      headers: {
        'X-Priority': '3',
        'X-Mailer': 'Nodemailer',
      },
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Sent Success]: Message ID ${info.messageId} to ${toEmail}`);
    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    console.error('[Email Dispatch Error]:', err);
    return { success: false, error: err.message || 'Failed to send email.' };
  }
}
