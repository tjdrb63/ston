import  React, { Component , useEffect, useState}from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import BoardCard from './BoardCard';
import { Avatar, Button, ClickAwayListener, Divider, Grow, IconButton, MenuItem, MenuList, Pagination, Paper, Popper, Skeleton, Stack, TextField } from '@mui/material';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Provider, useSelector, useDispatch, connect} from 'react-redux';
import { useTheme } from '@mui/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SvgIcon from '@mui/material/SvgIcon';
import CreateIcon from '@mui/icons-material/Create';
import TranslateIcon from '@mui/icons-material/Translate';


const drawerWidth = 385;

function BoardSide(props){
    
    const sideName = useSelector((state=>state.Reducers.sideName));
    const user = useSelector((state=>state.Reducers.user))
    const sideText = useSelector((state=>state.Reducers.sideText));
    const sideBoardId = useSelector((state=>state.Reducers.sideBoardId));
    const [translatedText,setTranslatedText] = useState("");
    const [post_comment,setPostComment] = useState("");
    const [current_page,setCurrent_page] = useState(1);
    const [last_page,setLast_page] = useState(1);
    const [comments,setComments] = useState([]);
    const [paginatePage,setPaginatePage]= useState(1);
    const [updateComment,setUpdateComment] = useState("");
    const [isUpdate,setIsUpdate] =useState(0);
    const [checkComment,setCheckComment] = useState("");
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    const [transComment,setTransComment] = useState([]);
    const anchorRef = React.useRef(null);
        

    const isOpen = useSelector((state=>state.Reducers.isOpen))
    const dispatch = useDispatch()

    const handleDrawerClose = () => {
        dispatch({type:"SIDE_CLOSE"})
    };
 
    // 클릭한 board_id 값바뀌면 새로운 댓글 출력
    useEffect(()=>{
        if(sideBoardId != null){
            setCurrent_page(current_page => 1);
            ShowComment(current_page);
            dataclean();
        }
    },[sideBoardId])
    
    // current_Page값 바뀌면 댓글 불러오기
    useEffect(()=>{
        dataclean();
        ShowComment(current_page);
    },[current_page])
    
    //데이터 초기화
    const dataclean = () =>{
        setTranslatedText(translatedText =>"")
        setComments(comments => [])
    }

    // 댓글 작성하기
    const PostComment = () =>{
           console.log(sideBoardId)
        axios.post('/api/post/comment',{
            content:post_comment,
            board_id:sideBoardId[0],
            user_id:user.id
            
        }).then(res=>{
            ShowComment(1);
            setPostComment("");
            console.log("댓글 등록완료");
        })
    }
    const updateCommentHandle =(e) =>{
        console.log(e.target.value)
        setUpdateComment(updateComment => e.target.value);
    }
    const commentHandle=(e)=>{
        setPostComment(post_comment => e.target.value);
    }
    const paginateHandle = (e) =>{
        setCurrent_page(current_page => e.target.outerText);
    }

    // 게시글 누르면 코멘트 불러오기 & 페이지네이션 버튼누르면 반응
    const ShowComment =(page) =>{
        axios.post("/api/show/comment/"+sideBoardId+"?page=" + page)
        .then(res=>{ 
            setPaginatePage(paginatePage=>res.data.current_page)
            console.log("댓글 부르기")
            console.log(res.data);
            if(res.data.data.length === 0){
                console.log("값없음")
                setComments(comments => ["No Data"])
            }
            else{
                setLast_page(last_page => res.data.last_page)
                setComments(comments => res.data.data);
            }
        })
    }
    const clickUpdate = (comment) =>{
        setIsUpdate(isUpdate=>comment.id);
        setCheckComment(checkComment=>comment.comment)
    }
    const updateCancle =()=>{
        setIsUpdate(isUpdate=>0)
    }
    const CommentUpdate = (comment) =>{
        console.log(comment.id)
        axios.post("/api/update/comment",{
            comment_id:comment.id,
            updateText:updateComment
        }).then(res=>{
            setIsUpdate(isUpdate=>0);
            ShowComment(current_page);
        })
    }

    const callPapago = (data) =>{
        console.log(data[0]);
        handleToggle()
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
    const callCommentPapago =(comment)=>{
        axios.post("/api/show/papago",{
            text:comment.comment
        }).then(res=>{
            setTransComment(transComment =>
                [...transComment,{
                    id:comment.id,
                    text:res.data.message.result.translatedText,
            }])
        
        })
    }
    const clickDelete = (comment)=>{
        axios.post("/api/delete/comment/"+comment.id).
        then(res=>{
            ShowComment(current_page)
            console.log("삭제 완료")
        })
    }

    const handleToggle = () =>{
        setIsMenuOpen(isMenuOpen => !isMenuOpen)
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
                
                {/* 사이드바 데이터 있을경우*/}
                {sideName != null &&
                <div className='flex flex-col relative'>
                    
                    <div className='w-full p-5'>
                    {/* 프사 & 이름 */}
                    <div className='flex justify-between'>
                        <div className="flex">
                            {/* <img className=" rounded-full w-10 h-10 mr-3" src="https://scontent.fsub1-1.fna.fbcdn.net/v/t1.0-9/37921553_1447009505400641_8037753745087397888_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_oc=AQnDTnRBxV3QgnhKOtk9AiziIOXw0K68iIUQfdK_rlUSFgs8fkvnQ6FjP6UBEkA6Zd8&_nc_ht=scontent.fsub1-1.fna&oh=728962e2c233fec37154419ef79c3998&oe=5EFA545A" alt=""></img> */}
                            <Avatar className='mr-3'>d</Avatar> 
                            <div>
                                <h3 className="text-md font-semibold">{sideName}</h3>
                                <p className="text-xs text-gray-500">시간표시할것</p>
                            </div>
                        </div>
                            {/* 메뉴바 */}
                            <Stack direction="row" className='z-10' spacing={2}>
                                <div>
                                    <Button className=''
                                        ref={anchorRef}
                                        id="composition-button"
                                        aria-controls={isMenuOpen ? 'composition-menu' : undefined}
                                        aria-expanded={isMenuOpen ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggle}
                                    >
                                    설정
                                    </Button>
                                    <Popper
                                        open={isMenuOpen}
                                        anchorEl={anchorRef.current}
                                        role={undefined}
                                        placement="bottom"
                                        transition
                                        disablePortal
                                    >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                            >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleToggle}>
                                                <MenuList
                                                    autoFocusItem={isMenuOpen}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                >
                                                    <MenuItem onClick={()=>callPapago(sideText)}>번역하기</MenuItem>
                                                    <MenuItem onClick={handleToggle}>메모 보내기</MenuItem>
                                                    <MenuItem onClick={handleToggle}>신고하기</MenuItem>
                                                </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                    </Popper>
                                </div>
                            </Stack>
                        
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
                        <div className='w-full flex justify-center bg-gray-200'>
                            <Pagination name="paginate" count={last_page} color="primary" onChange={paginateHandle} page={paginatePage} hidePrevButton hideNextButton />
                        </div>
                        {/* 댓글 구간 */}   

                        {/* 댓글 데이터 로딩중 */}
                        {comments.length == 0 &&
                            <div>
                                <div className='w-full p-3'>
                                     <div className='flex mb-2'>
                                         <Skeleton variant="circular" width={48} height={48} />
                                         <Skeleton className='w-24 ml-2' variant="text"/>
                                     </div>
                                     <Skeleton variant="rectangular" width={270} height={58} />
                                </div>
                                <div className='w-full p-3'>
                                     <div className='flex mb-2'>
                                         <Skeleton variant="circular" width={48} height={48} />
                                         <Skeleton className='w-24 ml-2' variant="text"/>
                                     </div>
                                     <Skeleton variant="rectangular" width={270} height={58} />
                                </div>
                                <div className='w-full p-3'>
                                     <div className='flex mb-2'>
                                         <Skeleton variant="circular" width={48} height={48} />
                                         <Skeleton className='w-24 ml-2' variant="text"/>
                                     </div>
                                     <Skeleton variant="rectangular" width={270} height={58} />
                                </div>
                            </div>
                        }
                        {/* axios 값없으면 보여줌 */}
                        {comments[0] == "No Data" &&  
                            <div>
                                <p>댓글이 없습니다.</p>
                            </div>
                        }
                        
                        {/* 댓글 보여주기 */}
                        {comments[0] != "No Data" &&   
                            <div className='mb-24 '>
                                {comments.map((comment,idx)=>{
                                    return(
                                        <div className='mt-4 mb-4' key={idx}>

                                            {/* 상단 내용 */}
                                            <div className="flex">
                                                <Avatar className='mr-3'>d</Avatar> 
                                                <div className='flex w-full justify-between'>
                                                    <div>
                                                        <h3 className="text-md font-semibold ">{comment.name}</h3>
                                                        <div className='flex text-xs text-gray-500'>
                                                            {comment.updated_at != comment.created_at &&
                                                                <p>(수정됨)</p>
                                                            }
                                                            <p>{comment.updated_at}</p>
                                                        </div>
                                                    </div>
                                                    
                                                        <div className='mr-3 flex' >
                                                            <SvgIcon onClick={()=>callCommentPapago(comment)} className='mt-1 ' color="primary" component={TranslateIcon} fontSize="small"></SvgIcon>
                                                            {comment.user_id == user.id &&
                                                                <div>
                                                                    <SvgIcon onClick={()=>clickUpdate(comment)} color="warning" component={CreateIcon} fontSize="small"></SvgIcon>
                                                                    <SvgIcon onClick={()=>clickDelete(comment)} color="error" component={DeleteForeverIcon} fontSize="small"></SvgIcon>
                                                                </div>
                                                            }
                                                        </div>
                                                    
                                                </div>
                                            </div>
                                            {/* 하단 댓글 내용 */}
                                            <div className='break-words mt-3 mb-10'>
                                                    {/* 수정중 이면 */}
                                                    {isUpdate == comment.id&&
                                                        <div>
                                                             <textarea name='updateComment' className='w-4/5  m-2 bg-gray-200' rows={4} onChange={updateCommentHandle}
                                                            defaultValue={checkComment}></textarea>
                                                            <Button onClick={()=>CommentUpdate(comment)}>수정하기</Button>
                                                            <Button onClick={updateCancle}>취소</Button>
                                                        </div>
                                                    }
                                                    {/* 수정중 아니면 */}
                                                    {isUpdate != comment.id && 
                                                        <div>
                                                            {comment.comment}
                                                        </div>
                                                    }
                                                    {transComment.map((data)=>{
                                                        return(
                                                            <div>
                                                                {data.id === comment.id &&
                                                                    <div className='bg-gray-200'>
                                                                        {data.text}
                                                                    </div>
                                                                }
                                                            </div>
                                                        )
                                                    })}
                                                    
                                            </div>
                                            <Divider light></Divider>
                                        </div>
                                    )
                                })}
                            </div>    
                        }
                    </div>
                    {/* 댓글 달기 */}
                    <div className='flex fixed w-96 bottom-0 right-0 bg-white'>
                        <textarea name='post_comment' className='w-4/5  m-2 bg-gray-200' rows={4} onChange={commentHandle}
                        ></textarea>
                          <Button className='w-1/5 my-2' variant="contained" onClick={PostComment}>댓글 달기</Button>
                    </div>
                </div>
            }
            </Drawer>
        </Box>
        );
}

export default BoardSide;
