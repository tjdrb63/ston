import React,{Component, useRef, useState} from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';
import BoardCard from '../layouts/BoardCard';
import Button from '@mui/material/Button'
import BoardWriteModal from '../layouts/BoardWriteModal';
import BoardSide from '../layouts/BoardSide';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';



class Board extends Component{

    state={
        user_name:[],
        content_text:[],
        board_id:[],

    }
    fetchData =()=>{
        axios.post('/api/board/show')
        .then(res=>{
            console.log("생성호출")
            console.log(res.data)
            for(let i = 0 ; i<res.data.length;i++){
                this.setState({user_name:this.state.user_name.concat(res.data[i].user_name)})
                this.setState({board_id:this.state.board_id.concat(res.data[i].id)})
                this.setState({content_text:this.state.content_text.concat(res.data[i].content_text)})
            }
        })
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
                <div className='w-full bg-gray-200 relative'>
                    <BoardWriteModal></BoardWriteModal>
                    <InfiniteScroll
                        dataLength={this.state.content_text.length} //This is important field to render the next data
                        next={this.fetchData}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                        }
                    >
                        {this.state.user_name.map((data,idx) =>{
                            return(   
                                <BoardCard onCreate={this.ComeSideData} name={data} board_id={this.state.board_id[idx]} text={this.state.content_text[idx]}/>
                            )
                        })}
                    </InfiniteScroll>
                </div>
                {/* right Side */}
                <BoardSide text={this.state.sideText} board_id={this.state.sideBoardId} name={this.state.sideName}/>
                
                    
            </div>
        )
    }
    componentDidMount(){

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