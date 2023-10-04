import { styled, Box, Typography} from "@mui/material";
import { decrypt } from 'n-krypta';



const Component = styled(Box)`
    height: 60px;
    display: flex;
    padding: 9px 2px;
    cursor: pointer;
    margin-bottom: 1px;
    background-color: #b4b4b4;
`;


const Image = styled('img')({
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: '50%',
    padding: '0 14px'
});

const Container = styled(Box)`
    display: flex;
`;

const Date = styled(Typography)`
display: block;
color: rgba(0, 0, 0, 0.6);
font-size: 10px;
margin-left: auto;
`;
const UsersItems = (props) => {
    const { chatDetails, photo, index, groupAdminIDSize } = props;
    let groupAdminID = false;
    const name = decrypt(chatDetails.usersName[index], chatDetails.usersID[index]);

    for (let i = 0; i < groupAdminIDSize; i++) { 
        if (chatDetails.usersID[index] === chatDetails.groupAdminID[i]) {
            groupAdminID = true;
            break;
        }
    }

    return (
        <Component >
            <Box>
                <Image src={photo} alt="display picture" />
            </Box>
            <Box style={{ width: '100%' }}>
                <Container>

                    <Typography><strong>{name}</strong></Typography>
                    {groupAdminID?
                        <Date><strong>Admin</strong></Date>
                        :
                        ""
                    }     
                </Container>
            </Box>
        </Component>
    )
}

export default UsersItems
