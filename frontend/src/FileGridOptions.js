import Tooltip from '@mui/material/Tooltip';
import { options } from 'superagent';
import dateFormat, { masks } from "dateformat";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

function columns({ copyRef, downloadUrl, handleCopyClick, handleDownloadClick, handleDeleteClick}) {
    const columns = [
        {
            name: 'id',
            options :{display : false}

        },
        {
            name: '', //row num
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return tableMeta.rowIndex + 1
                }

            }
        },
        {
            name: 'File name'
        },
        {
            name: 'Copy download link',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {

                    const fileOriginalName = tableMeta.rowData[2]
                    const fileStoreName = tableMeta.tableData[tableMeta.rowIndex][1]
                    // return (<a onClick={(event) => handleDownloadClick(fileOriginalName, fileStoreName, event)} href={`${downloadUrl}/${value}`} download>{fileOriginalName}</a>)
                    // return (<a  onClick={(event) =>{event.preventDefault()}}href={`${downloadUrl}/${value}`} download>{fileOriginalName}</a>)
                    return (
                        <>
                            <Tooltip title='Click on the link to copy'>
                                <input style={{border:'none',outline: 'none'}} onClick={handleCopyClick}  type='text'  readOnly value={`${downloadUrl}/${fileStoreName}`}></input>
                            </Tooltip>
                        </>
                    )
                }
            }
        },
        {
            name : 'Upload date and time',
            options :{
                customBodyRender: (value, tableMeta, updateValue) => {
                    const date =  tableMeta.tableData[tableMeta.rowIndex][3]
                    return dateFormat(date,'isoDate') + ' ' + dateFormat(date,'isoTime')
                }
            }
        },
        {
            name: 'Download',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    console.log('tablemeta', tableMeta)
                    const fileStoreName = tableMeta.rowData[1]
                    const fileOriginalName = tableMeta.rowData[2]
                    // return (<div onClick={(event) => handleDownloadClick(fileOriginalName, fileStoreName, event)}>download</div>)
                    return (<DownloadIcon style={{cursor : 'pointer'}} onClick={(event) => handleDownloadClick(fileOriginalName, fileStoreName, event)}/>)
                }
            }
        },
        {
            name: 'Delete', // "original name"
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    const fileId = tableMeta.tableData[tableMeta.rowIndex][0]
                    // return (<div onClick={(event) => handleDeleteClick(event, fileId)}>delete</div>)
                        return (<DeleteIcon style={{cursor : 'pointer'}} onClick={(event) => handleDeleteClick(event, fileId)}/>)
                }
            }
        }
    ];

    return columns
}
export { columns }