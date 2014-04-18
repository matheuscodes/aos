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
	
	static public boolean create(String user_name, String first_name, String last_name, String email, String hashed_password) {
		return Database.execute("INSERT INTO user(user_name,first_name,last_name,email,hashed_password) VALUES " +
								"('" + user_name + "','" + first_name + "','" + last_name + "','" + email + "','" + hashed_password + "');");
	}
	
	static public boolean exists(String user_name) {
		try {
			ResultSet rs = Database.query("SELECT COUNT(*) FROM user WHERE user_name='" + user_name + "';");
			rs.next();
			if (rs.getInt(1) > 0)
				return true;
			else
				return false;
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
	public static boolean isLegalUsername(String s) {
		for (char c : s.toCharArray()) {
			if ((c > 'z') || (c < 'a')) {
				if ((c < '0') || (c > '9')) {
					if ((c != '_') && (c != '-') && (c != '.')) return false;
				}
			}
		}
		return true;
	}
	
}
