import React from 'react'
import Login from './Login'
import { MemoryRouter } from "react-router"
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

test('Render Login page header without crashing', () => {
    const { getByTestId } = render(
        <MemoryRouter initialEntries={["login"]}>
            <Login />
        </MemoryRouter>
    )
    const headerEl = getByTestId('header')

    expect(headerEl.textContent).toBe('Sign In')
})

test('Email on login page is modified as user types', () => {
    const { getByTestId } = render(
        <MemoryRouter initialEntries={["login"]}>
            <Login />
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

test('Password on login page is modified as user types', () => {
    const { getByTestId } = render(
        <MemoryRouter initialEntries={["login"]}>
            <Login />
        </MemoryRouter>
    )
    const passwordInput = getByTestId('password-input')

    fireEvent.change(passwordInput, {
        target: {
            value: "mypassword"
        }
    })

    expect(passwordInput.value).toBe('mypassword')
})