/**
 * Copyright (C) 2014 Matheus Borges Teixeira
 * 
 * This file is part of Arkanos Organizer Suite, a tool for personal organization.
 * 
 * Arkanos Organizer Suite is free software: you can redistribute it and/or modify it under the
 * terms of the GNU Affero General Public License as published by the Free Software Foundation,
 * either version 3 of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License along with Arkanos
 * Organizer Suite. If not, see <http://www.gnu.org/licenses/>
 */
package org.arkanos.aos.api.controllers;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author arkanos
 * 
 */
public class Security {
	
	private class TokenInfo {
		String	token;
		long	expiration;
		String	username;
		
		TokenInfo(String token) {
			this.token = token;
		}
	}
	
	static private HashMap<String, TokenInfo>	all_tokens	= null;
	
	static public boolean authenticateToken(HttpServletRequest request, HttpServletResponse response)
					throws IOException {
		TokenInfo token_info = null;
		for (Cookie c : request.getCookies()) {
			if (c.getName().compareTo("aos-token") == 0) {
				token_info = Security.getTokens().get(c.getValue());
			}
		}
		if (token_info != null) {
			if (token_info.expiration < System.currentTimeMillis())
				return false;
			else
				return true;
		}
		else
			return false;
	}
	
	/**
	 * @param user_name
	 * @return
	 */
	public static String createToken(String user_name) {
		//TODO find a way of going around this.
		Security builder = new Security();
		TokenInfo info = builder.new TokenInfo(user_name + "_" + Math.random());
		//TODO use token as security insurance.
		info.username = user_name;
		/** Expires in one day. */
		info.expiration = System.currentTimeMillis() + (1000 * 60 * 60 * 24);
		
		Security.getTokens().put(info.token, info);
		
		return info.token;
	}
	
	static private HashMap<String, TokenInfo> getTokens() {
		if (Security.all_tokens == null) {
			Security.all_tokens = new HashMap<String, TokenInfo>();
		}
		return Security.all_tokens;
	}
	
	static public String getUsernameFromToken(String token) {
		TokenInfo token_info = Security.getTokens().get(token);
		if (token_info != null) return token_info.username;
		return null;
	}
}
