import React,{useState,useMemo,useEffect} from "react"
import {useHistory} from "react-router-dom"
import Header from "../../components/Header"
import camera from "../../assets/camera.svg"
import api from "../../services/api"
import axios from "axios"

import './new.css'

export default () => {
    const history = useHistory()

    const id = localStorage.getItem("user.id")
    const name = localStorage.getItem("user.name")
    if(!id || !name){
        history.push("/")
    }

    const signal = axios.CancelToken.source();

    const [image,setImage] = useState(null)
    const [place,setPlace] = useState("")
    const [descrption,setDescrption] = useState("")
    const [hashtags,setHashtags] = useState("")
    const [loading,setLoading] = useState(false)


    useEffect(()=>{
        return cleanUp => signal.cancel('Api is being canceled')
    },[])

    const preview = useMemo(()=>{
        return image?URL.createObjectURL(image):null
    },[image])

    async function handleSumit(e){
        e.preventDefault()
        const data = new FormData()
        data.append('image',image)
        data.append('place',place)
        data.append('descrption',descrption)
        data.append('hashtags',hashtags)
        console.log(image)
        
        try{
            setLoading(true)
            await api.post("/post/store",data,{
                cancelToken: signal.token,
                headers:{
                    id:localStorage.getItem("user.id"),
                    name:localStorage.getItem("user.name")
                }
            })
            setLoading(false)
            history.push("/feed")
        }
        catch(err){
            console.log(err)
            setLoading(false)
        }
    }
    return (
        <>
        <Header/>
        <form id="new-post" onSubmit={e=>handleSumit(e)}>
            <label 
                htmlFor="post"
                id="image"
                style={{backgroundImage:`url(${preview})`}}
                className={preview?"has-preview":""}
            >
                <input 
                    id="post"
                    type="file"
                    onChange={e=>setImage(e.target.files[0])}
                />
                <img src={camera} width="50px" alt="selecinone uma imagem"/>
            </label>
    
            <input 
                type="text" 
                name="place" 
                placeholder="Local o post"
                value={place}
                onChange = {e => setPlace(e.target.value)}
            />
            <input 
                type="text" 
                name="description" 
                placeholder="descrição do post"
                value={descrption}
                onChange = {e => setDescrption(e.target.value)}
            />
            <input 
                type="text" 
                name="hashtags" 
                placeholder="hashtags"
                value={hashtags}
                onChange = {e => setHashtags(e.target.value)}
            />
                  <button type="submit" >
                    {loading?"loading...":"Enviar" }
                </button>
        </form>
        </>
    )
}
