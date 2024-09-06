import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  on_progress: 'ON_PROGRESS',
}
class Profile extends Component {
  state = {profileDetails: {}, apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getProfile()
  }

  onClickRetryButton = () => {
    this.getProfile()
  }

  getProfile = async () => {
    const token = Cookies.get('jwt_token')

    this.setState({apiStatus: apiConstants.on_progress})
    const URL = 'https://apis.ccbp.in/profile'
    const options = {method: 'GET', headers: {Authorization: `Bearer ${token}`}}
    const response = await fetch(URL, options)
    if (response.ok) {
      const data = await response.json()
      const profileDetailsData = data.profile_details
      const updatedData = {
        name: profileDetailsData.name,
        profileImgUrl: profileDetailsData.profile_image_url,
        shortBio: profileDetailsData.short_bio,
      }
      this.setState({
        apiStatus: apiConstants.success,
        profileDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderProfileSuccess = () => {
    const {profileDetails} = this.state
    const {name, profileImgUrl, shortBio} = profileDetails
    return (
      <div className="profile-card">
        <img src={profileImgUrl} className="profile-card-image" alt="profile" />
        <h1 className="profile-card-name">{name}</h1>
        <p className="profile-card-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileFailure = () => (
    <button className="retry-button" onClick={this.onClickRetryButton}>
      Retry
    </button>
  )

  renderProfile = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiConstants.on_progress:
        return this.renderLoading()
      case apiConstants.success:
        return this.renderProfileSuccess()
      case apiConstants.failure:
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-container">
        {this.renderProfile()}
        <hr className="separator" />
      </div>
    )
  }
}
export default Profile
