import React, { useState, useEffect } from 'react'
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

import Edit1 from './Edit1'
import List1 from './List1'
import { appID, clientID } from './constants1'

const Typography = () => {
  const [exchangeRates, setExchangeRates] = useState({})

  async function fetchData() {
    const res = await fetch(clientID)
    const data = await res.json()
    console.log(data)
    setExchangeRates(data.rates)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Edit1 exchangeRates={exchangeRates} />
      <List1 exchangeRates={exchangeRates} />
    </>
  )
}

export default Typography
