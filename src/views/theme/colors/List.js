import React from 'react'
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
const List = ({ listData }) => {
  return (
    <div>
      {listData && listData.length > 0 ? (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">車次號碼</CTableHeaderCell>
              <CTableHeaderCell scope="col">起始站</CTableHeaderCell>
              <CTableHeaderCell scope="col">終點站</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {listData.map((train) => (
              <CTableRow key={train.DailyTrainInfo.TrainNo}>
                <CTableDataCell>{train.DailyTrainInfo.TrainNo}</CTableDataCell>
                <CTableDataCell>{train.DailyTrainInfo.StartingStationName.Zh_tw}</CTableDataCell>
                <CTableDataCell>{train.DailyTrainInfo.EndingStationName.Zh_tw}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      ) : (
        <p></p>
      )}
    </div>
  )
}

List.propTypes = {
  listData: PropTypes.arrayOf(
    PropTypes.shape({
      DailyTrainInfo: PropTypes.shape({
        TrainNo: PropTypes.string,
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

export default List
