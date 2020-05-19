/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.Resume;

import dbUtils.FormatUtils;
import java.sql.ResultSet;

/**
 *
 * @author SeanDroke
 */
public class StringDataResume {

    public String resume_id = "";
    public String identifier = "";
    public String image_url = "";
    public String job_title = "";
    public String company_name = "";
    public String start_date = "";   // Foreign Key
    public String end_date = ""; // getting it from joined user_role table.
    public String job_description = "";
    public String web_user_id = "";
    public String user_email = "";
    public String user_password = "";
    public String birthday = "";
    public String membership_fee = "";
    public String user_role_id = "";

    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringDataResume() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringDataResume(ResultSet results) {
        try {
            this.resume_id = FormatUtils.formatInteger(results.getObject("resume_id"));
            this.identifier = FormatUtils.formatString(results.getObject("identifier"));
            this.image_url = FormatUtils.formatString(results.getObject("image_url"));
            this.job_title = FormatUtils.formatString(results.getObject("job_title"));
            this.company_name = FormatUtils.formatString(results.getObject("company_name"));
            this.start_date = FormatUtils.formatDate(results.getObject("start_date"));
            this.end_date = FormatUtils.formatDate(results.getObject("end_date"));
            this.job_description = FormatUtils.formatString(results.getObject("job_description"));
            this.web_user_id = FormatUtils.formatInteger(results.getObject("web_user_id"));
            this.user_email = FormatUtils.formatString(results.getObject("user_email"));
            this.user_password = FormatUtils.formatString(results.getObject("user_password"));
            this.birthday = FormatUtils.formatDate(results.getObject("birthday"));
            this.membership_fee = FormatUtils.formatDollar(results.getObject("membership_fee"));
            this.user_role_id = FormatUtils.formatInteger(results.getObject("user_role_id"));
        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.Other.StringDataOther (the constructor that takes a ResultSet): " + e.getMessage();
        }
    }

    public int getCharacterCount() {
        String s = this.resume_id + this.identifier + this.image_url + this.job_title
                + this.company_name + this.start_date + this.end_date + this.job_description + this.web_user_id
                + this.user_email + this.user_password + this.birthday + this.membership_fee + this.user_role_id;
        return s.length();
    }

    public String toStringResume() {
        return "Resume ID:" + this.resume_id
                + ", Identifier: " + this.identifier
                + ", Image URL: " + this.image_url
                + ", Job Title: " + this.job_title
                + ", Company Name: " + this.company_name
                + ", Start Date: " + this.start_date
                + ", End Date: " + this.end_date
                + ", Company Name: " + this.company_name
                + ", Job Description: " + this.job_description
                + ", Company Name: " + this.company_name
                + ", Web User ID: " + this.web_user_id
                + ", User Email: " + this.user_email
                + ", User Password: " + this.user_password
                + ", Birthday: " + this.birthday
                + ", Membership Fee: " + this.membership_fee
                + ", User Role ID: " + this.user_role_id;
    }
}
