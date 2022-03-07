import react, { useState, useRef, useEffect } from 'react'
import superagent from 'superagent'

class UploadError extends Error {
    constructor(message) {
        super(message)
    }
}

const convertFilesToArray = (files) => {
    const ret = []
    for (let i = 0; i < files.length; i++) {
        ret.push(files[i])
    }
    return ret
}

const checkFileSizes = (files) => {
    if (files.length > 0) {
        files.forEach(file => {
            if (file.size > 3 * 1024 * 1024 * 1024) {
                throw new UploadError(`The ${file.name} is bigger than 3GB. Please select another one`)
            }
        })
    }
}

const FileNames = ({files}) => {
    return files.map(file => (
        <div style={{ border: 'solid' }}
            key={file.name}>
            {file.name}, {file.size}
        </div>

    ))
}

const UploadPanel = ({setUploadStatus,setShowUpload, refreshGrid}) => {
    const [selectStatus, setSelectStatus] = useState()
    const [files, setFiles] = useState()
    
    const userFileHandleChange = (event) => {
        event.preventDefault()
        setSelectStatus(null)
        const filesArray = convertFilesToArray(event.target.files)
        console.log('filehandle', filesArray)

        if (filesArray.length > 3) {
            setSelectStatus({ status: 'error', message: 'Max file number is 3. Please reduce file number' })
            return
        }

        try {
            checkFileSizes(filesArray)
            setFiles(filesArray)
        } catch (e) {
            setSelectStatus({ status: 'error', message: e.message })
        }
    }

    const uploadHandleClick = (event) => {
        event.preventDefault()
        setSelectStatus({ status: 'loading' })
        const formData = new FormData()
        if (!files || files.length < 1) {
            setSelectStatus({ status: 'error', message: 'No files selected' })
            return
        }

        for (const f of files) {
            formData.append('userFile', f)
        }

        superagent
            .post(`${process.env.REACT_APP_REST_URL}/upload`)
            .send(formData)
            .on('progress', event => {
                console.log('progress upload', event.percent)
            })
            .then(res => {
                console.log('res', res)
                setUploadStatus({ status: 'success', message:'success' })
                refreshGrid()
            })
            .catch(e => {
                console.error('error', e)
                setUploadStatus({ status: 'error' , message:'upload error'})
            })
            .finally(() => {
                setShowUpload(false)
            })
    }




    return (
        <>
            {files ? <FileNames files={files} /> : null}
            {selectStatus?.status === 'loading' ? 'loading' : null}
            {selectStatus?.status === 'error' ? selectStatus.message : null}
            <form>
                <label htmlFor='file-upload'>Click here to select file(s). Maximum file size is 3GB. Maximum file number is 3</label>
                <input id='file-upload' style={{ display: 'none' }} type='file' onChange={userFileHandleChange} name='userFile' multiple='multiple' />
                <input data-testid="upload-button" type='button' value='upload' onClick={uploadHandleClick} />
            </form>
        </>

    )

}

export default function Upload({refreshGrid}) {

    const [showUpload, setShowUpload] = useState(false)
    const [uploadStatus, setUploadStatus] = useState({status : 'default'})


    const cancelHandleClick = () => {
        setShowUpload(false)
    }

    const newUploadHandleClick = () => {
        setShowUpload(true)
        setUploadStatus(null)
    }


    return (
        <>
            {uploadStatus?.message}
            {!showUpload ? <button onClick={newUploadHandleClick}>new upload</button> : <UploadPanel setShowUpload={setShowUpload} setUploadStatus={setUploadStatus} refreshGrid={refreshGrid} />}
            {showUpload ? <input type='button' value='cancel' onClick={cancelHandleClick}/>:null }
        </>
    )
}

export { convertFilesToArray, checkFileSizes, UploadError }