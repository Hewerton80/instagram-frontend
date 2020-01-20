import React,{Component} from "react"
import Header from "../../components/Header"
import like from "../../assets/heart.svg"
import liked from "../../assets/heartred.svg"
import comment from "../../assets/comment.png"
import send from "../../assets/send.png"
import loagingImg from "../../assets/loading.gif"
import api,{url_backend} from "../../services/api"
import io from "socket.io-client"
import "./feed.css"

export default class New extends Component {

    state={
        posts:[],
        loading:false
    }
    componentDidMount(){
        const id = localStorage.getItem("user.id")
        const name = localStorage.getItem("user.name")
        if(!id || !name){
            this.props.history.push("/")
        }
        this.getPosts()
        this.registerToSoket()
    }

    async getPosts(){
        try {
            this.setState({loading:true})
            const response = await api.get("/post/index",{
                headers:{
                    id:localStorage.getItem("user.id"),
                    name:localStorage.getItem("user.name")
                }
            })
            console.log("didMount posts:",response.data)
            this.setState({
                posts:response.data,
                loading:false
            }) 
        } catch (error) {
            this.setState({ loading:false})
        }
        
        
    }
    registerToSoket(){
        const socket = io(url_backend)
        socket.on("post",newPost =>{
        const {posts} =this.state
            this.setState({posts:[newPost,...posts]})
        })
        socket.on("like",likePost =>{
            const {posts} =this.state
            console.log('no socket',posts)  
            this.setState({posts:posts.map(post=>post.id===likePost.id?likePost:post)})     
        })
    }

    async handleLike(id){
        try{
            await api.post(`/post/${id}/like`,{},{
                headers:{
                    id:localStorage.getItem("user.id"),
                    name:localStorage.getItem("user.name")
                }
            })

        }
        catch(err){
            console.log(err)
        }
    }

    render(){
        const {posts,loading} = this.state
        return (
            <>
            <Header/>
            {loading && (
                <div className="loading">
                    <img width="100%" src={loagingImg} alt="loading"/>
                </div>
            )}
            {posts.map(post=>(
                <section id="post-list" key={post.id}>
                <article>
                    <header>
                        <div className="user-info">
                            <span>{post.author.name}</span>
                            <span className="place">
                                {post.place}
                            </span>
                        </div>
                    </header>
                    <img src={post.url_img} alt={post.image}/>
                    <footer>
                        <div className="actions">
                            <button type="button" onClick={()=>this.handleLike(post._id)}>
                            <img src={post.likes>0?liked:like} alt="like" width="24px"/>
                            </button>
                            <img src={comment} alt="comments" width="24px"/>
                            <img src={send} alt="send" width="24px"/>
                        </div>
                        <strong>{post.likes} cutidas</strong>
                        <p>
                            {post.description} 
                            <span>{post.hashtags}</span>
                        </p>
                    </footer>
                </article>
            </section>
            ))}
            </>
        )
    }
}
