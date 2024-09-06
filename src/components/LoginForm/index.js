import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showErrormsg: false, errorMsg: ''}

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrormsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const URL = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(URL, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsername = () => (
    <div className="input-container">
      <label className="label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        onChange={this.onUsernameChange}
        className="input"
        placeholder="username"
      />
    </div>
  )

  renderPassword = () => (
    <div className="input-container">
      <label className="label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        onChange={this.onPasswordChange}
        className="input"
        placeholder="password"
      />
    </div>
  )

  render() {
    const {showErrormsg, errorMsg} = this.state
    const token = Cookies.get('jwtToken')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="form-container">
        <form className="form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="form-logo"
          />
          {this.renderUsername()}
          {this.renderPassword()}
          <button
            type="submit"
            className="login-button"
            onClick={this.onSubmitForm}
          >
            Login
          </button>
          {showErrormsg && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm