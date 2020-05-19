/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.Resume;
import model.Resume.*;
import dbUtils.DbConn;
import dbUtils.PrepStatement;
import dbUtils.ValidationUtils;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.webUser.StringData;

/**
 *
 * @author SeanDroke
 */
public class DbMods {
    public static String delete(String resumeId, DbConn dbc) {

        if (resumeId == null) {
            return "Error in model.Resume.DbMods.delete: cannot delete resume record because 'resumeId' is null";
        }

        // This method assumes that the calling Web API (JSP page) has already confirmed 
        // that the database connection is OK. BUT if not, some reasonable exception should 
        // be thrown by the DB and passed back anyway... 
        String result = ""; // empty string result means the delete worked fine.
        try {

            String sql = "DELETE FROM resume WHERE resume_id = ?";

            // This line compiles the SQL statement (checking for syntax errors against your DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, resumeId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                result = "Record not deleted - there was no record with resume_id " + resumeId;
            } else if (numRowsDeleted > 1) {
                result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            result = "Exception thrown in model.Resume.DbMods.delete(): " + e.getMessage();
        }

        return result;
    }
    
    private static StringDataResume validate(StringDataResume inputData) {

        StringDataResume errorMsgs = new StringDataResume();

        errorMsgs.identifier = ValidationUtils.stringValidationMsg(inputData.identifier, 10000, true);
        errorMsgs.image_url = ValidationUtils.stringValidationMsg(inputData.image_url, 10000, true);
        errorMsgs.job_title = ValidationUtils.stringValidationMsg(inputData.job_title, 10000, true);
        errorMsgs.company_name = ValidationUtils.stringValidationMsg(inputData.company_name, 10000, true);
        if(inputData.start_date != null){
            errorMsgs.start_date = ValidationUtils.dateValidationMsg(inputData.start_date, false);
        }
        if(inputData.end_date != null){
           errorMsgs.end_date = ValidationUtils.dateValidationMsg(inputData.end_date, false); 
        }
        errorMsgs.job_description = ValidationUtils.stringValidationMsg(inputData.job_description, 10000, true);
        //errorMsgs.web_user_id = ValidationUtils.integerValidationMsg(inputData.web_user_id, true);

        return errorMsgs;
    }
    
    public static StringDataResume update(StringDataResume inputData, DbConn dbc) {

        StringDataResume errorMsgs = new StringDataResume();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            String sql = "UPDATE resume SET identifier=?, image_url=?, job_title=?, company_name=?, start_date=?, end_date=?, job_description=?, web_user_id=?"
                    + " WHERE resume_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setInt(9, ValidationUtils.integerConversion(inputData.resume_id));
            pStatement.setString(1, inputData.identifier); // string type is simple
            pStatement.setString(2, inputData.image_url);
            pStatement.setString(3, inputData.job_title);
            pStatement.setString(4, inputData.company_name);
            pStatement.setDate(5, ValidationUtils.dateConversion(inputData.start_date));
            pStatement.setDate(6, ValidationUtils.dateConversion(inputData.end_date));
            pStatement.setString(7, inputData.job_description);
            //pStatement.setString(8, inputData.user_email);
            pStatement.setInt(8, ValidationUtils.integerConversion(inputData.web_user_id));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update
    
    public static StringDataListResume findById (DbConn dbc, String id) {
        
        StringDataListResume sdl = new StringDataListResume();
        try {
            String sql = "SELECT resume_id, identifier, image_url, job_title, company_name, "+
                    "start_date, end_date, job_description, resume.web_user_id, user_email, user_password, birthday, membership_fee, user_role_id "+
                    "FROM resume, web_user where resume.web_user_id = web_user.web_user_id " + 
                    "AND resume_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first 
            // (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringDataResume sd = new StringDataResume();
            sd.errorMsg = "Exception thrown in ResumeView.getUserById(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;

    } // getUserById
    
    public static StringDataResume insert(StringDataResume inputData, DbConn dbc) {

        StringDataResume errorMsgs = new StringDataResume();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                  String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            // Start preparing SQL statement
            String sql = "INSERT INTO resume (identifier, image_url, job_title, company_name, start_date, end_date, job_description, web_user_id)"
                    + " values (?,?,?,?,?, ?, ?, ?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.identifier); // string type is simple
            pStatement.setString(2, inputData.image_url);
            pStatement.setString(3, inputData.job_title);
            pStatement.setString(4, inputData.company_name);
            pStatement.setDate(5, ValidationUtils.dateConversion(inputData.start_date));
            pStatement.setDate(6, ValidationUtils.dateConversion(inputData.end_date));
            pStatement.setString(7, inputData.job_description);
            pStatement.setInt(8, ValidationUtils.integerConversion(inputData.web_user_id));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Web User";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That entry is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert
    
}
