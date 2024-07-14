import React, { useEffect, useState, useContext } from "react";
import "./projectDetails.scss";
import { Art } from "../../store/types.ts";
import ThemeContext from "../../lib/utilityComponents/themeContext";

interface ProjectDetailsModalProps {
  id: string;
  onClose: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  id,
  onClose,
}) => {
  const { theme } = useContext(ThemeContext);

  const [art, setArt] = useState<Art | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const serverURL = "https://daria-server.levitsky.info";

  useEffect(() => {
    const fetchArtDetails = async () => {
      try {
        const response = await fetch(`${serverURL}/api/details/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
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
    <div className='modal'>
      <div className={`modal-content ${theme === 'dark' ? 'dark-mode' : ''}`}>
        <button className={`close-button ${theme === 'dark' ? 'dark-mode' : ''}`}onClick={onClose}>
          X
        </button>
        {art && (
          <>
            <h2 className={`${theme === 'dark' ? 'dark-mode' : ''}`}>{art.title}</h2>
            <p className={`${theme === 'dark' ? 'dark-mode' : ''}`}>{art.description}</p>
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
                      <img
                        key={index}
                        src={image}
                        alt={`Image ${index}`}
                      />
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
