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
  const [attachmentPreviews, setAttachmentPreviews] = useState([]);
  const elemRef = useRef(null);
  const [reference, setReference] = useState(null);

  useEffect(() => {
    setReference(elemRef.current);
  }, [elemRef]);

  const handleAttachmentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const previews: AttachmentPreview[] = [];

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = {
        name: event.currentTarget.name.value,
        email: event.currentTarget.email.value,
        message: event.currentTarget.message.value,
        attachment: event.currentTarget.attachment.value
      };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
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
