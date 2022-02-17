import React, { Component } from 'react';
import BoardModal from './BoardModal';
import { Avatar, Button, Card, IconButton } from '@mui/material';
import BoardSide from './BoardSide';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SvgIcon from '@mui/material/SvgIcon';
import ChatIcon from '@mui/icons-material/Chat';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { red } from '@mui/material/colors';
import { useDispatch } from 'react-redux';

function BoardCard(props){
    
    const dispatch = useDispatch();
    const BoardToSideData = (e) =>{
        dispatch({
            type:"BOARD_CLICK",
            payload:{
                sideName : props.name,
                sideText : props.text,
                sideBoardId :props.board_id
            }
        })
        dispatch({type:"SIDE_OPEN"})
        console.log(props);
    }

    return (  
        <div className ="w-full mx-auto max-w-2xl px-3">
            <div>
                <div className="bg-white w-full rounded-md shadow-md mt-2">
                    <div className="w-full h-16 ml-2 flex items-center flex justify-between ">
                        <div className='w-full flex justify-between mt-10 py-1 px-4 mr-4 rounded-lg border-2 border-gray-200'> 
                            <div className="flex">
                            {/* <img className=" rounded-full w-10 h-10 mr-3" src="https://scontent.fsub1-1.fna.fbcdn.net/v/t1.0-9/37921553_1447009505400641_8037753745087397888_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_oc=AQnDTnRBxV3QgnhKOtk9AiziIOXw0K68iIUQfdK_rlUSFgs8fkvnQ6FjP6UBEkA6Zd8&_nc_ht=scontent.fsub1-1.fna&oh=728962e2c233fec37154419ef79c3998&oe=5EFA545A" alt=""></img> */}
                                <Avatar className='mr-3 bg-red-200'>d</Avatar> 
                                <div>
                                    <h3 className="text-md font-semibold pt-2">{props.name}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full '>
                        <div className='mt-10 mb-5 mx-auto'>
                            <img className="mx-auto" src="http://placehold.it/600x600" />
                            <div className='w-full break-words p-6'>
                                게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용
                            </div>
                            <div className=' px-6'>
                                좋아요 : 19
                            </div>
                            <div className='grid grid-cols-3 w-full mt-5 pb-6'>     
                                <Button color="error"><SvgIcon className='mx-auto' component={FavoriteBorderIcon} fontSize="large"></SvgIcon></Button>
                                <Button onClick={BoardToSideData} ><SvgIcon className='mx-auto' component={ChatIcon} fontSize="large"></SvgIcon></Button>
                                <Button color="warning"><SvgIcon className='mx-auto' component={StarBorderIcon} fontSize="large"></SvgIcon></Button>
                            </div>
                        </div>
                        
                    </div>
                    {/* <!-- 하트 이미지 및 댓글 갯수 --> */}
                    
                </div>
            </div>
        </div>
    );
    
}

export default BoardCard;