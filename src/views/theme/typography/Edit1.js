// src/views/theme/typography/Edit1.js
import React, { useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CInputGroup,
  CFormInput,
  CButton,
} from '@coreui/react'
import PropTypes from 'prop-types'

const Edit1 = ({ exchangeRates }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [convertedAmount, setConvertedAmount] = useState('')
  const [amount, setAmount] = useState('')

  const handleCurrencyConversion = () => {
    const exchangeRate = exchangeRates[selectedCurrency]
    const convertedAmount = (amount * exchangeRate).toFixed(2)
    setConvertedAmount(convertedAmount)
  }

  return (
    <>
      <h1>外匯換算</h1>
      <CInputGroup className="mb-3">
        <CFormInput
          type="number"
          placeholder="輸入金額"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          <option value="" disabled>
            選擇貨幣
          </option>
          {Object.keys(exchangeRates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <CButton type="button" color="secondary" onClick={handleCurrencyConversion}>
          換算
        </CButton>
      </CInputGroup>
      {convertedAmount && (
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">
                <h6>換算結果</h6>
                {convertedAmount}
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
        </CTable>
      )}
    </>
  )
}
Edit1.propTypes = {
  exchangeRates: PropTypes.object.isRequired,
}

export default Edit1
