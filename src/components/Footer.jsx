import React from "react";

function Footer() {
  return (
    <footer>
      <div className="personal-infos">
        {" "}
        <li>Agnès Cappello</li>
        <li>06 19 16 14 97</li>
        <li>senga.ds@gmail.com</li>
      </div>
      <div className="pic">
        <img src="profilVignette.png" alt="profilpic" />
      </div>
      <div className="links">
        <li>
          <a
            href="https://github.com/senga200"
            target="_blank"
            rel="noopener noreferrer"
          >
            tu My Github
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/agn%C3%A8s-cappello-4682b9257/"
            target="_blank"
            rel="noopener noreferrer"
          >
            My Linkedin
          </a>
        </li>
      </div>
    </footer>
  );
}

export default Footer;
