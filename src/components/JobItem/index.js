import './index.css'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    packagePerAnnum,
    rating,
    jobDescription,
    location,
    employmentType,
    companyLogoUrl,
    title,
  } = jobDetails
  return (
    <div className="job-item-container">
      <Link className="job-link" to={`/jobs/${id}`}>
        <div className="logo-container">
          <img className="logo" src={companyLogoUrl} alt="company logo" />
          <div className="heading-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <FaStar className="rating-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details-container">
          <div className="job-icons-container">
            <div className="job-icon-container">
              <IoLocationSharp className="job-details-icon" />
              <p className="job-icon-text">{location}</p>
            </div>
            <div className="job-icon-container">
              <BsBriefcaseFill className="job-details-icon" />
              <p className="job-icon-text">{employmentType}</p>
            </div>
          </div>
          <p className="package-text">{packagePerAnnum}</p>
        </div>
        <hr className="separator" />
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </Link>
    </div>
  )
}

export default JobItem
