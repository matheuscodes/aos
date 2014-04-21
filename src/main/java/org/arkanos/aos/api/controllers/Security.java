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

/**
 * @author arkanos
 * 
 */
public class Security {
	
	public class TokenInfo {
		private final String	token;
		private long			expiration;
		private final String	user_name;
		
		TokenInfo(String token, String user_name) {
			this.token = token;
			this.user_name = user_name;
			/** Expires in one day. */
			this.expiration = System.currentTimeMillis() + (1000 * 60 * 60 * 24);
		}
		
		public long getExpiration() {
			return this.expiration;
		}
		
		public String getToken() {
			return this.token;
		}
		
		public String getUsername() {
			return this.user_name;
		}
		
		public void setExpiration(long when) {
			this.expiration = when;
		}
	}
	
	public static final String					TOKEN_COOKIE_NAME	= "aos-token";
	
	static private HashMap<String, TokenInfo>	all_tokens			= null;
	
	static public TokenInfo authenticateToken(HttpServletRequest request)
					throws IOException {
		TokenInfo token_info = null;
		if (request.getCookies() != null) {
			for (Cookie c : request.getCookies()) {
				if (c.getName().compareTo(Security.TOKEN_COOKIE_NAME) == 0) {
					TokenInfo temp_info = Security.getTokens().get(c.getValue());
					if ((temp_info != null) && (token_info != null)) {
						if (temp_info.getExpiration() > token_info.getExpiration()) {
							token_info = temp_info;
						}
					}
					else {
						if (token_info == null) {
							token_info = temp_info;
						}
					}
				}
			}
		}
		if (token_info != null) {
			if (token_info.getExpiration() < System.currentTimeMillis())
				return null;
			else
				return token_info;
		}
		else
			return null;
	}
	
	/**
	 * @param user_name
	 * @return
	 */
	static public String createToken(String user_name) {
		//TODO find a way of going around this.
		Security builder = new Security();
		TokenInfo info = builder.new TokenInfo(user_name + "_" + Math.random(),
												user_name);
		
		Security.getTokens().put(info.getToken(), info);
		
		return info.getToken();
	}
	
	static private HashMap<String, TokenInfo> getTokens() {
		if (Security.all_tokens == null) {
			Security.all_tokens = new HashMap<String, TokenInfo>();
		}
		return Security.all_tokens;
	}
	
	static public void invalidateToken(HttpServletRequest request)
					throws IOException {
		TokenInfo token_info = null;
		for (Cookie c : request.getCookies()) {
			if (c.getName().compareTo(Security.TOKEN_COOKIE_NAME) == 0) {
				token_info = Security.getTokens().get(c.getValue());
				if (token_info != null) {
					token_info.setExpiration(System.currentTimeMillis());
				}
			}
		}
		
	}
}
