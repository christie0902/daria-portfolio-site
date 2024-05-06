import React, { useEffect, useRef } from "react";
import './projectDetails.scss'
import Slider from "react-slick";

interface ProjectDetails {
    title?: string;
    thumbImage?: string;
    video?: string;
    sliderImages?: string[];
    projectInfo?: string;
    client?: string;
    technologies?: string;
    industry?: string;
    date?: string;
    url?: { link: string; name: string };
    socialLinks?: {
      facebook?: string;
      twitter?: string;
      google?: string;
      instagram?: string;
      mail?: string;
    };
  }

  interface Props {
    darkTheme: boolean;
    projectDetails: ProjectDetails;
  }

const ProjectDetailsModal: React.FC<Props> = ({ darkTheme, projectDetails }) => {
    const sliderRef = useRef<Slider | undefined>();

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  useEffect(() => {
    sliderRef.current.slickGoTo(0);
  }, [projectDetails]);

  return (
    <div className={`modal fade ${darkTheme ? 'dark' : ''}`} tabIndex={-1}>
      <div className="modal-dialog modal-xl">
        <div className={`modal-content ${darkTheme ? 'dark' : ''}`}>
          <div className="modal-body">
            <button type="button" className={`btn-close ${darkTheme ? 'btn-close-white' : ''}`} data-dismiss="modal" aria-label="Close" />
            <div className="ajax-container">
              <h2 className={`title ${darkTheme ? 'text-white' : ''}`}>
                {projectDetails?.title}
              </h2>
              <div className="row g-4">
                <div className="col-md-7">
                  <Slider {...settings} ref={sliderRef}>
                    <div className="item">
                      {!projectDetails?.video && <img className="img-fluid" alt="" src={projectDetails?.thumbImage} />}
                      {projectDetails?.video && <video src={projectDetails.video} autoPlay muted loop style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                    </div>
                    {projectDetails?.sliderImages?.length > 0 &&
                      projectDetails.sliderImages.map((image, index) => (
                        <div className="item" key={index}>
                          {!projectDetails?.video && <img className="img-fluid" alt="" src={image} />}
                          {projectDetails?.video && <video src={image} autoPlay muted loop style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                        </div>
                      ))}
                  </Slider>
                </div>
                <div className="col-md-5">
                  <h4 className={`info-title ${darkTheme ? 'text-white' : ''}`}>Project Info:</h4>
                  <p className="project-info">{projectDetails?.projectInfo}</p>
                  <h4 className={`details-title ${darkTheme ? 'text-white' : ''}`}>Project Details:</h4>
                  <ul className={`details-list ${darkTheme ? 'text-white' : ''}`}>
                    <li>
                      <span className="detail-label">Client:</span>
                      {projectDetails?.client}
                    </li>
                    <li>
                      <span className="detail-label">Technologies:</span>
                      {projectDetails?.technologies}
                    </li>
                    <li>
                      <span className="detail-label">Industry:</span>
                      {projectDetails?.industry}
                    </li>
                    <li>
                      <span className="detail-label">Date:</span>
                      {projectDetails?.date}
                    </li>
                    <li>
                      <span className="detail-label">URL:</span>
                      <a href={projectDetails?.url?.link} target="_blank" rel="noopener noreferrer">{projectDetails?.url?.name}</a>
                    </li>
                  </ul>
                  <div className="share-section">
                    <div className={`share-label ${darkTheme ? 'text-white' : ''}`}>Share:</div>
                    <ul className="social-icons">
                      <li className="social-icon">
                        <a href={projectDetails?.socialLinks?.facebook} target="_blank" rel="noopener noreferrer" title="Facebook">
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>
                      <li className="social-icon">
                        <a href={projectDetails?.socialLinks?.twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
                          <i className="fab fa-twitter" />
                        </a>
                      </li>
                      <li className="social-icon">
                        <a href={projectDetails?.socialLinks?.google} target="_blank" rel="noopener noreferrer" title="Google">
                          <i className="fab fa-google" />
                        </a>
                      </li>
                      <li className="social-icon">
                        <a href={projectDetails?.socialLinks?.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                          <i className="fab fa-instagram" />
                        </a>
                      </li>
                      <li className="social-icon">
                        <a href={projectDetails?.socialLinks?.mail} target="_blank" rel="noopener noreferrer" title="Email">
                          <i className="fas fa-envelope" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;
