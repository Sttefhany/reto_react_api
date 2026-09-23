import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul className="menu">
        <li>
          <Link to="/escenario">Diviértete</Link>
        </li>
        <li>
          <Link to="/catalogo">Catálogo</Link>
        </li>
        <li>
          <Link to="/contacto">Contáctame</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;