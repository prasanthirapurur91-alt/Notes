import nodemailer from 'nodemailer';

interface SendDriveEmailParams {
  toEmail: string;
  customerName: string;
  productName: string;
  driveLink: string;
}

export async function sendAccessEmail({
  toEmail,
  customerName,
  productName,
  driveLink,
}: SendDriveEmailParams): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_FROM_ADDRESS;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_SERVER_API_KEY;
    const fromAddress = process.env.EMAIL_FROM_ADDRESS || `"Prep Library Notes" <${smtpUser || 'support@preplibrary.com'}>`;

    if (!smtpUser || !smtpPass) {
      console.warn(
        `[Email Notice]: SMTP credentials (SMTP_USER / SMTP_PASS) not configured in .env.local. Direct link will still be delivered on the confirmation screen.`
      );
      return { success: false, error: 'SMTP credentials missing.' };
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for 587
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: fromAddress,
      to: toEmail,
      subject: `🎉 Instant Access: ${productName} - Prep Library`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaea; rounded-radius: 12px; background-color: #ffffff; color: #111111;">
          <h2 style="color: #000000; margin-bottom: 8px;">Thank you for your purchase, ${customerName || 'Learner'}! 🎉</h2>
          <p style="font-size: 14px; color: #555555; line-height: 1.6;">
            Your payment of <strong>₹199</strong> for <strong>${productName}</strong> has been successfully processed and verified.
          </p>
          
          <div style="margin: 24px 0; padding: 20px; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #e5e5e5; text-align: center;">
            <h3 style="margin-top: 0; color: #000000; font-size: 16px;">📁 Your Lifetime Google Drive Access Link</h3>
            <p style="font-size: 13px; color: #666666; margin-bottom: 16px;">
              Click below to view and download all handwritten PDF notes & interview guides:
            </p>
            <a href="${driveLink}" target="_blank" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; font-weight: bold; padding: 14px 28px; border-radius: 8px; font-size: 14px;">
              Access Google Drive Folder ↗
            </a>
          </div>

          <p style="font-size: 12px; color: #777777; line-height: 1.5;">
            Direct URL: <a href="${driveLink}" style="color: #0066cc;">${driveLink}</a>
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          
          <p style="font-size: 11px; color: #999999; text-align: center;">
            Prep Library • Handwritten Technical Study Notes & Interview Q&As<br />
            If you have any questions, reply to this email or contact support.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Sent Success]: Message ID ${info.messageId} to ${toEmail}`);
    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    console.error('[Email Dispatch Error]:', err);
    return { success: false, error: err.message || 'Failed to send email.' };
  }
}
