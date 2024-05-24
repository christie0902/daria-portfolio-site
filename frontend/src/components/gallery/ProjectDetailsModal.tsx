import React, { useEffect, useRef, useState } from "react";
import './projectDetails.scss';
import { Art } from "../../store/types.ts";

interface ProjectDetailsModalProps {
  id: string;
  onClose: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ id, onClose }) => {
  const [art, setArt] = useState<Art | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtDetails = async () => {
      try {
        const response = await fetch(`/api/details/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch art details");
        }
        const data = await response.json();
        setArt(data);
      } catch (err) {
        setError("Failed to load art details");
        console.error("Error fetching art details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtDetails();
  }, [id]);

  if (loading) {
    return <div className="modal">Loading...</div>;
  }

  if (error) {
    return <div className="modal">{error}</div>;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        {art && (
          <>
            <h2>{art.title}</h2>
            <p>{art.description}</p>
            <table className="details-table">
              <tbody>
                <tr>
                  <td>Category:</td>
                  <td>{art.category}</td>
                </tr>
                <tr>
                  <td>Medium:</td>
                  <td>{art.medium || "N/A"}</td>
                </tr>
                <tr>
                  <td>Dimension:</td>
                  <td>{art.dimension || "N/A"}</td>
                </tr>
                <tr>
                  <td>Featured:</td>
                  <td>{art.featured ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td>Images:</td>
                  <td>
                    {art.images.map((image, index) => (
                      <img key={index} src={image} alt={`Image ${index}`} />
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};


export default ProjectDetailsModal;
