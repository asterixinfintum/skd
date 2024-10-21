require('dotenv').config();

import { Resend } from "resend";

const resend = new Resend(`${process.env.RSSK}`);

async function send({ template }) {
    try {
        const data = await resend.emails.send({
            from: template.giver,
            to: [`${template.receiver}`],
            subject: template.subject,
            html: template.message,
        });
        
        return data;
    } catch (error) {
        throw new Error('email sending failed, try again')
    }
}

export default send;