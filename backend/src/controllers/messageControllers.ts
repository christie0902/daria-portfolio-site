import Message from "../models/message";

const storeMessage = async(req: any, res: any) => {
    try {
        const { name, email, message, attachments } = req.body;
        console.log(req.body);
        const newMessage = new Message({
          name,
          email,
          message,
          attachments
        });
    
        await newMessage.save();
    
        res.status(201).json({ message: 'Message sent successfully' });
      } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const loadMessages = async (req: any, res: any) => {
    try {
        const messages = await Message.find();
        res.render('messages', {title: 'Messages', messages});
    } catch(err) {
        console.log('Error loading messages', err);
        res.status(500).json({error: 'Internal server error'});
    }
}

export default {
    storeMessage,
    loadMessages
  };
  