/**
 *  Copyright (C) 2014 Matheus Borges Teixeira
 *  
 *  This file is part of Arkanos Organizer Suite, a tool for personal organization.
 *
 *  Arkanos Organizer Suite is free software: you can redistribute it and/or 
 *  modify it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with Arkanos Organizer Suite.  If not, see <http://www.gnu.org/licenses/>
 */
package org.arkanos.aos.api.data;

import java.io.IOException;
import java.io.Reader;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.Vector;

import org.arkanos.aos.api.controllers.Database;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 * @author arkanos
 * 
 */
public class Goal {
	static public final String	TABLE_NAME				= "goal";
	static public final String	FIELD_ID				= "id";
	static public final String	FIELD_TITLE				= "title";
	static public final String	FIELD_TIME_PLANNED		= "time_planned";
	static public final String	FIELD_DESCRIPTION		= "description";
	static public final String	FIELD_USER_NAME			= "user_name";
	static public final String	EXTRA_COMPLETION		= "completion";
	static public final String	EXTRA_DEDICATION		= "dedication";
	static public final String	EXTRA_TOTAL_TIME_SPENT	= "total_time_spent";
	
	static public int createGoal(String title, int time_planned, String description, String user_name) {
		// TODO Auto-generated constructor stub
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
				if (rs.next()) return rs.getInt("created_id");
			}
			catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return -1;
	}
	
	/**
	 * @param id2
	 * @return
	 */
	public static Goal getGoal(String user_name, int id) {
		try {
			ResultSet rs = Database.query("SELECT * FROM " + Goal.TABLE_NAME + " WHERE "
											+ Goal.FIELD_USER_NAME + " = \"" + user_name + "\""
											+ " AND " + Goal.FIELD_ID + " = " + id + ";");
			if (rs.next()) {
				Goal newone = new Goal(rs.getInt(Goal.FIELD_ID),
										rs.getString(Goal.FIELD_TITLE),
										rs.getInt(Goal.FIELD_TIME_PLANNED),
										rs.getString(Goal.FIELD_DESCRIPTION),
										user_name);
				return newone;
			}
		}
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	static public Vector<Goal> getUserGoals(String user_name) {
		try {
			ResultSet rs = Database.query("SELECT * FROM " + Goal.TABLE_NAME + " WHERE "
											+ Goal.FIELD_USER_NAME + " = \"" + user_name + "\";");
			Vector<Goal> results = new Vector<Goal>();
			while (rs.next()) {
				Goal newone = new Goal(rs.getInt(Goal.FIELD_ID),
										rs.getString(Goal.FIELD_TITLE),
										rs.getInt(Goal.FIELD_TIME_PLANNED),
										rs.getString(Goal.FIELD_DESCRIPTION),
										user_name);
				//TODO optimize?
				ResultSet newrs = Database.query("SELECT AVG(help.progress) AS completion, SUM(help.spent) AS total_time_spent FROM ("
													+ "SELECT IF(SUM((w." + Work.FIELD_RESULT + ")/(t." + Task.FIELD_TARGET + "-t." + Task.FIELD_INITIAL + ")) IS NULL, 0, SUM((w." + Work.FIELD_RESULT + ")/(t." + Task.FIELD_TARGET + "-t." + Task.FIELD_INITIAL + "))) AS progress, "
													+ "SUM(" + Work.FIELD_TIME_SPENT + ") AS spent FROM goal g "
													+ "LEFT JOIN " + Task.TABLE_NAME + " t on t." + Task.FIELD_GOAL_ID + " = g." + Goal.FIELD_ID + " "
													+ "LEFT JOIN " + Work.TABLE_NAME + " w ON t." + Task.FIELD_ID + " = w." + Work.FIELD_TASK_ID + " "
													+ "WHERE g." + Goal.FIELD_ID + " = " + newone.getId() + " "
													+ "AND g." + Goal.FIELD_USER_NAME + " = \"" + user_name + "\""
													+ "GROUP BY t." + Task.FIELD_ID + ",g." + Goal.FIELD_ID + ") help;");
				if (newrs.next()) {
					newone.setCompletion(newrs.getFloat("completion"));
					newone.setTotalTimeSpent(newrs.getInt("total_time_spent"));
				}
				
				results.add(newone);
				
			}
			return results;
		}
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	static public Vector<Goal> getUserGoalsSnapshot(String user_name, String from, String to) {
		try {
			ResultSet rs = Database.query("SELECT * FROM " + Goal.TABLE_NAME + " WHERE "
											+ Goal.FIELD_USER_NAME + " = \"" + user_name + "\";");
			Vector<Goal> results = new Vector<Goal>();
			while (rs.next()) {
				Goal newone = new Goal(rs.getInt(Goal.FIELD_ID),
										rs.getString(Goal.FIELD_TITLE),
										rs.getInt(Goal.FIELD_TIME_PLANNED),
										rs.getString(Goal.FIELD_DESCRIPTION),
										user_name);
				//TODO optimize?
				ResultSet newrs = Database.query("SELECT AVG(help.progress) AS completion, SUM(help.spent) AS total_time_spent FROM ("
													+ "SELECT IF(SUM((w." + Work.FIELD_RESULT + ")/(t." + Task.FIELD_TARGET + "-t." + Task.FIELD_INITIAL + ")) IS NULL, 0, SUM((w." + Work.FIELD_RESULT + ")/(t." + Task.FIELD_TARGET + "-t." + Task.FIELD_INITIAL + "))) AS progress, "
													+ "SUM(" + Work.FIELD_TIME_SPENT + ") AS spent FROM goal g "
													+ "LEFT JOIN " + Task.TABLE_NAME + " t on t." + Task.FIELD_GOAL_ID + " = g." + Goal.FIELD_ID + " "
													+ "LEFT JOIN (SELECT * FROM " + Work.TABLE_NAME + " WHERE "
													+ Work.FIELD_START + " >= \"" + from + "\" "
													+ "AND " + Work.FIELD_START + " <= \"" + to + "\") "
													+ " w ON t." + Task.FIELD_ID + " = w." + Work.FIELD_TASK_ID + " "
													+ "WHERE g." + Goal.FIELD_ID + " = " + newone.getId() + " "
													+ "AND g." + Goal.FIELD_USER_NAME + " = \"" + user_name + "\" "
													+ "GROUP BY t." + Task.FIELD_ID + ",g." + Goal.FIELD_ID + ") help;");
				if (newrs.next()) {
					newone.setCompletion(newrs.getFloat("completion"));
					newone.setTotalTimeSpent(newrs.getInt("total_time_spent"));
				}
				
				results.add(newone);
				
			}
			return results;
		}
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	static public boolean isUserGoal(String user_name, int goal_id) {
		try {
			ResultSet rs = Database.query("SELECT COUNT(*) AS goal_count FROM " + Goal.TABLE_NAME
											+ " WHERE " + Goal.FIELD_ID + " = " + goal_id + " AND "
											+ Goal.FIELD_USER_NAME + " = \"" + user_name + "\";");
			if (rs.next())
				return (rs.getInt("goal_count") > 0);
			else
				return false;
		}
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}
	
	static public Goal parseGoal(Reader from, String user_name) {
		JSONParser jp = new JSONParser();
		try {
			//TODO send this shitty simple-JSON to fuck
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
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	private final int		id;
	
	private int				time_planned;
	
	private String			title;
	private String			description;
	private final String	user_name;
	
	/* Volatile data */
	private float			completion			= 0;
	private int				total_time_spent	= 0;
	
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
	
	public boolean delete() {
		return Database.execute("DELETE FROM " + Goal.TABLE_NAME
								+ " WHERE " + Goal.FIELD_ID + " = " + this.id
								+ " AND " + Goal.FIELD_USER_NAME + " = \"" + this.user_name + "\";");
	}
	
	/**
	 * @return
	 */
	public float getCompletion() {
		return this.completion;
	}
	
	/**
	 * @return
	 */
	public float getDedication() {
		if (this.time_planned > 0)
			return this.total_time_spent / this.time_planned;
		else
			return 1;
	}
	
	private int getId() {
		return this.id;
	}
	
	/**
	 * @return
	 */
	public int getID() {
		return this.id;
	}
	
	/**
	 * @return
	 */
	public float getProductivity() {
		if (this.getDedication() > 0)
			return this.getCompletion() / this.getDedication();
		else
			return 0;
	}
	
	/**
	 * @return
	 */
	public String getTitle() {
		return this.title;
	}
	
	/**
	 * @return
	 */
	public int getTotalTimeSpent() {
		return this.total_time_spent;
	}
	
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
	
	public boolean update() {
		return Database.execute("UPDATE " + Goal.TABLE_NAME + " SET "
								+ Goal.FIELD_TITLE + " = \"" + this.title + "\","
								+ Goal.FIELD_TIME_PLANNED + " = " + this.time_planned + ","
								+ Goal.FIELD_DESCRIPTION + " = \"" + this.description + "\""
								+ " WHERE " + Goal.FIELD_ID + " = " + this.id
								+ " AND " + Goal.FIELD_USER_NAME + " = \"" + this.user_name + "\";");
	}
}
