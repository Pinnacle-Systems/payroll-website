import { createTransport } from 'nodemailer';

const MAIL_SETTINGS = {
    service: 'gmail',
    auth: {
        user: "sportsgallerytirupur@gmail.com",
        pass: "gpnkjlrldfhojtkt",
    },
};

const transporter = createTransport(MAIL_SETTINGS);

export async function sendMail(params) {
    try {
        let info = await transporter.sendMail({
            from: MAIL_SETTINGS.auth.user,
            to: params.to,
            subject: params?.subject || 'Pinnacle Systems Verification',
            html: params?.html || `
        <div class="container" style="max-width: 90%; margin: auto; padding-top: 20px">
          <h2>Pinnacle Systems</h2>
          <h4>OTP for Email Verification ✔</h4>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center; color: #e56419;">${params.OTP}</h1>
        </div>
      `,
        });
        return info;
    } catch (error) {
        console.error(error);
        return false;
    }
}
