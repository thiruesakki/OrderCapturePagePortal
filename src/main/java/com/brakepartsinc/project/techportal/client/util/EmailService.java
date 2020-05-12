package com.brakepartsinc.project.techportal.client.util;

import java.util.List;
import java.util.Properties;

import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import com.sun.mail.smtp.SMTPTransport;


public class EmailService {

	public static boolean sendMail(String toAddress, String secretkey, String domainName) {
		
		boolean mailSent = true;
		try {
//			final String from = TPConstants.SENDER_MAIL_ID;
//			String host = TPConstants.MAIL_SMTP_HOST;
//			int port = TPConstants.MAIL_SMTP_PORT;
//			final String password = TPConstants.MAIL_PASSWORD;
//			String cc = TPConstants.CC_MAIL_ID;
			
			final String from = "@gmail.com";
			String host = "smtp.gmail.com";
			int port = 587;
			final String password = "";
			String cc = "@gmail.com";
//			System.out.println("from"+from);
//			System.out.println("host"+host);
//			System.out.println("password"+password);
//			System.out.println("cc"+cc);
			
			Properties properties = System.getProperties();
			properties.put("mail.smtp.starttls.enable", "true");
			properties.put("mail.smtp.host", host);
			properties.put("mail.smtp.password", password);
			properties.put("mail.smtp.port", port);
			properties.put("mail.smtp.auth", "true");
//			properties.put("mail.smtp.socketFactory.class",
//					"javax.net.ssl.SSLSocketFactory");
			
			
			Session session = Session.getDefaultInstance(properties,
					new javax.mail.Authenticator() {

						protected PasswordAuthentication getPasswordAuthentication() {
							return new PasswordAuthentication(from, password);
						}
					});
			
			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress(from));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(
					toAddress));
			//message.addRecipient(Message.RecipientType.CC, new InternetAddress(cc));
			message.setSubject(TPConstants.MAIL_SUBJECT);
			BodyPart messageBodyPart = new MimeBodyPart();
			String domain = domainName + "/reset.html?reset_code=";
			String mailBody = TPConstants.MAIL_BODY;
			mailBody = mailBody.replace("<secretkey>",secretkey);
			mailBody = mailBody.replace("<domain>",domain);
			messageBodyPart.setContent(mailBody,"text/html; charset=utf-8");
			System.out.println("mailBody"+mailBody+""+"messageBodyPart"+messageBodyPart);
			MimeMultipart multipart = new MimeMultipart();
			multipart.addBodyPart(messageBodyPart);
			SMTPTransport transport = (SMTPTransport) session
					.getTransport("smtp");
			transport.connect(host, port, from, password);
			message.setContent(multipart);
			transport.sendMessage(message, message.getAllRecipients());
			mailSent = transport.getReportSuccess();
			System.out.println("Reset Password Link is sent to the email");
			
		   } catch (MessagingException mex) {
			  // mex.printStackTrace();
//			  System.out.println("Forgot Password Email not sent:" + mex.getMessage());
		}
		return mailSent;
	}
	
	
	
	
}
