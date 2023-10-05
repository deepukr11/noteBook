import { useState, useEffect, useContext } from 'react';
import { Box, styled, Drawer, InputBase, Typography } from '@mui/material';
import UsersItems from './UsersItems';
import Search from './Search';
import friendContext from '../../../context/friends/friendContext';
import profile from '../../../image/profile.jpg';
import ClearIcon from '@mui/icons-material/Clear';
import chatContext from '../../../context/chats/chatContext';
import userContext from '../../../context/users/userContext';
import { encrypt } from 'n-krypta';
import msgContext from '../../../context/messages/msgContext';



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
  margin-bottom: 2px;
`;


const CreateButton = styled(Box)`
  margin-left: 65px;
  margin-top: 35px;
  display: flex;
  height: 35px;
`;


const HeaderGrp = styled(Box)`
background: #3e415a;
  height: 113px;
  color: #FFFFFF;
`;


const Clrear = styled(Box)`
    margin-left: 425px;
    margin-top: 8px;
    cursor: pointer;

`;

const CreateNewGroup = styled(Box)`
display: flex;
`;

const Wrapper = styled(Box)`
    position: relative;
    border-radius: 10px;
    background-color: #f0f2f5;
    height: 40px;
    width: 250px;
    margin-left: 15px;
    margin-top: 30px;
    
    `;

const InputField = styled(InputBase)`
        width: 230px;
        font-size: 20px;
        padding-left: 16px;
        padding-top: 3px;
`;


const UsersDrawer = (props) => {

    const anchor = 'left';

    const [users, setUsers] = useState([]);
    const { openUserDrawer, setOpenUserDrawer } = props;

    // for friend 
    const friendContextValu = useContext(friendContext);
    const { getFriends } = friendContextValu;

    const chatContextValu = useContext(chatContext);
    const { createGroupChat } = chatContextValu;

    const userContextValue = useContext(userContext);
    const { myProfileDetails } = userContextValue;

    const messageValue = useContext(msgContext);
    const { setChatProfile, setChatDetails } = messageValue;

    useEffect(() => {
        const fetchData = async () => {
            let data = await getFriends();
            setUsers(data);
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    // for group chat
    const [isGroup, setIseGroup] = useState(false);  // you want to creat group or not 
    const [search, setSearch] = useState("");  // what do you search in search box
    const [usersID, setUsersID] = useState([]); //  total users ID in a new group
    const [usersName, setUsersName] = useState([]); // total users Name in a new group
    const [groupName, setGroupName] = useState("");   // for group name

   
    const newGroup = () => {
        setIseGroup(true);
        if (myProfileDetails.name && myProfileDetails.userID) {
            setUsersID([...usersID, myProfileDetails.userID]);  // add my id in group
            let encryptUserName = encrypt(myProfileDetails.name, myProfileDetails.userID); // add my name in group
            setUsersName([...usersName , encryptUserName]);
        }
    }

    const cancelGroup = () => {
        setIseGroup(false);
        setGroupName("");
        setUsersID("");
        setUsersName("");
    }

    const addUserInGrp = (ID, Name) => {
        if (!usersID.includes(ID)) {
            if (Name && ID) {
                setUsersID([...usersID, ID]);
                let encryptUserName = encrypt(Name, ID);
                setUsersName([...usersName , encryptUserName])
                }
        }
    }

    const removeUserfromgrp = (ID, Name) => {
        if (usersID.includes(ID)) {
            const newUsersID = usersID.filter((Ids) => { return Ids !== ID });
            setUsersID(newUsersID)
            if (Name) {
                let encryptUserName = encrypt(Name, ID);
                const newUsersName = usersName.filter((names) => { return names !== encryptUserName })
                setUsersName(newUsersName)
            }
        }
    }
    
    const createNewGroup = async() => { 
        if (usersID.length > 0 && groupName.length>0 ) {
            if (myProfileDetails.userID) {
                let encryptGropName = encrypt(groupName, myProfileDetails.userID);
                let newGrpChat = "";
                const fetchData = async () => {
                    newGrpChat = await createGroupChat(usersID, usersName, encryptGropName);;
                }
                await fetchData();
                setChatProfile({
                    chatID: newGrpChat._id,
                    chatName: groupName,
                    profilePhoto: profile,
                    isGroup: newGrpChat.isGroupChat
                });
                setChatDetails(newGrpChat);
            }
            cancelGroup();
            setOpenUserDrawer(false);
        }
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
                            <button onClick={newGroup} className="btn btn-outline-light rounded" title='New Group' type="submit"><strong>New group</strong></button>
                        </NewGroup>
                    </HeaderChild>
                </Header>
                :
                <HeaderGrp>
                    <Clrear>
                        <ClearIcon onClick={cancelGroup} />
                    </Clrear>
                    <CreateNewGroup>
                        <Wrapper>
                            <InputField
                                placeholder="Enter group Name"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </Wrapper>
                        <CreateButton>
                            <button onClick={createNewGroup}
                                className="btn btn-outline-light rounded"
                                title='New Group' type="submit">
                                <strong>Create group</strong>
                            </button>
                        </CreateButton>
                    </CreateNewGroup>
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
                            isGroup={isGroup}
                            addUserInGrp={addUserInGrp}
                            removeUserfromgrp={removeUserfromgrp}
                        />
                    })}
            </Component>
        </Drawer>
    )
}

export default UsersDrawer
