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
public class Task {
	static public final String	TABLE_NAME				= "task";
	static public final String	FIELD_ID				= "id";
	static public final String	FIELD_GOAL_ID			= "goal_id";
	static public final String	FIELD_TARGET			= "target";
	static public final String	FIELD_INITIAL			= "initial";
	static public final String	FIELD_NAME				= "name";
	static public final String	EXTRA_GOAL_TITLE		= "goal_title";
	static public final String	EXTRA_COMPLETION		= "completion";
	static public final String	EXTRA_CURRENT			= "current";
	static public final String	EXTRA_TOTAL_TIME_SPENT	= "total_time_spent";
	
	static public int createTask(int goal_id, String name, float initial, float target) {
		// TODO Auto-generated constructor stub
		boolean insertion = Database.execute("INSERT INTO " + Task.TABLE_NAME + " ("
												+ Task.FIELD_NAME + ","
												+ Task.FIELD_TARGET + ","
												+ Task.FIELD_INITIAL + ","
												+ Task.FIELD_GOAL_ID + ") "
												+ "VALUES (\""
												+ name + "\"," + target + ","
												+ initial + "," + goal_id + ");");
		if (insertion == true) {
			try {
				ResultSet rs = Database.query("SELECT MAX(" + Task.FIELD_ID + ") AS created_id"
												+ " FROM " + Task.TABLE_NAME + " WHERE "
												+ Task.FIELD_NAME + " = \"" + name + "\" AND "
												+ Task.FIELD_TARGET + " = " + target + " AND "
												+ Task.FIELD_INITIAL + " = " + initial + " AND "
												+ Task.FIELD_GOAL_ID + " = " + goal_id + ";");
				if ((rs != null) && rs.next()) return rs.getInt("created_id");
			}
			catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return -1;
	}
	
	static public Task getTask(int id) {
		try {
			ResultSet rs = Database.query("SELECT * " + " FROM " + Task.TABLE_NAME + " WHERE "
											+ Task.FIELD_ID + " = " + id + ";");
			if ((rs != null) && rs.next()) return new Task(rs.getInt(Task.FIELD_ID),
															rs.getInt(Task.FIELD_GOAL_ID),
															rs.getString(Task.FIELD_NAME),
															rs.getFloat(Task.FIELD_INITIAL),
															rs.getFloat(Task.FIELD_TARGET));
		}
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	static public Vector<Task> getUserTasks(String user_name) {
		try {
			ResultSet rs = Database.query("SELECT t." + Task.FIELD_ID + " AS " + Task.FIELD_ID + ","
											+ "t." + Task.FIELD_GOAL_ID + " AS " + Task.FIELD_GOAL_ID + ","
											+ "t." + Task.FIELD_NAME + " AS " + Task.FIELD_NAME + ","
											+ Task.FIELD_INITIAL + "," + Task.FIELD_TARGET + ","
											+ "SUM((w." + Work.FIELD_RESULT + ")/(t." + Task.FIELD_TARGET + "-t." + Task.FIELD_INITIAL + ")) AS " + Task.EXTRA_COMPLETION + ","
											+ "SUM(w." + Work.FIELD_TIME_SPENT + ") AS " + Task.EXTRA_TOTAL_TIME_SPENT + ","
											+ "t." + Task.FIELD_INITIAL + " + SUM(w." + Work.FIELD_RESULT + ") AS " + Task.EXTRA_CURRENT + ","
											+ "g." + Goal.FIELD_TITLE + " AS " + Task.EXTRA_GOAL_TITLE + " FROM goal g "
											+ "LEFT JOIN " + Task.TABLE_NAME + " t on t." + Task.FIELD_GOAL_ID + " = g." + Goal.FIELD_ID + " "
											+ "LEFT JOIN " + Work.TABLE_NAME + " w ON t." + Task.FIELD_ID + " = w." + Work.FIELD_TASK_ID + " "
											+ "WHERE g." + Goal.FIELD_USER_NAME + " = \"" + user_name + "\""
											+ " AND t." + Task.FIELD_ID + " IS NOT NULL "
											+ "GROUP BY t." + Task.FIELD_ID + ",g." + Goal.FIELD_ID + ";");
			Vector<Task> results = new Vector<Task>();
			while ((rs != null) && rs.next()) {
				Task newone = new Task(rs.getInt(Task.FIELD_ID),
										rs.getInt(Task.FIELD_GOAL_ID),
										rs.getString(Task.FIELD_NAME),
										rs.getFloat(Task.FIELD_INITIAL),
										rs.getFloat(Task.FIELD_TARGET));
				
				newone.setGoalTitle(rs.getString(Task.EXTRA_GOAL_TITLE));
				newone.setCompletion(rs.getFloat(Task.EXTRA_COMPLETION));
				newone.setTotalTimeSpent(rs.getInt(Task.EXTRA_TOTAL_TIME_SPENT));
				/* Order is important, setCurrent must be last */
				newone.setCurrent(rs.getFloat(Task.EXTRA_CURRENT));
				
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
	
	static public Task parseTask(Reader from) {
		JSONParser jp = new JSONParser();
		try {
			//TODO send this shitty simple-JSON to fuck
			JSONObject jo = (JSONObject) jp.parse(from);
			String id = "" + jo.get(Task.FIELD_ID);
			String goal_id = "" + jo.get(Task.FIELD_GOAL_ID);
			String name = "" + jo.get(Task.FIELD_NAME);
			String initial = "" + jo.get(Task.FIELD_INITIAL);
			String target = "" + jo.get(Task.FIELD_TARGET);
			Task newone = new Task(Integer.parseInt(id),
									Integer.parseInt(goal_id),
									name,
									Float.parseFloat(initial),
									Float.parseFloat(target));
			newone.setGoalTitle("" + jo.get(Task.EXTRA_GOAL_TITLE));
			newone.setCompletion(Float.parseFloat("" + jo.get(Task.EXTRA_COMPLETION)));
			newone.setCurrent(Float.parseFloat("" + jo.get(Task.EXTRA_CURRENT)));
			newone.setTotalTimeSpent((int) (Float.parseFloat("" + jo.get(Task.EXTRA_TOTAL_TIME_SPENT)) * 60));
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
	
	private final int	id;
	private final int	goal_id;
	private String		name;
	private float		initial;
	private float		target;
	
	/* Dependent data */
	private float		completion;
	private float		current;
	
	private String		goal_title;
	
	private int			total_time_spent;
	
	/**
	 * @param int1
	 * @param int2
	 * @param string
	 * @param string2
	 * @param int3
	 */
	public Task(int id, int goal_id, String name, float initial, float target) {
		// TODO Auto-generated constructor stub
		this.id = id;
		this.goal_id = goal_id;
		this.name = name;
		this.initial = initial;
		this.target = target;
	}
	
	public boolean delete() {
		return Database.execute("DELETE FROM " + Task.TABLE_NAME
								+ " WHERE " + Task.FIELD_ID + " = " + this.id + ";");
	}
	
	/**
	 * @return
	 */
	public int getGoalID() {
		return this.goal_id;
	}
	
	public void replaceContent(Task to) {
		/* NEVER
		 * this.id = to.id;
		 * this.goal_id = to.goal_id;
		 */
		this.goal_title = Database.sanitizeString(to.goal_title);
		this.name = Database.sanitizeString(to.name);
		this.initial = to.initial;
		this.target = to.target;
		this.current = to.current;
		this.total_time_spent = to.total_time_spent;
	}
	
	/**
	 * @param float1
	 */
	private void setCompletion(float c) {
		this.completion = c;
	}
	
	/**
	 * @param float1
	 */
	private void setCurrent(float c) {
		if ((c == 0) && (this.completion == 0)) {
			this.current = this.initial;
		}
		else {
			this.current = c;
		}
	}
	
	/**
	 * @param string
	 */
	private void setGoalTitle(String gt) {
		this.goal_title = gt;
	}
	
	/**
	 * @param i
	 */
	public void setInitial(float i) {
		this.initial = i;
	}
	
	public void setName(String n) {
		this.name = n;
	}
	
	public void setTarget(float t) {
		this.target = t;
	}
	
	/**
	 * @param int1
	 */
	private void setTotalTimeSpent(int tts) {
		this.total_time_spent = tts;
	}
	
	@Override
	public String toString() {
		DecimalFormat df = new DecimalFormat();
		df.setMaximumFractionDigits(1);
		df.setGroupingUsed(false);
		String result = "{\"";
		result += Task.FIELD_ID + "\":" + this.id + ",\"";
		result += Task.FIELD_GOAL_ID + "\":" + this.goal_id + ",\"";
		result += Task.FIELD_NAME + "\":\"" + this.name + "\",\"";
		result += Task.FIELD_INITIAL + "\":" + df.format(this.initial) + ",\"";
		result += Task.EXTRA_CURRENT + "\":" + df.format(this.current) + ",\"";
		result += Task.EXTRA_TOTAL_TIME_SPENT + "\":" + df.format(this.total_time_spent / 60.0f) + ",\"";
		result += Task.EXTRA_COMPLETION + "\":" + df.format(this.completion * 100.0f) + ",\"";
		result += Task.EXTRA_GOAL_TITLE + "\":\"" + this.goal_title + "\",\"";
		result += Task.FIELD_TARGET + "\":" + this.target + "}";
		return result;
	}
	
	public boolean update() {
		return Database.execute("UPDATE " + Task.TABLE_NAME + " SET "
								+ Task.FIELD_NAME + " = \"" + this.name + "\","
								+ Task.FIELD_INITIAL + " = " + this.initial + ","
								+ Task.FIELD_TARGET + " = " + this.target
								+ " WHERE " + Task.FIELD_ID + " = " + this.id + ";");
	}
	
}
