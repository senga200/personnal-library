import React from "react";

function Footer() {
  return (
    <footer>
      <div className="personal-infos">
        {" "}
        <p>Agnès Cappello</p>
        <p>06 19 16 14 97</p>
        <p>senga.ds@gmail.com</p>
      </div>
      <div className="links">
        <a
          href="https://github.com/senga200"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/agn%C3%A8s-cappello-4682b9257/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Linkedin
        </a>
      </div>
    </footer>
  );
}

export default Footer;
