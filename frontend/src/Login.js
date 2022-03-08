import {AuthContext} from './contexts'
import {useState,useContext, useEffect} from 'react'
import styles from './Login.module.scss'
import TextField from '@mui/material/TextField';
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert';


const Login = () => {
 const [login,setLogin] = useState('login')
 const [password,setPassword] = useState('password')
 const {signIn,message} = useContext(AuthContext)
 
const handleLogin = (event) =>{
 event.preventDefault()
 setLogin(event.target.value)
}
 
const handlePassword= (event) =>{
 event.preventDefault()
 setPassword(event.target.value)
}
 
const handleSignInClick = (event) =>{
 signIn(login,password)
}

 return (
  <section className={styles.login}>
        {message?<Alert  severity='error'>{message}</Alert>  : null}
        <TextField size='small' className={styles.loginField} onChange={handleLogin} label="login" variant="outlined" />
        <TextField type='password' size='small' className={styles.passwordField} onChange={handlePassword}  label="password" variant="outlined" />
        <Button variant="outlined" color="primary" style={{marginTop: '3rem'}} onClick={handleSignInClick}>sign in</Button>
  </section>
  ) 
  
}

export default Login
