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

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.arkanos.aos.api.controllers.Database;
import org.arkanos.aos.api.controllers.Log;
import org.arkanos.aos.api.controllers.Security;

/**
 * User data access and operation.
 * 
 * @version 1.0
 * @author Matheus Borges Teixeira
 */
public class User {
	/** SQL table name **/
	static public final String	TABLE_NAME				= "user";
	/** SQL field for the username **/
	static final private String	FIELD_USER_NAME			= "user_name";
	/** SQL field for the first name **/
	static final public String	FIELD_FIRST_NAME		= "first_name";
	/** SQL field for the last name **/
	static final private String	FIELD_LAST_NAME			= "last_name";
	/** SQL field for the email **/
	static final private String	FIELD_EMAIL				= "email";
	/** SQL field for the password **/
	static final public String	FIELD_HASHED_PASSWORD	= "hashed_password";
	/** SQL field for the secret key **/
	static final public String	FIELD_SECRET_KEY		= "secret_key";
	/** SQL field for the expiration date **/
	static final private String	FIELD_EXPIRATION_DATE	= "expiration_date";
	
	//TODO: doc.
	static public boolean confirmAccount(String user_name) {
		return Database.execute("UPDATE " + User.TABLE_NAME + " SET "
								+ User.FIELD_EXPIRATION_DATE + " = NULL,"
								+ User.FIELD_SECRET_KEY + " = NULL"
								+ " WHERE " + User.FIELD_USER_NAME + " = \"" + user_name + "\";");
	}
	
	/**
	 * Creates a new user in the database.
	 * 
	 * @param user_name
	 * @param first_name
	 * @param last_name
	 * @param email
	 * @param hashed_password
	 * @return whether the user was created or not.
	 */
	static public boolean create(String user_name, String first_name, String last_name, String email, String hashed_password) {
		long one_week = 7 * 24 * 60 * 60 * 1000;
		Date expire = new Date(System.currentTimeMillis() + one_week);
		SimpleDateFormat date_format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return Database.execute("INSERT INTO " + User.TABLE_NAME + "(" +
								User.FIELD_USER_NAME + "," + User.FIELD_FIRST_NAME + "," +
								User.FIELD_LAST_NAME + "," + User.FIELD_EMAIL + "," +
								User.FIELD_HASHED_PASSWORD + "," + User.FIELD_EXPIRATION_DATE + ") VALUES " +
								"(\"" + user_name + "\",\"" + first_name + "\",\"" +
								last_name + "\",\"" + email + "\",\"" + hashed_password + "\",\"" + date_format.format(expire) + "\");");
	}
	
	/**
	 * Compares a given password hash to the saved user password hash.
	 * 
	 * @param user_name
	 * @param hashed_password
	 * @return whether the hashes match or not.
	 */
	public static boolean credentialsMatch(String user_name, String hashed_password) {
		try {
			ResultSet rs = Database.query("SELECT " + User.FIELD_HASHED_PASSWORD + " FROM " + User.TABLE_NAME + " WHERE " +
											User.FIELD_USER_NAME + " = \"" + user_name + "\";");
			if ((rs != null) && rs.next()) {
				String pass = rs.getString(User.FIELD_HASHED_PASSWORD);
				if ((pass != null) && (pass.compareTo(hashed_password) == 0))
					return true;
				else
					return false;
			}
		}
		catch (SQLException e) {
			Log.error("User", "Problems while matching credentials.");
			e.printStackTrace();
		}
		return false;
	}
	
	/**
	 * Checks if a particular username exists or not.
	 * 
	 * @param user_name
	 * @return whether the given username exists or not.
	 */
	static public boolean exists(String user_name) {
		try {
			ResultSet rs = Database.query("SELECT COUNT(*) FROM " + User.TABLE_NAME + " WHERE " +
											User.FIELD_USER_NAME + " = \"" + user_name + "\";");
			if (rs != null) {
				rs.next();
				if (rs.getInt(1) > 0)
					return true;
				else
					return false;
			}
		}
		catch (SQLException e) {
			Log.error("User", "Problems verifying user existence.");
			e.printStackTrace();
		}
		return true;
	}
	
	//TODO: doc.
	static public String getContact(String user_name) {
		try {
			ResultSet rs = Database.query("SELECT CONCAT(" + User.FIELD_FIRST_NAME + ",\" \"," +
											User.FIELD_LAST_NAME + ",\" <\"," + User.FIELD_EMAIL + ",\">\") AS contact" +
											" FROM " + User.TABLE_NAME + " WHERE " +
											User.FIELD_USER_NAME + " = \"" + user_name + "\";");
			if ((rs != null) && rs.next()) {
				String contact = rs.getString("contact");
				return contact;
			}
		}
		catch (SQLException e) {
			Log.error("User", "Problems retrieving an user as a contact.");
			e.printStackTrace();
		}
		return null;
	}
	
	//TODO: doc.
	static public String getStringInfo(String user_name, String field) {
		try {
			ResultSet rs = Database.query("SELECT " + field +
											" FROM " + User.TABLE_NAME + " WHERE " +
											User.FIELD_USER_NAME + " = \"" + user_name + "\";");
			if ((rs != null) && rs.next()) {
				String name = rs.getString(field);
				return name;
			}
		}
		catch (SQLException e) {
			Log.error("User", "Problems while fetching the field " + field + " from user.");
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * Checks if username uses simple characters.
	 * 
	 * @param user_name
	 * @return whether the username uses only the allowed characters.
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
	
	//TODO: doc.
	static public void removeUnconfirmed() {
		if (!Database.execute("DELETE FROM " + User.TABLE_NAME + " WHERE " + User.FIELD_EXPIRATION_DATE + " < NOW();")) {
			Log.error("User", "The deletion for unconfirmed users did not execute.");
		}
		return;
	}
	
	//TODO: doc.
	static public boolean resetMatch(String given_key, String user_name) {
		try {
			ResultSet rs = Database.query("SELECT " + User.FIELD_HASHED_PASSWORD + "," + User.FIELD_SECRET_KEY + " FROM " + User.TABLE_NAME + " WHERE " +
											User.FIELD_USER_NAME + " = \"" + user_name + "\";");
			if ((rs != null) && rs.next()) {
				String pass = rs.getString(User.FIELD_HASHED_PASSWORD);
				String secret = rs.getString(User.FIELD_SECRET_KEY);
				if ((pass != null) && (given_key != null) && (secret != null))
					return Security.checkResetKey(secret, pass, given_key);
				else
					return false;
			}
		}
		catch (SQLException e) {
			Log.error("User", "Problems while matching reset keys.");
			e.printStackTrace();
		}
		return false;
	}
	
	//TODO: doc.
	static public boolean saveSecretKey(String secret_key, String user_name) {
		return Database.execute("UPDATE " + User.TABLE_NAME + " SET "
								+ User.FIELD_SECRET_KEY + " = \"" + secret_key + "\""
								+ " WHERE " + User.FIELD_USER_NAME + " = \"" + user_name + "\";");
	}
	
	//TODO: doc.
	static public boolean updatePassword(String user_name, String password) {
		return Database.execute("UPDATE " + User.TABLE_NAME + " SET "
								+ User.FIELD_HASHED_PASSWORD + " = \"" + password + "\","
								+ User.FIELD_EXPIRATION_DATE + " = NULL,"
								+ User.FIELD_SECRET_KEY + " = NULL"
								+ " WHERE " + User.FIELD_USER_NAME + " = \"" + user_name + "\";");
	}
	
}
