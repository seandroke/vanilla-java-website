var resume = {};

(function () {

    resume.list = function(targetId) {

        var contentDOM = document.getElementById(targetId);
        contentDOM.innerHTML = "";

        ajax2({
            url: "webAPIs/listResumeAPI.jsp",
            successFn: success,
            errorId: targetId
        });

        function success(obj) {

            if (!obj) {
                contentDOM.innerHTML += "Http Request (from AJAX call) did not parse to an object.";
                return;
            }
            console.log(obj);

            if (obj.dbError.length > 0) {
                contentDOM.innerHTML += "Database Error Encountered: " + obj.dbError;
                return;
            }

            var div = document.createElement("div");
            div.style.textAlign = "center";
            contentDOM.appendChild(div);
            div.innerHTML = `
                <h2>Resume List</h2>
                Search Filter:
            `;

            var searchBox = document.createElement("input");
            searchBox.setAttribute("type", "text");
            div.appendChild(searchBox);

            var tableDiv = document.createElement("div");
            contentDOM.appendChild(tableDiv);

            var resumeList = [];
            for (var i = 0; i < obj.resumeList.length; i++) {
                resumeList[i] = {};
                resumeList[i].identification = obj.resumeList[i].resume_id + "<br />Identifier: " + obj.resumeList[i].identifier;
                resumeList[i].image = obj.resumeList[i].image_url;
                resumeList[i].jobTitle = obj.resumeList[i].job_title;
                resumeList[i].companyName = obj.resumeList[i].company_name;
                resumeList[i].dates = "Start Date: " + obj.resumeList[i].start_date + "<br />End Date: " + obj.resumeList[i].end_date;
                resumeList[i].jobDescription = obj.resumeList[i].job_description;
                resumeList[i].webUserId = obj.resumeList[i].web_user_id;
                resumeList[i].userInformation = "Email: " + obj.resumeList[i].user_email + "<br />User Password: " + obj.resumeList[i].user_password + "<br />User Birthday: " + obj.resumeList[i].birthday;
                resumeList[i].membershipFee = obj.resumeList[i].membership_fee;
                resumeList[i].userRoleId = obj.resumeList[i].user_role_id;
                resumeList[i].update = "<img src='" + CRUD_icons.update + "' alt='update icon' onclick='resume.updateUI(" + obj.resumeList[i].resume_id + ", `" + targetId + "` )' />";
                resumeList[i].delete = "<img src='" + CRUD_icons.delete + "' alt='delete icon' onclick='resume.delete(" + obj.resumeList[i].resume_id + ",this)'  />";
            }


            tableBuilder.build({
                list: resumeList,
                target: tableDiv,
                style: "data",
                orderPropName: "identifier",
                searchKeyElem: searchBox,
                reverse: false,
                imgWidth: "50px"
            });
        }

    };

    resume.delete = function (resumeId, targetId) {
        console.log(resumeId);
        if (confirm("Do you really want to delete resume " + resumeId + "? ")) {
            console.log("run");
            ajax2({
                url: "webAPIs/deleteResumeAPI.jsp?deleteId= " + resumeId,
                successFn: successDelete,
                errorId: targetId
            });
        }
        function successDelete(obj){
            if (obj.errorMsg === ""){
                alert("Resume deleted succesfully");
                resume.list("content");
            }
            else{
                alert("user not deleted. Reason: " + obj.errorMsg);
            }
            console.log(obj);
            return;
        }

    };
    
        // this code called by insertUI and updateUI -- shared common code. 
    function createInsertUpdateArea (isUpdate, targetId) {

        // set variables as if it will be insert...
        var webUserIdRowStyle = ' style="display:none" '; // hide row with webUserId
        var saveFn = "resume.insertSave()";
        
        // change variables for update
        if (isUpdate) {
            webUserIdRowStyle = ""; // don't hide row with webUserId 
            saveFn = "resume.updateSave()";
        }

        var html = `
            <div id="insertArea">
                <div id="ajaxError">&nbsp;</div>
                <table>
                    <tr ${webUserIdRowStyle}>
                        <td>Resume ID</td>
                        <td><input type="text"  id="resume_id" disabled /></td>
                        <td id="resume_id_error" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Identifier</td>
                        <td><input type="text"  id="identifier" /></td>
                        <td id="identifier_error" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Image URL</td>
                        <td><input type="text"  id="image_url" /></td>
                        <td id="image_url_error" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Job Title</td>
                        <td><input type="text"  id="job_title" /></td>
                        <td id="job_title_error" class="error"></td>
                    </tr>
                    <tr>
                        <td>Company Name</td>
                        <td><input type="text"  id="company_name" /></td>
                        <td id="company_name_error" class="error"></td>
                    </tr>
                    <tr>
                        <td>Start Date</td>
                        <td><input type="text"  id="start_date" /></td>
                        <td id="start_date_error" class="error"></td>
                    </tr>
                    <tr>
                        <td>End Date</td>
                        <td><input type="text"  id="end_date" /></td>
                        <td id="end_date_error" class="error"></td>
                    </tr>
                    <tr>
                        <td>Job Description</td>
                        <td><input type="text"  id="job_description" /></td>
                        <td id="job_description_error" class="error"></td>
                    </tr>
                    <tr>
                        <td>User Email</td>
                        <td>
                            <select id="emailPickList">
                            <!-- JS code will make ajax call to get all the roles 
                            then populate this select tag's options with those roles -->
                            </select>
                        </td>
                        <td id="emailError" class="error"></td>
                    </tr>
                    <tr>
                        <td><button onclick="${saveFn}">Save</button></td>
                        <td id="recordError" class="error"></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        `;

        document.getElementById(targetId).innerHTML = html;
    }
    
    resume.updateUI = function (webUserId, targetId) {
        window.location.hash = "#/resumeUpdate";
        createInsertUpdateArea(true, targetId); // first param is isUpdate (boolean)
        ajax2({
            url: "webAPIs/getResumeByIdAPI.jsp?URLid=" + webUserId,
            successFn: proceed,
            errorId: "ajaxError"
        });
        function proceed(obj) { // obj is what got JSON.parsed from Web API's output
            dbDataToUI(obj);
        }
    };
    
    function dbDataToUI(obj) {
        
        console.log(obj);

        var webUserObj = obj.resume.resumeList[0];
        var emailList = obj.emailInfo.emailList;

        document.getElementById("resume_id").value = webUserObj.resume_id;
        document.getElementById("identifier").value = webUserObj.identifier;
        document.getElementById("image_url").value = webUserObj.image_url;
        document.getElementById("job_title").value = webUserObj.job_title;
        document.getElementById("company_name").value = webUserObj.company_name;
        document.getElementById("start_date").value = webUserObj.start_date;
        document.getElementById("end_date").value = webUserObj.end_date;
        document.getElementById("job_description").value = webUserObj.job_description;
        Utils.makePickList({
           id: "emailPickList",
           list: emailList,
           valueProp: "user_email",
           keyProp: "web_user_id",
           selectedKey: webUserObj.web_user_id
        });
    }

    resume.insertUI = function (targetId){

        var html = `
            <div id="insertArea">
                <br/>
                <table>
                    <tr>
                        <td>Job Idenitifier</td>
                        <td><input type="text"  id="identifier" /></td>
                        <td id="identifierError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Image URL</td>
                        <td><input type="text"  id="imageURL" /></td>
                        <td id="imageURLError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Job Title</td>
                        <td><input type="text" id="jobTitle" /></td>
                        <td id="jobTitleError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Company Name</td>
                        <td><input type="text" id="companyName" /></td>
                        <td id="companyNameError" class="error"></td> 
                    </tr>
                    <tr>
                        <td>Start Date</td>
                        <td><input type="text" id="startDate" /></td>
                        <td id="startDateError" class="error"></td>
                    </tr>
                    <tr>
                        <td>End Date</td>
                        <td><input type="text" id="endDate" /></td>
                        <td id="endDateError" class="error"></td>
                    </tr>
                    <tr>
                        <td>Job Description</td>
                        <td><input type="text" id="jobDescription" /></td>
                        <td id="jobDescriptionError" class="error"></td>
                    </tr>
                    <tr>
                        <td>User Selection</td>
                        <td>
                            <select id="userPickList">
                            <!-- JS code will make ajax call to get all the roles 
                            then populate this select tag's options with those roles -->
                            </select>
                        </td>
                        <td id="userPickListError" class="error"></td>
                    </tr>
                    <tr>
                        <!-- see js/insertUser.js to see the insertUser function (make sure index.html references the js file) -->
                        <td><button onclick="resume.insertSave()">Save</button></td>
                        <td id="recordError" class="error"></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        `;

        document.getElementById(targetId).innerHTML = html;

        ajax2({
            url: "webAPIs/listUsersAPI.jsp",
            successFn: setUserPickList,
            errorId: "userPickListError"
        });

        function setUserPickList(jsonObj){
            console.log(jsonObj);

            if (jsonObj.dbError.length > 0) {
                document.getElementById("userPickListError").innerHTML = jsonObj.dbError;
                return;
            }

            Utils.makePickList({
               id: "userPickList",
               list: jsonObj.webUserList,
               valueProp: "userEmail",
               keyProp: "webUserId"
            });

        }

    };

    function getUserDataFormUI() {

        var ddlist = document.getElementById("emailPickList");

        var userInputObj = {
            "resume_id": document.getElementById("resume_id").value,
            "identifier": document.getElementById("identifier").value,
            "image_url": document.getElementById("image_url").value,
            "job_title": document.getElementById("job_title").value,
            "company_name": document.getElementById("company_name").value,
            "start_date": document.getElementById("start_date").value,
            "end_date": document.getElementById("end_date").value,
            "job_description": document.getElementById("job_description").value,
            "web_user_id": ddlist.options[ddlist.selectedIndex].value,
            "user_role_id": "",
            "user_email": "",
            "user_password": "",
            "birthday": "",
            "membership_fee": "",
            "errorMsg": ""
        };

        return encodeURIComponent(JSON.stringify(userInputObj));
    }

    function writeErrorObjToUI(jsonObj) {
        document.getElementById("identifier_error").innerHTML = jsonObj.identifier;
        document.getElementById("image_url_error").innerHTML = jsonObj.image_url;
        document.getElementById("job_title_error").innerHTML = jsonObj.job_title;
        document.getElementById("company_name_error").innerHTML = jsonObj.company_name;
        document.getElementById("start_date_error").innerHTML = jsonObj.start_date;
        document.getElementById("end_date_error").innerHTML = jsonObj.end_date;
        document.getElementById("job_description_error").innerHTML = jsonObj.job_description;
        document.getElementById("emailError").innerHTML = jsonObj.user_email;
        document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
    }

    resume.insertSave = function() {

        var myData = getUserDataFormUI();

        ajax2({
            url: "webAPIs/insertResumeAPI.jsp?jsonData=" + myData,
            successFn: processInsert,
            errorId: "recordError"
        });

        function processInsert(jsonObj) {

            if (jsonObj.errorMsg.length === 0) {
                jsonObj.errorMsg = "Record successfully inserted !!!";
            }
            writeErrorObjToUI(jsonObj);
        }
    };

    resume.find = function(targetId) {

    };
    
    resume.updateSave = function () {

        console.log("resume.updateSave was called");

        // create a user object from the values that the user has typed into the page.
        var myData = getUserDataFormUI();

        ajax2({
            url: "webAPIs/updateResumeAPI.jsp?jsonData=" + myData,
            successFn: processUpdate,
            errorId: "recordError"
        });

        function processUpdate(jsonObj) {

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully updated !!!";
            }

            writeErrorObjToUI(jsonObj);
        }

    };
}());