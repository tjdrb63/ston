import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import {makeStyles} from '@mui/styles'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { Logout } from '../store/actions';
import { useSelector } from 'react-redux';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.searchBase, 1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 0.5, 1, 1),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      
    },
  }));
  const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 64,
        },
        [theme.breakpoints.up('sm')]: {
            marginBottom: 64,
        },
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    }, }))

const ResponsiveAppBar = props => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch();
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector(state=> state.Reducers.user);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const logout = async ()=> {
    await dispatch(Logout());
    
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutSubmit = (e) =>{
    e.preventDefault();

     axios.post('/api/logout').then(res=>{
        if(res.status === 200) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_name');
            Swal.fire("success",res.data.message,"success");
           
        }
    }).catch(err=>{
        if(err.response.status===401) {
           localStorage.removeItem('auth_token');
           localStorage.removeItem('auth_name');
            Swal.fire("잘못된 접근","다시 로그인해주세요","error");
        }
    })
    logout();
    history.push('/login');
  };
  const settings = [   {name: '프로필 수정', event: null },   {name: '로그아웃', event: logoutSubmit },];
  const isOpen = useSelector((state)=>state.Reducers.isOpen)

  return (
    <div className={classes.root}>
    <AppBar  style={{boxShadow: 'none' }} color="nav" className={"sticky top-0 z-50 " + (isOpen ? 'pr-96' : '')}>
      <Container maxWidth="xl">
        <Toolbar >
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 0, display: { xs: 'none', sm: 'flex' } }}
          >
            <Link to="/">
            <img alt="logo" src="/img/logo.png" width="100"/>
            </Link>
          </Typography>

        
          <Box  fontWeight='fontWeightBold' style={{ flexGrow: 1,  display: 'flex' , justifyContent: 'center' }} >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="관심사 및 친구이름 입력"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Button variant="contained" color="button" size="small">검색</Button>
          </Box>


          {user ?  <IconButton
         size="large"
         aria-label="show 17 new notifications"
         color="inherit"
       >
         <Badge badgeContent={17} color="error">
           <NotificationsNoneOutlinedIcon />
         </Badge>
       </IconButton> : null}

       {user ?  <IconButton
       onClick={handleOpenUserMenu}
         size="large"
         color="inherit"
       >
         
           <Avatar alt="n" />
       </IconButton> : null}
      
       <Menu
         sx={{ mt: '45px' }}
         id="menu-appbar"
         anchorEl={anchorElUser}
         anchorOrigin={{
           vertical: 'top',
           horizontal: 'right',
         }}
         keepMounted
         transformOrigin={{
           vertical: 'top',
           horizontal: 'right',
         }}
         open={Boolean(anchorElUser)}
         onClose={handleCloseUserMenu}
       >
         {settings.map((setting) => (
           <MenuItem key={setting.name} onClick={handleCloseUserMenu} onClick={setting.event}>
             <Typography textAlign="center">{setting.name}</Typography>
           </MenuItem>
         ))}
       </Menu>
        </Toolbar>
      </Container>
    </AppBar>
    </div>

    
  );
};
export default ResponsiveAppBar;
