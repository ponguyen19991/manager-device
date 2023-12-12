import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react"

import {
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    TextField,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
} from '@mui/material';
import './Left.scss'

import logo from '../../../assets/images/logo.png'
import { CiSearch, CiBellOn } from "react-icons/ci";
import { TiBell } from "react-icons/ti";
import { LuPlus } from "react-icons/lu";

function createData(id, name, urgency, type, status, updated) {
    return { id, name, urgency, type, status, updated };
}

const rows = [
    createData('1', 'RAM KINGSTON 1', 'Critical', 'PC', 'New', 'Yesterday'),
    createData('2', 'RAM KINGSTON 2', 'High', 'PC', 'New', 'Yesterday'),
    createData('3', 'RAM KINGSTON 3', 'Standard', 'PC', 'New', 'Yesterday'),
    createData('4', 'RAM KINGSTON 4', 'Standard', 'PC', 'New', 'Yesterday'),
    createData('5', 'RAM KINGSTON 5', 'Standard', 'PC', 'New', 'Yesterday'),
];

function LeftSide({ logout }) {
    const { user, isAuthenticated } = useAuth0()
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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

    function getUrgencyColor(urgency) {
        switch (urgency) {
            case 'Critical':
                return '#DF5B5B';
            case 'High':
                return '#C87551';
            case 'Standard':
                return '#EFD560';
            default:
                return '';
        }
    }

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

                    <TableContainer component={Paper} sx={{ background: 'transparent', mt: 4 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ color: '#8E8E8E' }}>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="left">Urgency</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="left">Type</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Updated</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            borderLeft: `5px solid ${getUrgencyColor(row.urgency)}`,
                                            '&:hover td': { background: 'rgba(255, 255, 255, 0.1)' },
                                        }}
                                    >
                                        <TableCell align="left" sx={{ color: 'white' }}>{row.id}</TableCell>
                                        <TableCell align="left" sx={{ color: getUrgencyColor(row.urgency) }}>{row.urgency}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left" sx={{ color: '#8E8E8E' }}>{row.type}</TableCell>
                                        <TableCell align="left" sx={{ color: 'white' }}>
                                            <TiBell style={{ color: '#DF5B5B', fontSize: '20px', verticalAlign: 'middle', marginRight: '10px' }} />
                                            {row.status}
                                        </TableCell>
                                        <TableCell align="left" sx={{ color: '#8E8E8E' }}>{row.updated}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            className="table-pagination"
                            sx={{ color: 'white' }}
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>


                </div>
            </div>
        )
    )
}

export default LeftSide
