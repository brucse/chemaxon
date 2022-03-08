import { AuthContext } from './contexts'
import { useContext, useState } from 'react'
import styles from './Header.module.scss'
import Button from '@material-ui/core/Button'

export default  ()=>{
   const context = useContext(AuthContext)
   
   const handleLogoutClick = () =>{
      context.signOut()
   }
   return(
      <header>
      <div>
      <div className={styles.userInfo}>
        <div className={styles.loggedIn}><strong>{context.login}</strong> user is logged in</div>
       <Button style={{margin: '0'}} onClick={handleLogoutClick}  variant="outlined" color="primary" >logout</Button>
      </div>

      </div>
      </header>
   ) 
}