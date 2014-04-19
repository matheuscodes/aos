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
package org.arkanos.aos.api.controllers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * @author arkanos
 * 
 */
public class Database {
	
	static private final String	HOST		= "localhost:3306";
	static private final String	DATABASE	= "aos";
	static private final String	USER		= "root";
	static private final String	PASSWORD	= "1234";
	
	static Connection			link		= null;
	
	static public boolean execute(String q) {
		if (Database.link == null) {
			Database.initialize();
		}
		try {
			Statement query = Database.link.createStatement();
			query.execute(q);
			return true;
		}
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return false;
	}
	
	static public void initialize() {
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			Database.link = DriverManager.getConnection("jdbc:mysql://" + Database.HOST + "/" + Database.DATABASE + "?user=" + Database.USER + "&password=" + Database.PASSWORD);
		}
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	static public ResultSet query(String q) {
		if (Database.link == null) {
			Database.initialize();
		}
		try {
			Statement query = Database.link.createStatement();
			query.execute(q);
			ResultSet list = query.getResultSet();
			return list;
		}
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	static public String sanitizeString(String s) {
		if (s == null) return null;
		//TODO Sanitize weird/dangerous chars, SQL injection, etc.
		return s;
	}
}
