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
import java.util.Vector;

import org.arkanos.aos.api.controllers.Database;

/**
 * @author arkanos
 * 
 */
public class Goal {
	static final String	TABLE_NAME			= "goal";
	static final String	FIELD_ID			= "id";
	static final String	FIELD_TITLE			= "title";
	static final String	FIELD_TIME_PLANNED	= "time_planned";
	static final String	FIELD_DESCRIPTION	= "description";
	static final String	FIELD_USER_NAME		= "user_name";
	
	static public Vector<Goal> getUserGoals(String user_name) {
		try {
			ResultSet rs = Database.query("SELECT * FROM " + Goal.TABLE_NAME + " WHERE " +
											Goal.FIELD_USER_NAME + " = '" + user_name + "';");
			Vector<Goal> results = new Vector<Goal>();
			while (rs.next()) {
				results.add(new Goal(rs.getInt(Goal.FIELD_ID),
										rs.getString(Goal.FIELD_TITLE),
										rs.getInt(Goal.FIELD_TIME_PLANNED),
										rs.getString(Goal.FIELD_DESCRIPTION)));
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
	private final int		time_planned;
	private final String	title;
	private final String	description;
	
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
	
	@Override
	public String toString() {
		return "{" + Goal.FIELD_ID + ":" + this.id + "," +
				Goal.FIELD_TITLE + ":\"" + this.title + "\"," +
				Goal.FIELD_TIME_PLANNED + ":" + this.time_planned + "," +
				Goal.FIELD_DESCRIPTION + ":\"" + this.description + "\"}";
	}
}
