import react, { useState, useRef, useEffect, useContext } from 'react'
import MUIDataTable from "mui-datatables";
import superagent, { options } from 'superagent'
import LinearProgress from '@mui/material/LinearProgress';
import { AuthContext } from './contexts';
import { columns } from './FileGridOptions';

const FileGrid = ({ gridData,error, refreshGrid }) => {

    const [downloading,setDownloading] = useState(false)
    const [progress, setProgress] = useState(0)
    const context = useContext(AuthContext)
    const copyRef = useRef()
    const [copied, setCopied] = useState()

    const downloadUrl = `${process.env.REACT_APP_REST_URL}/file`

    const handleDownloadClick = (fileOriginalName, fileStoreName, event) => {
        event.preventDefault()

        superagent
            .get(`${process.env.REACT_APP_REST_URL}/file/${fileStoreName}`)
            .set('Authorization', context.userId)
            .on('progress', event => {
                console.log('progress', event.percent)
                setDownloading(true)
                setProgress(event.percent)
                
            })
            .then(res => {
                let blob = new Blob([res.text]);
                //@todo handle file types to make download correct, similat to :
                // const file = new File([res.text],'test.png',{type : 'image/png'})
                // const url = URL.createObjectURL(file);
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = fileOriginalName
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(e => {
                console.error('error', e)
            })
            .finally(() =>{
                setDownloading(false)
            })
    }


    const handleCopyClick = (event) =>{
        event.preventDefault()
        const text = event.target
        console.log('refref' ,text)
        text.select()
        document.execCommand('copy');
        setCopied(c => !c)
    }
    
    const handleDeleteClick = (event,fileId) =>{
       event.preventDefault() 
       superagent
       .delete(`${process.env.REACT_APP_REST_URL}/files/${fileId}`)
        .set('Authorization', context.userId) 
        .then(() =>{
            console.log('delete')
        })
        .catch((e) =>{
            console.error('del err', e)
        })
        .finally(() =>{
            console.log('del finally')
            refreshGrid()
        })
    }
    

    const columnOptions ={
        copyRef : copyRef,
        downloadUrl : downloadUrl,
        handleCopyClick : handleCopyClick,
        handleDeleteClick : handleDeleteClick,
        handleDownloadClick : handleDownloadClick,
    }

    return (
        <>
            {error && error}
            {downloading? <div><span style={{fontWeight: '500'}}>Download in progress</span><LinearProgress variant='determinate' value={progress}/></div> :null}
            {!gridData  && !error ? <LinearProgress/> :
                <MUIDataTable
                    title={"Files"}
                    data={gridData}
                    columns={columns(columnOptions)}
                    options={{selectableRows:false}}
                />
            }
        </>
    )

}

export default FileGrid