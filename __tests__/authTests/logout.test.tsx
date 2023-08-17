import { screen,render } from "@testing-library/react"
import LogoutButton from "../../components/auth/logoutButton"
import {customRender} from "../../app/test-utils"

import { act } from "react-dom/test-utils";
import user from "@testing-library/user-event"
import ReactThemeProvider from "../../contexts/themeContext";
import AuthProvider from "../../contexts/AuthContext";
import BlogProvider from "../../contexts/BlogContext";
import WriteProvider from "../../contexts/writeContext";
import NotificationProvider from "../../contexts/NotificationContext";
import ContextConsumer from "../../components/ContextComsumer";
const {callFunctions} = require('../../components/auth/logoutButton')

export function renderAll(child){
    let component = null
    act(()=>{
        component = render(
            <ReactThemeProvider>
                <AuthProvider>
                <BlogProvider>
                
                  <WriteProvider>
                  <NotificationProvider>
                    <ContextConsumer>
                      
                       {child}
                       <div id="portal"></div>
                   
                    </ContextConsumer>
                 
                 
                  </NotificationProvider>
                  </WriteProvider>
                
                </BlogProvider>
                </AuthProvider>
               
                </ReactThemeProvider>
          )
    })
    return component
}

describe('logoutButton',()=>{
    describe('rendering',()=>{
        it('should say sign out',async()=>{
            const app = renderAll(<LogoutButton/>)
            const button = screen.getByRole('button')
            expect(button).toBeInTheDocument()
        })

        
    })
    describe('behaviour',()=>{
        it('button should run the handleClick logout function once per click',async()=>{
            user.setup()
            const spy = jest.spyOn(callFunctions,'run').mockImplementation(jest.fn())
            const app = renderAll(<LogoutButton/>)
            const button = screen.getByRole('button')
            await user.click(button)
            expect(spy).toHaveBeenCalled()
        })
    })
})