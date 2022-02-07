import React,{Component, useState} from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';
import BoardCard from '../layouts/BoardCard';
import Button from '@mui/material/Button'
import BoardWriteModal from '../layouts/BoardWriteModal';


class Board extends Component{
    state={
        user_name:[],
        content_text:[],
    }
   
    render(){  
        return(
            <div className='w-full m-auto flex'>
                {/* left Side */}
                <div className='w-1/4 bg-red-200'>
                    <Button variant='contained' onClick={this.BoardShow}>awdawd</Button>
                    {/* <BoardWriteModal/> */}
                </div>
                {/* main */}
                <div className='w-1/2 bg-gray-200'>
                    {this.state.user_name.map((data,idx) =>{
                        return(
                            <div>
                                <BoardCard name={data} text={this.state.content_text[idx]}/>
                            </div>
                        )
                    })}
                </div>
                {/* right Side */}
                <div className='w-1/4 bg-yellow-200'></div>
            </div>
        )
    }
    componentDidMount(){
        axios.post('/api/board/show')
        .then(res=>{
            for(let i = 0 ; i<res.data.length;i++){
                this.setState({user_name:this.state.user_name.concat(res.data[i].user_name)})
                this.setState({content_text:this.state.content_text.concat(res.data[i].content_text)})
            }
        })
        axios.post('/api/board/show')
        .then(res=>{
            for(let i = 0 ; i<res.data.length;i++){
                this.setState({user_name:this.state.user_name.concat(res.data[i].user_name)})
                this.setState({content_text:this.state.content_text.concat(res.data[i].content_text)})
            }
        })
        axios.post('/api/board/show')
        .then(res=>{
            for(let i = 0 ; i<res.data.length;i++){
                this.setState({user_name:this.state.user_name.concat(res.data[i].user_name)})
                this.setState({content_text:this.state.content_text.concat(res.data[i].content_text)})
            }
        })
        
    
    }
  
}
export default Board