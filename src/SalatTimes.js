import React from 'react'
import axios from 'axios'
import SearchInput from './SearchInput'

const SalatTimes = () => {
    const [{ autoCompleteRef, query, setQuery, city, country }] = SearchInput()
    const [data, setData] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [isError, setIsError] = React.useState(false)

    const timings = { ...data.timings }

    React.useEffect(() => {
        const url = new URL(
            `http://api.aladhan.com/v1/timingsByCity?&city=&country=&method=8`
        )
        const params = [
            ['city', city],
            ['country', country],
        ]
        url.search = new URLSearchParams(params).toString()
        const fetchData = async () => {
            setIsError(false)
            setIsLoading(true)
            if (localStorage['Data']) {
                setData(JSON.parse(localStorage.getItem('Data')))
                setIsLoading(false)
                setIsError(false)
            } else {
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

        fetchData()
    }, [city, country])

    return (
        <>
            <h1>
                {city}
                {'\n'}
                {country}
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

            <input
                type="text"
                ref={autoCompleteRef}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your location.."
                value={query}
                autoComplete="on"
            />
        </>
    )
}

export default SalatTimes
