import './Header.scss'
import { AuthContext } from './contexts'
import { useContext, useState } from 'react'

export default  ()=>{
   const context = useContext(AuthContext)
   
   const handleLogoutClick = () =>{
      context.signOut()
   }
   return(
      <header>
      <div>
      <div className="userInfo">
        <div>user name : {context.login}</div>
        <div onClick={handleLogoutClick}>logout</div>
      </div>

      </div>
      </header>
   ) 
}