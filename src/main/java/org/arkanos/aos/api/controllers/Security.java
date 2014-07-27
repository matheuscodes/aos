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
package org.arkanos.aos.api.controllers;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

/**
 * Controls the security of the server.
 * 
 * @version 1.0
 * @author Matheus Borges Teixeira
 * 
 */
public class Security {
	
	/**
	 * Security token provided by the server.
	 * 
	 * @author Matheus Borges Teixeira
	 */
	public class TokenInfo {
		/** Token key **/
		private final String	token;
		/** Time until when the token is valid **/
		private long			expiration;
		/** User to whom the token was granted **/
		private final String	user_name;
		
		/**
		 * Simple token constructor.
		 * 
		 * @param token
		 *            string with the token key.
		 * @param user_name
		 *            user to whom the token was granted.
		 */
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
	
	/** Default cookie name for the token **/
	public static final String					TOKEN_COOKIE_NAME	= "aos-token";
	
	/** Cache of provided tokens **/
	static private HashMap<String, TokenInfo>	all_tokens			= null;
	
	/**
	 * Verifies if there is a valid token in a given request.
	 * 
	 * @param request
	 *            to be checked.
	 * @return the token found or null if no valid token is given.
	 * @throws IOException
	 *             whenever problems occur reading cookies.
	 */
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
	 * Converts a character to binary data.
	 * 
	 * @param c
	 *            specifies a character of the Hex code.
	 * @return the value of the character.
	 */
	static private byte charToHexa(char c) {
		switch (c) {
			case 'f':
				return 15;
			case 'e':
				return 14;
			case 'd':
				return 13;
			case 'c':
				return 12;
			case 'b':
				return 11;
			case 'a':
				return 10;
			case '9':
				return 9;
			case '8':
				return 8;
			case '7':
				return 7;
			case '6':
				return 6;
			case '5':
				return 5;
			case '4':
				return 4;
			case '3':
				return 3;
			case '2':
				return 2;
			case '1':
				return 1;
			case '0':
			default:
				return 0;
		}
	}
	
	/**
	 * Checks whether a key is valid.
	 * 
	 * @param secret_key
	 *            defines a mask for the password.
	 * @param password
	 *            informs the password to extract.
	 * @param reset_key
	 *            specifies the key to be checked.
	 * @return whether the key is valid or not.
	 */
	static public boolean checkResetKey(String secret_key, String password, String reset_key) {
		int i = 0;
		if ((secret_key == null) || (secret_key.length() != reset_key.length())) return false;
		for (char c : secret_key.toCharArray()) {
			byte one = Security.charToHexa(c);
			byte two = Security.charToHexa(password.charAt(i));
			byte three = Security.charToHexa(reset_key.charAt(i));
			if ((one & two) != (one & three)) return false;
			++i;
		}
		return true;
	}
	
	/**
	 * Removes data from a fake key based on a mask.
	 * 
	 * @param key
	 *            defines a fake key to be opened.
	 * @param mask
	 *            specifies the positions to be cleaned.
	 * @return the fake key with the bits from the mask removed.
	 */
	static private String cleanKey(String key, String mask) {
		String result = "";
		int i = 0;
		for (char c : mask.toCharArray()) {
			if (i >= key.length()) {
				break;
			}
			byte one = Security.charToHexa(key.charAt(i));
			byte two = Security.charToHexa(c);
			byte three = (byte) (one & (~two));
			result += Security.hexaToChar(three);
			++i;
		}
		return result;
	}
	
	/**
	 * Creates a key hidden by random scrambled data.
	 * 
	 * @param secret_key
	 *            defines a mask to find the valid data.
	 * @param password
	 *            specifies the origin of the valid data.
	 * @return the key with hidden data.
	 */
	static public String createResetKey(String secret_key, String password) {
		String key = Security.createSecretKey(password.length());
		return Security.insertSecret(Security.cleanKey(key, secret_key), password, secret_key);
	}
	
	/**
	 * Creates a random set of bits.
	 * 
	 * @param size
	 *            defines the amount of words.
	 * @return a random key to be used as mask.
	 */
	static public String createSecretKey(int size) {
		String key = "";
		for (int i = 0; i < size; i++) {
			double d = Math.random() * 15.0;
			key += Security.hexaToChar((byte) d);
		}
		return key;
	}
	
	/**
	 * Creates a token for a user.
	 * 
	 * @param user_name
	 *            of the user to be granted the token.
	 * @return a key of the token created for the user.
	 */
	static public String createToken(String user_name) {
		//TODO: Find a way of going around this without creating a new TokenInfo class.
		Security builder = new Security();
		TokenInfo info = builder.new TokenInfo(user_name + "_" + Math.random(),
												user_name);
		
		Security.getTokens().put(info.getToken(), info);
		
		return info.getToken();
	}
	
	/**
	 * Creates or returns the token cache.
	 * 
	 * @return the token cache.
	 */
	static private HashMap<String, TokenInfo> getTokens() {
		if (Security.all_tokens == null) {
			Security.all_tokens = new HashMap<String, TokenInfo>();
		}
		return Security.all_tokens;
	}
	
	/**
	 * Converts numeric data to Hex code.
	 * 
	 * @param b
	 *            specifies the bits to convert.
	 * @return the Hex code as a string.
	 */
	static private String hexaToChar(byte b) {
		switch (b) {
			case 10:
				return "a";
			case 11:
				return "b";
			case 12:
				return "c";
			case 13:
				return "d";
			case 14:
				return "e";
			case 15:
				return "f";
			default:
				return b + "";
		}
	}
	
	/**
	 * Merges valid data into a randomly generated key.
	 * 
	 * @param cleanKey
	 *            defines the destination of data.
	 * @param password
	 *            defines the origin of data.
	 * @param mask
	 *            specifies the bits to be used.
	 * @return a key with hidden valid data.
	 */
	private static String insertSecret(String cleanKey, String password, String mask) {
		String result = "";
		int i = 0;
		for (char c : mask.toCharArray()) {
			byte one = Security.charToHexa(cleanKey.charAt(i));
			byte two = Security.charToHexa(c);
			byte three = Security.charToHexa(password.charAt(i));
			byte four = (byte) (one | (two & three));
			result += Security.hexaToChar(four);
			++i;
		}
		return result;
	}
	
	/**
	 * Forces expiration of the authentication in a request.
	 * 
	 * @param request
	 *            with the cookie to be invalidated.
	 * @throws IOException
	 *             whenever problems occur reading cookies.
	 */
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
