import react, { useState, useRef, useEffect } from 'react'
import superagent from 'superagent'
import './Upload.scss'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import UploadPanel from './UploadPanel'



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









export default function Upload({ refreshGrid }) {

    const [showUpload, setShowUpload] = useState(false)
    const [uploadStatus, setUploadStatus] = useState({ status: 'default' })

    const classes = useStyles();


    const cancelHandleClick = () => {
        setShowUpload(false)
    }

    const newUploadHandleClick = () => {
        setShowUpload(true)
        setUploadStatus(null)
    }

    const createMessage = (uploadStatus) =>{
        let ret = null
        if(uploadStatus){
            switch(uploadStatus.status){
               case 'success':
               ret = <Alert severity='info'>{uploadStatus?.message}</Alert>
                   break
                case 'error':
               ret = <Alert severity='error'>{uploadStatus?.message}</Alert>
                break
            }
        }
        
        return ret 
    }

    return (
        <section className={classes.root}>
            {showUpload ? <Button className={classes.button} variant="outlined" color="primary" onClick={cancelHandleClick} >cancel upload</Button> : null}
            {createMessage(uploadStatus)}
            {!showUpload ? <Button className={classes.button} variant="outlined" color="primary" onClick={newUploadHandleClick}>new upload</Button> : <UploadPanel setShowUpload={setShowUpload} setUploadStatus={setUploadStatus} refreshGrid={refreshGrid} />}
        </section>
    )
}
