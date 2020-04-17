package com.brakepartsinc.project.techportal.login;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Called by the {@link LoginFilter}.
 */
public interface LoginHandler_Test {
    /**
     * Returns a login result or {@link LoginResult#NOT_HANDLED} if the handler
     * can't handle the request.
     */
    public boolean handle(HttpServletRequest request,
                              HttpServletResponse response);

}