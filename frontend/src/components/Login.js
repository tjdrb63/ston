import React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { Login } from '../store/actions';
export default function SignInSide() {

  const dispatch = useDispatch();
  const history  = useHistory();
  const [errMsg,getError] = useState({
    error_list: [],
  });
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios.get('/sanctum/csrf-cookie').then(response=> {
        axios.post('/api/login', data).then(res=> {
            if(res.data.status == 200) {
                localStorage.setItem('auth_token',res.data.token);
                localStorage.setItem('auth_name', res.data.username);
                Toast.fire({
                    icon: 'success',
                    title: res.data.message
                  })
                axios.get('/api/user').then(res=> {
                  dispatch(Login(res.data))
                })
                history.push('/');
            } else if(res.data.status == 401) {
                Swal.fire("error",res.data.message,"error");
            } else {
                getError({...errMsg,error_list: res.data.error});
            }
        })
    });
   
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
    <div className=" w-full  relative flex flex-col justify-center items-center bg-blue-100 overflow-hidden">
    <div className="md:border md:border-gray-300 bg-white md:shadow-lg shadow-none rounded p-10 rounded-2xl" >
      
    <Box
            sx={{
                       display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
                 <Typography
            variant="h1"
            noWrap
            component="div"
            
          >
               <img alt="logo" src="/img/logo.png" width="100"/>
          </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <span className="text-black font-bold text-xl block">로그인</span>
              
              <Grid>

        
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="이메일 주소 또는 아이디"
                name="email"
                autoComplete="email"
                autoFocus
                style={{
                    backgroundColor: "#f2f4f8",
                    width: '300px'
                }}
              />
                            <span className="text-red-500">{errMsg.error_list.email}</span>
                    </Grid>
              <Grid  >
                
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                style={{
                  backgroundColor: "#f2f4f8",
                  width: '300px'
              }}/>
              
</Grid>
            
              <span className='text-red-500'>{errMsg.error_list.password}</span>
              <Grid container>
                <Grid item xs>
                <FormControlLabel className="text-black font-bold"
                control={<Checkbox value="remember" color="primary" />}
                label="자동 로그인"
              />
                </Grid>
                <Grid item>
                <Link to="#" variant="body2">
                    비밀번호 찾기
                  </Link>
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2, p:2 }}
              >
                    <span className="text-white font-bold text-sm">로그인</span>
              </Button>
  
            <span className="text-xs text-black block text-center ">계정이 없으신가요?<Link className="text-blue-500  ml-3" to="/register">회원가입</Link></span>
            </Box>
          </Box>
          
    </div>
    <div className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
    <div className="w-96 h-full bg-indigo-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
</div>

</Grid>

  );
}