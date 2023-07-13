import { NextResponse } from 'next/server';
const data = []
export async function GET(request,response) {
    console.log("get ")
    return NextResponse.json({data:"success"})
  }
const nodemailer = require("nodemailer");
const adminEmail = 'william <thew1lego@gmail.com>';
const senderEmail = 'william <williambrobertsemail@gmail.com>'
require('dotenv').config()
const mailConfig = {
    host: "smtp.gmail.com",
    port: 465, // or 587
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.NEXT_PUBLIC_GMAIL_USER, // your gmail account
        pass: process.env.NEXT_PUBLIC_GMAIL_PASS // your gmail app password
    }
}

const sendEmail = async (message,name,email)=> {
    let transporter = nodemailer.createTransport(mailConfig);
    const mailData = {
        from: senderEmail,
        to: adminEmail,
        subject: `Message From ${name}`,
        text: message + " | Sent from: " + email,
        html: `<div>${message}</div><p>Sent from: ${email}</p>`
    }
    transporter.sendMail(mailData, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
    })
    
   
   
}



export async function POST(request){
    const {name,email,message}= await request.json()
    console.log(name,email,message,"here")
    
   sendEmail(message,name,email)
    
  
    data.push({name:name,email:email,message:message})


    
    return NextResponse.json(data);
}