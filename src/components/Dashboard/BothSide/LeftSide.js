import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react"

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../../../assets/images/logo.png'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import './Left.scss'

import { CiSearch } from "react-icons/ci";
import { LuPlus } from "react-icons/lu";

import { height } from '@mui/system';

function LeftSide({ logout }) {
    const { user, isAuthenticated } = useAuth0()
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        isAuthenticated && (
            <div className='leftSide'>
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <img src={logo} width={100} height={100} alt="logo" style={{ marginRight: 10 }} />

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontSize: '18px',
                                        fontWeight: 500,
                                        color: 'white',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        lineHeight: 'normal',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        paddingRight: '15px',

                                    }}
                                >

                                    {user?.name}
                                    <small>Admin</small>
                                </Typography>
                                {user?.picture && <Avatar src={user.picture} alt={user?.name} />}
                            </IconButton>
                            {/* <ul>
                                {Object.keys(user).map((objKey, i) => <li key={i}>{objKey} : {user[objKey]}</li>)}
                            </ul> */}
                        </Tooltip>
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
                                <MenuItem key={setting} onClick={setting === 'Logout' ? logout : handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
                <div className='mainContent'>
                    <Typography
                        variant="h3"
                        noWrap
                        component="a"
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 500,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >

                        Manager Device
                    </Typography>

                    <Toolbar disableGutters sx={{ justifyContent: 'space-between', mt: '20px' }}>
                        <div>
                            {/* Ô tìm kiếm ở đây */}
                            <TextField
                                id="outlined-basic"
                                label="Search here..."
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <CiSearch style={{ color: '#606060', fontSize: '25px' }} />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        color: 'white',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#606060',
                                        },
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        color: '#606060',
                                    },
                                }}
                            />
                        </div>
                        <div>
                            <Button variant="contained" sx={{ background: 'white', color: 'black', fontWeight: '550', height: '50px', marginRight: '10px' }} startIcon={<LuPlus />}>
                                ADD ITEM
                            </Button>
                            <Button variant="outlined" sx={{ fontWeight: '550', border: '2px solid', height: '50px' }} color="error">
                                REPORT
                            </Button>
                        </div>
                    </Toolbar>
                </div>
            </div>
        )
    )
}

export default LeftSide
