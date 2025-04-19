import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    },
});


transporter.verify((error , success) =>{

    if(error){
        console.log("Gmail services is not ready to send the email , please check the email configuration.")
    }
    else{
        console.log("gmail service is ready to send the emails.")
    }
});


const sendEmail = async(to , subject , body) =>{
    await transporter.sendMail({
        from:`"Petcare" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html:body
    })
}



export const sendVerificationEmail = async(to , token) =>{
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;
    const html = `<h1>Welcome to Petcare! Please Verify Your Email</h1>
                  <p>Thank You for registering with Petcare. Please click the link below to verify your Email.</p>
                  <a href="${verificationUrl}">Click Here</a> to verify your Email
                  <p>If you didn't request this or already verified , please ignore this email.</p>`

    await sendEmail(to , "Please Verify Your Email to access Petcare Services" , html);
}


