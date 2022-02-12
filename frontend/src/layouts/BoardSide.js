import  React, { Component , useEffect}from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import BoardCard from './BoardCard';
import { Avatar, Button, Divider, Pagination, Skeleton, TextField } from '@mui/material';
import axios from 'axios';
import { data } from 'autoprefixer';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Provider, useSelector, useDispatch, connect} from 'react-redux';

const drawerWidth = 385;

function BoardSide(props){
    
    const sideName = useSelector((state=>state.sideName));
    const sideText = useSelector((state=>state.sideText));
    const sideBoardId = useSelector((state=>state.sideBoardId));
    const current_page = 1;
    

    useEffect(()=>{
        if(sideBoardId!=null){
            ShowComment();
           
        }
    },[sideBoardId])
    // if(this.state.current_page !== prevState.current_page){
    //     this.ShowComment();
    // }
    // }
    // dataclean = () =>{
    //     this.setState({
    //         comment_text:[],
    //         comment_user_name:[],
    //     });
    // }
    // state={
    //     comment_text:[],
    //     comment_user_name:[],
    //     current_page:1,
    //     post_comment:"",
    // }
    // PostComment = () =>{
    //     axios.post('/api/post/comment',{
    //         content:this.state.post_comment,
    //         board_id:this.props.board_id
    //     }).then(res=>{
    //         console.log(res.data)
    //     })
    // }
    // commentHandle=(e)=>{
    //     this.setState({
    //         [e.target.name]:e.target.value
    //     });
    // }
    // paginateHandle = (e) =>{
    //     this.setState((state)=>{
    //         return{ current_page:e.target.outerText }
    //     })
    //     // 리렌더링 이전에 데이터 바뀌는거 찾아야함
    //     console.log(this.state.current_page);
    //     // this.ShowComment();
    //     // console.log(e);
    // }
    const ShowComment =() =>{
        axios.post("/api/show/comment/"+sideBoardId+"?page=" + current_page)
        .then(res=>{ 
            console.log(res);
            // for(let i = 0 ; i<res.data.data.length;i++){

            // }
        })
    }
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
                    sideName == null &&
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
                {sideName != null &&
                <div className='flex flex-col relative'>
                    <div className='w-full p-5'>
                    {/* 프사 & 이름 */}
                        <div className="flex">
                            {/* <img className=" rounded-full w-10 h-10 mr-3" src="https://scontent.fsub1-1.fna.fbcdn.net/v/t1.0-9/37921553_1447009505400641_8037753745087397888_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_oc=AQnDTnRBxV3QgnhKOtk9AiziIOXw0K68iIUQfdK_rlUSFgs8fkvnQ6FjP6UBEkA6Zd8&_nc_ht=scontent.fsub1-1.fna&oh=728962e2c233fec37154419ef79c3998&oe=5EFA545A" alt=""></img> */}
                            <Avatar className='mr-3'>d</Avatar> 
                            <div>
                                <h3 className="text-md font-semibold">{sideName}</h3>
                                <p className="text-xs text-gray-500">시간표시할것</p>
                            </div>
                        </div>
                        {/* 게시글 구간 */}
                        
                        <div className=' pt-4 mb-10 break-words'>
                            {sideText}
                        </div>
                        {/* 페이지 네이션 */}
                        {/* <div className='w-full flex justify-center bg-gray-200'>
                            <Pagination count={this.state.last_page} color="primary" onClick={this.paginateHandle} hidePrevButton hideNextButton />
                        </div> */}
                        {/* 댓글 구간 */}
                        {/* <div className='mb-24 '>
                            {this.state.comment_user_name.map((user_name,idx)=>{
                                return(
                                    <div className='mt-2 mb-4'>
                                        <div className="flex">
                                            <Avatar className='mr-3'>d</Avatar> 
                                            <div>
                                                <h3 className="text-md font-semibold ">{user_name}</h3>
                                                <p className="text-xs text-gray-500">시간표시할것</p>
                                            </div>
                                        </div>
                                        <div className='break-words'>
                                            {this.state.comment_text[idx]}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>     */}
                    </div>
                    {/* 댓글 달기 */}
                    {/* <div className='flex fixed w-96 bottom-0 right-0 '>
                        <textarea name='post_comment' className='w-4/5 m-2 bg-gray-200' rows={4} onChange={this.commentHandle}
                        ></textarea>
                          <Button className='w-1/5' onClick={this.PostComment}>댓글달기</Button>
                    </div> */}
                </div>
            }
            </Drawer>
        </Box>
        );

    
   
}

export default BoardSide;
