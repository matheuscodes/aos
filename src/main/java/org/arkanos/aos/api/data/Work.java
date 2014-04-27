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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Vector;

import org.arkanos.aos.api.controllers.Database;
import org.json.simple.JSONObject;

/**
 * @author arkanos
 * 
 */
public class Work {
	static final String	DATEFORMAT			= "yyyy-MM-dd HH:mm:ss.0";
	
	static final String	TABLE_NAME			= "work";
	static final String	FIELD_TASK_ID		= "task_id";
	static final String	FIELD_RESULT		= "result";
	static final String	FIELD_TIME_SPENT	= "time_spent";
	static final String	FIELD_COMMENT		= "comment";
	static final String	FIELD_START			= "start";
	
	static final String	EXTRA_TASK_NAME		= "task_name";
	static final String	EXTRA_GOAL_TITLE	= "goal_title";
	
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
			while (rs.next()) {
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
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	private String			goal_title;
	private String			task_name;
	
	private final String	start;
	
	private final int		task_id;
	
	private final float		result;
	private final String	comment;
	private final int		time_spent;
	
	/**
	 * @param string
	 * @param int1
	 * @param float1
	 * @param float2
	 * @param int2
	 */
	public Work(String start, int task_id, float result, String comment, int time_spent) {
		this.start = start;
		this.task_id = task_id;
		this.result = result;
		this.comment = comment;
		this.time_spent = time_spent;
	}
	
	/**
	 * @param string
	 */
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
			result += Work.FIELD_RESULT + "\":" + df.format(this.result / 60.0f) + ",\"";
			result += Work.FIELD_TIME_SPENT + "\":" + this.time_spent + ",\"";
			result += Work.EXTRA_TASK_NAME + "\":\"" + this.task_name + "\",\"";
			result += Work.EXTRA_GOAL_TITLE + "\":\"" + this.goal_title + "\"}";
		}
		catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "{\"error\":\"parsing\"}";
		}
		return result;
	}
}
