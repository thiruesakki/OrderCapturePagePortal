package com.brakepartsinc.project.techportal.login;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class TPLogin_Test implements LoginHandler_Test {

	public static final String PARAMETER_USER_ID = "mgnlUserId";

	public static final String PARAMETER_PSWD = "mgnlUserPSWD";

	public boolean handle(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("*** Inside handle");
		String userid = request.getParameter(PARAMETER_USER_ID);
		if (userid != null && "".equals(userid) == false) {
			String pswd = request.getParameter(PARAMETER_PSWD);
			System.out.println("*** UserID:[" + userid + "], Pswd:[" + pswd + "]");
			if (userid != null && "".equals(userid) == false) {
				System.out.println("*** Valid User Checking");
				if(userid.equals("test@ennvee.com")){
					return true;
				}
			}
			return false;
		}
		return false;
	}

	
}
