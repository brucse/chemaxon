import { render, screen, act } from '@testing-library/react'
import AuthenticationProvider from '../components/AuthenticationProvider'
import RequireAuth from '../components/RequireAuth'
import userEvent from '@testing-library/user-event'
import superagent from 'superagent'

//workaround , because mock doesn't work inside the test
jest.mock('superagent', () => {

    return {
        post: function() { return this },
        send: function() { return this },
        set: function() { return Promise.reject({ response: {body: { message: "login failed" } }}) },
    }
})

describe("<AuthenticationProvider> failure", () => {

    test("with failed login, it shows error message", async () => {
        render(
            <AuthenticationProvider>
                <RequireAuth>
                    <div>protected</div>
                </RequireAuth>
            </AuthenticationProvider>
        )

        expect(screen.queryByText('protected')).toBe(null)
        const login = screen.getByDisplayValue('login')
        const password = screen.getByDisplayValue('password')
        userEvent.clear(login)
        userEvent.paste(login, 'user')
        userEvent.clear(password)
        userEvent.paste(password, 'password')
        await act(async () => {
            const signIn = screen.getByText('sign in')
            userEvent.click(signIn)
        })
        expect(screen.getByText('login failed'))
    })
})
