import nodemailer from "nodemailer";

interface WelcomeEmailOptions {
  email: string;
  name: string;
  role: string;
  tempPassword: string;
}

interface EmailOptions {
  email: string;
  subject: string;
  resetURL: string;
  name: string;
}

console.log(process.env.EMAIL_HOST);

const getTransporter = () =>
  nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const htmlTemplate = `

<!DOCTYPE html>

<html>

<head>

<meta charset="utf-8">

<style>

body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #fafafa; color: #111111; margin: 0; padding: 40px 20px; }

.container { max-width: 500px; background: #ffffff; padding: 40px; border: 1px solid #e5e5e5; border-radius: 8px; margin: 0 auto; }

h2 { font-size: 20px; font-weight: 600; letter-spacing: -0.5px; margin-bottom: 24px; color: #000; }

p { font-size: 14px; line-height: 1.6; color: #666666; margin-bottom: 32px; }

.btn { display: inline-block; background-color: #111111; color: #ffffff !important; text-decoration: none; padding: 12px 24px; font-size: 14px; font-weight: 500; border-radius: 6px; }

.footer { margin-top: 40px; font-size: 12px; color: #999999; border-top: 1px solid #eeeeee; padding-top: 20px; }

</style>

</head>

<body>

<div class="container">

<h2>Password Reset Request</h2>

<p>Hello ${options.name},<br>We received a request to reset your password. Click the button below to secure your account. This link is only valid for 10 minutes.</p>

<a href="${options.resetURL}" class="btn">Reset Password</a>

<p style="margin-top: 32px; font-size: 12px; color: #999999;">If you didn't request this, you can safely ignore this email.</p>

<div class="footer">Uni-college Educational system.</div>

</div>

</body>

</html>

`;

  const mailOptions = {
    from: `"Uni-College Support" <noreply@uni-college.com>`,
    to: options.email,

    subject: options.subject,

    text: `Reset your password here: ${options.resetURL}`, // Backup plain text

    html: htmlTemplate,
  };

  await getTransporter().sendMail(mailOptions);
};

export const sendWelcomeEmail = async (
  options: WelcomeEmailOptions,
): Promise<void> => {
  const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #fafafa; color: #111111; margin: 0; padding: 40px 20px; }
.container { max-width: 500px; background: #ffffff; padding: 40px; border: 1px solid #e5e5e5; border-radius: 8px; margin: 0 auto; }
h2 { font-size: 20px; font-weight: 600; letter-spacing: -0.5px; margin-bottom: 24px; color: #000; }
p { font-size: 14px; line-height: 1.6; color: #666666; margin-bottom: 16px; }
.credentials { background: #f5f5f5; border-radius: 6px; padding: 16px 20px; margin: 24px 0; }
.credentials p { margin: 4px 0; color: #111; font-size: 14px; }
.credentials span { font-weight: 600; }
.btn { display: inline-block; background-color: #111111; color: #ffffff !important; text-decoration: none; padding: 12px 24px; font-size: 14px; font-weight: 500; border-radius: 6px; }
.footer { margin-top: 40px; font-size: 12px; color: #999999; border-top: 1px solid #eeeeee; padding-top: 20px; }
</style>
</head>
<body>
<div class="container">
  <h2>Welcome to Uni-College 🎓</h2>
  <p>Hello ${options.name}, your account has been created as <strong>${options.role}</strong>.</p>
  <p>Here are your login credentials:</p>
  <div class="credentials">
    <p>Email: <span>${options.email}</span></p>
    <p>Password: <span>${options.tempPassword}</span></p>
  </div>
  <p>Please log in and change your password immediately.</p>
  <a href="${process.env.CLIENT_URL}/login" class="btn">Login Now</a>
  <div class="footer">Uni-College Educational System.</div>
</div>
</body>
</html>
  `;

  await getTransporter().sendMail({
    from: `"Uni-College" <noreply@uni-college.com>`,
    to: options.email,
    subject: "Welcome to Uni-College — Your Account Details",
    html: htmlTemplate,
  });
};
