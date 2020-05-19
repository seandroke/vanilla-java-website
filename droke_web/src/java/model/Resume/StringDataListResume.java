/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.Resume;

import java.sql.ResultSet;
import java.util.ArrayList;
import model.Resume.StringDataResume;

/**
 *
 * @author SeanDroke
 */
public class StringDataListResume {

    public String dbError = "";
    public ArrayList<StringDataResume> resumeList = new ArrayList();

    // Default constructor leaves StringDataList objects nicely set with properties 
    // indicating no database error and 0 elements in the list.
    public StringDataListResume() {
    }

    // Adds one StringData element to the array list of StringData elements
    public void add(StringDataResume stringDataResume) {
        this.resumeList.add(stringDataResume);
    }

    // Adds creates a StringData element from a ResultSet (from SQL select statement), 
    // then adds that new element to the array list of StringData elements.
    public void add(ResultSet results) {
        StringDataResume sd = new StringDataResume(results);
        this.resumeList.add(sd);
    }
}
