import axios from "axios";
import {Provider, useSelector, useDispatch, connect} from 'react-redux';
import React,{ useState} from 'react';


function reducer(currentState,action){
   
    if(currentState === undefined ){ 
        // 초기값 선언? 
        return{
            number:1,
            user_name:[],
            content_text:[],
            board_id:[],
        }
    }
    const newState ={ ...currentState };
  
    if(action.type ==='BOARD_UPDATE'){ 
        console.log(action)
        newState.user_name = [...newState.user_name, action.payload.user_name]
        newState.content_text = [...newState.content_text, action.payload.content_text]
        newState.board_id = [...newState.board_id, action.payload.board_id]
    }
    if(action.type === 'BOARD_CLICK'){
        newState.sideName =   [action.payload.sideName]
        newState.sideText =   [action.payload.sideText]
        newState.sideBoardId =[action.payload.sideBoardId]
    }

    return newState;
  }export default reducer;