import './App.scss';
import Upload from './Upload'
import FileGrid from './FileGrid'
import superagent from 'superagent'
import react, { useState, useRef, useEffect } from 'react'
import Header from './Header'


const convertToGridData = (data) => {
  return data.map(obj => {
    const ret = []
    for (const prop in obj) {
      ret.push(obj[prop])
    }
    return ret
  })
}



function App() {

  const [gridData, setGridData] = useState()


  const fetchGridData = () => {
    superagent
      .get(`${process.env.REACT_APP_REST_URL}/files`)
      .then(res => {
        console.log('res', res)
        setGridData(convertToGridData(res.body.data))
      })
      .catch(e => {
        console.error('error', e)
      })


  }


  useEffect(() => {
    fetchGridData()
  }, [])

  const refreshGrid = () => {
    fetchGridData()
  }

  return (
    <>
      <Header/>
      <main>
          <Upload refreshGrid={refreshGrid} />
        <section className='fileGrid'>
          <FileGrid gridData={gridData} />
        </section>
      </main>
      <footer>
        <div>
          footer
        </div>
      </footer>
    </>
  );
}

export default App;
