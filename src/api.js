import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Data = () => {
    const [data, setData] = useState([])
    const url =
        'http://api.aladhan.com/v1/timingsByCity?&city=gislaved&country=sweden&method=8'

    const [city, setCity] = useState(undefined)
    const [country, setCountry] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const handleSubmit = (e) => {
        localStorage.setItem('City', city)
        localStorage.setItem('Country', country)
        e.preventDefault()
    }

    const params = new URLSearchParams(url)
    params.set('city', city)
    params.set('country', country)
    // console.log(params.toString())

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false)
            setIsLoading(true)
            if (localStorage['Data']) {
                setData(JSON.parse(localStorage.getItem('Data')))
                setIsLoading(false)
            } else {
                alert('request')
                try {
                    const result = await axios({
                        method: 'get',
                        url: url,
                    })
                    localStorage.setItem(
                        'Data',
                        JSON.stringify(result.data.data)
                    )

                    setData(result.data.data)
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
            <h1>City</h1>
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
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></input>
                </label>
                <label htmlFor="Country">
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    ></input>
                </label>
                <input type="submit" value="Submit"></input>
            </form>
        </>
    )
}

export default Data
