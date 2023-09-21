// src/views/theme/typography/List1.js
import React from 'react'
import PropTypes from 'prop-types'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
} from '@coreui/react'

const List1 = ({ exchangeRates }) => {
  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">Currency</CTableHeaderCell>
          <CTableHeaderCell scope="col">Exchange Rate</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {Object.keys(exchangeRates).map((currency, index) => (
          <CTableRow key={index}>
            <CTableDataCell>{currency}</CTableDataCell>
            <CTableDataCell>{exchangeRates[currency]}</CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}
List1.propTypes = {
  exchangeRates: PropTypes.object.isRequired,
}

export default List1
