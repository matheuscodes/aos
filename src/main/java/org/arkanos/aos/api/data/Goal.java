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
public class Goal {
	static final String	TABLE_NAME				= "goal";
	static final String	FIELD_ID				= "id";
	static final String	FIELD_TITLE				= "title";
	static final String	FIELD_TIME_PLANNED		= "time_planned";
	static final String	FIELD_DESCRIPTION		= "description";
	static final String	FIELD_USER_NAME			= "user_name";
	static final String	EXTRA_COMPLETION		= "completion";
	static final String	EXTRA_DEDICATION		= "dedication";
	static final String	EXTRA_TOTAL_TIME_SPENT	= "total_time_spent";
	
	static public Vector<Goal> getUserGoals(String user_name) {
		try {
			ResultSet rs = Database.query("SELECT * FROM " + Goal.TABLE_NAME + " WHERE "
											+ Goal.FIELD_USER_NAME + " = \"" + user_name + "\";");
			Vector<Goal> results = new Vector<Goal>();
			while (rs.next()) {
				Goal newone = new Goal(rs.getInt(Goal.FIELD_ID),
										rs.getString(Goal.FIELD_TITLE),
										rs.getInt(Goal.FIELD_TIME_PLANNED),
										rs.getString(Goal.FIELD_DESCRIPTION));
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
	
	private final int		id;
	private final int		time_planned;
	private final String	title;
	
	private final String	description;
	/* Volatile data */
	private float			completion			= 0;
	
	private int				total_time_spent	= 0;
	
	public Goal(int id, String title, int time_planned, String description) {
		this.id = id;
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
	
	private int getId() {
		return this.id;
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
}
