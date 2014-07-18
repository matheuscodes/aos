/**
 * Copyright (C) 2014 Matheus Borges Teixeira
 *
 * This is a part of Arkanos Organizer Suite (AOS)
 * AOS is a web application for organizing personal goals.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package org.arkanos.aos.api.servlets;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.Date;
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
 * Statistics REST API.
 * 
 * @version 1.0
 * @author Matheus Borges Teixeira
 */
@WebServlet({ "/statistics", "/statistics/*" })
public class Statistics extends HttpServlet {
	/** Possible statistics to be requested **/
	private enum Metrics {
		COMPLETIONS, DEDICATIONS, PRODUCTIVITIES
	}
	
	/** Possible time periods to be configured **/
	private enum Periodicity {
		/* Currently only monthly is supported **/
		YEAR, HALF, QUARTERLY, MONTHLY, WEEKLY, DAILY;
		static public Periodicity checkWhich(String path) {
			if (path == null) return MONTHLY;
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
	
	/** Default version number **/
	private static final long	serialVersionUID	= 1L;
	
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Statistics() {
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
		String period = request.getParameter("periodicity");
		String URI = request.getRequestURI();
		if (!URI.endsWith("/")) {
			URI += "/";
		}
		
		if (URI.endsWith("/statistics/completion/")) {
			this.printGoalMetric(token.getUsername(), Periodicity.checkWhich(period), response, Metrics.COMPLETIONS);
			return;
		}
		else if (URI.endsWith("/statistics/dedication/")) {
			this.printGoalMetric(token.getUsername(), Periodicity.checkWhich(period), response, Metrics.DEDICATIONS);
			return;
		}
		else if (URI.endsWith("/statistics/productivity/")) {
			this.printGoalMetric(token.getUsername(), Periodicity.checkWhich(period), response, Metrics.PRODUCTIVITIES);
			return;
		}
		else if (URI.endsWith("/statistics/focus/")) {
			this.printGoalFocus(token.getUsername(), Periodicity.checkWhich(period), response);
			return;
		}
		else if (URI.endsWith("/statistics/")) {
			this.printGeneralStatistics(token.getUsername(), Periodicity.checkWhich(period), response);
			return;
		}
		else {
			response.sendError(400, "Resource could not be parsed.");
		}
	}
	
	/**
	 * Extracts from a given goal the desired metric.
	 * Used for generalization and already formats percentages.
	 * 
	 * @param g
	 *            defines the goal.
	 * @param metric
	 *            specifies the metric.
	 * @return the value of the metric ready to be used.
	 */
	private float getMetric(Goal g, Metrics metric) {
		switch (metric) {
			case COMPLETIONS:
				return g.getCompletion() * 100;
			case DEDICATIONS:
				return g.getDedication() * 100;
			case PRODUCTIVITIES:
				return g.getProductivity();
			default:
				return 0;
		}
	}
	
	/**
	 * Calculates and prints basic user metrics.
	 * The result is a printed JSON in the response.
	 * 
	 * @param user_name
	 *            defines the user.
	 * @param time
	 *            specifies the periodicity.
	 * @param response
	 *            informs where to write the JSON.
	 * @throws IOException
	 *             whenever there are problems operating the response.
	 */
	private void printGeneralStatistics(String user_name, Periodicity time, HttpServletResponse response) throws IOException {
		String output = "{\"success\":true,";
		Vector<Goal> user_goals = Goal.getUserGoals(user_name);
		DecimalFormat df = new DecimalFormat();
		df.setMaximumFractionDigits(2);
		df.setGroupingUsed(false);
		
		int total_time = 0;
		int spent_time = 0;
		float max_completion = 0;
		float min_completion = 0;
		float sum_completion = 0;
		float max_dedication = 0;
		float min_dedication = 0;
		float sum_dedication = 0;
		float max_productivity = 0;
		float min_productivity = 0;
		float sum_productivity = 0;
		
		for (Goal g : user_goals) {
			total_time += g.getTimePlanned();
			spent_time += g.getTotalTimeSpent();
			
			sum_completion += g.getCompletion() * g.getTimePlanned();
			if (min_completion > g.getCompletion()) {
				min_completion = g.getCompletion();
			}
			if (max_completion < g.getCompletion()) {
				max_completion = g.getCompletion();
			}
			
			sum_dedication += g.getDedication() * g.getTimePlanned();
			if (min_dedication > g.getDedication()) {
				min_dedication = g.getDedication();
			}
			if (max_dedication < g.getDedication()) {
				max_dedication = g.getDedication();
			}
			
			sum_productivity += g.getProductivity() * g.getTimePlanned();
			if (min_productivity > g.getProductivity()) {
				min_productivity = g.getProductivity();
			}
			if (max_productivity < g.getProductivity()) {
				max_productivity = g.getProductivity();
			}
		}
		output += "\"statistics\":{";
		
		output += "\"productivity\":{";
		output += "\"max\":" + df.format(max_productivity) + ",";
		output += "\"min\":" + df.format(min_productivity) + ",";
		if (user_goals.size() > 0) {
			output += "\"avg\":" + df.format(sum_productivity / total_time) + "},";
		}
		else {
			output += "\"avg\":\"NaN\"},";
		}
		
		output += "\"dedication\":{";
		output += "\"max\":" + df.format(100 * max_dedication) + ",";
		output += "\"min\":" + df.format(100 * min_dedication) + ",";
		if (user_goals.size() > 0) {
			output += "\"avg\":" + df.format((100 * sum_dedication) / total_time) + "},";
		}
		else {
			output += "\"avg\":\"NaN\"},";
		}
		
		output += "\"completion\":{";
		output += "\"max\":" + df.format(100 * max_completion) + ",";
		output += "\"min\":" + df.format(100 * min_completion) + ",";
		if (user_goals.size() > 0) {
			output += "\"avg\":" + df.format((100 * sum_completion) / total_time) + "},";
		}
		else {
			output += "\"avg\":\"NaN\"},";
		}
		
		output += "\"planned_time\":" + df.format(total_time / 60f) + ",";
		output += "\"used_time\":" + df.format(spent_time / 60f) + ",";
		
		GregorianCalendar now = new GregorianCalendar();
		GregorianCalendar start = new GregorianCalendar();
		GregorianCalendar end = new GregorianCalendar();
		now.setTime(new Date(System.currentTimeMillis()));
		start.set(now.get(Calendar.YEAR), Calendar.JANUARY, 1);
		end.set(now.get(Calendar.YEAR), Calendar.DECEMBER, 31);
		
		float percentage = ((now.getTime().getTime()) - (start.getTime().getTime())) / (float) ((end.getTime().getTime()) - (start.getTime().getTime()));
		
		output += "\"expected_used_time\":" + df.format((percentage * total_time) / 60.0f) + ",";
		output += "\"surplus_time\":" + df.format((spent_time - (percentage * total_time)) / 60.0f) + ",";
		output += "\"expected_completion\":" + df.format((percentage) * 100);
		
		output += "}}";
		
		response.setStatus(200);
		response.getWriter().print(output);
	}
	
	/**
	 * Calculates the focus for a user.
	 * The result is a printed JSON in the response.
	 * 
	 * @param user_name
	 *            defines the user.
	 * @param time
	 *            specifies the periodicity.
	 * @param response
	 *            informs where to write the JSON.
	 * @throws IOException
	 *             whenever there are problems operating the response.
	 */
	private void printGoalFocus(String user_name, Periodicity time, HttpServletResponse response) throws IOException {
		String output = "{\"success\":true,\"fields\":[\"period\",";
		Vector<Goal> user_goals = Goal.getUserGoals(user_name);
		for (Goal g : user_goals) {
			output += "\"goal_" + g.getID() + "\",";
			
		}
		output = output.substring(0, output.lastIndexOf(","));
		output += "],\"titles\":{";
		for (Goal g : user_goals) {
			output += "\"goal_" + g.getID() + "\":\"" + g.getTitle() + "\",";
		}
		if (user_goals.size() > 0) {
			output = output.substring(0, output.lastIndexOf(","));
		}
		output += "},\"focuses\":[";
		switch (time) {
			case MONTHLY:
				GregorianCalendar now = new GregorianCalendar();
				now.setTimeInMillis(System.currentTimeMillis());
				for (int i = 0; i <= now.get(Calendar.MONTH); i++) {
					String active_month = now.get(Calendar.YEAR) + "-";
					if (i < 9) {
						active_month += "0" + (i + 1);
					}
					else {
						active_month += (i + 1);
					}
					Vector<Goal> current = Goal.getUserGoalsSnapshot(user_name, active_month + "-01 00:00:00", active_month + "-31 23:59:59");
					float total = 0;
					for (Goal g : current) {
						total += g.getTotalTimeSpent();
					}
					if (total > 0) {
						output += "{\"period\":\"" + active_month + "\",";
						//TODO use better logic.
						for (Goal g : current) {
							output += "\"goal_" + g.getID() + "\":" + (100 * (g.getTotalTimeSpent() / total)) + ",";
						}
						output = output.substring(0, output.lastIndexOf(","));
						output += "},";
					}
					else {
						output += "{\"period\":\"" + active_month + "\"},";
					}
				}
				output = output.substring(0, output.lastIndexOf(","));
				output += "]}";
				break;
			default:
				response.sendError(400, "Periodicity not supported.");
				return;
		}
		response.setStatus(200);
		response.getWriter().print(output);
	}
	
	/**
	 * Calculates a selected metric for a user.
	 * The result is a printed JSON in the response.
	 * 
	 * @param user_name
	 *            defines the user.
	 * @param time
	 *            specifies the periodicity.
	 * @param response
	 *            informs where to write the JSON.
	 * @param metric
	 *            selects one of the available metrics to calculate.
	 * @throws IOException
	 *             whenever there are problems operating the response.
	 */
	private void printGoalMetric(String user_name, Periodicity time, HttpServletResponse response, Metrics metric) throws IOException {
		String output = "{\"success\":true,\"fields\":[\"period\",";
		Vector<Goal> user_goals = Goal.getUserGoals(user_name);
		for (Goal g : user_goals) {
			output += "\"goal_" + g.getID() + "\",";
		}
		output = output.substring(0, output.lastIndexOf(","));
		output += "],\"titles\":{";
		for (Goal g : user_goals) {
			output += "\"goal_" + g.getID() + "\":\"" + g.getTitle() + "\",";
		}
		if (user_goals.size() > 0) {
			output = output.substring(0, output.lastIndexOf(","));
		}
		output += "},\"" + metric.toString().toLowerCase() + "\":[";
		switch (time) {
			case MONTHLY:
				GregorianCalendar now = new GregorianCalendar();
				now.setTimeInMillis(System.currentTimeMillis());
				for (int i = 0; i <= now.get(Calendar.MONTH); i++) {
					String active_month = now.get(Calendar.YEAR) + "-";
					if (i < 10) {
						active_month += "0" + (i + 1);
					}
					else {
						active_month += (i + 1);
					}
					
					output += "{\"period\":\"" + active_month + "\",";
					//TODO use better logic.
					for (Goal g : Goal.getUserGoalsSnapshot(user_name, now.get(Calendar.YEAR) + "-01-01 00:00:00", active_month + "-31 23:59:59")) {
						output += "\"goal_" + g.getID() + "\":" + this.getMetric(g, metric) + ",";
					}
					output = output.substring(0, output.lastIndexOf(","));
					output += "},";
				}
				output = output.substring(0, output.lastIndexOf(","));
				output += "]}";
				break;
			default:
				response.sendError(400, "Periodicity not supported.");
				return;
		}
		response.setStatus(200);
		response.getWriter().print(output);
	}
}
