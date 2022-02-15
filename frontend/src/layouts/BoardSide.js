import  React, { Component , useEffect, useState}from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import BoardCard from './BoardCard';
import { Avatar, Button, Divider, IconButton, Pagination, Skeleton, TextField } from '@mui/material';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Provider, useSelector, useDispatch, connect} from 'react-redux';
import { useTheme } from '@mui/styles';


const drawerWidth = 385;

function BoardSide(props){
    
    const pagi = React.createRef();
    const sideName = useSelector((state=>state.Reducers.sideName));
    const user = useSelector((state=>state.Reducers.user))
    const sideText = useSelector((state=>state.Reducers.sideText));
    const sideBoardId = useSelector((state=>state.Reducers.sideBoardId));
    const [comment_texts,setComment_texts] = useState([]);
    const [comment_user_names,setComment_user_names] = useState([]);
    const [comment_times,setComment_times] = useState([]);
    const [translatedText,setTranslatedText] = useState("");
    const [post_comment,setPostComment] = useState("");
    const [current_page,setCurrent_page] = useState(1);
    const [last_page,setLast_page] = useState(1);
    // const [open,setOpen] = useState(false);
    const commentLoading = 0;
    const [paginatePage,setPaginatePage]= useState(1);
    
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
    },[current_page])
    //댓글 데이터 초기화
    const dataclean = () =>{
        setTranslatedText(translatedText =>"")
        setComment_user_names(comment_user_names => [])
        setComment_texts(comment_texts => [])
        setComment_times(comment_times => [])
        setPaginatePage(paginatePage => 1); 
    }
    const PostComment = () =>{
           console.log(sideBoardId)
        axios.post('/api/post/comment',{
            content:post_comment,
            board_id:sideBoardId[0],
            user_id:user.id
            
        }).then(res=>{
            console.log("댓글 등록완료");
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
            setPaginatePage(paginatePage=>res.data.current_page)
            console.log("댓글 부르기")
            console.log(res.data);
            if(res.data.data.length === 0){
                console.log("값없음")
                setComment_user_names(comment_user_names => ["No Data"])
            }
            else{
                setLast_page(last_page => res.data.last_page)
                for(let i = 0 ; i<res.data.data.length;i++){
                    setComment_user_names(comment_user_names => [...comment_user_names, res.data.data[i].name])  
                    setComment_texts(comment_texts => [...comment_texts,res.data.data[i].comment])
                    setComment_times(comment_times =>[...comment_times,res.data.data[i].updated_at])
                }
            }
        })
        
    }
    const callPapago = (data) =>{
        console.log(data[0]);
        axios.post("/api/show/papago",{
            text:data[0]
        }).then(res=>{
            if(res == "Error!!"){
                setTranslatedText(translatedText=>"언어를 찾을 수 없습니다");
            }
            else{
                setTranslatedText(translatedText=>res.data.message.result.translatedText);
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
                

                {/* 사이드바 데이터 있을경우*/}
                {sideName != null &&
                <div className='flex flex-col relative'>
                    <Button onClick={()=>callPapago(sideText)}>번역하기</Button>
            
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
                        {translatedText != "" &&
                            <div className='bg-gray-200 p-4 mb-10 break-words'>
                                {translatedText}
                            </div>
                        }
                       {/* 페이지 네이션 */}
                       {paginatePage}
                        <div className='w-full flex justify-center bg-gray-200'>
                            <Pagination name="paginate" count={last_page} color="primary" onChange={paginateHandle} page={paginatePage} hidePrevButton hideNextButton />
                        </div>
                        {/* 댓글 구간 */}   
                        {/* 댓글 데이터 로딩중 */}
                        {comment_user_names.length == 0 &&
                            <div>
                                <div className='w-full p-3'>
                                    <div className='flex mb-2'>
                                        <Skeleton variant="circular" width={48} height={48} />
                                        <Skeleton className='w-24 ml-2' variant="text"/>
                                    </div>
                                    <Skeleton variant="rectangular" width={270} height={58} />
                                </div>
                            </div>
                        }
                        {/* 댓글 보여주기 */}
                        {comment_user_names[0] == "No Data" &&  
                            <div>
                                <p>댓글이 없습니다.</p>
                            </div>
                        }
                        {comment_user_names[0] != "No Data" &&   
                            <div className='mb-24 '>
                                {comment_user_names.map((user_name,idx)=>{
                                    return(
                                        <div className='mt-2 mb-4' key={idx}>
                                            <div className="flex">
                                                <Avatar className='mr-3'>d</Avatar> 
                                                <div>
                                                    <h3 className="text-md font-semibold ">{user_name}</h3>
                                                    <p className="text-xs text-gray-500">{comment_times[idx]}</p>
                                                </div>
                                            </div>
                                            <div className='break-words'>
                                                {comment_texts[idx]}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>    
                        }
                        

                    </div>
                    {/* 댓글 달기 */}
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
