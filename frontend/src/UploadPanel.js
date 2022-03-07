import react, { useState, useRef, useEffect } from 'react'
import superagent from 'superagent'
import './Upload.scss'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@mui/material/LinearProgress';


const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(3),
    },
    button: {
        marginBottom: theme.spacing(2)
    },
    uploadButton: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    uploadText: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        border: 'solid',
        borderWidth: '1px',
        borderColor: theme.palette.primary.main,
        padding: '1px'
    },
    fileList: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: '1px',
        width: 'fit-content',
        listStyleType: 'none'
    },
    
}));


const checkFileSizes = (files) => {
    if (files.length > 0) {
        files.forEach(file => {
            if (file.size > 3 * 1024 * 1024 * 1024) {
                throw new UploadError(`The ${file.name} is bigger than 3GB. Please select another one`)
            }
        })
    }
}

const convertFilesToArray = (files) => {
    const ret = []
    for (let i = 0; i < files.length; i++) {
        ret.push(files[i])
    }
    return ret
}

const FileNames = ({ files, className }) => {
    return (
        <>
        <div style={{fontWeight: '800'}}>Files to upload</div>
        <ul className={className}>
            {files.map(file => (
                    <li style={{border: 'none'}} key={file.name}>
                        <span style={{fontWeight: '600'}}>Name:</span> {file.name} <span style={{fontWeight: '600'}}>Size:</span> {file.size}
                    </li>
            ))}
        </ul>
        </>
    )
}

class UploadError extends Error {
    constructor(message) {
        super(message)
    }
}

export default  ({ setUploadStatus, setShowUpload, refreshGrid }) => {
    const [selectStatus, setSelectStatus] = useState()
    const [files, setFiles] = useState()
    const [progress, setProgress] = useState(0)

    const classes = useStyles();

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
                setProgress(event.percent)
            })
            .then(res => {
                console.log('res', res)
                setUploadStatus({ status: 'success', message: 'Upload successfully finished' })
                refreshGrid()
            })
            .catch(e => {
                console.error('error', e)
                setUploadStatus({ status: 'error', message: 'upload error' })
            })
            .finally(() => {
                setShowUpload(false)
            })
    }

    return (
        <>
            <Paper elevation={3} >
                {files ? <FileNames files={files} className={classes.fileList} /> : null}
                {selectStatus?.status === 'loading' ? <div style={{fontWeight:'500'}}>Upload in progress<LinearProgress variant='determinate' value={Math.round(progress)} /> </div> : null}
                {selectStatus?.status === 'error' ? <Alert  severity='error'>{selectStatus.message}</Alert>  : null}
                <div style={{ display: 'flex', allignItems: 'center' }}>

                    <form>
                        <Typography variant='button' className={classes.uploadText}>
                            <label htmlFor='file-upload'>Click here to select file(s). Maximum file size is 3GB. Maximum file number is 3</label>
                        </Typography>
                        <input id='file-upload' style={{ display: 'none' }} type='file' onChange={userFileHandleChange} name='userFile' multiple='multiple' />
                        <Button className={classes.uploadButton} variant="outlined" color="primary" data-testid="upload-button" onClick={uploadHandleClick} >upload</Button>
                    </form>
                </div>
            </Paper>

        </>
    )

}


