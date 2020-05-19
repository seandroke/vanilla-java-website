package view;

// classes imported from java.sql.*
import model.Resume.StringDataResume;
import model.Resume.StringDataListResume;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

// classes in my project
import dbUtils.*;

public class ResumeView {

    public static StringDataListResume allResumeAPI(DbConn dbc) {

        //PreparedStatement stmt = null;
        //ResultSet results = null;
        StringDataListResume sdl = new StringDataListResume();
        try {
            String sql = "SELECT resume_id, identifier, image_url, job_title, company_name, "+
                    "start_date, end_date, job_description, resume.web_user_id, user_email, user_password, birthday, membership_fee, user_role_id "+
                    "FROM resume, web_user where resume.web_user_id = web_user.web_user_id " + 
                    "ORDER BY identifier ";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringDataResume sd = new StringDataResume();
            sd.errorMsg = "Exception thrown in OtherView.allOthersAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }

}
