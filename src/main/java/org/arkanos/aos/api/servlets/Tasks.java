package org.arkanos.aos.api.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aos.api.controllers.HTTP;
import org.arkanos.aos.api.controllers.Security;
import org.arkanos.aos.api.data.Task;

/**
 * Servlet implementation class Goal
 */
@WebServlet("/tasks")
public class Tasks extends HttpServlet {
	private static final long	serialVersionUID	= 1L;
	
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Tasks() {
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
			response.sendError(403, "Token is not valid.");
			return;
		}
		HTTP.setUpDefaultHeaders(response);
		response.setContentType("application/x-json");
		String tasks = "{\"success\":true,\"tasks\":[";
		String user_name = token.getUsername();
		int count = 0;
		for (Task t : Task.getUserTasks(user_name)) {
			tasks += t + ",";
			count++;
		}
		if (count > 0) {
			tasks = tasks.substring(0, tasks.lastIndexOf(","));
		}
		tasks += "],\"count\":" + count + "}";
		response.setStatus(200);
		response.getWriter().print(tasks);
	}
	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}
	
}
