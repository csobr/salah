import React from 'react'
import {
    render,
    fireEvent,
    queryByTestId,
    screen,
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import SearchTimes from '../SalahTimes'
import { url } from '../SalahTimes'

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

test('Loads correctly', async () => {
    render(<SearchTimes />)
})

// Fetch
const server = setupServer(
    rest.get(url, (req, res, ctx) => {
        return res(ctx.json())
    })
)

test('Loads and display greeting', async () => {
    render(<SearchTimes url />)
})
test('handle server errors', async () => {
    server.use(
        rest.get(url, (req, res, ctx) => {
            return res(ctx.status(500))
        })
    )
})
