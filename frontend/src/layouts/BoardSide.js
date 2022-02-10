import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import BoardCard from './BoardCard';
import { Avatar, Button, Divider, Skeleton, TextField } from '@mui/material';
import axios from 'axios';
import { data } from 'autoprefixer';

const drawerWidth = 400;

class BoardSide extends React.Component {

    componentDidUpdate(prevProps,prevState){
        if(this.props.board_id !== prevProps.board_id){
            console.log("클리어")
            this.setState({
                comment_text:[],
                comment_user_name:[]
            });
            this.ShowComment();
        }
    }
    state={
        comment_text:[],
        comment_user_name:[],
        post_comment:"",
    }
    PostComment = () =>{
        axios.post('/api/post/comment',{
            content:this.state.post_comment,
            board_id:this.props.board_id
        }).then(res=>{
            console.log(res.data)
        })
    }
    commentHandle=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    ShowComment =() =>{
        axios.post("/api/show/comment/"+this.props.board_id)
        .then(res=>{
            for(let i = 0 ; i<res.data.length;i++){
                this.setState({comment_text:this.state.comment_text.concat(res.data[i].comment)})
                this.setState({comment_user_name:this.state.comment_user_name.concat(res.data[i].user_name)})  
            }
        })
    }
    render(){
        return (
        <Box className="justify-between flex" sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width:drawerWidth,
                    boxSizing: 'border-box',
                    overflowX:'hidden'
                },
                }}
                variant="permanent"
                anchor="right"
            >
                {/* 사이드바 데이터 없을경우 */}
                {
                    this.props.text == null &&
                    <div className='w-full p-3'>
                        <div className='flex mb-2'>
                            <Skeleton variant="circular" width={48} height={48} />
                            <Skeleton className='w-24 ml-2' variant="text"/>
                        </div>
                        <Skeleton variant="rectangular" width={270} height={118} />
                        <div className="ml-10 font-bold text-lg mt-20 text-violet-600">
                            댓글버튼 눌러보세요
                        </div>
                    </div>
                }
                {/* 사이드바 데이처 있을경우*/}
                {this.props.text != null &&
                <div className='flex flex-col h-screen justify-between'>
                    <div className='w-full p-3'>
                    {/* 프사 & 이름 */}
                        <div className="flex">
                            {/* <img className=" rounded-full w-10 h-10 mr-3" src="https://scontent.fsub1-1.fna.fbcdn.net/v/t1.0-9/37921553_1447009505400641_8037753745087397888_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_oc=AQnDTnRBxV3QgnhKOtk9AiziIOXw0K68iIUQfdK_rlUSFgs8fkvnQ6FjP6UBEkA6Zd8&_nc_ht=scontent.fsub1-1.fna&oh=728962e2c233fec37154419ef79c3998&oe=5EFA545A" alt=""></img> */}
                            <Avatar className='mr-3'>d</Avatar> 
                            <div>
                                <h3 className="text-md font-semibold" onChange={this.handleChange}>{this.props.name}</h3>
                                <p className="text-xs text-gray-500">시간표시할것</p>
                            </div>
                        </div>
                        {/* 게시글 구간 */}
                        
                        <div className='pt-4 mb-10'>
                            {this.props.text}
                            {this.state.post_comment}
                        </div>
                        <Divider><Button variant='contained' onClick={this.ShowComment}>댓글 보기</Button></Divider>
                        {this.state.comment_user_name.map((user_name,idx)=>{
                            return(
                                <div>
                                    <div className="flex">
                                        <Avatar className='mr-3'>d</Avatar> 
                                        <div>
                                            <h3 className="text-md font-semibold ">{user_name}</h3>
                                            <p className="text-xs text-gray-500">시간표시할것</p>
                                        </div>
                                    </div>
                                    <div>
                                        {this.state.comment_text[idx]}
                                    </div>
                                </div>

                            )
                        })}    
                    </div>
                    <div className='flex'>
                        <TextField className='w-4/5'
                            id="filled-multiline-static"
                            label="내용"
                            name='post_comment'
                            multiline
                            rows={4}
                            defaultValue=""
                            variant="filled"
                            onChange={this.commentHandle}
                        />
                        <Button className='w-1/5' onClick={this.PostComment}>댓글달기</Button>
                    </div>
                </div>
            }
            </Drawer>
        </Box>
        );

    }
   
}

export default BoardSide;
