import react, { useState, useRef, useEffect, useContext } from 'react'
import MUIDataTable from "mui-datatables";
import superagent, { options } from 'superagent'
import LinearProgress from '@mui/material/LinearProgress';
import { AuthContext } from './contexts';

const FileGrid = ({ gridData,error, refreshGrid }) => {

    const [downloading,setDownloading] = useState(false)
    const [progress, setProgress] = useState(0)
    const context = useContext(AuthContext)

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
                const url = window.URL.createObjectURL(blob);
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

    const columns = [
        {
            name: '', //id
            options :{
                customBodyRender: (value, tableMeta, updateValue) => {
                console.log('tablemeta x', tableMeta)
                return tableMeta.rowIndex  + 1
                }

            }
        },
        {
            name: 'File',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    const fileStoreName = value
                    const fileOriginalName = tableMeta.rowData[2]
                    return (<a onClick={(event) => handleDownloadClick(fileOriginalName, fileStoreName, event)} href={`${downloadUrl}/${value}`} download>{fileOriginalName}</a>)
                }
            }
        },
        {
            name : '', // "original name"
            options :{
                customBodyRender : (value,tableMeta,updateValue) =>{
                    return(<div>delete</div>)
                }
            }
        }
        ];

    useEffect(() =>{
        // refreshGrid()
    },[])

    return (
        <>
            {error && error}
            {downloading? <div><span style={{fontWeight: '500'}}>Download in progress</span><LinearProgress variant='determinate' value={progress}/></div> :null}
            {!gridData  && !error ? <LinearProgress/> :
                <MUIDataTable
                    title={"Files"}
                    data={gridData}
                    columns={columns}
                    options={{selectableRows:false}}
                />
            }
        </>
    )

}

export default FileGrid