/**
 *  Copyright (C) 2014 Matheus Borges Teixeira
 *  
 *  This file is part of Arkanos Organizer Suite, a tool for personal organization.
 *
 *  Arkanos Organizer Suite is free software: you can redistribute it and/or 
 *  modify it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with Arkanos Organizer Suite.  If not, see <http://www.gnu.org/licenses/>
 */
package org.arkanos.aos.api.controllers;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/**
 * Controls the email sending.
 * TODO: Document all.
 * 
 * @version 1.0
 * @author Matheus Borges Teixeira
 * 
 */
public class Mailjet {
	
	private static String	APIKey		= "1";
	private static String	SecretKey	= "1";
	
	public static void sendMail(String to, String what, String html_content) {
		if ((System.getenv("MAILJET_API") != null) && (System.getenv("MAILJET_SECRET") != null)) {
			Mailjet.APIKey = System.getenv("MAILJET_API");
			Mailjet.SecretKey = System.getenv("MAILJET_SECRET");
		}
		else {
			/* Authentication will fail, don't bother trying */
			Log.error("Mailjet", "Keys could not be read.");
			return;
		}
		Authenticator auth = new Authenticator() {
			@Override
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(Mailjet.APIKey, Mailjet.SecretKey);
			}
		};
		
		String From = "Matheus from AOS ";
		String To = to;
		/* Obfuscating email to avoid Spam on public code */
		From += String.valueOf(new char[] { '<', 'm', 'a', 't', 'h', 'e', 'u', 's', '.', 'b', 't', 64, 'g', 'm', 'a', 'i', 'l', '.', 'c', 'o', 'm', '>' });
		
		Properties props = new Properties();
		
		props.put("mail.smtp.host", "in.mailjet.com");
		props.put("mail.smtp.socketFactory.port", "465");
		props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.port", "465");
		
		Session session = Session.getDefaultInstance(props, auth);
		
		try {
			
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(From));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(To));
			message.setSubject(what);
			message.setContent(html_content, "text/html; charset=utf-8");
			Transport.send(message);
			
		}
		catch (MessagingException e) {
			//TODO: additionally send me a message.
			System.err.println(e);
		}
	}
}
