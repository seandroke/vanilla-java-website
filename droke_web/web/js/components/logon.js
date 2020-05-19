function logon(id) {

    var content = `  
        <div id="login-form">
            <form action="webAPIs/logonAPI.jsp">
                Email Address: <input type="text" name="email"><br>
                Password: <input type="text" name="password"><br>
                <input id="submit-button" type="submit" value="Submit">
            </form>
        </div>
        <div id="msgSelector"></div>
    `;
    document.getElementById(id).innerHTML = content;
    
    ajax2({
        url: "webAPIs/getProfileAPI.jsp",
        successFn: successFoundProfile,
        errorId: "error"
    });
}

function successFoundProfile(obj){
    if(obj !== null){
        var msgSelector = document.getElementById("msgSelector");
        msgSelector.innerHTML = "";
        var container = document.createElement("div");
        container.id = "profile-wrapper";
        msgSelector.appendChild(container);
        var msg = document.createElement("p");
        msg.innerHTML = "Welcome Web User " + obj.webUserList[0].webUserId;
        container.appendChild(msg);
        var birthday = document.createElement("p");
        birthday.innerHTML = "Birthday: " + obj.webUserList[0].birthday;
        container.appendChild(birthday);
        var membershipFee = document.createElement("p");
        membershipFee.innerHTML = "Membership Fee: " + obj.webUserList[0].membershipFee;
        container.appendChild(membershipFee);
        var userRole = document.createElement("p");
        userRole.innerHTML = "User Role: " + obj.webUserList[0].userRoleId + " " + obj.webUserList[0].userRoleType;
        container.appendChild(userRole);
        var userImage = document.createElement("img");
        userImage.src = obj.webUserList[0].image;
        container.appendChild(userImage);
        document.getElementById("msgSelector").replace = msgSelector;
        
    }
}

function profile(id){
    
    ajax2({
        url: "webAPIs/getProfileAPI.jsp",
        successFn: successRetrieveProfile,
        errorId: "error"
    });
    
    var content = `
        <div id="user-profile">
            <h1>User not logged in or error occured.</h1>
        </div>
    `;
    
    document.getElementById(id).innerHTML = content;
    
    
}

function successRetrieveProfile(obj){
    console.log(obj);
    if(obj !== null && obj.webUserList[0].errorMsg === ""){
        console.log(obj);
        var msgSelector = document.getElementById("content");
        msgSelector.innerHTML = "";
        var container = document.createElement("div");
        container.id = "profile-wrapper";
        msgSelector.appendChild(container);
        var msg = document.createElement("p");
        msg.innerHTML = "Welcome Web User " + obj.webUserList[0].webUserId;
        container.appendChild(msg);
        var birthday = document.createElement("p");
        birthday.innerHTML = "Birthday: " + obj.webUserList[0].birthday;
        container.appendChild(birthday);
        var membershipFee = document.createElement("p");
        membershipFee.innerHTML = "Membership Fee: " + obj.webUserList[0].membershipFee;
        container.appendChild(membershipFee);
        var userRole = document.createElement("p");
        userRole.innerHTML = "User Role: " + obj.webUserList[0].userRoleId + " " + obj.webUserList[0].userRoleType;
        container.appendChild(userRole);
        var userImage = document.createElement("img");
        userImage.src = obj.webUserList[0].image;
        container.appendChild(userImage);
        document.getElementById("content").replace = msgSelector;
        
    }
    else if(obj !== null && obj.webUserList[0].errorMsg !== "") {
        var contentSelector = document.getElementById("content");
        contentSelector.innerHTML = "";
        var errorHeader = document.createElement("h1");
        errorHeader.innerHTML = "Error" + obj.webUserList[0].errorMsg;
        contentSelector.appendChild(errorHeader);
        document.getElementById("content").replace = contentSelector;
    }
    else{
        var contentSelector = document.getElementById("content");
        contentSelector.innerHTML = "";
        var errorHeader = document.createElement("h1");
        errorHeader.innerHTML = "No User Logged In.";
        contentSelector.appendChild(errorHeader);
        document.getElementById("content").replace = contentSelector;
    }
}