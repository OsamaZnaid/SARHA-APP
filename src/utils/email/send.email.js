import nodemailer from"nodemailer";

export const sendEmail = async({to ="" ,cc="",bcc="", subject="SARHA APP", text="",html="",attachments =[]})=>{
    const transporter = nodemailer.createTransport({
        service :'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

        const info = await transporter.sendMail({
          from: `"SARAHA APP 👻" <${process.env.EMAIL}>`, 
          to,
          cc,
          bcc,
          text,
          html,subject,attachments 
        
        });
        return info
}
