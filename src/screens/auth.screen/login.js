import React,{useState} from "react"
import {Link,useHistory} from 'react-router-dom';
import api from "../../services/api"
import logo1 from "../../assets/logo1.png"
import logo2 from "../../assets/logo2.png"

import "./auth.css"
export default () => {
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const [msgErro,setMsgErro] = useState("")

    async function handleSubmit(e){
        e.preventDefault()
        if(!name || !password) return null
        const request ={
            name,
            password,
        }
        try {
            setLoading(true)
            const response = await api.post("auth/login",request)
            console.log(response.data)
            setLoading(false)
            setMsgErro("")
            localStorage.setItem("user.id",response.data._id)
            localStorage.setItem("user.name",response.data.name)
            history.push("/new")
        } 
        catch (err) {
            console.log(Object.getOwnPropertyDescriptors(err))
            setLoading(false)
            setMsgErro("")
            if(err.response && (err.response.status===400)){
                setMsgErro(err.response.data.msg)
            }
        }
    }
    return (
        <div className="container">
            <img src={logo1} alt="logo-instagram"/>
            <form  className="auth" onSubmit={(e)=>handleSubmit(e)}>
            <img src={logo2} alt="logo-instagram"/>
                <input
                    value={name}
                    required
                    onChange={(e)=>setName(e.target.value)}
                    type="text"  
                    placeholder="Telefone, nome de usuário ou email"
                />
                <input
                    value={password}
                    required
                    onChange={(e)=>setPassword(e.target.value)}
                    type="password"  
                    placeholder="Senha"
                />
                <button type="submit" >
                    {loading?"loading...":"Entrar" }
                </button>
                <p>
                    Não tem uma conta? <Link to="/register"><span>Cadastre-se</span> </Link> 
                </p>
                <span className="msgErro" >{msgErro}</span>
            </form>
        </div>
    )
}
