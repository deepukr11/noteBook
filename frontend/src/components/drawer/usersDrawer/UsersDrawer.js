import { useState, useEffect, useContext } from 'react';
import { Box, styled, Drawer, Typography } from '@mui/material';
import UsersItems from './UsersItems';
import Search from './Search';
import friendContext from '../../../context/friends/friendContext';
import profile from '../../../image/profile.jpg';
import ClearIcon from '@mui/icons-material/Clear';


const Component = styled(Box)`
    overflow: overlay;
    height: 77vh;
    background-color: #4d4c63;
`;

const Header = styled(Box)`
  background: #005569;
  height: 80px;
  color: #FFFFFF;
  display: flex;
  & > svg, & > p {
    margin-top: auto;
    padding: 15px;
    font-weight: 600;
`;

const HeaderChild = styled(Box)`
  margin-top: 40px;
  display: flex;
`;

const Text = styled(Typography)`
    font-size: 18px;
`;




const drawerStyle = {
    left: 20,
    top: 17,
    height: '95%',
    width: '30%',
    boxShadow: 'none'
}

const NewGroup = styled(Box)`
  margin-left: 200px;
`;

const HeaderGrp = styled(Box)`
background: #3e415a;
  height: 150px;
  color: #FFFFFF;
  display: flex;
`;

const Clrear = styled(Box)`
    margin-left: 425px;
    margin-top: 8px;
    cursor: pointer;

`;


const UsersDrawer = (props) => {

    const anchor = 'left';

    const [users, setUsers] = useState([]);
    const { openUserDrawer, setOpenUserDrawer } = props;

    // for friend 
    const friendContextValu = useContext(friendContext);
    const { decryptFriendName } = friendContextValu;

    useEffect(() => {
        const fetchData = async () => {
            let data = await decryptFriendName();
            setUsers(data);
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    // for group chat
    const [isGroup, setIseGroup] = useState(false);
    const [search, setSearch] = useState("");

    const handleCreateGroup = () => {
        setIseGroup(true);
    }

    return (
        <Drawer
            open={openUserDrawer}
            anchor={anchor}
            PaperProps={{ sx: drawerStyle }}
            style={{ zIndex: 1500 }}
        >
            {!isGroup ?
                <Header>
                    <HeaderChild>
                        <i className="fa-sharp fa-solid fa-arrow-left fa-xl ms-4 me-3 mt-3"
                            onClick={() => setOpenUserDrawer(false)} />
                        <Text>
                            <strong>New Chat</strong>
                        </Text>
                        <NewGroup>
                            <button onClick={handleCreateGroup} className="btn btn-outline-light rounded" title='New Group' type="submit"><strong>New group</strong></button>
                        </NewGroup>
                    </HeaderChild>
                </Header>
                :
                <HeaderGrp>
                    <Clrear>
                        <ClearIcon onClick={() => setIseGroup(false)} />
                    </Clrear>
                </HeaderGrp>}

            <Search setSearch={setSearch} />
            <Component>
                {
                    users.filter((user) => {
                        return search.toLowerCase() === '' ? user : user.name.toLowerCase().includes(search)
                    }).map((user) => {
                        return <UsersItems
                            key={user.friendshipID}
                            user={user}
                            profile={profile}
                            setOpenUserDrawer={setOpenUserDrawer}
                            isGroup={isGroup} />
                    })}
            </Component>
        </Drawer>
    )
}

export default UsersDrawer
