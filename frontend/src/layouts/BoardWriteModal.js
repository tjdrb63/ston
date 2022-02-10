import { render } from '@testing-library/react';
import React from 'react';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


function BoardWriteModal(){
    const text ="";
    const open = () =>Swal.fire({ 
        width:1000,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false
    });

    return(
        <div className='w-fit fixed bottom-12 right-96 mr-12 z-10'>
            <Fab color="primary"><AddIcon /></Fab>
        </div>
    )
}
export default BoardWriteModal;

