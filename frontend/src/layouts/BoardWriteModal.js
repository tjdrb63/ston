import { render } from '@testing-library/react';
import React from 'react';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';

function BoardWriteModal(){
    const text ="";
    const open = () =>Swal.fire({ 
        width:1000,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false
    });

    return(
        <Button variant='contained' onClick={open}>글쓰기</Button>
                
    )
}
export default BoardWriteModal;

