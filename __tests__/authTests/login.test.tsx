
import { screen } from "@testing-library/react"
import { renderAll } from "./logout.test"
import SignInForm from "../../app/signIn/components/signInForm"
import user from "@testing-library/user-event"
function rendering (){
    const app = renderAll(<SignInForm/>)
    const button = screen.getByRole('button', {
        name: /sign in/i
      })
    const email = screen.getByRole('textbox')
    const password = screen.getByPlaceholderText(/password/i)
    const setEmail = screen.getByText(/demo email: demo123@gmail\.com/i)
    const setPassword = screen.getByText(/demo password: padding1rem/i)
    return {email,password,app,button,setEmail,setPassword}
}
describe('login form',()=>{
    describe('rendering',()=>{
        it('should render all fields and buttons etc',()=>{
            const {button,email,password,setEmail,setPassword}=rendering()
            expect(button).toBeInTheDocument()
            expect(password).toBeInTheDocument()
            expect(email).toBeInTheDocument()
            expect(setEmail).toBeInTheDocument()
            expect(setPassword).toBeInTheDocument()
        })
    })

    describe('bahaviour',()=>{
        it('should allow defaults to be set into the respective  inputs after click their buttons',async()=>{
            const {button,email,password,setPassword,setEmail}=rendering()
            user.setup()
            await user.click(setEmail)
            await user.click(setPassword)
            expect(email).toHaveValue('demo123@gmail.com')
            expect(password).toHaveValue('padding1rem')

        })
    })
})