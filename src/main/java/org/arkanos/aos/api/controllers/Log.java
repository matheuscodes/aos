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

import java.util.Date;

/**
 * Controls the logging.
 * 
 * @version 1.0
 * @author Matheus Borges Teixeira
 */
public class Log {
	
	/**
	 * Logs an entry as an error.
	 * 
	 * @param who
	 *            should define the class calling.
	 * @param what
	 *            specifies a message to record.
	 */
	static public void error(String who, String what) {
		System.out.println("[ERROR] " + new Date(System.currentTimeMillis()) + " - " + who + ": " + what);
	}
	
}
