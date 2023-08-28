import React, { useEffect, useState } from 'react'
import { clientID, clientSecret } from './constants'

const Colors = () => {
  const [token, setToken] = useState('')
  const [data, setData] = useState(null)

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
    }

    fetch(
      'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        setToken(data.access_token)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  useEffect(() => {
    if (token) {
      fetch(
        'https://tdx.transportdata.tw/api/basic/v2/Rail/THSR/DailyTimetable/Today?%24top=30&%24format=JSON',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((response) => response.json())
        .then((jsonData) => {
          setData(jsonData)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }, [token])

  return (
    <div className="App">
      <h1>Token: {token}</h1>
      {data && (
        <div>
          <h2>API Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default Colors
