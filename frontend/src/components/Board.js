import React,{Component, useRef, useState} from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';
import BoardCard from '../layouts/BoardCard';
import Button from '@mui/material/Button'
import BoardWriteModal from '../layouts/BoardWriteModal';
import BoardSide from '../layouts/BoardSide';
import { Timer } from '@mui/icons-material';


class Board extends Component{
    state={
        user_name:[],
        content_text:[],
        board_id:[],

    }
    ComeSideData =(data)=>{
        this.setState({sideName:data.name});
        this.setState({sideText:data.text}); 
        this.setState({sideBoardId:data.board_id});
    }
        
    render(){ 
        return(  
            <div className='w-full m-auto flex'>
                {/* left Side */}
                <div className='w-1/4 bg-red-200'>
                    SideBar
                </div>
                {/* main */}
                <div className='w-full bg-gray-200'>
                    {this.state.user_name.map((data,idx) =>{
                        return(
                            <div>
                                <BoardCard onCreate={this.ComeSideData} name={data} board_id={this.state.board_id[idx]} text={this.state.content_text[idx]}/>
                            </div>
                        )
                    })}
                </div>
                {/* right Side */}
                <BoardSide text={this.state.sideText} board_id={this.state.sideBoardId} name={this.state.sideName}/>
            </div>
        )
    }
    componentDidMount(){
        axios.post('/api/board/show')
        .then(res=>{
            console.log(res.data)
            for(let i = 0 ; i<res.data.length;i++){
                this.setState({user_name:this.state.user_name.concat(res.data[i].user_name)})
                this.setState({board_id:this.state.board_id.concat(res.data[i].id)})
                this.setState({content_text:this.state.content_text.concat(res.data[i].content_text)})
            }
        })
        axios.post('/api/board/show')
        .then(res=>{
            for(let i = 0 ; i<res.data.length;i++){
                this.setState({user_name:this.state.user_name.concat(res.data[i].user_name)})
                this.setState({board_id:this.state.board_id.concat(res.data[i].id)})
                this.setState({content_text:this.state.content_text.concat(res.data[i].content_text)})
            }
        })
        axios.post('/api/board/show')
        .then(res=>{
            for(let i = 0 ; i<res.data.length;i++){
                this.setState({user_name:this.state.user_name.concat(res.data[i].user_name)})
                this.setState({board_id:this.state.board_id.concat(res.data[i].id)})
                this.setState({content_text:this.state.content_text.concat(res.data[i].content_text)})
            }
        })
        
    
    }
  
}
export default Board