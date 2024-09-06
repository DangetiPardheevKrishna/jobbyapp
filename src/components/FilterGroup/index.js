import './index.css'

import {Component} from 'react'

class FilterGroup extends Component {
  renderEmploymentList = () => {
    const {employmentTypesList, activeRangeId} = this.props
    return employmentTypesList.map(eachEmployment => {
      const {activeEmploymentId, onChangeEmploymentType, ischecked} = this.props
      const onCheckinput = event => {
        ischecked(event, eachEmployment.employmentTypeId)
      }
      return (
        <li className="checkbox-input" key={eachEmployment.employmentTypeId}>
          <input
            type="checkbox"
            className="employment-input"
            value={activeEmploymentId}
            id={eachEmployment.employmentTypeId}
            onChange={onCheckinput}
          />
          <label
            className="employment-label"
            htmlFor={eachEmployment.employmentTypeId}
          >
            {eachEmployment.label}
          </label>
        </li>
      )
    })
  }

  renderEmploymentContainer = () => (
    <div className="employment-list-container">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="checkbox-list">{this.renderEmploymentList()}</ul>
      <hr className="separator" />
    </div>
  )

  renderRangesList = () => {
    const {salaryRangesList} = this.props
    return salaryRangesList.map(eachRange => {
      const {onChangeRangeInput} = this.props
      const onChangeRange = () => {
        onChangeRangeInput(eachRange.salaryRangeId)
      }
      return (
        <li className="radio-input" key={eachRange.salaryRangeId}>
          <input
            type="radio"
            className="range-input"
            value={eachRange.salaryRangeId}
            id={eachRange.salaryRangeId}
            name="ranges"
            onChange={onChangeRange}
          />
          <label className="range-label" htmlFor={eachRange.salaryRangeId}>
            {eachRange.label}
          </label>
        </li>
      )
    })
  }

  renderRangeContainer = () => (
    <div className="range-list-container">
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="range-list">{this.renderRangesList()}</ul>
    </div>
  )

  render() {
    return (
      <div>
        {this.renderEmploymentContainer()}
        {this.renderRangeContainer()}
      </div>
    )
  }
}
export default FilterGroup
