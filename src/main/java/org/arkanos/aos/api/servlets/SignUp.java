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
import org.arkanos.aos.api.controllers.HTTP;
import org.arkanos.aos.api.controllers.Security;
import org.arkanos.aos.api.data.User;

/**
 * Servlet implementation class SignUp
 */
@WebServlet("/signup")
public class SignUp extends HttpServlet {
	private static final long	serialVersionUID	= 1L;
	
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public SignUp() {
		super();
		// TODO Auto-generated constructor stub
	}
	
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
		if (User.exists(user_name)) {
			response.setStatus(200);
			writer.print("{[");
			for (String s : this.createSuggestions(user_name, first_name, last_name, email)) {
				writer.print("\"" + s + "\",");
			}
			writer.print("\"\"]}");
		}
		else {
			if (User.create(user_name, first_name, last_name, email, hashed_password)) {
				Cookie c = new Cookie("aos-token", Security.createToken(user_name));
				response.setStatus(201);
				response.addCookie(c);
			}
			else {
				response.sendError(500, "User creation has failed.");
			}
		}
	}
}