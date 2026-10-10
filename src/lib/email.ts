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
    const smtpUser = (process.env.SMTP_USER || '').trim();
    const smtpPass = (process.env.SMTP_PASS || '').trim();
    // For Gmail SMTP, setting exact email in from prevents header forgery flags
    const fromAddress = smtpUser || 'learnalways93@gmail.com';

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
    const currentDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    // Standard transactional receipt subject line
    const subject = `Order Receipt: ${productName}`;

    // Plain text version
    const textContent = `
Hello ${formattedName},

Thank you for your order from Prep Library.

Product: ${productName}
Amount: ₹199 (Paid)
Date: ${currentDate}

Access your complete PDF notes folder on Google Drive here:
${driveLink}

If you have any questions, please reply to this email or write to learnalways93@gmail.com.

Best regards,
Prep Library
https://preplibrary.com
`.trim();

    // Clean, lightweight transactional HTML body
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Prep Library Access</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #111111; margin: 0; padding: 20px;">
  <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; padding: 28px; border-radius: 12px; border: 1px solid #e0e0e0;">
    
    <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eeeeee;">
      <h2 style="margin: 0; color: #111111; font-size: 22px;">Prep Library</h2>
      <p style="margin: 4px 0 0 0; color: #666666; font-size: 13px;">Order Confirmation & Access Link</p>
    </div>

    <div style="padding: 20px 0;">
      <p style="font-size: 15px; color: #222222; margin-bottom: 16px;">
        Hello <strong>${formattedName}</strong>,
      </p>
      <p style="font-size: 14px; color: #444444; line-height: 1.5; margin-bottom: 24px;">
        Thank you for purchasing the <strong>${productName}</strong>. Your payment of <strong>₹199</strong> has been verified.
      </p>

      <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 24px;">
        <p style="margin: 0 0 12px 0; font-weight: bold; font-size: 14px; color: #166534;">Your PDF Notes Folder Access</p>
        <a href="${driveLink}" target="_blank" style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; font-weight: bold; padding: 12px 24px; border-radius: 6px; font-size: 14px;">
          Access Google Drive Folder
        </a>
      </div>

      <div style="background-color: #fafafa; border: 1px solid #eeeeee; padding: 16px; border-radius: 8px; font-size: 13px; color: #444444; margin-bottom: 20px;">
        <div style="margin-bottom: 6px;"><strong>Item:</strong> ${productName}</div>
        <div style="margin-bottom: 6px;"><strong>Amount Paid:</strong> ₹199</div>
        <div><strong>Date:</strong> ${currentDate}</div>
      </div>

      <p style="font-size: 12px; color: #666666; line-height: 1.4;">
        Direct Access URL:<br>
        <a href="${driveLink}" style="color: #2563eb;">${driveLink}</a>
      </p>
    </div>

    <div style="border-top: 1px solid #eeeeee; padding-top: 16px; text-align: center; font-size: 12px; color: #888888;">
      Prep Library &bull; Questions? Reply to this email or write to <a href="mailto:learnalways93@gmail.com" style="color: #444444;">learnalways93@gmail.com</a>
    </div>

  </div>
</body>
</html>
`.trim();

    const mailOptions = {
      from: fromAddress,
      replyTo: smtpUser || 'learnalways93@gmail.com',
      to: toEmail,
      subject: subject,
      text: textContent,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Sent Success]: Message ID ${info.messageId} to ${toEmail}`);
    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    console.error('[Email Dispatch Error]:', err);
    return { success: false, error: err.message || 'Failed to send email.' };
  }
}
