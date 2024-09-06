import './index.css'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }
  return (
    <nav className="navbar">
      <div className="navbar-container-desktop">
        <Link to="/" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="nav-logo"
            alt="website logo"
          />
        </Link>
        <ul className="nav-items-list">
          <Link to="/" className="nav-link">
            <li className="nav-item">Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li className="nav-item">Jobs</li>
          </Link>
        </ul>
        <button className="logout-button-desktop" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="navbar-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="nav-logo"
          alt="website logo"
        />
        <ul className="nav-items-list">
          <Link to="/" className="nav-link">
            <li className="nav-item-mobile">
              <AiFillHome className="nav-icon" />
            </li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li className="nav-item-mobile">
              <BsBriefcaseFill className="nav-icon" />
            </li>
          </Link>

          <li className="nav-item-mobile" onClick={onClickLogout}>
            <FiLogOut className="nav-icon" />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
