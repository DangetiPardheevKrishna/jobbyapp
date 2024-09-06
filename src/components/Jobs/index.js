import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Profile from '../Profile/index'
import Header from '../Header/index'
import FilterGroup from '../FilterGroup/index'
import JobItem from '../JobItem/index'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  on_progress: 'ON_PROGRESS',
}
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiConstants.initial,
    activeEmploymentId: [],
    activeRangeId: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  renderSearch = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onEnterSearchInput}
          value={searchInput}
        />

        <button
          aria-label="search button"
          type="button"
          className="search-button"
          data-testid="searchButton"
          onClick={this.onClickSearchButton}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  onClickJobsRetry = () => {
    this.getJobs()
  }

  onChangeRangeInput = activeRangeId => {
    this.setState({activeRangeId}, this.getJobs)
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  onClickSearchButton = () => {
    this.getJobs()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  ischecked = (event, employmentId) => {
    const {activeEmploymentId} = this.state
    if (event.target.checked) {
      activeEmploymentId.push(employmentId)
      this.setState({activeEmploymentId}, this.getJobs)
    } else if (!event.target.checked) {
      const updatedArray = activeEmploymentId.filter(
        eachType => eachType !== employmentId,
      )
      this.setState({activeEmploymentId: updatedArray}, this.getJobs)
    }
  }

  onChangeEmploymentType = activeEmploymentId => {
    this.setState({activeEmploymentId})
  }

  getJobs = async () => {
    const token = Cookies.get('jwt_token')
    this.setState({apiStatus: apiConstants.on_progress})
    const {activeRangeId, searchInput, activeEmploymentId} = this.state
    const activeEmploymentIdString = activeEmploymentId.join(',')
    const URL = `https://apis.ccbp.in/jobs?minimum_package=${activeRangeId}&search=${searchInput}&employment_type=${activeEmploymentIdString}`
    const options = {method: 'GET', headers: {Authorization: `Bearer ${token}`}}
    const response = await fetch(URL, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachData => ({
        id: eachData.id,
        companyLogoUrl: eachData.company_logo_url,
        employmentType: eachData.employment_type,
        jobDescription: eachData.job_description,
        location: eachData.location,
        rating: eachData.rating,
        packagePerAnnum: eachData.package_per_annum,
        title: eachData.title,
      }))
      this.setState({jobsList: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    const showJobsList = jobsList.length > 0
    return showJobsList ? (
      <ul className="jobs-list">
        {jobsList.map(eachJob => (
          <JobItem jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-found-image"
          alt="no jobs"
        />
        <h1 className="no-jobs-found-heading">No Jobs Found</h1>
        <p className="no-jobs-found-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderJobsFailure = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="jobs-failure-image"
        alt="failure view"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-button" onClick={this.onClickJobsRetry}>
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
        return this.renderJobsList()
      case apiConstants.failure:
        return this.renderJobsFailure()
      default:
        return null
    }
  }

  render() {
    const {activeRangeId, activeEmploymentId} = this.state
    return (
      <>
        <div className="jobs-page">
          <Header />
          <div className="jobs-container">
            <div className="profile-section">
              {' '}
              <Profile />
              <FilterGroup
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                onChangeRangeInput={this.onChangeRangeInput}
                activeRangeId={activeRangeId}
                activeEmploymentId={activeEmploymentId}
                onChangeEmploymentType={this.onChangeEmploymentType}
                ischecked={this.ischecked}
              />
            </div>
            <div className="jobs-section">
              {this.renderSearch()}
              {this.renderJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
