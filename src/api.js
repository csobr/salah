import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Data = () => {
    const [data, setData] = useState([])
    const [location, setLocation] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        setLocation([longitude, latitude])
    })
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false)
            setIsLoading(true)
            try {
                const result = await axios({
                    method: 'get',
                    url:
                        'http://api.aladhan.com/v1/timingsByCity?city=Gislaved&country=Sweden&method=8',
                })
                setData(result.data.data)
            } catch (error) {
                setIsError(true)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [])

    const timings = { ...data.timings }
    return (
        <>
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
                    <p>{location[0]}&deg;</p>
                    <p>{location[1]}&deg;</p>
                </div>
            )}
        </>
    )
}

export default Data
