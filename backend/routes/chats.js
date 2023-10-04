const express = require('express');
const router = express.Router();
const Chats = require('../models/Chats');
// const Message = require('../models/Message');
const fetchuser = require('../midleware/fetchuser');
const Friends = require('../models/Friends');


// ROUTE 1: Create Chat using: POST "/api/chats/createChat"  loging require

router.post('/createChat', fetchuser, async (req, res) => {
     try {
          let isChat = await Chats.findOne({ friendID: req.body.friendID });
          if (isChat) {
               res.json({ chatID: isChat._id});
          } else { 
               const friend = await Friends.findById(req.body.friendID);
               if (!friend) {
                    return res.status(404).send("Friend Not Found");
               }
               let chatData = {
                    friendID: friend._id,
                    usersID: [friend.user1, friend.user2],
                    usersName: [friend.name1, friend.name2],
                    groupCreaterID: req.user.id,
                    groupAdminID: [req.user.id]
               };
               isChat = await Chats.create(chatData);
               res.json({ chatID: isChat._id});
          }
     } catch (error) {
          console.error(error.messese);
          res.status(500).send("Internal server error");
     }
});



// ROUTE 2: Fetch all Chats using: GET "api/chats/fetchChats"  loging require

router.get('/fetchChats', fetchuser, async (req, res) => {
     try {
          const chats = await Chats.find({ usersID: { $elemMatch: { $eq: req.user.id } } }).sort({ updatedAt: -1 })
          res.json(chats);

     } catch (error) {
          const servererr = true;
          res.status(500).send({ servererr, error: "Internal server error" });
     }
});


// ROUTE 3: Create Group using: POST "/api/chats/createGroupChat"  loging require

router.post('/createGroupChat', fetchuser, async (req, res) => {
     let success = false;
     try {
          const usersID = JSON.parse(req.body.usersID);
          const usersName = JSON.parse(req.body.usersName);
          const groupChat = await Chats.create({
               groupName: req.body.groupName,
               usersID: usersID,
               usersName: usersName,
               isGroupChat: true,
               groupCreaterID: req.user.id,
               groupAdminID: [req.user.id]
          });
          success = true;
          res.json({ success, groupChat });

     } catch (error) {
          console.error(error.messese);
          res.status(500).send("Internal server error");
     }
});

// ROUTE 4: rename group name using: PUT "/api/chats/groupRename"  loging require

router.put('/groupRename', fetchuser, async (req, res) => {
     try {
          const { chatID, groupName } = req.body;
          const updatedChat = await Chats.findByIdAndUpdate(chatID, { groupName }, { new: true });
          res.json(updatedChat);

     } catch (error) {
          console.error(error.messese);
          res.status(500).send("Internal server error");
     }
});

// ROUTE 5: Add user in group using: PUT "/api/chats/addUser"  loging require

router.put('/addUser', fetchuser, async (req, res) => {
     try {
          const { chatID, userID, userName } = req.body;
          const adduserInGroup = await Chats.findByIdAndUpdate(chatID,
               {
                    $push: {usersID: userID, usersName: userName}
                  
               },
               { new: true });
          res.json(adduserInGroup);

     } catch (error) {
          console.error(error.messese);
          res.status(500).send("Internal server error");
     }
});


// ROUTE 6: Remove Group admin using: PUT "/api/chats/removeGroupUser"  loging require

router.put('/removeGroupUser', fetchuser, async (req, res) => {
     try {
          const { chatID, userID, userName} = req.body;
          const removeGroupUser = await Chats.findByIdAndUpdate(chatID,
               {
                    $pull: {usersID: userID, usersName: userName}                  
               },
               { new: true });
          res.json(removeGroupUser);

     } catch (error) {
          console.error(error.messese);
          res.status(500).send("Internal server error");
     }
});



// ROUTE 7: Add group user to Group admin using: PUT "/api/chats/addGroupAdmin"  loging require

router.put('/addGroupAdmin', fetchuser, async (req, res) => {
     try {
          const { chatID, userID} = req.body;
          const addGroupAdmin = await Chats.findByIdAndUpdate(chatID,
               {
                    $push: {groupAdminID: userID}                  
               },
               { new: true });
          res.json(addGroupAdmin);

     } catch (error) {
          console.error(error.messese);
          res.status(500).send("Internal server error");
     }
});

// ROUTE 9: Remove Group admin using: PUT "/api/chats/removeGroupAdmin"  loging require

router.put('/removeGroupAdmin', fetchuser, async (req, res) => {
     try {
          const { chatID, userID} = req.body;
          const removeGroupAdmin = await Chats.findByIdAndUpdate(chatID,
               {
                    $pull: {groupAdminID: userID}                  
               },
               { new: true });
          res.json(removeGroupAdmin);

     } catch (error) {
          console.error(error.messese);
          res.status(500).send("Internal server error");
     }
});




module.exports = router