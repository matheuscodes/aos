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

/**
 * Controls the templates for HTML code.
 * 
 * @version 1.0
 * @author Matheus Borges Teixeira
 */
public class HTML {
	/** AOS Domain to be used in links **/
	static private final String	DOMAIN	= "https://aos.cloudcontrolled.com/";
	
	/**
	 * Creates a simple HTML {@code <head>}.
	 * 
	 * @return a simple configured header as a string.
	 */
	private static String getHeader() {
		return HTML.getHeaderWith("");
	}
	
	/**
	 * Creates a HTML {@code <head>} with configurable content.
	 * 
	 * @param what
	 *            defines the special content to be added.
	 * @return a configured header as a string.
	 */
	private static String getHeaderWith(String what) {
		String result = new String();
		result += "<head>";
		result += "<link href='../resources/css/app.css' rel='stylesheet' type='text/css'>";
		result += "<script type='text/javascript' src='../resources/scripts/crypto-js-md5.js'></script>";
		result += what;
		result += "</head>";
		return result;
	}
	
	/**
	 * Creates the body for the Reset Email.
	 * 
	 * @param name
	 *            specifies the user's name.
	 * @param user_name
	 *            defines the user_name for the link.
	 * @param secret_key
	 *            defines the key for the link.
	 * @return the email body as a string.
	 */
	public static String getResetMail(String name, String user_name, String secret_key) {
		String result = "<p>Dear " + name + ",</p>" +
						"<p>Someone has requested to reset your password for <strong>AOS - Arkanos Organizer Suite</strong>.</p>" +
						"<p>If this was not requested by you, ignore this email. Otherwise, visit the following link to choose a new password:</p>" +
						"<p><a href='" + HTML.DOMAIN + "reset?user_name=" + user_name + "&key=" + secret_key + "'>" + HTML.DOMAIN + "reset?user_name=" + user_name + "&key=" + secret_key + "<a/></p>" +
						
						"<p>Best Regards,<br/>Matheus from AOS.</p>";
		return result;
	}
	
	/**
	 * Creates the HTML page for resetting the password.
	 * 
	 * @param user_name
	 *            defines the user_name to change the password.
	 * @param key
	 *            defines the key that needs to be used.
	 * @return the page as a string.
	 */
	public static String getResetPassword(String user_name, String key) {
		String result = "";
		String script = new String();
		script += "<script language='javascript'>";
		script += "var resetPassword = function(){"
					+ "if(document.getElementById('pass1').value != document.getElementById('pass2').value){"
					+ "document.getElementById('message').innerHTML = 'The passwords do not match!';"
					+ "}"
					+ "else{"
					+ "xmlhttp=new XMLHttpRequest();"
					+ "hashed=''+CryptoJS.MD5(document.getElementById('pass1').value);"
					+ "xmlhttp.open('PUT','?user_name=" + user_name + "&password='+hashed+'&key=" + key + "',false);"
					+ "xmlhttp.send();"
					+ "document.getElementsByTagName('html')[0].innerHTML = xmlhttp.responseText;"
					+ "}};";
		script += "</script>";
		result += HTML.getHeaderWith(script);
		result += "<body>";
		result += result += "<p style='text-align:center'><img style='margin:2%; width:300px; height:200px' src='resources/images/AOSLogo.png'/></p>";
		result += "<form name='reset_form'>";
		result += "<table align='center' width='100%'><tr>";
		result += "<td id='message' colspan=2 style='color:#F00;text-align:center;'><td></tr><tr>";
		result += "<td>Choose a new password:</td>";
		result += "<td><input id='pass1' type='password' style='width:100%;'/></td>";
		result += "</tr><tr>";
		result += "<td>Repeat the new password:</td>";
		result += "<td><input id='pass2' type='password' style='width:100%;'/></td>";
		result += "</tr><tr><td></td><td>";
		result += "<input type='button' name='button' value='Reset' onclick='resetPassword()' />";
		result += "</td></tr></table></form></body>";
		return result;
	}
	
	/**
	 * Creates the HTML page confirming the account.
	 * 
	 * @return the page as a string.
	 */
	public static String getSuccessConfirm() {
		String result = "";
		result += HTML.getHeader();
		result += "<body>";
		result += "<p style='text-align:center'><img style='margin:2%; width:300px; height:200px' src='resources/images/AOSLogo.png'/></p>";
		result += "<p style='text-align:center'>Your account has been successfully confirmed!</p>";
		result += "<p style='text-align:center; font-size:0.8em'><a href='" + HTML.DOMAIN + "'>" + HTML.DOMAIN + "</a></p>";
		result += "</body>";
		return result;
	}
	
	/**
	 * Creates the HTML page confirming the password change.
	 * 
	 * @return the page as a string.
	 */
	public static String getSuccessReset() {
		String result = "";
		result += HTML.getHeader();
		result += "<body>";
		result += "<p style='text-align:center'><img style='margin:2%; width:300px; height:200px' src='resources/images/AOSLogo.png'/></p>";
		result += "<p style='text-align:center'>The password was successfully changed!</p>";
		result += "<p style='text-align:center; font-size:0.8em'><a href='" + HTML.DOMAIN + "'>" + HTML.DOMAIN + "</a></p>";
		result += "</body>";
		return result;
	}
	
	/**
	 * Creates the body for the Welcome Email.
	 * 
	 * @param name
	 *            specifies user's name.
	 * @param user_name
	 *            defines the user_name to be confirmed.
	 * @param secret_key
	 *            defines the key of confirmation.
	 * @return the email body as a string.
	 */
	public static String getWelcomeMail(String name, String user_name, String secret_key) {
		String result = "<p style='text-align:center;font-size:120%;font-weight:bold;'>Hi there " + name + " and welcome to AOS!</p>" +
						"<p>AOS Arkanos Organizer Suite is a tool for managing personal goals. It has been built and provided in the hope it will be useful, but without any warranty.</p>" +
						"<p>You can use the application up to one week without confirming your account. Please use this time to experiment and make sure you want to keep using it. Unconfirmed accounts will expire after the one week period and be completely removed from our records.</p>" +
						"<p>Please use the following link to confirm your account:" +
						"<p><a href='" + HTML.DOMAIN + "signup?user_name=" + user_name + "&key=" + secret_key + "'>" + HTML.DOMAIN + "signup?user_name=" + user_name + "&key=" + secret_key + "<a/></p>" +
						"<p><strong>Important:</strong> Please always make sure to access the application over HTTPS, to maintain security of your data. You can bookmark the link bellow:" +
						"<p><a href='" + HTML.DOMAIN + "'>" + HTML.DOMAIN + "</a></p>" +
						"<p><strong>Feedback is always welcome!</strong> Please feel free to contact me with feature requests, suggestions or bug reports.</p>" +
						"<p style='text-align:center;font-size:80%'> Copyright (C) 2014 Matheus Borges Teixeira</p>";
		return result;
	}
}
