
const initialState = {
    user: null,
    user_name:[],
    content_text:[],
    board_id:[],
    isOpen:false
}
export default (state = initialState ,action) => {
    
    const newState = {...state};

    switch(action.type) {
        case 'LOGIN':
            return {
                ...newState, // 모든 states 복사
                user: action.payload,
            }
        case 'USER':
            return  {
                ...newState, 
                user: action.payload,
            }
        case 'LOGOUT':
            return {
                user: null,
            }
        case 'BOARD_UPDATE':
            newState.user_name = [...newState.user_name, action.payload.user_name]
            newState.content_text = [...newState.content_text, action.payload.content_text]
            newState.board_id = [...newState.board_id, action.payload.board_id]     
            return newState;

        case 'BOARD_CLICK':
            newState.sideName =   action.payload.sideName
            newState.sideText =   action.payload.sideText
            newState.sideBoardId =action.payload.sideBoardId   
            return newState;

        case 'SIDE_OPEN':
            newState.isOpen = true
            return newState;

        case 'SIDE_CLOSE':
            newState.isOpen = false
            return newState;

        default:
            return newState;
    }
}