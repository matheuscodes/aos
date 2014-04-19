package org.arkanos.aos.api.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aos.api.controllers.HTTP;
import org.arkanos.aos.api.controllers.Security;

/**
 * Servlet implementation class LogOut
 */
@WebServlet("/logout")
public class LogOut extends HttpServlet {
	private static final long	serialVersionUID	= 1L;
	
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public LogOut() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
					throws ServletException, IOException {
		HTTP.setUpDefaultHeaders(response);
		Security.invalidateToken(request);
	}
	
}
