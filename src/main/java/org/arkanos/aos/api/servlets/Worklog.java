package org.arkanos.aos.api.servlets;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

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
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Security.TokenInfo token = Security.authenticateToken(request);
		if (token == null) {
			response.sendError(403, "Token is not valid or not found.");
			return;
		}
		HTTP.setUpDefaultHeaders(response);
		
		String URI = request.getRequestURI();
		if (URI.endsWith("/worklog") || URI.endsWith("/worklog/")) {
			response.setHeader("Allow", "GET, POST");
			response.sendError(405, "DELETE is not supported for collection.");
			return;
		}
		
		String resource = URI.substring(URI.lastIndexOf("/") + 1);
		
		if (URI.endsWith("worklog/" + resource)) {
			try {
				int task_id = Integer.parseInt(resource.substring(0, resource.lastIndexOf("_")));
				long time = Long.parseLong(resource.substring(resource.lastIndexOf("_") + 1));
				SimpleDateFormat sdf = new SimpleDateFormat(Work.DATEFORMAT);
				String start = sdf.format(new Date(time));
				
				Task parent = Task.getTask(task_id);
				if (Goal.isUserGoal(token.getUsername(), parent.getGoalID())) {
					boolean deleted = Work.deleteWork(task_id, start);
					if (deleted) {
						response.setStatus(204);
						return;
					}
					else {
						response.sendError(500, "Could not delete work.");
						return;
					}
				}
				else {
					response.sendError(403, "Cannot remove work that does not belong to user.");
					return;
				}
			}
			catch (NumberFormatException e) {
				response.sendError(400, "Work identification was malformed.");
			}
		}
		else {
			response.sendError(400, "Work could not be identified.");
			return;
		}
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
			response.setHeader("Allow", "DELETE");
			response.sendError(400, "Only collection can be requested with GET.");
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
		Security.TokenInfo token = Security.authenticateToken(request);
		if (token == null) {
			response.sendError(403, "Token is not valid or not found.");
			return;
		}
		HTTP.setUpDefaultHeaders(response);
		
		String URI = request.getRequestURI();
		if (!URI.endsWith("/worklog") && !URI.endsWith("/worklog/")) {
			response.setHeader("Allow", "DELETE");
			response.sendError(405, "POST is not supported for a specific resource.");
			return;
		}
		else {
			if (!URI.endsWith("/")) {
				URI += "/";
			}
		}
		
		int task_id = Integer.parseInt(request.getParameter(Work.FIELD_TASK_ID));
		int time_spent = Integer.parseInt(request.getParameter(Work.FIELD_TIME_SPENT));
		String comment = Database.sanitizeString(request.getParameter(Work.FIELD_COMMENT));
		float result = Float.parseFloat(request.getParameter(Work.FIELD_RESULT));
		String start = Database.sanitizeString(request.getParameter(Work.FIELD_START));
		Task parent = Task.getTask(task_id);
		
		if (Goal.isUserGoal(token.getUsername(), parent.getGoalID())) {
			boolean created = Work.createWork(start, task_id, result, comment, time_spent);
			if (created) {
				response.getWriter().print("{\"success\":true}");
				response.setStatus(201);
				return;
			}
			else {
				response.sendError(500, "Could not log work.");
				return;
			}
		}
		else {
			response.sendError(403, "Cannot add work to task that does not belong to user.");
			return;
		}
	}
}
