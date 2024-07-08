import Message from "../models/message";
import { Request, Response } from 'express';

/* 
interface MulterRequest extends Request {
  files?: Express.Multer.File[];
}
 */

const saveMessage = async (req: Request, res: Response) => {
  const newMessage = new Message(req.body);

  try {
    const { name, email, message } = req.body;
    if (!name || !email|| !message) {
      return res.status(400).send("Name, email and message are required");
    }

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      newMessage.attachments = req.files.map(file => file.path);
    }

    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
/* 
const storeMessage = async (req: Request, res: Response) => {
  const multerReq = req as MulterRequest;
  const newMessage = new Message(multerReq.body);

  try {
    const { name, email, message } = multerReq.body;
    if (!name || !email|| !message) {
      return res.status(400).send("Name, email and message are required");
    }

    if (multerReq.files && Array.isArray(multerReq.files) && multerReq.files.length > 0) {
      newMessage.attachments = multerReq.files.map((file: Express.Multer.File) => file.filename);
    }

    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
*/

const loadMessages = async (req: any, res: any) => {
    try {
        const messages = await Message.find();
        const user = req.session.user;
        res.render('messages', {title: 'Messages', messages, user: user});
    } catch(err) {
        console.log('Error loading messages', err);
        res.status(500).json({error: 'Internal server error'});
    }
}

const updateNote = async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const { note } = req.body;
      const message = await Message.findById(id);
      if (message) {
        message.note = note;
        await message.save();
        res.redirect('/messages');
      } else {
        res.status(404).json({ error: 'Message not found' });
      }
    } catch (error) {
      console.error('Error updating note:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const deleteMessage = async (req: any, res: any) => {
    const messageId = req.params.id;
    try {
        const result = await Message.findByIdAndDelete(messageId);
        if (result) {
            res.status(200).json({ redirect: '/messages' });
        } else {
            res.status(404).send('Message not found');
        }
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).send('Internal server error');
    }
}
export default {
  /* storeMessage, */
    saveMessage,
    loadMessages,
    updateNote,
    deleteMessage
  };
  