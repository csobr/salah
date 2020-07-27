import React from 'react'
import axios from 'axios'
import SearchInput from './SearchInput'

const SalatResult = () => {
    const [{ autoCompleteRef, query, setQuery }] = SearchInput()
    const [city, setCity] = React.useState('')
    const [country, setCountry] = React.useState('')
    const [data, setData] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [isError, setIsError] = React.useState(false)
    const url = new URL(
        'http://api.aladhan.com/v1/timingsByCity?&city=&country=&method=8'
    )

    const params = [
        ['city', query[0] || localStorage.getItem('City')],
        ['country', query[query.length - 1] || localStorage.getItem('Country')],
    ]
    url.search = new URLSearchParams(params).toString()
    const handleSubmit = (e) => {
        localStorage.setItem('City', query[0])
        localStorage.setItem('Country', query[query.length - 1])
        e.preventDefault()
    }
    React.useEffect(() => {
        const fetchData = async () => {
            // if (localStorage['Data']) {
            //     setData(JSON.parse(localStorage.getItem('Data')))
            // } else {
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
        // }
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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    ref={autoCompleteRef}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type your location.."
                    value={query}
                    autoComplete="on"
                />
                <input type="submit" onSubmit={handleSubmit} />
            </form>
        </>
    )
}

export default SalatResult
