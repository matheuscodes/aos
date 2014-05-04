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

/**
 * Servlet implementation class Goals
 */
@WebServlet({ "/goals", "/goals/*" })
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
	 * @see HttpServlet#doPut(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Security.TokenInfo token = Security.authenticateToken(request);
		if (token == null) {
			response.sendError(403, "Token is not valid or not found.");
			return;
		}
		
		if (token.getUsername().compareTo("testuser") == 0) {
			response.sendError(403, "Sorry, no persistent operations with 'testuser'.");
			return;
		}
		
		HTTP.setUpDefaultHeaders(response);
		//TODO move to default headers
		response.setContentType("application/x-json");
		
		String URI = request.getRequestURI();
		if (URI.endsWith("/goals") || URI.endsWith("/goals/")) {
			response.setHeader("Allow", "GET, POST");
			response.sendError(405, "DELETE is not supported without a specific resource.");
			return;
		}
		String resource = URI.substring(URI.lastIndexOf("/") + 1);
		if (URI.endsWith("goals/" + resource)) {
			int id = Integer.parseInt(resource);
			Goal result = Goal.getGoal(token.getUsername(), id);
			if (result != null) {
				if (Goal.isUserGoal(token.getUsername(), id)) {
					if (result.delete()) {
						response.setStatus(204);
						return;
					}
					else {
						response.sendError(500, "Could not delete the goal.");
						return;
					}
				}
				else {
					response.sendError(403, "Goal does not belong to user.");
					return;
				}
			}
			else {
				response.sendError(404, "Goal not found.");
				return;
			}
		}
		else {
			response.sendError(400, "Goal not properly identified.");
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
		
		if (token.getUsername().compareTo("testuser") == 0) {
			response.sendError(403, "Sorry, no persistent operations with 'testuser'.");
			return;
		}
		
		HTTP.setUpDefaultHeaders(response);
		
		String URI = request.getRequestURI();
		if (!URI.endsWith("/goals") && !URI.endsWith("/goals/")) {
			response.setHeader("Allow", "GET, PUT, DELETE");
			response.sendError(405, "POST is not supported for a specific resource.");
			return;
		}
		else {
			if (!URI.endsWith("/")) {
				URI += "/";
			}
		}
		
		String title = Database.sanitizeString(request.getParameter(Goal.FIELD_TITLE));
		int time_planned = Integer.parseInt(request.getParameter(Goal.FIELD_TIME_PLANNED));
		String description = Database.sanitizeString(request.getParameter(Goal.FIELD_DESCRIPTION));
		
		int id = Goal.createGoal(title, time_planned, description, token.getUsername());
		Goal created = Goal.getGoal(token.getUsername(), id);
		if (created != null) {
			response.setHeader("Location", URI + id);
			response.getWriter().print("{\"success\":true}");
			response.setStatus(201);
			return;
		}
		else {
			response.sendError(500, "Task could not be created.");
			return;
		}
	}
	
	/**
	 * @see HttpServlet#doPut(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Security.TokenInfo token = Security.authenticateToken(request);
		if (token == null) {
			response.sendError(403, "Token is not valid or not found.");
			return;
		}
		
		if (token.getUsername().compareTo("testuser") == 0) {
			response.sendError(403, "Sorry, no persistent operations with 'testuser'.");
			return;
		}
		
		HTTP.setUpDefaultHeaders(response);
		//TODO move to default headers
		response.setContentType("application/x-json");
		
		String URI = request.getRequestURI();
		if (URI.endsWith("/goals") || URI.endsWith("/goals/")) {
			response.setHeader("Allow", "GET, POST");
			response.sendError(405, "PUT is not supported without a specific resource.");
			return;
		}
		String resource = URI.substring(URI.lastIndexOf("/") + 1);
		if (URI.endsWith("goals/" + resource)) {
			int id = Integer.parseInt(resource);
			Goal result = Goal.getGoal(token.getUsername(), id);
			if (result != null) {
				try {
					Goal contents = Goal.parseGoal(request.getReader(), token.getUsername());
					if (contents != null) {
						result.replaceContent(contents);
						if (result.update()) {
							response.getWriter().print("{\"success\":true,\"goals\":[" + result + "]}");
							response.setStatus(200);
							return;
						}
						else {
							response.sendError(500, "Could not save the task.");
							return;
						}
					}
					else {
						response.sendError(400, "Contents of the resquest could not be parsed.");
						return;
					}
				}
				catch (NumberFormatException e) {
					//TODO auto
					response.sendError(400, "Something was wrong with the numeric parameters.");
					e.printStackTrace();
				}
				return;
			}
			else {
				response.sendError(404, "Goal not found, use POST on '/goals' to create.");
				return;
			}
		}
		else {
			response.sendError(400, "Goal not properly identified.");
			return;
		}
	}
	
}
