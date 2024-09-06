import './index.css'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarJobsItem = props => {
  const {jobDetails} = props
  const {
    id,
    location,
    rating,
    title,
    jobDescription,
    employmentType,
    companyLogoUrl,
  } = jobDetails

  return (
    <li className="similar-jobs-item">
      <div className="similar-jobs-logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-jobs-logo"
        />
        <div className="similar-jobs-heading-container">
          <h1 className="similar-jobs-title">{title}</h1>
          <div className="similar-jobs-rating-container">
            <FaStar className="similar-jobs-rating-icon" />
            <p className="similar-jobs-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-jobs-description-heading">Description</h1>
      <p className="similar-jobs-description">{jobDescription}</p>
      <div className="similar-jobs-icons-container">
        <div className="similar-jobs-icon-container">
          <IoLocationSharp className="similar-jobs-details-icon" />
          <p className="similar-jobs-icon-text">{location}</p>
        </div>
        <div className="similar-jobs-icon-container">
          <BsBriefcaseFill className="similar-jobs-details-icon" />
          <p className="similar-jobs-icon-text">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobsItem
