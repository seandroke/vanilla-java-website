package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.email.*;

// classes in my project
import dbUtils.*;

public class emailView {

    public static StringDataList getAllRoles(DbConn dbc) {

        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT web_user_id, user_email "
                    + "FROM web_user ORDER BY user_email ";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                sdl.add(results);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in EmailView.getAllRoles(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}
