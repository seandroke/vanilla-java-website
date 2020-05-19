function blog(id) {

    var content = `
        <br />
        <h3>Entry 1</h3>
        <i>Date: Tuesday, September 10, 2019</i>
        <br />
        <p>I have worked on the full stack for some time now. I spent time working for Tierney Communications on front end web design and later as a full stack development intern for The Interpublic Group. This past Summer, I worked for Comcast as a Network Automation Engineering Intern where I build an internal tool using React/Django. Last week I learned more about developing without frameworks, up until this point I have only ever used frameworks to accomplish web development projects.</p>
        <br /><br />
        <h3>Entry 2</h3>
        <i>Date: Tuesday, September 10, 2019</i>
        <br />
        <p>My experience with databases professionally has been with Microsoft SQL Server. I have also spent time working with SQL Lite which ships natively with Django and works very well when spinning up smaller rest framework API's. I did not find the database part of the assignment to be very difficult. If anything, I had to review the syntax for how MySQL does joins statements.</p>
        <a href="screenshots.docx">Link to Screenshots</a>
        <br /><br /><br />
        <h3>Entry 3</h3>
        <i>Date: Tuesday, September 10, 2019</i>
        <p>In the routing/web part of the assignment I learned more about how the routers built into frameworks such as react and angular work. It is very interesting to understand the logic behind frameworks, making them easier to debug in the future.</p>
        <br /><br /><br />
        <h3>Entry 4</h3>
        <i>Date: Wednesday, September 18, 2019</i>
        <p>Professionally, I have had some experience working with server side database code. I spent an internship developing in PHP and worked extensively with a Microsoft SQL server database to gather, massage, and route data to the front end. I have also used Django's REST framework to build light weight databases for fast and simple API's. This week I learned how a model view controller would be implemented in Java, up until now I have not used Java for web development purposes and never really considered it as a backend language. I found the most difficult part of the assignment to be emulating the directory structure. You have to be very thorough with reading the directions such to not slip up throughout the assignment.</p>
        <a href="errors.docx">Link to Errors</a>
        <br />
        <a href="webAPIs/listUsersAPI.jsp">Link to List Users API</a>
        <br />
        <a href="webAPIs/listResumeAPI.jsp">Link to List Resume API</a>
        <br /><br /><br />
        <h3>Entry 5</h3>
        <i>Date: Wednesday, September 25, 2019</i>
        <p>This week, I used the API's created in a previous assignment to generate a few tables that can be searched. I did not fine this assignment to be overly difficult as most of the heavy lifting was done last week with ensuring the API was functional. This step mainly involved organizing the data on the page in a meaningful way. I found that styling the table efficiently was difficult given the data that I was intaking. It was very challenging to get it to look appropriate given how much data I had. I am still working on a more permanent solution to this problem but for now I ensured the table would not expand past the width of the viewing page.</p>
        <br /><br /><br />
        <h3>Entry 6</h3>
        <i>Date: Sunday, October 6, 2019</i>
        <p>This week, I implemented a slide show feature on the project site. This was by far the most difficult implementation I have made up to this point. I encountered an issue wherein variables were not being instatiated correctly given the asynchronous ajax call. As such, the objects I was creating via an API call to populate the page were not correct and caused console errors. Soon after, I ended up seperating the users and resume calls into seperate files and created page elements independently and used showSlides.js as a controller to tie everything together. All together it is functional but the process was not as easy as I had hoped.</p>
        <br /><br /><br />
        <h3>Entry 7</h3>
        <i>Date: Sunday, October 16, 2019</i>
        <p>This week, we created the login functionality for the site. It was challenging to tie everything together but I was more familiar with this process due to past work experience. I do not typically use java and JSP's to build back end functionality but it was not overly difficult to familiarize myself with them enough to complete this task.</p>
        <br /><br /><br />
        <h3>Entry 8</h3>
        <i>Date: Wednesday, October 23, 2019</i>
        <p>This week, we implmented delete functionality for the database tables within our website. This assignment was very similar to the lab activity so I did not feel it was overly complex. It is not the most secure approach as the instructions do not ask us to validate to ensure a user is logged in with ample credentials to remove elements from the database but it certainly illustrates how an implementation of delete functionality would run on a web page.</p>
        <br /><br /><br />
        <h3>Entry 9</h3>
        <i>Date: Wednesday, November 6, 2019</i>
        <p>This week, we implemented the insert user and insert resume funcitonality for the site. I felt the sample code was more than sufficient in guiding me through what was expected and I was able to adapt my resume table to function similarly to the user table. The most challenging part was making sure that all possible errors were validated for and a message displayed to the user that was not overly obtrusive or difficult to understand. Once all was finished, I conducted ample testing of both this feature and all other features we have implemented this semester to ensure full functionality.</p>
        <br /><br /><br />
        <h3>Entry 10</h3>
        <i>Date: Wednesday, November 13, 2019</i>
        <p>This week, we implemented the update functionality to our websites. This was not overly difficult as the bulk of the work was done in our lab this past week. Still, some effort was required to populate the selector for user email and connect it with the web user id foreign key in my resume table. It took some trial an error, especially given how expansive our file structure has become after so many weeks of assignments. In the end, all is functional.</p>
    `;
    document.getElementById(id).innerHTML = content;
}


