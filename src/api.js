import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Data = () => {
    const [data, setData] = useState([])
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const handleSubmit = (e) => {
        localStorage.setItem('City', city)
        localStorage.setItem('Country', country)
        e.preventDefault()
    }
    const url = new URL(
        'http://api.aladhan.com/v1/timingsByCity?&city=&country=&method=8'
    )
    const params = [
        ['city', city || localStorage.getItem('City')],
        ['country', country || localStorage.getItem('Country')],
    ]
    url.search = new URLSearchParams(params).toString()
    useEffect(() => {
        const fetchData = async () => {
            if (localStorage['Data']) {
                setData(JSON.parse(localStorage.getItem('Data')))
            } else {
                setIsError(false)
                setIsLoading(true)
                console.log('request')
                try {
                    const result = await axios.get(url)
                    setData(
                        result.data.data,
                        localStorage.setItem(
                            'Data',
                            JSON.stringify(result.data.data)
                        )
                    )
                } catch (error) {
                    setIsError(true)
                }
                setIsLoading(false)
            }
        }
        const storedValues = () => {
            if (localStorage[('City', 'Country', 'Data')]) {
                setCity(localStorage.getItem('City'))
                setCountry(localStorage.getItem('Country'))
            } else {
                console.log('LS empty')
            }
        }
        storedValues()
        fetchData()
    }, [])
    const timings = { ...data.timings }
    return (
        <>
            <h1>
                {city},{country}
            </h1>
            {isError && <div> Something went wrong</div>}
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <ul>
                        <li>{timings.Fajr}</li>
                        <li>{timings.Dhuhr}</li>
                        <li>{timings.Asr}</li>
                        <li>{timings.Maghrib}</li>
                        <li>{timings.Isha}</li>
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <label htmlFor="City">
                    <input
                        type="text"
                        defaultValue=""
                        onChange={(e) => setCity(e.target.value)}
                    ></input>
                </label>
                <label htmlFor="Country">
                    <input
                        type="text"
                        defaultValue=""
                        onChange={(e) => setCountry(e.target.value)}
                    ></input>
                </label>
                <input type="submit" value="Submit"></input>
            </form>
        </>
    )
}

export default Data
