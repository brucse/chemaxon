import { render, screen, act } from '@testing-library/react'
import AuthenticationProvider from '../AuthenticationProvider'
import Header from '../Header'
import RequireAuth from '../RequireAuth'
import userEvent from '@testing-library/user-event'
import superagent from 'superagent'

jest.mock('superagent', () => {

    return {
        post: function() { return this },
        send: function() { return this },
        set: function() { return Promise.resolve({ body: { id: 1 } }) },
    }
})


describe("<AuthenticationProvider> success", () => {

    test("with succesfull login, it shows the protected components and menu in the header", async () => {
        render(
            <AuthenticationProvider>
            <Header/>
                <RequireAuth>
                    <div>protected</div>
                </RequireAuth>
            </AuthenticationProvider>
       )

        const login = screen.getByTestId('login')
        const password = screen.getByTestId('password')
        userEvent.clear(login)
        userEvent.paste(login, 'user1')
        userEvent.clear(password)
        userEvent.paste(password, 'password')
        await act(async () => {
            const signIn = screen.getByText('sign in')
            userEvent.click(signIn)
        })
        expect(screen.getByText('user1'))
    })


})
