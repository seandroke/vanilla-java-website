function home(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `
      <p>
        This is my Home Page Content !!! 
        The home and blog links should work.
      </p>
    `;
    document.getElementById(id).innerHTML = content;
}