    function userSlideBuilder(id){
        var picList = [];

        ajax2({
            url: "webAPIs/listUsersAPI.jsp",
            successFn: successUsers,
            errorId: "error"
        });

        function successUsers(obj){
            for (var i = 0; i < obj.webUserList.length; i++) {
                var pictures = {};
                pictures['image'] = obj.webUserList[i].image;
                pictures['email'] = obj.webUserList[i].userEmail;
                picList.push(pictures);
            }

            // get reference to the DOM object inside which the SlideShow image 
            // and buttons will be created.

            var slideShow = document.getElementById(id);

            // add a div that will hold the image
            var div = document.createElement("div");
            div.setAttribute("id", "user-pics");
            slideShow.appendChild(div);

            // add image into the div & set the image's src attribute to show picture
            var myImage = document.createElement("img");
            div.append(myImage);
            myImage.src = picList[0].image;

            var mySubHeader = document.createElement("P");
            mySubHeader.innerHTML = picList[0].email + "<br></br>";
            div.append(mySubHeader);

            // add back button under the image 
            var backButton = document.createElement("button");
            backButton.innerHTML = " &lt; ";
            div.append(backButton);

            // add forward button under the image 
            var fwdButton = document.createElement("button");
            fwdButton.innerHTML = " &gt; ";
            div.append(fwdButton);

            // private variable that keeps track of which image is showing
            var picNum = 0;

            // Advance to next image in the picture list
            function nextPic() {
                picNum++;
                if (picNum >= picList.length) {
                    picNum = 0;
                }
                // change the src attribute of the image element to the desired new image)				
                myImage.src = picList[picNum].image;
                mySubHeader.innerHTML = picList[picNum].email + "<br />";
            }

            // Go to the previous image in the picture list
            function prevPic() {
                picNum--;
                if (picNum < 0) {
                    picNum = picList.length - 1;
                }
                // change the src attribute of the image element to the desired new image)				
                myImage.src = picList[picNum].image;
                mySubHeader.innerHTML = picList[picNum].email + "<br />";
            }

            // add previous and back functionality to the previous and back buttons.
            backButton.onclick = prevPic;
            fwdButton.onclick = nextPic;

            slideShow.setPicNum = function (newNum) {
                if ((newNum >= 0) && (newNum < picList.length)) {
                    picNum = newNum;
                    // change the src attribute of the image element to the desired new image)				
                    myImage.src = picList[picNum].image;
                    mySubHeader.innerHTML = picList[picNum].email + "<br />";
                }
            };
            
            var deleteButton = document.createElement("Button");
            deleteButton.setAttribute("id", "delete-button");
            deleteButton.innerHTML = "Delete Picture";
            div.append(deleteButton);
            
            function deletePic(){
                if(picList.length === 1){
                    alert("Error cannot delete the entire slide show show");
                    return;
                }
                picList.splice(picNum, picNum+1);
                console.log(picList);
                nextPic();
                return;
            }
            
            deleteButton.onclick = deletePic;
            
            return;
        }
    }

