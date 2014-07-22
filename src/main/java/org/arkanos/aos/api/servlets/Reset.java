package org.arkanos.aos.api.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aos.api.controllers.Database;
import org.arkanos.aos.api.controllers.HTML;
import org.arkanos.aos.api.controllers.Mailjet;
import org.arkanos.aos.api.controllers.Security;
import org.arkanos.aos.api.data.User;

/**
 * TODO: Document all.
 */
@WebServlet("/reset")
public class Reset extends HttpServlet {
	private static final long	serialVersionUID	= 1L;
	
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Reset() {
		super();
		// TODO Block multiple requests
	}
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String user_name = request.getParameter("user_name");
		String key = request.getParameter("key");
		if ((key != null) && (user_name != null)) {
			if (Security.checkResetKey(User.getStringInfo(user_name, User.FIELD_SECRET_KEY), User.getStringInfo(user_name, User.FIELD_HASHED_PASSWORD), key)) {
				response.getWriter().print(HTML.getResetPassword(user_name, key));
				response.setStatus(200);
			}
			else {
				response.sendError(400, "This reset key is invalid.");
			}
			return;
		}
		response.sendError(400, "Missing arguments.");
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String user_name = request.getParameter("user_name");
		if (user_name != null) {
			if (User.exists(Database.sanitizeString(user_name))) {
				String password = User.getStringInfo(user_name, User.FIELD_HASHED_PASSWORD);
				String secret_key = Security.createSecretKey(password.length());
				String scrambled = Security.createResetKey(secret_key, password);
				User.saveSecretKey(secret_key, Database.sanitizeString(user_name));
				Mailjet.sendMail(User.getContact(user_name), "AOS Password Reset", HTML.getResetMail(User.getStringInfo(user_name, User.FIELD_FIRST_NAME), user_name, scrambled));
				response.setStatus(204);
				return;
			}
			else {
				response.sendError(404, "User not found.");
				return;
			}
		}
		else {
			response.sendError(400, "No user specified.");
			return;
		}
	}
	
	/**
	 * @see HttpServlet#doPut(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String user_name = request.getParameter("user_name");
		String key = request.getParameter("key");
		String password = request.getParameter("password");
		if ((key != null) && (user_name != null) && (password != null)) {
			if (Security.checkResetKey(User.getStringInfo(user_name, User.FIELD_SECRET_KEY), User.getStringInfo(user_name, User.FIELD_HASHED_PASSWORD), key)) {
				if (User.updatePassword(user_name, password)) {
					response.getWriter().print(HTML.getSuccessReset());
					response.setStatus(200);
				}
				else {
					response.sendError(500, "Something went wrong writing the password.");
				}
			}
			else {
				response.sendError(403, "Incorrect reset key.");
			}
			return;
		}
		response.sendError(400, "Missing arguments.");
	}
}
