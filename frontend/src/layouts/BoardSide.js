import  React, { Component , useEffect, useState}from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import BoardCard from './BoardCard';
import { Avatar, Button, Divider, IconButton, Pagination, Skeleton, TextField } from '@mui/material';
import axios from 'axios';
import { data } from 'autoprefixer';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Provider, useSelector, useDispatch, connect} from 'react-redux';
import { useTheme } from '@mui/styles';


const drawerWidth = 385;

function BoardSide(props){
    
    const pagi = React.createRef();
    const sideName = useSelector((state=>state.Reducers.sideName));
    const sideText = useSelector((state=>state.Reducers.sideText));
    const sideBoardId = useSelector((state=>state.Reducers.sideBoardId));
    const [comment_texts,setComment_texts] = useState([]);
    const [comment_user_names,setComment_user_names] = useState([]);
    const [post_comment,setPostComment] = useState("");
    const [current_page,setCurrent_page] = useState(1);
    const [last_page,setLast_page] = useState(1);
    // const [open,setOpen] = useState(false);
    const isOpen = useSelector((state=>state.Reducers.isOpen))
    const dispatch = useDispatch()

    const handleDrawerClose = () => {
        dispatch({type:"SIDE_CLOSE"})
    };
 
    // 클릭한 board_id 값바뀌면 새로운 댓글 출력
    useEffect(()=>{
        if(sideBoardId != null){
            setCurrent_page(current_page => 1);
            dataclean();
            ShowComment();
        }
    },[sideBoardId])
    // current_Page값 바뀌면 댓글 불러오기
    useEffect(()=>{
        dataclean();
        ShowComment();
        console.log(current_page)

    },[current_page])
    //댓글 데이터 초기화
    const dataclean = () =>{
        setComment_user_names(comment_user_names => [])
        setComment_texts(comment_texts => [])
    }
    const PostComment = () =>{
        axios.post('/api/post/comment',{
            content:post_comment,
            board_id:sideBoardId
        }).then(res=>{
            console.log(res.data)
        })
    }
    const commentHandle=(e)=>{
        setPostComment(post_comment => e.target.value);
    }
    const paginateHandle = (e) =>{
        console.log(e)
        setCurrent_page(current_page => e.target.outerText);
        // 리렌더링 이전에 데이터 바뀌는거 찾아야함
     }
    // 게시글 누르면 코멘트 불러오기 & 페이지네이션 버튼누르면 반응
    const ShowComment =() =>{
        axios.post("/api/show/comment/"+sideBoardId+"?page=" + current_page)
        .then(res=>{ 
            console.log("댓글 부르기")
            console.log(res);
            setLast_page(last_page => res.data.last_page)
            for(let i = 0 ; i<res.data.data.length;i++){
                console.log(res.data.data[i].comment)
                setComment_user_names(comment_user_names => [...comment_user_names,res.data.data[i].user_name])
                setComment_texts(comment_texts => [...comment_texts,res.data.data[i].comment])
            }
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
                variant="persistent"
                anchor="right"
                open={isOpen}
            >
                {/* 닫기 버튼 */}
                <IconButton onClick={handleDrawerClose}>
                        <div>닫기</div>
                </IconButton>

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
                {/* 사이드바 데이터 있을경우*/}
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
                        <div className='w-full flex justify-center bg-gray-200'>
                            <Pagination name="paginate" count={last_page} color="primary" onClick={paginateHandle} hidePrevButton hideNextButton />
                        </div>
                        {/* 댓글 구간 */}   
                        <div className='mb-24 '>
                            {comment_user_names.map((user_name,idx)=>{
                                return(
                                    <div className='mt-2 mb-4' key={user_name}>
                                        <div className="flex">
                                            <Avatar className='mr-3'>d</Avatar> 
                                            <div>
                                                <h3 className="text-md font-semibold ">{user_name}</h3>
                                                <p className="text-xs text-gray-500">시간표시할것</p>
                                            </div>
                                        </div>
                                        <div className='break-words'>
                                            {comment_texts[idx]}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>    
                    </div>
                    {/* 댓글 달기 */}
                    {post_comment}
                    <div className='flex fixed w-96 bottom-0 right-0 '>
                        <textarea name='post_comment' className='w-4/5 m-2 bg-gray-200' rows={4} onChange={commentHandle}
                        ></textarea>
                          <Button className='w-1/5' onClick={PostComment}>댓글달기</Button>
                    </div>
                </div>
            }
            </Drawer>
        </Box>
        );

    
   
}

export default BoardSide;
