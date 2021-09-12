import React from 'react'
import Register from './Register'
import { MemoryRouter } from "react-router"
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

test('Render Register page header without crashing', () => {
    const { getByTestId } = render(
        <MemoryRouter initialEntries={["register"]}>
            <Register />
        </MemoryRouter>
    )
    const headerEl = getByTestId('header')

    expect(headerEl.textContent).toBe('Unlimited movies, TV shows, and more.')
})

test('Email on login page is modified as user types', () => {
    const { getByTestId } = render(
        <MemoryRouter initialEntries={["register"]}>
            <Register />
        </MemoryRouter>
    )
    const emailInput = getByTestId('email-input')

    fireEvent.change(emailInput, {
        target: {
            value: "testemail@gmail.com"
        }
    })

    expect(emailInput.value).toBe('testemail@gmail.com')
})

test('Password input appears after user has entered email', () => {
    const { getByTestId } = render(
        <MemoryRouter initialEntries={["register"]}>
            <Register />
        </MemoryRouter>
    )
    const emailInput = getByTestId('email-input')
    
    //Provide email
    fireEvent.change(emailInput, {
        target: {
            value: "testemail@gmail.com"
        }
    })

    expect(emailInput.value).toBe('testemail@gmail.com')

    //Click button
    const getStarted = getByTestId('get-started')
    fireEvent.click(getStarted)

    const passwordInput = getByTestId('password-input')

    expect(passwordInput).toBeTruthy()
})

test('Password on login page is modified as user types', () => {
    const { getByTestId } = render(
        <MemoryRouter initialEntries={["register"]}>
            <Register />
        </MemoryRouter>
    )
    const emailInput = getByTestId('email-input')
    
    //Provide email
    fireEvent.change(emailInput, {
        target: {
            value: "testemail@gmail.com"
        }
    })

    expect(emailInput.value).toBe('testemail@gmail.com')

    //Click button
    const getStarted = getByTestId('get-started')
    fireEvent.click(getStarted)

    const passwordInput = getByTestId('password-input')

    expect(passwordInput).toBeTruthy()

    //Change password content
    fireEvent.change(passwordInput, {
        target: {
            value: "mypassword"
        }
    })

    expect(passwordInput.value).toBe('mypassword')
})