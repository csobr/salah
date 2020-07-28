import React from 'react'

let autoComplete
const loadScript = (url, callback) => {
    let script = document.createElement('script')
    script.type = 'text/javascript'

    if (script.readyState) {
        script.onreadystatechnage = function () {
            if (
                script.readyState === 'loaded' ||
                script.readyState === 'complete'
            ) {
                script.onreadystatechnage = null
                callback()
            }
        }
    } else {
        script.onload = () => callback()
    }
    script.src = url
    document.getElementsByTagName('head')[0].appendChild(script)
}
function handleScriptLoad(
    updateQuery,
    updateCity,
    updateCountry,
    autoCompleteRef
) {
    autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { types: ['(cities)'], componentRestrictions: undefined }
    )
    autoComplete.setFields(['address_components', 'formatted_address'])

    autoComplete.addListener('place_changed', () =>
        handlePlaceSelect(updateQuery, updateCity, updateCountry)
    )
}
async function handlePlaceSelect(updateQuery, updateCity, updateCountry) {
    const adressObject = autoComplete.getPlace()
    const query = adressObject.formatted_address.split(',')
    const city = query[0]
    const country = query[query.length - 1]
    updateQuery(query)
    updateCity(city)
    updateCountry(country)
    localStorage.setItem('City', city)
    localStorage.setItem('Country', country)
}

function SearchLocation() {
    const [query, setQuery] = React.useState('')
    const [city, setCity] = React.useState('' || localStorage.getItem('City'))
    const [country, setCountry] = React.useState(
        '' || localStorage.getItem('Country')
    )
    const autoCompleteRef = React.useRef(null)
    React.useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_PLACES_API_KEY}&libraries=places`,
            () =>
                handleScriptLoad(setQuery, setCity, setCountry, autoCompleteRef)
        )
    }, [])
    return [
        {
            query,
            autoCompleteRef,
            setQuery,
            city,
            setCity,
            country,
            setCountry,
        },
    ]
}
export default SearchLocation
