import React, { useEffect, useState } from 'react'
import { clientID, clientSecret } from './constants'
import List from './List'
import Edit from './Edit'

const Colors = () => {
  const [token, setToken] = useState('')
  const [data, setData] = useState(null)
  const [filteredData, setFilteredData] = useState(null)

  async function fetchToken() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
    }

    const response = await fetch(
      'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
      requestOptions,
    )

    const responseData = await response.json()
    const receivedToken = responseData.access_token
    setToken(receivedToken)
  }

  useEffect(() => {
    fetchToken()
  }, [])

  useEffect(() => {
    {
      token &&
        (async function () {
          const res = await fetch(
            'https://tdx.transportdata.tw/api/basic/v2/Rail/THSR/DailyTimetable/Today?%24top=30&%24format=JSON',
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          const data = await res.json()
          setData(data)
        })()
    }
  }, [token])

  const handleSearch = (filteredTrains) => {
    setFilteredData(filteredTrains)
  }

  return (
    <div>
      <h2>API Data:</h2>
      <Edit listData={data} onSearch={handleSearch} />
      <List listData={filteredData} />
    </div>
  )
}

export default Colors
