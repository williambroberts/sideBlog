import { screen } from "@testing-library/react"
import LogoutButton from "../../components/auth/logoutButton"
import {render} from "../../app/test-utils"
import mockRouter from 'next-router-mock';
import { useRouter } from 'next/router';
import { act } from "react-dom/test-utils";

//jest.mock('next/router', () => jest.requireActual('next-router-mock'))
jest.mock('next/router', () => ({
    useRouter: jest.fn()
  }))

  const pushMock = jest.fn()
 
describe('logoutButton',()=>{
    describe('rendering',()=>{
        it('should say sign out',async()=>{
            let component = null
            await act(()=>{
                component = render(<LogoutButton/>)
            })
          
             expect(component.findByRole('button')).toBeInTheDocument()
        })
        
    })
})