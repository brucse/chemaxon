import {AuthContext} from './contexts'
import {useState,useContext} from 'react'
import styles from './Login.module.scss'


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
        {message?<p>{message}</p>:null}
        <input onChange={handleLogin} type='text' value={login}/>
        <input onChange={handlePassword} type='text' value={password}/>
        <button onClick={handleSignInClick}>sign in</button>
        <button>cancel</button>
  </section>
  ) 
  
}

export default Login
