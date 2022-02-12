import React,{Component, useEffect, useRef, useState} from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';
import BoardCard from '../layouts/BoardCard';
import Button from '@mui/material/Button'
import BoardWriteModal from '../layouts/BoardWriteModal';
import BoardSide from '../layouts/BoardSide';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Provider, useSelector, useDispatch, connect} from 'react-redux';



function BoardCopy(props)
{
     // 라라벨 에서 데이터 받아 state 저장
    const ShowBoard = () =>{
        axios.post('/api/board/show')
        .then(res=>{
            console.log(res.data)
            for(let i = 0 ; i<res.data.length;i++){
                setUserName(user_name => [res.data[i].user_name])
                setContentText(content_text => [res.data[i].content_text])
                setBoardId(board_id => [res.data[i].id])
            }
            console.log(user_name);
        })
    }

    const [user_name,setUserName] = useState(null);
    const [content_text,setContentText] = useState(null);
    const [board_id,setBoardId] = useState(null);
    const dispatch = useDispatch();

    // 처음 랜더 될때 state 저장하기
    useEffect(()=>{
        ShowBoard();
    },[])


    // state 갱신되면 redux로 올림
    useEffect(()=>{
        if(board_id != null){
            console.log("Redux")
            dispatch({
                type:"BOARD_UPDATE",    
                payload:{user_name,content_text,board_id}
            })
        }
    },[board_id])

    // redux state 받아옴
    const user_names = useSelector((state)=>state.user_name);
    const content_texts = useSelector((state)=>state.content_text);
    const board_ids = useSelector((state)=>state.board_id);
    const sideText = "";
    const sideBoardId ="";
    const sideName ="";

        return(  
            <div className='w-full m-auto flex'>
                {/* <BoardWriteModal></BoardWriteModal> */}
                {/* left Side */}
                <div className='w-1/4 bg-red-200'>

                </div>
                {/* main */}  
                <div className='w-full bg-gray-200 relative'>
                            <div className='w-full bg-gray-200 relative'>
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
                                            <div>
                                                <BoardCard name={data} board_id={board_ids[idx]} text={content_texts[idx]}/>
                                            </div>
                                        )
                                    })}
                                </InfiniteScroll>
                            </div>     
                            <BoardSide text={sideText} board_id={sideBoardId} name={sideName}/>
               
                        )
                </div>    
                
                    
            </div>
        )
    
    
    
}
export default BoardCopy