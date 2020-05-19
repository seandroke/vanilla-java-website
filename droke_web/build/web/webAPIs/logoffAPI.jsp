<%-- 
    Document   : logoffAPI
    Created on : Oct 16, 2019, 12:53:34 AM
    Author     : SeanDroke
--%>

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="com.google.gson.*" %>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    session.invalidate();
    response.sendRedirect("/droke_web/#/login");
%>
