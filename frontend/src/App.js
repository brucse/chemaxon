import './App.scss';
import { AuthContext } from './contexts';
import Upload from './Upload'
import FileGrid from './FileGrid'
import superagent from 'superagent'
import react, { useState, useRef, useEffect, useContext } from 'react'
import Header from './Header'
import RequireAuth from './RequireAuth';
import AuthenticationProvider from './AuthenticationProvider';
import Main from './Main';


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
  const [gridError, setGridError] = useState()
  const context = useContext(AuthContext)


  const fetchGridData = () => {
    superagent
      .get(`${process.env.REACT_APP_REST_URL}/files`)
      .set('Authorization', context.userId)
      .then(res => {
        console.log('res', res)
        setGridData(convertToGridData(res.body.data))
      })
      .catch(e => {
        console.error('error', e)
        setGridError('Data loading error')

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
      <AuthenticationProvider>
        <Header />
        <RequireAuth>
        <Main/>
        </RequireAuth>
        <footer>
          <div>
          <strong>Created by : brucse</strong>
          </div>
        </footer>
      </AuthenticationProvider>
    </>
  );
}

export default App;
