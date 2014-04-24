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

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.Vector;

import org.arkanos.aos.api.controllers.Database;

/**
 * @author arkanos
 * 
 */
public class Task {
	static final String	TABLE_NAME				= "task";
	static final String	FIELD_ID				= "id";
	static final String	FIELD_GOAL_ID			= "goal_id";
	static final String	FIELD_TARGET			= "target";
	static final String	FIELD_INITIAL			= "initial";
	static final String	FIELD_TITLE				= "title";
	static final String	EXTRA_GOAL_TITLE		= "goal_title";
	static final String	EXTRA_COMPLETION		= "completion";
	static final String	EXTRA_CURRENT			= "current";
	static final String	EXTRA_TOTAL_TIME_SPENT	= "total_time_spent";
	
	static public Vector<Task> getUserTasks(String user_name) {
		try {
			ResultSet rs = Database.query("SELECT t." + Task.FIELD_ID + " AS " + Task.FIELD_ID + ","
											+ "t." + Task.FIELD_TITLE + " AS " + Task.FIELD_TITLE + ","
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
			while (rs.next()) {
				Task newone = new Task(rs.getInt(Task.FIELD_ID),
										rs.getString(Task.FIELD_TITLE),
										rs.getFloat(Task.FIELD_INITIAL),
										rs.getFloat(Task.FIELD_TARGET));
				
				newone.setGoalTitle(rs.getString(Task.EXTRA_GOAL_TITLE));
				newone.setCompletion(rs.getFloat(Task.EXTRA_COMPLETION));
				newone.setCurrent(rs.getFloat(Task.EXTRA_CURRENT));
				newone.setTotalTimeSpent(rs.getInt(Task.EXTRA_TOTAL_TIME_SPENT));
				
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
	
	private final int		id;
	
	private final String	title;
	private final float		initial;
	private final float		target;
	/* Dependent data */
	private float			completion;
	private float			current;
	
	private String			goal_title;
	private int				total_time_spent;
	
	/**
	 * @param int1
	 * @param int2
	 * @param string
	 * @param string2
	 * @param int3
	 */
	public Task(int id, String title, float initial, float target) {
		// TODO Auto-generated constructor stub
		this.id = id;
		this.title = title;
		this.initial = initial;
		this.target = target;
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
		this.current = c;
	}
	
	/**
	 * @param string
	 */
	private void setGoalTitle(String gt) {
		this.goal_title = gt;
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
		String result = "{\"";
		result += Task.FIELD_ID + "\":" + this.id + ",\"";
		result += Task.FIELD_TITLE + "\":\"" + this.title + "\",\"";
		result += Task.FIELD_INITIAL + "\":" + df.format(this.initial) + ",\"";
		result += Task.EXTRA_CURRENT + "\":" + df.format(this.current) + ",\"";
		result += Task.EXTRA_TOTAL_TIME_SPENT + "\":" + df.format(this.total_time_spent / 60.0f) + ",\"";
		result += Task.EXTRA_COMPLETION + "\":" + df.format(this.completion * 100.0f) + ",\"";
		result += Task.EXTRA_GOAL_TITLE + "\":\"" + this.goal_title + "\",\"";
		result += Task.FIELD_TARGET + "\":" + this.target + "}";
		return result;
	}
	
}
