<%-- 
    Document   : logonAPI.jsp
    Created on : Oct 15, 2019, 10:11:31 PM
    Author     : SeanDroke
--%>

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    String strEmail = request.getParameter("email");
    String strPassword = request.getParameter("password");
    
    StringDataList list = new StringDataList();
    
    DbConn dbc = new DbConn();
    list.dbError = dbc.getErr();

    if (list.dbError.length() == 0) {

        System.out.println("*** Ready to try login");
        list.add(DbMods.logonFind(strEmail, strPassword, dbc));
        session.setAttribute("userObject", list);
    }
    
    response.sendRedirect("/droke_web/#/login");
    

%>
