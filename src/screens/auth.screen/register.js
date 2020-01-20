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
    const [confirmPassword,setConfirmPassword] = useState("")
    const [msgErro,setMsgErro] = useState("")
    const [loading,setLoading] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        const request = {
            name,
            password
        }
        let erro=""
        console.log(!name || !password || !confirmPassword)
        erro = (password!==confirmPassword)?"Senhas diferentes":erro
        erro = (!name || !password || !confirmPassword)?"Todos os campos são obrigratórios":erro
        if(erro) return setMsgErro(erro)
        try{
            setLoading(true)
            const response = await api.post("/auth/register",request)
            console.log(response.data)
            setLoading(false)
            setMsgErro("")
            localStorage.setItem("user.id",response.data._id)
            localStorage.setItem("user.name",response.data.name)
            history.push("/feed")
        }
        catch(err){
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
                onChange={(e)=>setName(e.target.value)}
                required
                type="text"  
                placeholder="Telefone, nome de usuário ou email"
            />
            <input 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                type="password"  
                placeholder="Senha"
            />
            <input 
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                required
                type="password"  
                placeholder="Confirmação da senha"
            />
            <button type="submit"> {loading?"loading...":"Cadastrar" }</button>
            
            <p>
                Voltar para <Link to="/"> <span>Login</span></Link> 
            </p>
            <span className="msgErro" >{msgErro}</span>   
            </form>
        </div>
    )
}
