import React from 'react';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';

function BoardModal(props){
    const click = () =>{
        Swal.fire({
                html:` <div class="w-full h-mscreen flex bg-black">
                <!-- 왼쪽 레이아웃 -->
                <div class="w-128 m-auto ">
                </div>
                <!-- 오른쪽 레이아웃 -->
                <div class="w-2/5 relative bg-gray-200 ">
                    <div class="bg-white h-full w-full rounded-md shadow-md m-1 px-5 mb-3 overflow-auto">
                        <div class="w-full  h-16 flex items-center flex justify-between ">
                            <div class="flex">
                                <img class=" rounded-full w-10 h-10 mr-3" src="https://scontent.fsub1-1.fna.fbcdn.net/v/t1.0-9/37921553_1447009505400641_8037753745087397888_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_oc=AQnDTnRBxV3QgnhKOtk9AiziIOXw0K68iIUQfdK_rlUSFgs8fkvnQ6FjP6UBEkA6Zd8&_nc_ht=scontent.fsub1-1.fna&oh=728962e2c233fec37154419ef79c3998&oe=5EFA545A" alt=""/>
                                <div>
                                    <h3 class="text-md font-semibold ">${props.name}</h3>
                                    <p class="text-xs text-gray-500">5분전</p>
                                </div>
                            </div>
                            <svg class="w-16" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                        </div>
                        <p class="text-sm text-left">${props.text}</p>
                        <div class="absolute inset-x-0 bottom-0 px-3 pb-5">
                            <div class="w-full h-8 flex items-center px-2 mt-4 mb-2">
                                <div class="bg-blue-500 z-2 w-5 h-5 rounded-full flex items-center justify-center ">
                                    <svg class="w-3 h-3 fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                                </div>
                                <div class="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center -ml-1">
                                    <svg  class="w-3 h-3 fill-current stroke-current text-white" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                </div>
                                <div class="w-full flex justify-between">
                                    <p class="ml-3 text-gray-500">8</p>
                                    <p class="ml-3 text-gray-500">29 comment</p>
                                </div>
                            </div>
                            <!--좋아요 댓글 버튼  --> 
                            <div class="grid grid-cols-3 w-full ">
                                <button class="flex flex-row justify-center items-center w-full space-x-3"><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#838383" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                                <span class="font-semibold text-lg text-gray-600">좋아요</span></button>
                                <button class="flex flex-row justify-center items-center w-full space-x-3"><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#838383" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                <span class="font-semibold text-lg text-gray-600">댓글</span></button>
                                <button class="flex flex-row justify-center items-center w-full space-x-3"><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#838383" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                                <span class="font-semibold text-lg text-gray-600">공유</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`,
            width:700,
            position: 'center-start',
           
            showConfirmButton: false,
          })
          
    }
    return(
        <div>
            <Button onClick={click} class="text-gray-400 text-sm mr-3">{props.title}</Button>
        </div>
    )
}

export default BoardModal;