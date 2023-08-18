import { screen } from "@testing-library/react";
import ReactColorThemeButton from "../../components/ReactColorTheme/ReactColorThemeButton";
import { renderAll } from "../authTests/logout.test";
const {testerWrapper} = require("../../components/ReactColorTheme/ReactColorThemeButton")
import user from "@testing-library/user-event"
afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });
//jest.mock(testerWrapper,()=>({run:jest.fn()}))
jest.mock(testerWrapper)
function rendering(){
    const app = renderAll(<ReactColorThemeButton/>)
    const button = screen.getByRole('button')
    return {button}
}
describe('theme button tests',()=>{
    describe('rendering',()=>{
        it('should render corretly',()=>{
            const {button}= rendering()
            expect(button).toBeInTheDocument()
        })
    })
    describe('behaviour',()=>{
        it('should call the theme function once per click',async()=>{
            const {button}=rendering()
            const spy = jest.spyOn(testerWrapper,"run").mockImplementation(jest.fn())
            user.setup()
            await user.click(button)
            expect(spy).toHaveBeenCalled()
        })
    })
})