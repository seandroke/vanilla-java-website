function home() {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `
      <p>
        This is my Home Page Content !!!
      </p>
    `;
    document.getElementById("view").innerHTML = content;
}