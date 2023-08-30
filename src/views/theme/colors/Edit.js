import React, { useState, useEffect } from 'react'
import List from './List'
import PropTypes from 'prop-types'

import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CInputGroup,
  CFormInput,
  CButton,
} from '@coreui/react'

const Edit = ({ listData }) => {
  const [startingStation, setStartingStation] = useState('')
  const [endingStation, setEndingStation] = useState('')
  const [filteredTrains, setFilteredTrains] = useState([])
  const [showResults, setShowResults] = useState(false)

  const handleSearch = () => {
    const filtered = listData.filter(
      (train) =>
        train.DailyTrainInfo.StartingStationName.Zh_tw.includes(startingStation) &&
        train.DailyTrainInfo.EndingStationName.Zh_tw.includes(endingStation),
    )
    setFilteredTrains(filtered)
    setShowResults(true)
  }

  return (
    <div>
      <div className="mb-3">
        <CInputGroup className="mb-3">
          <select
            className="form-select"
            value={startingStation}
            onChange={(e) => setStartingStation(e.target.value)}
          >
            <option value="" disabled>
              起始站
            </option>
            <option value="左營">左營</option>
            <option value="南港">南港</option>
            <option value="台北">台北</option>
          </select>
          <select
            className="form-select"
            value={endingStation}
            onChange={(e) => setEndingStation(e.target.value)}
          >
            <option value="" disabled>
              終點站
            </option>
            <option value="左營">左營</option>
            <option value="南港">南港</option>
            <option value="台北">台北</option>
          </select>
          <CButton color="primary" onClick={handleSearch}>
            搜尋
          </CButton>
        </CInputGroup>
      </div>
      <List listData={filteredTrains.length > 0 ? filteredTrains : listData} />
    </div>
  )
}

Edit.propTypes = {
  listData: PropTypes.arrayOf(
    PropTypes.shape({
      DailyTrainInfo: PropTypes.shape({
        StartingStationName: PropTypes.shape({
          Zh_tw: PropTypes.string,
        }),
        EndingStationName: PropTypes.shape({
          Zh_tw: PropTypes.string,
        }),
      }),
    }),
  ),
}

export default Edit
