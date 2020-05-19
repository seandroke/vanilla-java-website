<%-- 
    Document   : getProfileAPI
    Created on : Oct 16, 2019, 12:37:26 AM
    Author     : SeanDroke
--%>

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="com.google.gson.*" %>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    StringDataList userObject = (StringDataList) session.getAttribute("userObject");
    Gson gson = new Gson();
    out.print(gson.toJson(userObject).trim());
%>
