import nodemailer from 'nodemailer';
import ejs from "ejs";
import path from "path";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, API_URL } = process.env;
const { VIEWS_ROOT } = require('../../../app.config');

export const sendActivationMail = async (to: string, id: string) => {
    const url = getActivationLink(id);

    const transport = nodemailer.createTransport({
        host: SMTP_HOST,
        port: +(SMTP_PORT || 587),
        secure: false,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASSWORD
        }
    })

    ejs.renderFile(
        path.join(VIEWS_ROOT, "emails/mail.ejs"),
        { link: url },
        (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            const mailOptions = {
                from: SMTP_USER,
                to,
                subject: "Активация аккаунта на " + API_URL,
                text: "",
                html: data
            }

            transport.sendMail(mailOptions).then(() => {
                console.log("Activation link sent to", to);
            }).catch(err => {
                console.log(err);
            })
        }
    )
}

export const getActivationLink = (id: string) => {
    return `${ process.env.API_URL }/activate/${ id }`;
}
