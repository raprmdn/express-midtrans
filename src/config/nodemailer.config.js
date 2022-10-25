const nodemailer = require('nodemailer');

module.exports = {
    sendMail: async (to, subject, template) => {
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

            console.log(`Attempting send email to ${to} with subject 'Dream Space - ${subject}'.`);
            const info = await transporter.sendMail({
                from: `Dream Space, <${process.env.SMTP_EMAIL}>`,
                to,
                subject: `Dream Space - ${subject}`,
                html: template,
                priority: 'high',
            });
            console.log('Message Sent: %s', info.messageId);
        } catch (e) {
            console.log(e);
        }
    },
};
