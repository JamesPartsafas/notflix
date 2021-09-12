import React from 'react'
import Watch from './Watch'
import { MemoryRouter } from "react-router"
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

test('Render video page without crashing', () => {
    const { getByTestId } = render(
        <MemoryRouter initialEntries={["watch"]}>
            <Watch />
        </MemoryRouter>
    )
    const videoPlayer = getByTestId('video')

    expect(videoPlayer).toBeTruthy()
})
