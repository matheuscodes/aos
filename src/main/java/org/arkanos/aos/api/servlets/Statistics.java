package org.arkanos.aos.api.servlets;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Vector;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.arkanos.aos.api.controllers.HTTP;
import org.arkanos.aos.api.controllers.Security;
import org.arkanos.aos.api.data.Goal;

/**
 * Servlet implementation class Statistics
 */
@WebServlet({ "/statistics", "/statistics/*" })
public class Statistics extends HttpServlet {
	private enum Periodicity {
		YEAR, HALF, QUARTERLY, MONTHLY, WEEKLY, DAILY;
		Periodicity checkWhich(String path) {
			switch (path.toLowerCase()) {
				case "year":
					return YEAR;
				case "half":
					return HALF;
				case "quarterly":
					return QUARTERLY;
				case "monthly":
					return MONTHLY;
				case "weekly":
					return WEEKLY;
				case "daily":
					return DAILY;
				default:
					return MONTHLY;
			}
		}
	}
	
	private static final long	serialVersionUID	= 1L;
	
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Statistics() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	private String compilePeriodFullStats(String user_name, String period_name, String from, String to) {
		String stats = new String();
		DecimalFormat df = new DecimalFormat();
		df.setMaximumFractionDigits(1);
		df.setGroupingUsed(false);
		int count = 0;
		for (Goal g : Goal.getUserGoalsSnapshot(user_name, from, to)) {
			stats += "{\"id\":" + g.getID() + ",";
			stats += "\"goal\":\"" + g.getTitle() + "\",";
			stats += "\"period\":\"" + period_name + "\",";
			stats += "\"completion\":" + df.format(g.getCompletion()) + ",";
			stats += "\"dedication\":" + df.format(g.getDedication()) + ",";
			stats += "\"productivity\":" + df.format(g.getProductivity()) + ",";
			stats += "\"total_time_spent\":" + df.format(g.getTotalTimeSpent() / 60.0f) + "},";
			count++;
		}
		if (count > 0) {
			stats = stats.substring(0, stats.lastIndexOf(","));
		}
		return stats;
	}
	
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Security.TokenInfo token = Security.authenticateToken(request);
		if (token == null) {
			//response.sendError(403, "Token is not valid or not found.");
			//return;
		}
		HTTP.setUpDefaultHeaders(response);
		response.setContentType("application/x-json");
		
		this.printGoalCompletions("arkanos", Periodicity.MONTHLY, response);
		
	}
	
	private void printGoalCompletions(String user_name, Periodicity time, HttpServletResponse response) throws IOException {
		String completions = "{\"success\":true,\"goals\":[\"period\",";
		Vector<Goal> user_goals = Goal.getUserGoals(user_name);
		for (Goal g : user_goals) {
			completions += "\"goal_" + g.getID() + "\",";
		}
		completions = completions.substring(0, completions.lastIndexOf(","));
		completions += "],\"titles\":{";
		for (Goal g : user_goals) {
			completions += "\"goal_" + g.getID() + "\":\"" + g.getTitle() + "\",";
		}
		if (user_goals.size() > 0) {
			completions = completions.substring(0, completions.lastIndexOf(","));
		}
		completions += "},\"completions\":[";
		switch (time) {
			case MONTHLY:
				GregorianCalendar now = new GregorianCalendar();
				now.setTimeInMillis(System.currentTimeMillis());
				for (int i = 0; i < now.get(Calendar.MONTH); i++) {
					String active_month = now.get(Calendar.YEAR) + "-";
					if (i < 10) {
						active_month += "0" + (i + 1);
					}
					else {
						active_month += (i + 1);
					}
					
					completions += "{\"period\":\"" + active_month + "\",";
					//TODO use better logic.
					for (Goal g : Goal.getUserGoalsSnapshot(user_name, now.get(Calendar.YEAR) + "-01-01 00:00:00", active_month + "-31 23:59:59")) {
						completions += "\"goal_" + g.getID() + "\":" + g.getCompletion() + ",";
					}
					completions = completions.substring(0, completions.lastIndexOf(","));
					completions += "},";
				}
				completions = completions.substring(0, completions.lastIndexOf(","));
				completions += "]}";
				break;
			default:
				response.sendError(400, "Periodicity not supported.");
				return;
		}
		response.setStatus(200);
		response.getWriter().print(completions);
	}
}
