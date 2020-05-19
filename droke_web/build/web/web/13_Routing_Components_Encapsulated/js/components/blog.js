function blog(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `  
      <p>
        This is my blog about some really great JavaScript code that I wrote.
      </p>
    `;
    document.getElementById(id).innerHTML = content;
}