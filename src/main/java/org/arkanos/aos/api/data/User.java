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

import org.arkanos.aos.api.controllers.Database;

/**
 * @author arkanos
 * 
 */
public class User {
	
	static final private String	FIELD_USER_NAME			= "user_name";
	static final private String	FIELD_FIRST_NAME		= "first_name";
	static final private String	FIELD_LAST_NAME			= "last_name";
	static final private String	FIELD_EMAIL				= "email";
	static final private String	FIELD_HASHED_PASSWORD	= "hashed_password";
	
	static public boolean create(String user_name, String first_name, String last_name, String email, String hashed_password) {
		return Database.execute("INSERT INTO user(" +
								User.FIELD_USER_NAME + "," + User.FIELD_FIRST_NAME + "," +
								User.FIELD_LAST_NAME + "," + User.FIELD_EMAIL + "," +
								User.FIELD_HASHED_PASSWORD + ") VALUES " +
								"('" + user_name + "','" + first_name + "','" +
								last_name + "','" + email + "','" + hashed_password + "');");
	}
	
	/**
	 * @param user_name
	 * @param hashed_password
	 * @return
	 */
	public static boolean credentialsMatch(String user_name, String hashed_password) {
		try {//TODO use double quotes
			ResultSet rs = Database.query("SELECT " + User.FIELD_HASHED_PASSWORD + " FROM user WHERE " +
											User.FIELD_USER_NAME + " = '" + user_name + "';");
			if ((rs != null) && rs.next()) {
				String pass = rs.getString(User.FIELD_HASHED_PASSWORD);
				if ((pass != null) && (pass.compareTo(hashed_password) == 0))
					return true;
				else
					return false;
			}
		}
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}
	
	static public boolean exists(String user_name) {
		try {
			ResultSet rs = Database.query("SELECT COUNT(*) FROM user WHERE " +
											User.FIELD_USER_NAME + " = '" + user_name + "';");
			if (rs != null) {
				rs.next();
				if (rs.getInt(1) > 0)
					return true;
				else
					return false;
			}
		}
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}
	
	/**
	 * @param s
	 * @return
	 */
	static public boolean isLegalUsername(String user_name) {
		for (char c : user_name.toCharArray()) {
			if ((c > 'z') || (c < 'a')) {
				if ((c < '0') || (c > '9')) {
					if ((c != '_') && (c != '-') && (c != '.')) return false;
				}
			}
		}
		return true;
	}
	
}
