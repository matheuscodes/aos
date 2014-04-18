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

import javax.servlet.http.HttpServletResponse;

/**
 * @author arkanos
 * 
 */
public class HTTP {

	static public void setUpDefaultHeaders(HttpServletResponse response) {
		// TODO maybe no-cache instead?
		response.addHeader("Cache-Control", "no-store");
	}

}