package org.arkanos.aos.api.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aos.api.controllers.HTTP;
import org.arkanos.aos.api.controllers.Security;
import org.arkanos.aos.api.data.Goal;

/**
 * Servlet implementation class Goals
 */
@WebServlet("/goals")
public class Goals extends HttpServlet {
	private static final long	serialVersionUID	= 1L;
	
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Goals() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Security.TokenInfo token = Security.authenticateToken(request);
		if (token == null) {
			response.sendError(403, "Token is not valid or not found.");
			return;
		}
		HTTP.setUpDefaultHeaders(response);
		response.setContentType("application/x-json");
		String goals = "{\"success\":true,\"goals\":[";
		String user_name = token.getUsername();
		int count = 0;
		for (Goal g : Goal.getUserGoals(user_name)) {
			goals += g + ",";
			count++;
		}
		if (count > 0) {
			goals = goals.substring(0, goals.lastIndexOf(","));
		}
		goals += "],\"count\":" + count + "}";
		response.setStatus(200);
		response.getWriter().print(goals);
	}
	
}
