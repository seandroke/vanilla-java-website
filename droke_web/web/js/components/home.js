function home(id) {

    var content = `  
        <div class="jumbotron">
            <div class="text-card">
                <h1>Welcome to My Portfolio</h1>
                <p>This is a collection of my personal and professional works</p>
                <p>Here you will find...</p>
                <br />
                <p>A sample of my code base</p>
                <p>A description of my professional experiences</p>
                <p>A little about me and who I am</p>
            </div>
            <div class ="row">
                <div class="column-1">
                    <div class="image-card">
                        <img src="pics/github.jpg"/>
                        <br/>
                        <a href="https://github.com/seandroke">My GitHub</a>
                    </div>
                </div>
                <div class="column-2">
                    <div class="image-card">
                        <img src="pics/linkedin.png"/>
                        <br />
                        <a href="https://www.linkedin.com/in/seandroke/">My LinkedIn</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById(id).innerHTML = content;
}


