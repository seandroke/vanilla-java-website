<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.Resume.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>
<%@page import="view.emailView"%>

<%

    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    ResumeWithRoles list = new ResumeWithRoles();

    String searchId = request.getParameter("URLid");
    if (searchId == null) {
        list.resume.dbError = "Cannot search for user - 'URLid' most be supplied";
    } else {

        DbConn dbc = new DbConn();
        list.resume.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.

        if (list.resume.dbError.length() == 0) { // if got good DB connection,

            System.out.println("*** Ready to call allUsersAPI");
            list.resume = DbMods.findById(dbc, searchId);
            list.emailInfo = emailView.getAllRoles(dbc);
        }

        dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.
    }
    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(list).trim());
%>