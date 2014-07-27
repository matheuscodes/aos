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

import java.io.IOException;
import java.io.Reader;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.Vector;

import org.arkanos.aos.api.controllers.Database;
import org.arkanos.aos.api.controllers.Log;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 * Goal data access and operation.
 * 
 * @version 1.0
 * @author Matheus Borges Teixeira
 */
public class Goal {
	/** SQL table name **/
	static public final String	TABLE_NAME				= "goal";
	/** SQL/JSON field for the goal ID **/
	static public final String	FIELD_ID				= "id";
	/** SQL/JSON field for the goal title **/
	static public final String	FIELD_TITLE				= "title";
	/** SQL/JSON field for the time planned **/
	static public final String	FIELD_TIME_PLANNED		= "time_planned";
	/** SQL/JSON field for the description **/
	static public final String	FIELD_DESCRIPTION		= "description";
	/** SQL/JSON field for the username **/
	static public final String	FIELD_USER_NAME			= "user_name";
	/** SQL/JSON field for the calculated completion **/
	static public final String	EXTRA_COMPLETION		= "completion";
	/** SQL/JSON field for the calculated dedication **/
	static public final String	EXTRA_DEDICATION		= "dedication";
	/** SQL/JSON field for the calculated time spent **/
	static public final String	EXTRA_TOTAL_TIME_SPENT	= "total_time_spent";
	
	/**
	 * Creates a new Goal in the database.
	 * 
	 * @param title
	 * @param time_planned
	 * @param description
	 * @param user_name
	 * @return id of the created goal or -1 if creation failed.
	 */
	static public int createGoal(String title, int time_planned, String description, String user_name) {
		boolean insertion = Database.execute("INSERT INTO " + Goal.TABLE_NAME + " ("
												+ Goal.FIELD_TITLE + ","
												+ Goal.FIELD_TIME_PLANNED + ","
												+ Goal.FIELD_DESCRIPTION + ","
												+ Goal.FIELD_USER_NAME + ") "
												+ "VALUES (\""
												+ title + "\"," + time_planned + ",\""
												+ description + "\",\"" + user_name + "\");");
		if (insertion == true) {
			try {
				ResultSet rs = Database.query("SELECT MAX(" + Goal.FIELD_ID + ") AS created_id"
												+ " FROM " + Goal.TABLE_NAME + " WHERE "
												+ Goal.FIELD_TITLE + " = \"" + title + "\" AND "
												+ Goal.FIELD_TIME_PLANNED + " = " + time_planned + " AND "
												+ Goal.FIELD_DESCRIPTION + " = \"" + description + "\" AND "
												+ Goal.FIELD_USER_NAME + " = \"" + user_name + "\";");
				if ((rs != null) && rs.next()) return rs.getInt("created_id");
			}
			catch (SQLException e) {
				Log.error("Goal", "Problems while creating a goal.");
				e.printStackTrace();
			}
		}
		return -1;
	}
	
	/**
	 * Fetches a given goal from the database and calculates extra information.
	 * 
	 * @param user_name
	 *            defines the owner of the goal.
	 * @param id
	 *            specifies the goal to be fetched.
	 * @return the goal instance or null if none was found.
	 */
	public static Goal getGoal(String user_name, int id) {
		try {
			ResultSet rs = Database.query("SELECT * FROM " + Goal.TABLE_NAME + " WHERE "
											+ Goal.FIELD_USER_NAME + " = \"" + user_name + "\""
											+ " AND " + Goal.FIELD_ID + " = " + id + ";");
			if ((rs != null) && rs.next()) {
				Goal newone = new Goal(rs.getInt(Goal.FIELD_ID),
										rs.getString(Goal.FIELD_TITLE),
										rs.getInt(Goal.FIELD_TIME_PLANNED),
										rs.getString(Goal.FIELD_DESCRIPTION),
										user_name);
				return newone;
			}
		}
		catch (SQLException e) {
			Log.error("Goal", "Problems retrieving a goal.");
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * Fetches all goals from a user.
	 * 
	 * @param user_name
	 *            defines the user.
	 * @return all goals or null, in case there are connection problems.
	 */
	static public Vector<Goal> getUserGoals(String user_name) {
		try {
			ResultSet rs = Database.query("SELECT * FROM " + Goal.TABLE_NAME + " WHERE "
											+ Goal.FIELD_USER_NAME + " = \"" + user_name + "\";");
			Vector<Goal> results = new Vector<Goal>();
			while ((rs != null) && rs.next()) {
				Goal newone = new Goal(rs.getInt(Goal.FIELD_ID),
										rs.getString(Goal.FIELD_TITLE),
										rs.getInt(Goal.FIELD_TIME_PLANNED),
										rs.getString(Goal.FIELD_DESCRIPTION),
										user_name);
				//TODO: Can this query be optimized?
				ResultSet newrs = Database.query("SELECT AVG(help.progress) AS completion, SUM(help.spent) AS total_time_spent FROM ("
													+ "SELECT IF(SUM((w." + Work.FIELD_RESULT + ")/(t." + Task.FIELD_TARGET + "-t." + Task.FIELD_INITIAL + ")) IS NULL, 0, SUM((w." + Work.FIELD_RESULT + ")/(t." + Task.FIELD_TARGET + "-t." + Task.FIELD_INITIAL + "))) AS progress, "
													+ "SUM(" + Work.FIELD_TIME_SPENT + ") AS spent FROM goal g "
													+ "LEFT JOIN " + Task.TABLE_NAME + " t on t." + Task.FIELD_GOAL_ID + " = g." + Goal.FIELD_ID + " "
													+ "LEFT JOIN " + Work.TABLE_NAME + " w ON t." + Task.FIELD_ID + " = w." + Work.FIELD_TASK_ID + " "
													+ "WHERE g." + Goal.FIELD_ID + " = " + newone.getID() + " "
													+ "AND g." + Goal.FIELD_USER_NAME + " = \"" + user_name + "\""
													+ "GROUP BY t." + Task.FIELD_ID + ",g." + Goal.FIELD_ID + ") help;");
				if ((newrs != null) && newrs.next()) {
					newone.setCompletion(newrs.getFloat("completion"));
					newone.setTotalTimeSpent(newrs.getInt("total_time_spent"));
				}
				
				results.add(newone);
				
			}
			return results;
		}
		catch (SQLException e) {
			Log.error("Goal", "Problems retrieving all goals from a user.");
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * Fetches all goals but calculates extra data based on a time range.
	 * Both dates provided should be in format YYYY-MM-DD HH:mm:ss.0
	 * 
	 * @param user_name
	 *            defines the user.
	 * @param from
	 *            specifies the starting of the period.
	 * @param to
	 *            specifies the end of the period.
	 * @return
	 */
	static public Vector<Goal> getUserGoalsSnapshot(String user_name, String from, String to) {
		try {
			ResultSet rs = Database.query("SELECT * FROM " + Goal.TABLE_NAME + " WHERE "
											+ Goal.FIELD_USER_NAME + " = \"" + user_name + "\";");
			Vector<Goal> results = new Vector<Goal>();
			while ((rs != null) && rs.next()) {
				Goal newone = new Goal(rs.getInt(Goal.FIELD_ID),
										rs.getString(Goal.FIELD_TITLE),
										rs.getInt(Goal.FIELD_TIME_PLANNED),
										rs.getString(Goal.FIELD_DESCRIPTION),
										user_name);
				//TODO: Can this query be optimized?
				ResultSet newrs = Database.query("SELECT AVG(help.progress) AS completion, SUM(help.spent) AS total_time_spent FROM ("
													+ "SELECT IF(SUM((w." + Work.FIELD_RESULT + ")/(t." + Task.FIELD_TARGET + "-t." + Task.FIELD_INITIAL + ")) IS NULL, 0, SUM((w." + Work.FIELD_RESULT + ")/(t." + Task.FIELD_TARGET + "-t." + Task.FIELD_INITIAL + "))) AS progress, "
													+ "SUM(" + Work.FIELD_TIME_SPENT + ") AS spent FROM goal g "
													+ "LEFT JOIN " + Task.TABLE_NAME + " t on t." + Task.FIELD_GOAL_ID + " = g." + Goal.FIELD_ID + " "
													+ "LEFT JOIN (SELECT * FROM " + Work.TABLE_NAME + " WHERE "
													+ Work.FIELD_START + " >= \"" + from + "\" "
													+ "AND " + Work.FIELD_START + " <= \"" + to + "\") "
													+ " w ON t." + Task.FIELD_ID + " = w." + Work.FIELD_TASK_ID + " "
													+ "WHERE g." + Goal.FIELD_ID + " = " + newone.getID() + " "
													+ "AND g." + Goal.FIELD_USER_NAME + " = \"" + user_name + "\" "
													+ "GROUP BY t." + Task.FIELD_ID + ",g." + Goal.FIELD_ID + ") help;");
				if ((newrs != null) && newrs.next()) {
					newone.setCompletion(newrs.getFloat("completion"));
					newone.setTotalTimeSpent(newrs.getInt("total_time_spent"));
				}
				
				results.add(newone);
				
			}
			return results;
		}
		catch (SQLException e) {
			Log.error("Goal", "Problems retrieving goals on a given period.");
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * Checks if a goal belongs to a user.
	 * 
	 * @param user_name
	 *            defines the user.
	 * @param goal_id
	 *            specifies the goal to be checked.
	 * @return whether the goal belongs to the user.
	 */
	static public boolean isUserGoal(String user_name, int goal_id) {
		try {
			ResultSet rs = Database.query("SELECT COUNT(*) AS goal_count FROM " + Goal.TABLE_NAME
											+ " WHERE " + Goal.FIELD_ID + " = " + goal_id + " AND "
											+ Goal.FIELD_USER_NAME + " = \"" + user_name + "\";");
			if ((rs != null) && rs.next())
				return (rs.getInt("goal_count") > 0);
			else
				return false;
		}
		catch (SQLException e) {
			Log.error("Goal", "Problems checking user goal.");
			e.printStackTrace();
		}
		return false;
	}
	
	/**
	 * Creates a goal object based on a JSON file.
	 * 
	 * @param from
	 *            defines the source of the JSON.
	 * @param user_name
	 *            defines the user to own the goal.
	 * @return the created goal instance.
	 */
	static public Goal parseGoal(Reader from, String user_name) {
		JSONParser jp = new JSONParser();
		try {
			//TODO: Find a better JSON library.
			JSONObject jo = (JSONObject) jp.parse(from);
			String id = "" + jo.get(Goal.FIELD_ID);
			String title = "" + jo.get(Goal.FIELD_TITLE);
			String time_planned = "" + jo.get(Goal.FIELD_TIME_PLANNED);
			String description = "" + jo.get(Goal.FIELD_DESCRIPTION);
			Goal newone = new Goal(Integer.parseInt(id), title,
									(int) (Float.parseFloat(time_planned) * 60), description, user_name);
			newone.setCompletion(Float.parseFloat("" + jo.get(Task.EXTRA_COMPLETION)));
			newone.setTotalTimeSpent((int) (Float.parseFloat("" + jo.get(Goal.EXTRA_TOTAL_TIME_SPENT)) * 60));
			return newone;
		}
		catch (ParseException e1) {
			Log.error("Goal", "Problems while parsing a goal from a JSON.");
			e1.printStackTrace();
		}
		catch (IOException e) {
			Log.error("Goal", "Problems while reading data to be parsed.");
			e.printStackTrace();
		}
		return null;
	}
	
	/** ID of the Goal instance **/
	private final int		id;
	/** Planned time of the Goal instance **/
	private int				time_planned;
	/** Title of the Goal instance **/
	private String			title;
	/** Description of the Goal instance **/
	private String			description;
	/** Owner of the Goal instance **/
	private final String	user_name;
	
	/* Volatile data */
	/** Calculated completion of the Goal instance **/
	private float			completion			= 0;
	/** Calculated total time spent of the Goal instance **/
	private int				total_time_spent	= 0;
	
	/**
	 * Constructor of the Goal instance.
	 * 
	 * @param id
	 * @param title
	 * @param time_planned
	 * @param description
	 * @param user_name
	 */
	public Goal(int id, String title, int time_planned, String description, String user_name) {
		this.id = id;
		this.user_name = user_name;
		this.time_planned = time_planned;
		if (title != null) {
			this.title = title;
		}
		else {
			this.title = "";
		}
		if (description != null) {
			this.description = description;
		}
		else {
			this.description = "";
		}
	}
	
	/**
	 * Removes the instance from the database.
	 * 
	 * @return whether the instance could be removed.
	 */
	public boolean delete() {
		return Database.execute("DELETE FROM " + Goal.TABLE_NAME
								+ " WHERE " + Goal.FIELD_ID + " = " + this.id
								+ " AND " + Goal.FIELD_USER_NAME + " = \"" + this.user_name + "\";");
	}
	
	public float getCompletion() {
		return this.completion;
	}
	
	public float getDedication() {
		if (this.time_planned > 0)
			return this.total_time_spent / (float) this.time_planned;
		else
			return 1;
	}
	
	public int getID() {
		return this.id;
	}
	
	public float getProductivity() {
		if (this.getDedication() > 0)
			return this.getCompletion() / this.getDedication();
		else
			return 0;
	}
	
	public int getTimePlanned() {
		return this.time_planned;
	}
	
	public String getTitle() {
		return this.title;
	}
	
	public int getTotalTimeSpent() {
		return this.total_time_spent;
	}
	
	/**
	 * Replaces content of the instance.
	 * 
	 * @param to
	 *            defines the original instance.
	 */
	public void replaceContent(Goal to) {
		/* NEVER
		 * this.id = to.id;
		 * this.user_name = to.user_name;
		 */
		this.title = Database.sanitizeString(to.title);
		this.description = Database.sanitizeString(to.description);
		this.time_planned = to.time_planned;
		this.completion = to.completion;
		this.total_time_spent = to.total_time_spent;
	}
	
	private void setCompletion(float c) {
		this.completion = c;
	}
	
	private void setTotalTimeSpent(int tts) {
		this.total_time_spent = tts;
	}
	
	@Override
	public String toString() {
		DecimalFormat df = new DecimalFormat();
		df.setMaximumFractionDigits(1);
		df.setGroupingUsed(false);
		String result = "{\"";
		result += Goal.FIELD_ID + "\":" + this.id + ",\"";
		result += Goal.FIELD_TITLE + "\":\"" + this.title + "\",\"";
		result += Goal.FIELD_TIME_PLANNED + "\":" + df.format(this.time_planned / 60.0f) + ",\"";
		if (this.time_planned > 0) {
			float dedication = (this.total_time_spent * 100.0f) / this.time_planned;
			result += Goal.EXTRA_DEDICATION + "\":" + df.format(dedication) + ",\"";
		}
		result += Goal.EXTRA_TOTAL_TIME_SPENT + "\":" + df.format(this.total_time_spent / 60.0f) + ",\"";
		result += Goal.EXTRA_COMPLETION + "\":" + df.format(this.completion * 100.0f) + ",\"";
		result += Goal.FIELD_DESCRIPTION + "\":\"" + this.description + "\"}";
		return result;
	}
	
	/**
	 * Updates the instance in the database.
	 * 
	 * @return whether the instance could be updated
	 */
	public boolean update() {
		return Database.execute("UPDATE " + Goal.TABLE_NAME + " SET "
								+ Goal.FIELD_TITLE + " = \"" + this.title + "\","
								+ Goal.FIELD_TIME_PLANNED + " = " + this.time_planned + ","
								+ Goal.FIELD_DESCRIPTION + " = \"" + this.description + "\""
								+ " WHERE " + Goal.FIELD_ID + " = " + this.id
								+ " AND " + Goal.FIELD_USER_NAME + " = \"" + this.user_name + "\";");
	}
}
