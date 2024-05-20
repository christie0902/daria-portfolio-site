import React, {
  useEffect,
  useRef,
  useState,
  FormEvent,
  ChangeEvent,
} from "react";
import "./contact.scss";
import LazyLoader from "../../lib/utilityComponents/LazyLoader";

interface AttachmentPreview {
  src: string;
  alt: string;
}

const Contact = () => {
  const [attachmentPreviews, setAttachmentPreviews] = useState<(string | ArrayBuffer | null)[]>([]);
  const [attachments, setAttachments] = useState([]);
  const elemRef = useRef(null);
  const [reference, setReference] = useState(null);

  useEffect(() => {
    setReference(elemRef.current);
  }, [elemRef]);

  const handleAttachmentChange = async (event) => {
    const files = Array.from(event.target.files);
  
    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
      });
    });
  
    try {
      const dataURLs = await Promise.all(promises);
      setAttachments(dataURLs);
      setAttachmentPreviews(dataURLs);
      console.log(attachments);
      console.log(attachmentPreviews);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };


  const uploadImage = async (dataUrls) => { 
    try {
      const response = await fetch('/api/upload-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ images: dataUrls })
      });
  
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
  
      const responseData = await response.json();
      console.log(responseData.urls)
      return responseData.urls;
      
    } catch (error) {
      console.error('Upload failed:', error);
      return [];
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const name = event.currentTarget.name.value;
      const email = event.currentTarget.email.value;
      const message = event.currentTarget.message.value;
      const imageURLs = await Promise.all(attachments.map(dataUrl => uploadImage(dataUrl)));


      // Upload images and collect their URLs
      // const uploadedUrls = await Promise.all(
      //   fileDataUrls.map(dataUrl => uploadImage(dataUrl))
      // );

      // const serializeFiles = (files) => {
      //   files.map(file => 
      //    ({
      //     name: file.name,
      //     size: file.size,
      //     type: file.type,
      //     lastModified: file.lastModified
      //   })
      //   )
      // }
      

      // const formData = {
      //   name,
      //   email,
      //   message,
      //   // attachment: Array.from(files), //this returns an array of empty objects when stringified
      //   //OR 
      //   //attachment: serializeFiles(Array.from(files))
      //   //OR
      //   //attachments: uploadedUrls
      // };


      const formData = {
        name,
        email,
        message,
        attachments: imageURLs
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Message sent successfully");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div ref={elemRef}>
      {reference && (
        <LazyLoader targetElement={reference}>
          <div className="contact-section">
            <div className="contact-left-section">
              <div className="contact-title">
                <h3>Daria Alexander</h3>
                <h1>
                  WORK <br />
                  WITH ME
                </h1>
              </div>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-field">
                  <label htmlFor="name">Your name</label>
                  <input type="text" name="name" id="name" />
                </div>
                <div className="contact-field">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" />
                </div>
                <div className="contact-textfield">
                  <label htmlFor="message">Your message</label> <br />
                  <textarea name="message" id="message" />
                </div>
                <div className="contact-attachment">
                  <label htmlFor="attachment">Attach image: </label>

                  <input
                    type="file"
                    name="attachment"
                    id="attachment"
                    multiple
                    onChange={handleAttachmentChange}
                  />
                </div>
                <div className="attachment-preview">
                  {attachmentPreviews?.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Attachment ${index + 1}`}
                    />
                  ))}
                </div>
                <button className="contact-button">Submit</button>
              </form>
            </div>
            <div className="contact-photo">
              <img src="acrylic4.jpg" alt="contact" />
              <div className="contact-info">
                <p>Email: daria@levitsky.info</p>
              </div>
            </div>
          </div>
        </LazyLoader>
      )}
    </div>
  );
};

export default Contact;
