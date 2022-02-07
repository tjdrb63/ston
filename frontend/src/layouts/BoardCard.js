import React from 'react';
import BoardModal from './BoardModal';

function BoardCard(props){
    return (
        <div className ="w-full">
                <div>
                    <div className="bg-white w-full rounded-md shadow-md h-auto pl-8 mt-6">
                        <div className="w-full h-16 flex items-center flex justify-between ">
                            <div className="flex">
                                <img className=" rounded-full w-10 h-10 mr-3" src="https://scontent.fsub1-1.fna.fbcdn.net/v/t1.0-9/37921553_1447009505400641_8037753745087397888_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_oc=AQnDTnRBxV3QgnhKOtk9AiziIOXw0K68iIUQfdK_rlUSFgs8fkvnQ6FjP6UBEkA6Zd8&_nc_ht=scontent.fsub1-1.fna&oh=728962e2c233fec37154419ef79c3998&oe=5EFA545A" alt=""></img>
                                <div>
                                    <h3 className="text-md font-semibold ">{props.name}</h3>
                                    <p className="text-xs text-gray-500">시간표시할것</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            {props.text}
                        </div>
                        {/* <!-- 하트 이미지 및 댓글 갯수 --> */}
                        <div className="w-full h-8 flex items-center px-3 my-3">
                            <div className="bg-blue-500 z-2 w-5 h-5 rounded-full flex items-center justify-center ">
                                <svg className="w-3 h-3 fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                            </div>
                            <div className="bg-red-500 w-5 h-5 rounded-full flex items-center justify-center -ml-1">
                                <svg  className="w-3 h-3 fill-current stroke-current text-white" xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            </div>
                            <div className="w-full flex justify-between">
                                <p className="ml-3 text-gray-500">8</p>
                                <BoardModal title="더보기 . ." name={props.name} text={props.text}/>
                        
                            </div>
                        </div>
                    <div className="grid grid-cols-3 w-full px-5 px-5 my-3">
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default BoardCard;