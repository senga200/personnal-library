import React from "react";

function NavBar() {
  return (
    <div>
      <header>
        <h1>Personal Library</h1>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/books">Books</a>
            </li>
            <li>
              <a href="/authors">Authors</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default NavBar;
