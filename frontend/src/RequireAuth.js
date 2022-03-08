import {useContext} from 'react'
import {AuthContext} from './contexts'
import Login from './Login'

function RequireAuth({children,...props}){
  const {userId} = useContext(AuthContext)
  
  
  if(userId)
   return  children
  else return(
    <>
    <Login/> 
   </>
    )
 
}

export default RequireAuth