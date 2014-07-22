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

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aos.api.controllers.Database;
import org.arkanos.aos.api.controllers.HTTP;
import org.arkanos.aos.api.controllers.Security;
import org.arkanos.aos.api.data.User;

/**
 * Login REST API.
 * 
 * @version 1.0
 * @author Matheus Borges Teixeira
 */
@WebServlet("/login")
public class LogIn extends HttpServlet {
	/** Default version number **/
	private static final long	serialVersionUID	= 1L;
	
	/** When last deletion occurred **/
	private static long			last_deletion		= 0;
	
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public LogIn() {
		super();
	}
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
					throws ServletException, IOException {
		String user_name = Database.sanitizeString(request.getParameter("user_name"));
		String hashed_password = Database.sanitizeString(request.getParameter("hashed_password"));
		
		HTTP.setUpDefaultHeaders(response);
		/** Run deletion once a day **/
		if ((LogIn.last_deletion + (24 * 60 * 60 * 1000)) < System.currentTimeMillis()) {
			User.removeUnconfirmed();
			LogIn.last_deletion = System.currentTimeMillis();
		}
		
		if (Security.authenticateToken(request) == null) {
			if ((user_name == null) || (hashed_password == null)) {
				response.sendError(400, "User name and password are required.");
				return;
			}
			else {
				if (User.credentialsMatch(user_name, hashed_password)) {
					String token = Security.createToken(user_name);
					Cookie c = null;
					if (token != null) {
						c = new Cookie(Security.TOKEN_COOKIE_NAME, token);
					}
					response.addCookie(c);
					response.setStatus(201);
					return;
				}
				else {
					response.sendError(403, "Credentials do not match.");
					return;
				}
			}
		}
		response.setStatus(200);
	}
}
