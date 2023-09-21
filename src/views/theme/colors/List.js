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
      {listData && (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">車次號碼</CTableHeaderCell>
              <CTableHeaderCell scope="col">到站時間</CTableHeaderCell>
              <CTableHeaderCell scope="col">抵達時間</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {listData.map((train) => (
              <CTableRow key={train.DailyTrainInfo.TrainNo}>
                <CTableDataCell>{train.DailyTrainInfo.TrainNo}</CTableDataCell>
                <CTableDataCell>{train.OriginStopTime.ArrivalTime}</CTableDataCell>
                <CTableDataCell>{train.DestinationStopTime.ArrivalTime}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
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
