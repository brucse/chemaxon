import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Upload from '../Upload';
import superagent from 'superagent'
jest.mock('superagent', () => {

    return {
        post: function() { return this },
        on:function(){return this},
        send: function() { return Promise.resolve()},
    }
})


describe('#Upload',() =>{
   
    it("should provide upload panel clicking on new upload", () =>{
        render(<Upload/>)
        
        const button = screen.getByText(/new/i)
        userEvent.click(button)
        // expect(screen.getByText(/upload/i)).not.toBeNull()
        expect(screen.getByTestId('upload-button')).not.toBeNull()

    })
    
    it("should show the selected file", () =>{
        const file = new File(['upload-test'], 'upload-test.png', {type: 'image/png'})
        render(<Upload/>)
        
        const button = screen.getByText(/new/i)
        userEvent.click(button)
        const input = screen.getByLabelText(/select/i)
        userEvent.upload(input, file)
        expect(input.files.item(0)).toStrictEqual(file)
        expect(screen.getByText(/upload-test/i)).not.toBeNull()
        
    })
    
    it("should upload file clicking on upload button", async ()=>{
        const file = new File(['upload-test'], 'upload-test.png', {type: 'image/png'})
        render(<Upload/>)
        
        const button = screen.getByText(/new/i)
        userEvent.click(button)
        const upload = screen.getByTestId('upload-button')
        const input = screen.getByLabelText(/select/i)
        userEvent.upload(input, file)
        await act(async () => {
            const upload = screen.getByTestId('upload-button')
            userEvent.click(upload)
        })

        //@todo: figure out how simulate superagent.on to set progress
        // expect(screen.getByText(/successfully/i))
        
    })
})