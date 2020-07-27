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
function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { types: ['(cities)'], componentRestrictions: undefined }
    )
    autoComplete.setFields(['address_components', 'formatted_address'])

    autoComplete.addListener('place_changed', () =>
        handlePlaceSelect(updateQuery)
    )
}
async function handlePlaceSelect(updateQuery) {
    const adressObject = autoComplete.getPlace()
    const query = adressObject.formatted_address.split(',')
    updateQuery(query)
}

function SearchLocation() {
    const [query, setQuery] = React.useState('')
    const autoCompleteRef = React.useRef(null)

    React.useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_PLACES_API_KEY}&libraries=places`,
            () => handleScriptLoad(setQuery, autoCompleteRef)
        )
    }, [])
    return [{ query, autoCompleteRef, setQuery }]
}
export default SearchLocation
