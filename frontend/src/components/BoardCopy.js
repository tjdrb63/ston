import React,{Component, useEffect, useRef, useState} from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';
import BoardCard from '../layouts/BoardCard';
import Button from '@mui/material/Button'
import BoardWriteModal from '../layouts/BoardWriteModal';
import BoardSide from '../layouts/BoardSide';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Provider, useSelector, useDispatch, connect} from 'react-redux';
import { BoardUpdate } from '../store/actions';
import Sidebar from '../layouts/Sidebar';
import Navbar from '../layouts/Navbar';
import { Avatar, Card } from '@mui/material';



function BoardCopy(props)
{
    const [user_name,setUserName] = useState(null);
    const [content_text,setContentText] = useState(null);
    const [board_id,setBoardId] = useState(null);    
    const dispatch = useDispatch();

     // 라라벨 에서 데이터 받아 state 저장
    const ShowBoard = () =>{
        axios.post('/api/board/show')
        .then(res=>{
            console.log(res.data)
            for(let i = 0 ; i<res.data.length;i++){
                // console.log(content_text);
                setUserName(user_name => [res.data[i].user_name])
                setContentText(content_text => [res.data[i].content_text])
                setBoardId(board_id => [res.data[i].id])
            }
        })
    }
    // 처음 랜더 될때 state 저장하기
    useEffect(()=>{
        ShowBoard();
    },[])

    // state 갱신되면 redux로 올림
    useEffect(()=>{
        if(board_id != null){
            dispatch(BoardUpdate({
                user_name,
                content_text,
                board_id
            }))
        }
    },[board_id])

    // redux state 받아옴
    const user_names=useSelector((state)=>state.Reducers.user_name);
    const content_texts = useSelector((state)=>state.Reducers.content_text);
    const board_ids = useSelector((state)=>state.Reducers.board_id);
    
    const sideText = "";
    const sideBoardId ="";
    const sideName ="";
    
    const isOpen = useSelector((state)=>state.Reducers.isOpen);

        return(     
                <div className={"mt-16 flex w-full " +(isOpen ? 'mr-96' : '')}>
                    <div>
                        <Navbar></Navbar>
                        <Sidebar></Sidebar> 
                    </div>
                    {/* <BoardWriteModal></BoardWriteModal> */}
                    {/* main */}  
                    
                    <div className={'w-full bg-gray-200 relative '+(isOpen ? "" : "mr-96")} >
                        <BoardSide></BoardSide>
                        <div className='bg-gray-200 relative'>
                            <BoardWriteModal></BoardWriteModal>
                            <InfiniteScroll
                                dataLength={user_names.length} //This is important field to render the next data
                                next={ShowBoard}
                                hasMore={true}
                                loader={<h4>Loading...</h4>}
                                endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                                }
                            >
                                {user_names.map((data,idx) =>{
                                    return(   
                                        <div key={idx}>
                                            <BoardCard name={data} board_id={board_ids[idx]} text={content_texts[idx]}/>
                                        </div>
                                    )
                                })}
                            </InfiniteScroll>
                        </div>   
                    </div>
                    {!isOpen &&
                        <div className={'w-96 h-screen bg-white fixed right-0 '}>
                            <p className='text-center'>
                                현재 온라인 상태    
                            </p>
                        <Card className='m-2'>
                            <div className='flex px-5 py-2 bg-gray-100'>
                                <p className='mt-2 text-sm text-green-500 mr-10'>접속 중 </p>
                                <Avatar>J</Avatar>
                                <p className='mt-1 ml-2 text-lg'>장성규</p>
                            </div>
                        </Card>
                        <Card className='m-2'>
                            <div className='flex px-5 py-2  bg-gray-100'>
                                <p className='mt-2 text-sm text-green-500 mr-10'>접속 중 </p>
                                <Avatar>P</Avatar>
                                <p className='mt-1 ml-2 text-lg'>박주형</p>
                            </div>
                        </Card>
                        <Card className='m-2'>
                            <div className='flex px-5 py-2  bg-gray-100'>
                                <p className='mt-2 text-sm text-yellow-400 mr-10'>자리 비움 </p>
                                <Avatar>K</Avatar>
                                <p className='mt-1 ml-2 text-lg'>김리건</p>
                            </div>
                        </Card>
                        <Card className='m-2'>
                            <div className='flex px-5 py-2  bg-gray-100'>
                                <p className='mt-2 text-sm text-red-500 mr-10'>바쁨</p>
                                <Avatar>N</Avatar>
                                <p className='mt-1 ml-2 text-lg'>누구임</p>
                            </div>
                        </Card>
                        </div>
                    }
                        
                </div>
        )
    
    
    
}
export default BoardCopy