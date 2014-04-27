package org.arkanos.aos.api.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aos.api.controllers.HTTP;
import org.arkanos.aos.api.controllers.Security;
import org.arkanos.aos.api.data.Work;

/**
 * Servlet implementation class Worklog
 */
@WebServlet({ "/worklog", "/worklog/*" })
public class Worklog extends HttpServlet {
	private static final long	serialVersionUID	= 1L;
	
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Worklog() {
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
		
		String URI = request.getRequestURI();
		if (!URI.endsWith("/worklog") && !URI.endsWith("/worklog/")) {
			response.sendError(400, "Only collection can be requested.");
			return;
		}
		
		String worklog = "{\"success\":true,\"worklog\":[";
		String user_name = token.getUsername();
		int count = 0;
		for (Work g : Work.getUserWorklog(user_name)) {
			worklog += g + ",";
			count++;
		}
		if (count > 0) {
			worklog = worklog.substring(0, worklog.lastIndexOf(","));
		}
		worklog += "],\"count\":" + count + "}";
		response.getWriter().println(worklog);
		response.setStatus(200);
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}
	
}
