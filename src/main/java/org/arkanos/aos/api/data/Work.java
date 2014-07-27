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
package org.arkanos.aos.api.data;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Vector;

import org.arkanos.aos.api.controllers.Database;
import org.arkanos.aos.api.controllers.Log;
import org.json.simple.JSONObject;

/**
 * Work entry data access and operation.
 * 
 * @version 1.0
 * @author Matheus Borges Teixeira
 */
public class Work {
	/** Specific date format used in SQL and JSON **/
	public static final String	DATEFORMAT			= "yyyy-MM-dd HH:mm:ss.0";
	/** SQL table name **/
	public static final String	TABLE_NAME			= "work";
	/** SQL/JSON field for the work's task ID **/
	public static final String	FIELD_TASK_ID		= "task_id";
	/** SQL/JSON field for the contribution of the work **/
	public static final String	FIELD_RESULT		= "result";
	/** SQL/JSON field for the time spent **/
	public static final String	FIELD_TIME_SPENT	= "time_spent";
	/** SQL/JSON field for a comment **/
	public static final String	FIELD_COMMENT		= "comment";
	/** SQL/JSON field for the time when work started **/
	public static final String	FIELD_START			= "start";
	
	/** SQL/JSON field for the work's task name **/
	public static final String	EXTRA_TASK_NAME		= "task_name";
	/** SQL/JSON field for the work's task's goal title **/
	public static final String	EXTRA_GOAL_TITLE	= "goal_title";
	
	/**
	 * Creates a new work entry in the database.
	 * 
	 * @param start
	 * @param task_id
	 * @param result
	 * @param comment
	 * @param time_spent
	 * @return whether the work entry was created or not.
	 */
	static public boolean createWork(String start, int task_id, float result, String comment, int time_spent) {
		return Database.execute("INSERT INTO " + Work.TABLE_NAME + " ("
								+ Work.FIELD_TASK_ID + ","
								+ Work.FIELD_RESULT + ","
								+ Work.FIELD_TIME_SPENT + ","
								+ Work.FIELD_COMMENT + ","
								+ Work.FIELD_START + ") "
								+ "VALUES ("
								+ task_id + "," + result + ","
								+ time_spent + ",\"" + comment + "\",\"" + start + "\");");
	}
	
	/**
	 * Removes a specific work entry identified by its task and time.
	 * 
	 * @param task_id
	 * @param start
	 * @return whether the work entry could be removed.
	 */
	static public boolean deleteWork(int task_id, String start) {
		return Database.execute("DELETE FROM " + Work.TABLE_NAME
								+ " WHERE " + Work.FIELD_TASK_ID + " = " + task_id
								+ " AND " + Work.FIELD_START + " = \"" + start + "\";");
	}
	
	/**
	 * Fetches all work entries from a user.
	 * 
	 * @param user_name
	 *            defines the user.
	 * @return all work entries or null, in case there are connection problems.
	 */
	static public Vector<Work> getUserWorklog(String user_name) {
		try {
			ResultSet rs = Database.query("SELECT " + Work.FIELD_TASK_ID + "," + Work.FIELD_RESULT + ","
											+ Work.FIELD_COMMENT + "," + Work.FIELD_START + "," + Work.FIELD_TIME_SPENT + ","
											+ "t." + Task.FIELD_NAME + " AS " + Work.EXTRA_TASK_NAME + ","
											+ "g." + Goal.FIELD_TITLE + " AS " + Work.EXTRA_GOAL_TITLE + " FROM goal g "
											+ "LEFT JOIN " + Task.TABLE_NAME + " t on t." + Task.FIELD_GOAL_ID + " = g." + Goal.FIELD_ID + " "
											+ "LEFT JOIN " + Work.TABLE_NAME + " w ON t." + Task.FIELD_ID + " = w." + Work.FIELD_TASK_ID + " "
											+ "WHERE g." + Goal.FIELD_USER_NAME + " = \"" + user_name + "\""
											+ " AND w." + Work.FIELD_TASK_ID + " IS NOT NULL "
											+ " AND w." + Work.FIELD_START + " IS NOT NULL;");
			Vector<Work> results = new Vector<Work>();
			while ((rs != null) && rs.next()) {
				Work newone = new Work(rs.getString(Work.FIELD_START),
										rs.getInt(Work.FIELD_TASK_ID),
										rs.getFloat(Work.FIELD_RESULT),
										rs.getString(Work.FIELD_COMMENT),
										rs.getInt(Work.FIELD_TIME_SPENT));
				
				newone.setGoalTitle(rs.getString(Work.EXTRA_GOAL_TITLE));
				newone.setTaskName(rs.getString(Work.EXTRA_TASK_NAME));
				
				results.add(newone);
				
			}
			return results;
		}
		catch (SQLException e) {
			Log.error("Work", "Problems retrieving logged work for a user.");
			e.printStackTrace();
		}
		return null;
	}
	
	/** Task's goal title of the work instance **/
	private String			goal_title;
	/** Task's name of the work instance **/
	private String			task_name;
	/** Start time of the work instance **/
	private final String	start;
	/** Task ID of the work instance **/
	private final int		task_id;
	/** Contribution of the work instance **/
	private final float		result;
	/** Comment of the work instance **/
	private final String	comment;
	/** Time spent of the work instance **/
	private final int		time_spent;
	
	/**
	 * Constructor of the Work entry instance.
	 * 
	 * @param start
	 * @param task_id
	 * @param result
	 * @param comment
	 * @param time_spent
	 */
	public Work(String start, int task_id, float result, String comment, int time_spent) {
		this.start = start;
		this.task_id = task_id;
		this.result = result;
		this.comment = comment;
		this.time_spent = time_spent;
	}
	
	private void setGoalTitle(String gt) {
		this.goal_title = gt;
	}
	
	private void setTaskName(String tn) {
		this.task_name = tn;
	}
	
	@Override
	public String toString() {
		DecimalFormat df = new DecimalFormat();
		df.setMaximumFractionDigits(1);
		df.setGroupingUsed(false);
		SimpleDateFormat sdf = new SimpleDateFormat(Work.DATEFORMAT);
		String result = "{\"";
		try {
			result += "id\":\"" + this.task_id + "_" + sdf.parse(this.start).getTime() + "\",\"";
			result += Work.FIELD_TASK_ID + "\":" + this.task_id + ",\"";
			result += Work.FIELD_START + "\":\"" + this.start.substring(0, this.start.indexOf(".")) + "\",\"";
			result += Work.FIELD_COMMENT + "\":\"" + JSONObject.escape(this.comment) + "\",\"";
			result += Work.FIELD_RESULT + "\":" + this.result + ",\"";
			result += Work.FIELD_TIME_SPENT + "\":" + df.format(this.time_spent / 60.0f) + ",\"";
			result += Work.EXTRA_TASK_NAME + "\":\"" + this.task_name + "\",\"";
			result += Work.EXTRA_GOAL_TITLE + "\":\"" + this.goal_title + "\"}";
		}
		catch (ParseException e) {
			Log.error("Work", "Problems while parsing Work to a JSON.");
			e.printStackTrace();
			return "{\"error\":\"parsing\"}";
		}
		return result;
	}
}
