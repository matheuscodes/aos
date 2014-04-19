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
 * Servlet implementation class Login
 */
@WebServlet("/login")
public class LogIn extends HttpServlet {
	private static final long	serialVersionUID	= 1L;
	
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public LogIn() {
		super();
		// TODO Auto-generated constructor stub
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
		
		if (!Security.authenticateToken(request, response)) {
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
