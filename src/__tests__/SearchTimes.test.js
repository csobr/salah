import React from 'react'
import { render, fireEvent, queryByTestId } from '@testing-library/react'
import SearchTimes from '../SalahTimes'

it('Renders correctly', async () => {
    const { queryByTestId } = render(<SearchTimes />)
    expect(queryByTestId('input-query')).toBeTruthy()
})

describe('Input value', () => {
    it('updates onchange', () => {
        const { queryByTestId } = render(<SearchTimes />)
        const searchInput = queryByTestId('input-query')
        fireEvent.change(searchInput, { target: { value: 'test' } })

        expect(searchInput.value).toBe('test')
    })
})
