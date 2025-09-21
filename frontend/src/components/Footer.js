import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-title">Pramodh T</h2>
        <p className="footer-subtitle">Text-to-SQL | AI</p>

        <div className="footer-links">
          <a href="mailto:pramodhperumal@gmail.com" target="_blank" rel="noopener noreferrer">
            <FaEnvelope /> Email
          </a>
          <a href="https://www.linkedin.com/in/pramodh-perumal-5a388a288/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
          <a href="https://github.com/16pramodh" target="_blank" rel="noopener noreferrer">
            <FaGithub /> GitHub
          </a>
          <a href="https://huggingface.co/16pramodh" target="_blank" rel="noopener noreferrer">
            <SiHuggingface /> HuggingFace
          </a>
        </div>

        <div className="footer-extra">
          <p> {new Date().getFullYear()} Pramodh T </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
