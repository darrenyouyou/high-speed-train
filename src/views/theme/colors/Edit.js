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
  CFormSelect,
} from '@coreui/react'

const Edit = ({ listData, token }) => {
  const [filteredTrains, setFilteredTrains] = useState([])
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [date, setDate] = useState('')
  const [data, setData] = useState('')

  function handleSearch() {
    console.log(a)
    console.log(b)
    console.log(date)

    {
      token &&
        (async function () {
          const res = await fetch(
            `https://tdx.transportdata.tw/api/basic/v2/Rail/THSR/DailyTimetable/OD/${a}/to/${b}/${date}?$top=30&$format=JSON`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          const data = await res.json()
          console.log(data)
          setData(data)
        })()
    }
  }
  const handleToggle = () => {
    const temp = a
    setA(b)
    setB(temp)
    handleSearch()
  }

  return (
    <div>
      <div className="mb-3">
        <CInputGroup className="mb-3">
          <input type="date" onChange={(e) => setDate(e.target.value)} />
          <CFormSelect
            aria-label="Default select example"
            onChange={(e) => setA(e.target.value)}
            options={[
              '選擇車站',
              { label: '南港', value: '0990' },
              { label: '臺北', value: '1000' },
              { label: '板橋', value: '1010' },
              { label: '桃園', value: '1020' },
              { label: '新竹', value: '1030' },
              { label: '苗栗', value: '1035' },
              { label: '台中', value: '1040' },
              { label: '彰化', value: '1043' },
              { label: '雲林', value: '1047' },
              { label: '嘉義', value: '1050' },
              { label: '台南', value: '1060' },
              { label: '左營', value: '1070' },
            ]}
          />
          <CFormSelect
            aria-label="Default select example"
            onChange={(e) => setB(e.target.value)}
            options={[
              '選擇車站',
              { label: '南港', value: '0990' },
              { label: '臺北', value: '1000' },
              { label: '板橋', value: '1010' },
              { label: '桃園', value: '1020' },
              { label: '新竹', value: '1030' },
              { label: '苗栗', value: '1035' },
              { label: '台中', value: '1040' },
              { label: '彰化', value: '1043' },
              { label: '雲林', value: '1047' },
              { label: '嘉義', value: '1050' },
              { label: '台南', value: '1060' },
              { label: '左營', value: '1070' },
            ]}
          />
          {/* <CButton color="primary" onClick={handleToggle}>
            切換站點
          </CButton> */}
          <CButton color="primary" onClick={handleSearch}>
            搜尋
          </CButton>
        </CInputGroup>
      </div>
      <List listData={data} />
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
  onSearch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}

export default Edit
