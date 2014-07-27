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

import javax.servlet.http.HttpServletResponse;

/**
 * Controls the settings for HTTP protocol.
 * 
 * @version 1.0
 * @author Matheus Borges Teixeira
 */
public class HTTP {
	
	/**
	 * Defines a common set of header settings.
	 * 
	 * @param response
	 *            to be set.
	 */
	static public void setUpDefaultHeaders(HttpServletResponse response) {
		response.addHeader("Cache-Control", "no-store");
		response.setContentType("application/x-json");
	}
	
}
