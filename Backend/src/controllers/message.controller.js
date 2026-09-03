import cloudinary from "../LIB/cloudinary.js";
import { getReceiverSocketId, io } from "../LIB/socketio.js";
import Message from "../modules/message.js";
import User from "../modules/User.js";


export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {
        res.status(500).json({error:"Internal server error"})
    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const {id:userToChatId} = req.params

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({error:"Internal server error"})
        console.log("error in the getMessages controller:", error.message);
        
    }
}

export const sendMessages = async (req, res) => {
    try {
        const {text, image} = req.body

        const {id: receiverId} = req.params
        const senderId = req.user._id

        let imageURL;

        if (image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageURL = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageURL,
        })
        await newMessage.save()

        const receiverSocketId = getReceiverSocketId(receiverId)

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)
    } catch (error) {
        console.error("SEND MESSAGE ERROR:", error);
        res.status(500).json({
            error: error.message
        }); 
    }
    
}
export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.error("Error in getChatPartners: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const userId = req.user._id;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        error: "Message not found",
      });
    }

    
    if (message.senderId.toString() !== userId.toString()) {
      return res.status(403).json({
        error: "You can only delete your own messages",
      });
    }

    await Message.findByIdAndDelete(messageId);

    
    const receiverSocketId = getReceiverSocketId(
      message.receiverId.toString()
    );

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageDeleted", messageId);
    }

    res.status(200).json({
      message: "Message deleted successfully",
      messageId,
    });
  } catch (error) {
    console.error("Delete message error:", error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};