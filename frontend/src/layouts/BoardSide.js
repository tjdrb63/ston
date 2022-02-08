import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import BoardCard from './BoardCard';
import { Avatar, Button, Divider } from '@mui/material';
import axios from 'axios';
import { data } from 'autoprefixer';

const drawerWidth = 300;

class BoardSide extends React.Component {
    state={
        comment_text:[],
        comment_user_name:[],
    }
    ShowComment =() =>{
        axios.post("/api/show/comment/"+this.props.board_id)
        .then(res=>{
            console.log(res)
            for(let i = 0 ; i<res.data.length;i++){
                this.setState({comment_text:this.state.comment_text.concat(res.data[i].comment)})
                this.setState({comment_user_name:this.state.comment_user_name.concat(res.data[i].user_name)})  
            }
        })
    }
    render(){
        return (
        <Box sx={{ display: 'flex' }}>
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
                    this.props.text == null &&
                    <div>
                        정보가 없습니다!
                    </div>
                }
                {/* 사이드바 데이처 있을경우*/}
            {this.props.text != null &&
                <div className='w-full p-3'>
                {/* 프사 & 이름 */}
                    <div className="flex">
                        {/* <img className=" rounded-full w-10 h-10 mr-3" src="https://scontent.fsub1-1.fna.fbcdn.net/v/t1.0-9/37921553_1447009505400641_8037753745087397888_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_oc=AQnDTnRBxV3QgnhKOtk9AiziIOXw0K68iIUQfdK_rlUSFgs8fkvnQ6FjP6UBEkA6Zd8&_nc_ht=scontent.fsub1-1.fna&oh=728962e2c233fec37154419ef79c3998&oe=5EFA545A" alt=""></img> */}
                        <Avatar className='mr-3'>d</Avatar> 
                        <div>
                            <h3 className="text-md font-semibold ">{this.props.name}</h3>
                            <p className="text-xs text-gray-500">시간표시할것</p>
                        </div>
                    </div>
                    {/* 게시글 구간 */}
                    
                    <div className='pt-4 mb-10'>
                        {this.props.text}
                    </div>
                    <Divider><Button variant='contained' onClick={this.ShowComment}>댓글 보기</Button></Divider>
                    {this.state.comment_user_name.map((user_name,idx)=>{
                        return(
                            <div>
                                <div className="flex">
                                    <Avatar className='mr-3'>d</Avatar> 
                                    <div>
                                        <h3 className="text-md font-semibold ">{user_name}</h3>
                                        <p className="text-xs text-gray-500">시간표시할것</p>
                                    </div>
                                </div>
                                <div>
                                    {this.state.comment_text[idx]}
                                </div>
                            </div>

                        )
                    })}
            </div>
            }
            </Drawer>
        </Box>
    );
    }
}

export default BoardSide;
