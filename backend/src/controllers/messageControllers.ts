import Message from "../models/message";
import {storage} from '../../storage/storage';
import multer from 'multer';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const upload = multer({ storage }).array('attachment');

const storeMessage = async(req: any, res: any) => {
  let attachments: string[] = [];
    try {
      const { name, email, message, attachments} = req.body;

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
            res.status(200).send('Message deleted successfully');
        } else {
            res.status(404).send('Message not found');
        }
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).send('Internal server error');
    }
}

const uploadImage = async (req, res) => {
  try {
    const dataUrls = req.body.images;

    if (!dataUrls || !Array.isArray(dataUrls) || dataUrls.length === 0) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    const uploadPromises = dataUrls.map(async (dataUrl) => {
      const result = await cloudinary.uploader.upload(dataUrl);
      return result.secure_url;
    });

    const secureUrls = await Promise.all(uploadPromises);

    return res.status(200).json({ urls: secureUrls });
  } catch (error) {
    console.error('Error uploading image(s) to Cloudinary:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default {
    storeMessage,
    loadMessages,
    updateNote,
    deleteMessage,
    uploadImage
  };
  