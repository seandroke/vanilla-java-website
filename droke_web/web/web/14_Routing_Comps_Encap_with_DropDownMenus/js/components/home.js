function home(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `
      <p>
        This is my Home Page Content !!!
      </p>
    
      <p>
        To test, click on the home link, the blog link, or (under the search icon) cars or users.
      </p>
    `;
    document.getElementById(id).innerHTML = content;
}