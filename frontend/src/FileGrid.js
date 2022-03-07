import react, { useState, useRef, useEffect } from 'react'
import MUIDataTable from "mui-datatables";
import superagent, { options } from 'superagent'

const FileGrid = ({ gridData }) => {

    const downloadUrl = `${process.env.REACT_APP_REST_URL}/file`

    const handleDownloadClick = (fileOriginalName, fileStoreName, event) => {
        event.preventDefault()

        superagent
            .get(`${process.env.REACT_APP_REST_URL}/file/${fileStoreName}`)
            .on('progress', event => {
                console.log('progress', event.percent)
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
    }

    const columns = [
        {
            name: '' //id
        },
        {
            name: 'Download link',
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

    return (
        <>
            {!gridData ? <div>loading</div> :
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