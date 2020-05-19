function showSlides(id) {
    
    var contentGrabber = document.getElementById(id);
    contentGrabber.innerHTML = "";
    
    var slideShowWrapper = document.createElement("div");
    slideShowWrapper.setAttribute("id", "slideshow-wrapper");
    contentGrabber.appendChild(slideShowWrapper);
    
    var userDiv = document.createElement("div");
    userDiv.setAttribute("id", "user-wrapper");
    slideShowWrapper.append(userDiv);
    userSlideBuilder("user-wrapper");
    
    var resumeDiv = document.createElement("div");
    resumeDiv.setAttribute("id", "resume-wrapper");
    slideShowWrapper.append(resumeDiv);
    resumeSlideBuilder("resume-wrapper");
    
}