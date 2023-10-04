import { useState } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Chat from './Chat';
import Search from './Search';
import UsersDrawer from '../../drawer/usersDrawer/UsersDrawer';



const MyChats = () => {

    const [openUserDrawer, setOpenUserDrawer] = useState(false);

    const toggleUserDrawer = () => {
        setOpenUserDrawer(true);
    }

    return (
        <>
            <Box>
                <Header />
                <div onClick={() => toggleUserDrawer()}>
                <Search toggleUserDrawer={toggleUserDrawer}/>
                </div>
                <Chat />
                <UsersDrawer openUserDrawer={openUserDrawer} setOpenUserDrawer={setOpenUserDrawer}/>
            </Box>

        </>
    )
}

export default MyChats
