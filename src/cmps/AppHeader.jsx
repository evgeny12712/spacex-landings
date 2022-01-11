import { Link, withRouter } from 'react-router-dom';
import logo from '../assets/imgs/logo.png';
function _AppHeader() {
  return (
    <header className="app-header flex auto-center">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
    </header>
  );
}

export const AppHeader = withRouter(_AppHeader);
