import React, { useState } from "react";
import "./contact.scss";

const Contact = () => {
  const [attachmentPreviews, setAttachmentPreviews] = useState([]);

  const handleAttachmentChange = (event) => {
    const files = event.target.files;
    const previews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setAttachmentPreviews(previews);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="contact-section">
      <div className="contact-left-section">
        <div className="contact-title">
          <h3>Daria Alexander</h3>
          <h1>
            WORK <br />
            WITH ME
          </h1>
        </div>
        <div className="contact-form">
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
            <textarea name="message" id="message" cols={60} rows={5} />
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
              <img key={index} src={preview} alt={`Attachment ${index + 1}`} />
            ))}
          </div>
          <button className="contact-button">Submit</button>
        </div>
      </div>
      <div className="contact-photo">
        <img src="acrylic4.jpg" alt="contact" />
        <div className="contact-info">
          <p>Email: daria@levitsky.info</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
