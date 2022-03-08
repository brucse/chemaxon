import {AuthContext} from './contexts'
import {useState} from 'react'
import superagent from 'superagent'

const AuthenticationProvider = ({children}) =>{
    const [id, setId] = useState(null) 
    const [login,setLogin] = useState(null)
    const [message,setMessage] = useState()
   console.log('processenv', process.env.REACT_APP) 
    const signIn = (login,password)=>{
        superagent
        .post(`${process.env.REACT_APP_REST_URL}/login`)
        .send({login: login, password:password})
        .set('accept','application/json')
        .then(res =>{
            if(res.body.id){
                setId(res.body.id)
                setLogin(login)
            }else{
                setMessage('login failed')
            }
        })
        .catch((e) =>{
            setMessage(e.response.body.message)
        })
        
    }
    
    const signOut = ()=>{
        setId(null)
    }

    let userId = id
    // webpack removes it from production code
    if(process.env.NODE_ENV === 'development'){
        userId = process.env.REACT_APP_TEST_USER_ID?process.env.REACT_APP_TEST_USER_ID:id
        console.log('user id set to develpment value:', userId)
    }
    
    return(
        <AuthContext.Provider value={{userId : userId,login: login, signIn, signOut,message: message}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthenticationProvider