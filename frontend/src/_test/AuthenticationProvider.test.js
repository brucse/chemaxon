import { render, screen, act } from '@testing-library/react'
import AuthenticationProvider from '../components/AuthenticationProvider'
import Header from '../components/Header'
import RequireAuth from '../components/RequireAuth'
import userEvent from '@testing-library/user-event'
import superagent from 'superagent'
import { Provider } from 'react-redux';
import store from '../redux/store'

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
        <Provider store={store}>
            <AuthenticationProvider>
            <Header/>
                <RequireAuth>
                    <div>protected</div>
                </RequireAuth>
            </AuthenticationProvider>
        </Provider>
       )

        expect(screen.queryByText('protected')).toBe(null)
        const login = screen.getByDisplayValue('login')
        const password = screen.getByDisplayValue('password')
        userEvent.clear(login)
        userEvent.paste(login, 'user1')
        userEvent.clear(password)
        userEvent.paste(password, 'password')
        await act(async () => {
            const signIn = screen.getByText('sign in')
            userEvent.click(signIn)
        })
        expect(screen.getByText('protected'))
        expect(screen.getByRole('navigation'))
    })


})
