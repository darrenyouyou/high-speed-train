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

const appID = '1a86bd6c391b4c529b6a84511fd802f7'
const url = `https://openexchangerates.org/api/latest.json?app_id=${appID}&symbols=EUR,CHF,GBP,SEK,DKK,NOK,CZK,PLN,AUD,NZD,USD,CAD,MXN,SGD,HKD,JPY,CNH,RUB,TRY,ILS,BRL,ARS,VES,MGA,EGP`

const Typography = () => {
  const [exchangeRates, setExchangeRates] = useState({})
  const [amount, setAmount] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [convertedAmount, setConvertedAmount] = useState('')

  async function fetchData() {
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    setExchangeRates(data.rates)
  }

  useEffect(() => {
    fetchData()
  }, [])

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
      <CTable>
        {convertedAmount && (
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">換算金額</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>{convertedAmount}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        )}
      </CTable>
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
    </>
  )
}

export default Typography
