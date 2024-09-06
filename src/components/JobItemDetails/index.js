import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {RiExternalLinkFill} from 'react-icons/ri'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import SimilarJobsItem from '../SimilarJobsItem/index'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  on_progress: 'ON_PROGRESS',
}
class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    similarJobsList: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getJobItem()
  }

  onClickJobsItemRetry = () => {
    this.getJobItem()
  }

  getJobItem = async () => {
    const token = Cookies.get('jwt_token')
    this.setState({apiStatus: apiConstants.on_progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const URL = `https://apis.ccbp.in/jobs/${id}`
    const options = {method: 'GET', headers: `Authorization: Bearer ${token}`}
    const response = await fetch(URL, options)

    if (response.ok) {
      const data = await response.json()
      const jobDetails = data.job_details
      const updatedItemData = {
        id: jobDetails.id,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        rating: jobDetails.rating,
        skills: jobDetails.skills,
        packagePerAnnum: jobDetails.package_per_annum,
        title: jobDetails.title,
      }
      const updatedSkills = jobDetails.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))
      const updatedLifeAtCompany = {
        imageUrl: jobDetails.life_at_company.image_url,
        description: jobDetails.life_at_company.description,
      }
      const similarJobs = data.similar_jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      const updatedData = {updatedItemData, updatedSkills, updatedLifeAtCompany}

      this.setState({
        jobItemDetails: updatedData,
        similarJobsList: similarJobs,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSimilarJobs = () => {
    const {similarJobsList} = this.state
    return (
      <>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobsList.map(eachJob => (
            <SimilarJobsItem jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </>
    )
  }

  renderJobItem = () => {
    const {jobItemDetails} = this.state
    const {updatedItemData, updatedLifeAtCompany, updatedSkills} =
      jobItemDetails
    const {
      id,
      packagePerAnnum,
      rating,
      jobDescription,
      location,
      employmentType,
      companyLogoUrl,
      companyWebsiteUrl,
      title,
    } = updatedItemData

    return (
      <div className="job-item-details-container">
        <div className="job-item-details-logo-container">
          <img
            className="job-item-logo"
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div className="job-item-heading-container">
            <h1 className="job-item-title">{title}</h1>
            <div className="job-item-rating-container">
              <FaStar className="job-item-rating-icon" />
              <p className="job-item-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-item-package-details-container">
          <div className="job-item-icons-container">
            <div className="job-item-icon-container">
              <IoLocationSharp className="job-item-details-icon" />
              <p className="job-item-icon-text">{location}</p>
            </div>
            <div className="job-item-icon-container">
              <BsBriefcaseFill className="job-item-details-icon" />
              <p className="job-item-icon-text">{employmentType}</p>
            </div>
          </div>
          <p className="job-item-package-text">{packagePerAnnum}</p>
        </div>
        <hr className="separator" />
        <div className="description-container">
          <h1 className="job-item-side-heading">Description</h1>
          <a href={companyWebsiteUrl} className="visit-container">
            <h1 className="visit-text">Visit</h1>
            <RiExternalLinkFill className="external-link-icon" />
          </a>
        </div>
        <p className="job-item-description">{jobDescription}</p>
        <div className="skills-container">
          <h1 className="job-item-side-heading">Skills</h1>
          <ul className="job-item-skills-list">
            {updatedSkills.map(eachSkill => (
              <li className="skills-item" key={eachSkill.name}>
                <img
                  className="skills-image"
                  alt={eachSkill.name}
                  src={eachSkill.imageUrl}
                />
                <p className="skills-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="life-at-company-section">
          <h1 className="job-item-side-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="job-item-description">
              {updatedLifeAtCompany.description}
            </p>
            <img
              src={updatedLifeAtCompany.imageUrl}
              className="life-at-company-image"
              alt="life at company"
            />
          </div>
        </div>
      </div>
    )
  }

  renderJobItemFailure = () => (
    <div className="jobs-item-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="jobs-item-failure-image"
        alt="failure view"
      />
      <h1 className="jobs-item-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-item-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-button" onClick={this.onClickJobsItemRetry}>
        retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.on_progress:
        return this.renderLoading()
      case apiConstants.success:
        return this.renderJobItem()
      case apiConstants.failure:
        return this.renderJobItemFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-page">
          {this.renderJobs()}
          {this.renderSimilarJobs()}
        </div>
      </>
    )
  }
}
export default JobItemDetails
