import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import './App.css';
function Navigation() {
  const { t, i18n } = useTranslation();
  const handleLanuage = (lang) =>{
    i18n.changeLanguage(lang)
    
  }
  return (
    <Navbar expand="lg" className="nav" >
      <Container>
        <Navbar.Brand className="text-white" href="/home">{t("app_name")}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav >
            <Nav.Link className="text-white" href="/lessons">{t("lessons")}</Nav.Link>
            <Nav.Link className="text-white" href="/editor">{t("editor")}</Nav.Link>
            <a className="btn btn-primary " href="/signin" >{t("signin")}</a>
            <NavDropdown title={<span className="text-white">{t("language")}</span>} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=>{handleLanuage("ar")}}>{t("ar")}</NavDropdown.Item>
              
              <NavDropdown.Item onClick={()=>{handleLanuage("en")}} >{t("en")}</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
