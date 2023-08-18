import user from "@testing-library/user-event"
import {screen} from "@testing-library/react"
import SignUpForm from "../../app/signUp/components/form";
import { renderAll } from "./logout.test";
function renderTest(){
    const app = renderAll(<SignUpForm/>)
    const button  = screen.getByRole('button', {
        name: /sign up/i
      })

    return {button}
}
describe('register a user tests',()=>{
    describe('rendering tests',()=>{
        it('should render correctly',()=>{
            const {button}= renderTest()
            expect(button).toBeInTheDocument()
        })
    })
    describe('behaviour',()=>{
        it('should behave correctly',()=>{
            
        })
    })
})