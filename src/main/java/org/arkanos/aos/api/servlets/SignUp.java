/**
 * Copyright (C) 2014 Matheus Borges Teixeira
 *
 * This is a part of Arkanos Organizer Suite (AOS)
 * AOS is a web application for organizing personal goals.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package org.arkanos.aos.api.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Vector;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aos.api.controllers.Database;
import org.arkanos.aos.api.controllers.HTML;
import org.arkanos.aos.api.controllers.HTTP;
import org.arkanos.aos.api.controllers.Mailjet;
import org.arkanos.aos.api.controllers.Security;
import org.arkanos.aos.api.data.User;

/**
 * Signup REST API.
 * 
 * @version 1.0
 * @author Matheus Borges Teixeira
 */
@WebServlet("/signup")
public class SignUp extends HttpServlet {
	/** Default version number **/
	private static final long	serialVersionUID	= 1L;
	
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SignUp() {
		super();
	}
	
	//TODO comment all
	private void checkAndAdd(Vector<String> all, String suggestion) {
		String s = suggestion.toLowerCase();
		if (User.isLegalUsername(s) && !User.exists(s)) {
			all.add(s);
		}
	}
	
	private Vector<String> createSuggestions(String user_name, String first_name, String last_name, String email) {
		Vector<String> suggestions = new Vector<String>();
		
		this.checkAndAdd(suggestions, first_name);
		if (suggestions.size() > 2) return suggestions;
		
		this.checkAndAdd(suggestions, last_name);
		if (suggestions.size() > 2) return suggestions;
		
		this.checkAndAdd(suggestions, first_name + last_name);
		if (suggestions.size() > 2) return suggestions;
		
		this.checkAndAdd(suggestions, last_name + first_name);
		if (suggestions.size() > 2) return suggestions;
		
		this.checkAndAdd(suggestions, first_name + "." + last_name);
		if (suggestions.size() > 2) return suggestions;
		
		this.checkAndAdd(suggestions, first_name + "_" + last_name);
		if (suggestions.size() > 2) return suggestions;
		
		String mail_user = email.substring(0, email.indexOf("@"));
		this.checkAndAdd(suggestions, mail_user);
		if (suggestions.size() > 2) return suggestions;
		
		return suggestions;
	}
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String user_name = Database.sanitizeString(request.getParameter("user_name"));
		String key = Database.sanitizeString(request.getParameter("key"));
		if ((user_name != null) && (key != null)) {
			String secret_key = User.getStringInfo(user_name, User.FIELD_SECRET_KEY);
			if (secret_key == null) {
				response.sendError(400, "Account is already confirmed.");
				return;
			}
			if (secret_key.compareTo(key) == 0) {
				User.confirmAccount(user_name);
				response.setStatus(200);
				response.getWriter().print(HTML.getSuccessConfirm());
				return;
			}
			else {
				response.sendError(400, "The confirmation key is invalid.");
				return;
			}
		}
		response.sendError(400, "Missing arguments.");
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HTTP.setUpDefaultHeaders(response);
		PrintWriter writer = response.getWriter();
		String user_name = Database.sanitizeString(request.getParameter("user_name"));
		String first_name = Database.sanitizeString(request.getParameter("first_name"));
		String last_name = Database.sanitizeString(request.getParameter("last_name"));
		String email = Database.sanitizeString(request.getParameter("email"));
		String hashed_password = Database.sanitizeString(request.getParameter("hashed_password"));
		
		//TODO add check for bots to avoid DB-Filler/Spammer.
		
		if (!User.isLegalUsername(user_name)) {
			response.sendError(400, "Username is not valid.");
			return;
		}
		
		if ((user_name.length() < 1) ||
			(first_name.length() < 1) ||
			(last_name.length() < 1) ||
			(email.length() < 3) ||
			(hashed_password.length() < 1)) {
			response.sendError(400, "All fields are mandatory, no field can be empty or short.");
			return;
		}
		
		if (User.exists(user_name)) {
			response.setStatus(200);
			writer.print("[");
			for (String s : this.createSuggestions(user_name, first_name, last_name, email)) {
				writer.print("\"" + s + "\",");
			}
			writer.print("\"\"]");
		}
		else {
			if (User.create(user_name, first_name, last_name, email, hashed_password)) {
				Cookie c = new Cookie("aos-token", Security.createToken(user_name));
				String secret_key = Security.createSecretKey(hashed_password.length());
				User.saveSecretKey(secret_key, user_name);
				Mailjet.sendMail(first_name + " " + last_name + " <" + email + ">", "Welcome to AOS", HTML.getWelcomeMail(first_name, user_name, secret_key));
				response.setStatus(201);
				response.addCookie(c);
			}
			else {
				response.sendError(500, "User creation has failed.");
				return;
			}
		}
	}
}
