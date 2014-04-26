package org.arkanos.aos.api.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aos.api.controllers.Database;
import org.arkanos.aos.api.controllers.HTTP;
import org.arkanos.aos.api.controllers.Security;
import org.arkanos.aos.api.data.Goal;
import org.arkanos.aos.api.data.Task;

/**
 * Servlet implementation class Goal
 */
@WebServlet({ "/tasks", "/tasks/*" })
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
			response.sendError(403, "Token is not valid or not found.");
			return;
		}
		HTTP.setUpDefaultHeaders(response);
		//TODO move to default headers
		response.setContentType("application/x-json");
		
		String URI = request.getRequestURI();
		if (!URI.endsWith("/tasks") && !URI.endsWith("/tasks/")) {
			String resource = URI.substring(URI.lastIndexOf("/") + 1);
			if (URI.endsWith("tasks/" + resource)) {
				int id = Integer.parseInt(resource);
				Task result = Task.getTask(id);
				if (result != null) {
					if (Goal.isUserGoal(token.getUsername(), result.getGoalID())) {
						response.getWriter().print(result);
						response.setStatus(200);
						return;
					}
					else {
						response.sendError(403, "Task does not belong to user.");
						return;
					}
				}
				else {
					response.sendError(404, "Task not found.");
					return;
				}
			}
			else {
				response.sendError(400, "Task not properly identified.");
				return;
			}
		}
		
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
		Security.TokenInfo token = Security.authenticateToken(request);
		if (token == null) {
			response.sendError(403, "Token is not valid or not found.");
			return;
		}
		HTTP.setUpDefaultHeaders(response);
		
		String URI = request.getRequestURI();
		if (!URI.endsWith("/tasks") ^ !URI.endsWith("/tasks/")) {
			response.setHeader("Allow", "GET, PUT, DELETE");
			response.sendError(405, "POST is not supported for a specific resource.");
			return;
		}
		else {
			if (!URI.endsWith("/")) {
				URI += "/";
			}
		}
		
		response.setContentType("application/x-json");
		int goal_id = Integer.parseInt(request.getParameter(Task.FIELD_GOAL_ID));
		float initial = Float.parseFloat(request.getParameter(Task.FIELD_INITIAL));
		float target = Float.parseFloat(request.getParameter(Task.FIELD_TARGET));
		String name = Database.sanitizeString(request.getParameter(Task.FIELD_NAME));
		
		if (Goal.isUserGoal(token.getUsername(), goal_id)) {
			int id = Task.createTask(goal_id, name, initial, target);
			Task created = Task.getTask(id);
			if (created != null) {
				response.setHeader("Location", URI + id);
				response.getWriter().print(created);
				response.setStatus(201);
				return;
			}
			else {
				response.sendError(500, "Task could not be created.");
				return;
			}
		}
		else {
			response.sendError(403, "Goal selected does not belong to user.");
		}
	}
}
