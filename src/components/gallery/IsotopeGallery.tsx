import React, { useEffect, useRef, useState } from "react";
import Isotope from "isotope-layout";
import ProjectDetailsModal from "./ProjectDetailsModal";
import './isotope.scss'

interface PortfolioProps {
    classicHeader: boolean;
    darkTheme: boolean;
  }

  const Portfolio: React.FC<PortfolioProps>= ({ classicHeader, darkTheme }) => {
  // init one ref to store the future isotope object
  const isotope = useRef();

  // store the filter keyword in a state
  const [filterKey, setFilterKey] = useState("*");
  const [imagesLoaded, setimagesLoaded] = useState(0);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState();

  const filters: { [key: string]: string } = {
    WebDev: "web-dev",
    GameDev: "game-dev",
    VFX3D: "vfx-3d",
  };

  const projectsData = [
    {
      title: "3Depot - Search",
      projectInfo:
        "3Depot's engaging search UI was created using React-Three-Fiber. You can search models by their names, keywords, or phrases included in their descriptions. Once clicked, selected boxes flip and show a rotating preview of the 3d model. On click, the user is taken to the garage.",
      client: "Epicode capstone",
      technologies: "React, React-Three-Fiber, THREE.js, Bootstrap, Socket.io, Redux, Node.js, Express.js, Mongoose, MongoDB",
      industry: "3D Modeling",
      date: "Jan, 2023",
      url: {
        name: "www.3Depot.org",
        link: "https://www.3Depot.org",
      },
      socialLinks: {
        facebook: "http://www.facebook.com/",
        twitter: "http://www.twitter.com/",
        google: "http://www.google.com/",
        instagram: "http://www.instagram.com/",
        mail: "mailto:example@gmail.com",
      },
      thumbImage: "https://res.cloudinary.com/dirwjcohx/image/upload/v1675466342/Portfolio/Search_Page_tebnp4.jpg",
      sliderImages: [
        "https://res.cloudinary.com/dirwjcohx/image/upload/v1675536515/Portfolio/Search_Page_3_nxzeiw.jpg",
        "https://res.cloudinary.com/dirwjcohx/image/upload/v1675536515/Portfolio/Search_Page_2_ihbflo.jpg"
      ],
      categories: [filters.WebDev],
    },
    {
      title: "3Depot - Garage",
      projectInfo:
        "3Depot's garage features custom light and widget adjustments. It also has draggable windows that show your list of uploaded models, the model info of the active model, garage controls and comments for the active model. Additionally, you can upload, download, delete and share models from the garage.",
      client: "Epicode capstone",
      technologies: "React, React-Three-Fiber, THREE.js, Bootstrap, Socket.io, Redux, Node.js, Express.js, Mongoose, MongoDB",
      industry: "3D Modeling",
      date: "Jan, 2023",
      url: {
        name: "www.3Depot.org",
        link: "https://www.3Depot.org",
      },
      socialLinks: {
        facebook: "http://www.facebook.com/",
        twitter: "http://www.twitter.com/",
        google: "http://www.google.com/",
        instagram: "http://www.instagram.com/",
        mail: "mailto:example@gmail.com",
      },
      thumbImage: "https://res.cloudinary.com/dirwjcohx/image/upload/v1675466342/Portfolio/Garage_jyovjj.jpg",
      sliderImages: [
        "https://res.cloudinary.com/dirwjcohx/image/upload/v1675540780/Portfolio/Garage_lights_ku7o35.jpg",
        "https://res.cloudinary.com/dirwjcohx/image/upload/v1675540780/Portfolio/Garage_plain_vzwps6.jpg",
        "https://res.cloudinary.com/dirwjcohx/image/upload/v1675466342/Portfolio/Share_Link_m9kktj.jpg",
        "https://res.cloudinary.com/dirwjcohx/image/upload/v1675540780/Portfolio/upload_ktgb4u.jpg"
      ],
      categories: [filters.WebDev],
    },
    {
      title: "3Depot - Chat",
      projectInfo:
        "3Depot has a robust chat system integrated into the site. You can share models directly from the garage as well as share images either from the device or from the web. It also shows users online and new message alerts in the responsive friend list.",
      client: "Epicode capstone",
      technologies: "React, React-Three-Fiber, THREE.js, Bootstrap, Socket.io, Redux, Node.js, Express.js, Mongoose, MongoDB",
      industry: "3D Modeling",
      date: "Jan, 2023",
      url: {
        name: "www.3Depot.org",
        link: "https://www.3Depot.org",
      },
      socialLinks: {
        facebook: "http://www.facebook.com/",
        twitter: "http://www.twitter.com/",
        google: "http://www.google.com/",
        instagram: "http://www.instagram.com/",
        mail: "mailto:example@gmail.com",
      },
      thumbImage: "https://res.cloudinary.com/dirwjcohx/image/upload/v1675466342/Portfolio/Chat_wu5ph2.jpg",
      sliderImages: [
        "https://res.cloudinary.com/dirwjcohx/image/upload/v1675540780/Portfolio/chat_upload_l3sgn8.jpg"
      ],
      categories: [filters.WebDev],
    },
    {
      title: "Squid Game",
      projectInfo:
        "A game made for a halloween event in a Korean English learning academy at the height of Squid Game's (the show) popularity. The game was inspired by Kirby Air Ride City Trial.",
      client: "Wannabe Readers",
      technologies: "Unity, C#, Blender",
      industry: "Games",
      date: "October, 2021",
      url: {
        name: "Squid Game",
        link: "https://pashspice.itch.io/squid-game",
      },
      socialLinks: {
        facebook: "http://www.facebook.com/",
        twitter: "http://www.twitter.com/",
        google: "http://www.google.com/",
        instagram: "http://www.instagram.com/",
        mail: "mailto:example@gmail.com",
      },
      thumbImage: "https://res.cloudinary.com/dirwjcohx/image/upload/v1675552214/Portfolio/Squid_city_b2cfci.jpg",
      sliderImages: [
        "https://res.cloudinary.com/dirwjcohx/image/upload/v1675552214/Portfolio/Squid_underGround_zpzsim.jpg"
      ],
      categories: [filters.GameDev],
    },
    {
      title: "GetAHead",
      projectInfo:
        "GetAHead was created for the Brakey's Game Jam. It's a puzzle game made in Unity/C# where the objective is to disassemble and reassemble robots in order to progress through the levels and let a fully assembled robot escape each stage.",
      client: "Brakeys Game Jam",
      technologies: "Unity, C#, Blender",
      industry: "Games",
      date: "April, 2021",
      url: {
        name: "GetAHead",
        link: "https://pashspice.itch.io/getahead",
      },
      socialLinks: {
        facebook: "http://www.facebook.com/",
        twitter: "http://www.twitter.com/",
        google: "http://www.google.com/",
        instagram: "http://www.instagram.com/",
        mail: "mailto:example@gmail.com",
      },
      thumbImage: "https://res.cloudinary.com/dirwjcohx/image/upload/v1678398602/Portfolio/GetAheadCover_q4n4y5.jpg",
      sliderImages: [
        "https://res.cloudinary.com/dirwjcohx/image/upload/v1675467039/Portfolio/lvl_3_sfr2fz.jpg",
        "https://res.cloudinary.com/dirwjcohx/image/upload/v1675467039/Portfolio/lvl_1_xt4fkw.jpg",
        "https://res.cloudinary.com/dirwjcohx/image/upload/v1675467039/Portfolio/lvl_2_tkgmka.jpg",
        "https://res.cloudinary.com/dirwjcohx/image/upload/v1675467039/Portfolio/Menu_zn7guy.jpg"
      ],
      categories: [filters.GameDev],
    },
    {
      title: "GlobalTennisDesign.com",
      projectInfo:
      "Global Sports & Tennis Design Group is an architecture and architecture consulting firm specializing in racquet sports.",
      client: "Global Sports & Tennis Design Group",
      technologies: "Squarespace, CSS",
      industry: "Architecture",
      date: "July, 2021",
      url: {
        name: "www..GlobalTennisDesign.com",
        link: "https://www.GlobalTennisDesign.com",
      },
      socialLinks: {
        facebook: "http://www.facebook.com/",
        twitter: "http://www.twitter.com/",
        google: "http://www.google.com/",
        instagram: "http://www.instagram.com/",
        mail: "mailto:example@gmail.com",
      },
      thumbImage: "https://res.cloudinary.com/dirwjcohx/image/upload/v1675467034/Portfolio/Splash_f4qlig.jpg",
      sliderImages: [
        "https://res.cloudinary.com/dirwjcohx/image/upload/v1675467034/Portfolio/slide_3_wg4ora.jpg",
        "https://res.cloudinary.com/dirwjcohx/image/upload/v1675467034/Portfolio/slide_1_oo3rff.jpg",
        "https://res.cloudinary.com/dirwjcohx/image/upload/v1675467034/Portfolio/slide_2_oa8v73.jpg"
      ],
      categories: [filters.WebDev],
    },
    {
      title: "Camera Tracking",
      projectInfo:
        "The camera tracking and modelling was done in Blender and the video editing was done in Adobe Premiere.",
      client: "N/A",
      technologies: "Blender, Adobe Premiere",
      industry: "VFX/3D",
      date: "2021-2022",
      url: {
        name: "Camera Tracking",
        link: "https://www.instagram.com/p/CAIZggMpwV4/",
      },
      socialLinks: {
        facebook: "http://www.facebook.com/",
        twitter: "http://www.twitter.com/",
        google: "http://www.google.com/",
        instagram: "http://www.instagram.com/",
        mail: "mailto:example@gmail.com",
      },
      thumbImage: "",
      sliderImages: [
      ],
      categories: [filters.VFX3D],
      video: "https://res.cloudinary.com/dirwjcohx/video/upload/v1678398977/Portfolio/Motion_track_1_jjvp0m.mp4"
    },
    {
      title: "Character modelling and animation",
      projectInfo:
        "Character modelling and animation done in Blender.",
      client: "N/A",
      technologies: "Blender, Adobe Premiere",
      industry: "VFX/3D",
      date: "2021-2022",
      url: {
        name: "Character modelling and animation",
        link: "https://www.instagram.com/p/CA4Amnep1Wa/",
      },
      socialLinks: {
        facebook: "http://www.facebook.com/",
        twitter: "http://www.twitter.com/",
        google: "http://www.google.com/",
        instagram: "http://www.instagram.com/",
        mail: "mailto:example@gmail.com",
      },
      thumbImage: "",
      sliderImages: ["https://res.cloudinary.com/dirwjcohx/video/upload/v1678404663/Portfolio/Wedding_Gift_02_k7woff.mp4"
      ],
      categories: [filters.VFX3D],
      video: "https://res.cloudinary.com/dirwjcohx/video/upload/v1678398887/Portfolio/Christie_Smile_havszg.mp4"
    },
    {
      title: "Compositing",
      projectInfo:
        "Compositing done in Blender and Adobe Premiere.",
      client: "N/A",
      technologies: "Blender, Adobe Premiere",
      industry: "VFX/3D",
      date: "2021-2022",
      url: {
        name: "Compositing",
        link: "https://www.instagram.com/p/B-5rSz6J2gP/",
      },
      socialLinks: {
        facebook: "http://www.facebook.com/",
        twitter: "http://www.twitter.com/",
        google: "http://www.google.com/",
        instagram: "http://www.instagram.com/",
        mail: "mailto:example@gmail.com",
      },
      thumbImage: "",
      sliderImages: ["https://res.cloudinary.com/dirwjcohx/video/upload/v1678398355/Portfolio/treefinal_jut2b3.mp4"
      ],
      categories: [filters.VFX3D],
      video: "https://res.cloudinary.com/dirwjcohx/video/upload/v1678398425/Portfolio/sampo_xkie8t.mp4"
    },
    {
      title: "Texturing and Simulation",
      projectInfo:
        "Procedural and photo based texturing done in Blender. The coins are photo based, the rest is procedural.",
      client: "N/A",
      technologies: "Blender, Adobe Premiere",
      industry: "VFX/3D",
      date: "2021-2022",
      url: {
        name: "Texturing and Simulation",
        link: "https://www.instagram.com/p/CPRys2CD4jU/",
      },
      socialLinks: {
        facebook: "http://www.facebook.com/",
        twitter: "http://www.twitter.com/",
        google: "http://www.google.com/",
        instagram: "http://www.instagram.com/",
        mail: "mailto:example@gmail.com",
      },
      thumbImage: "",
      sliderImages: ["https://res.cloudinary.com/dirwjcohx/video/upload/v1678398888/Portfolio/LessonTest_xt3ptz.mp4"
      ],
      categories: [filters.VFX3D],
      video: "https://res.cloudinary.com/dirwjcohx/video/upload/v1678398973/Portfolio/coins2_stx1xn.mp4"
    },
    {
      title: "Visual Puns",
      projectInfo:
        "Series of visual puns done in Blender.",
      client: "Pasha Puns (me)",
      technologies: "Blender, Adobe Premiere",
      industry: "VFX/3D",
      date: "April, 2021",
      url: {
        name: "Visual Puns",
        link: "https://www.instagram.com/pashapuns/",
      },
      socialLinks: {
        facebook: "http://www.facebook.com/",
        twitter: "http://www.twitter.com/",
        google: "http://www.google.com/",
        instagram: "http://www.instagram.com/",
        mail: "mailto:example@gmail.com",
      },
      thumbImage: "https://res.cloudinary.com/dirwjcohx/image/upload/v1678398560/Portfolio/Box_kxqvl4.png",
      sliderImages: ["https://res.cloudinary.com/dirwjcohx/image/upload/v1678402911/Portfolio/Van_GO_close_j7d5bd.png",
      "https://res.cloudinary.com/dirwjcohx/image/upload/v1678398560/Portfolio/pen2_g5yzx2.png",
      "https://res.cloudinary.com/dirwjcohx/image/upload/v1678398559/Portfolio/peer_pressure_fvnodx.png",
      "https://res.cloudinary.com/dirwjcohx/image/upload/v1678398559/Portfolio/Sportscar_ftngr6.png",
      "https://res.cloudinary.com/dirwjcohx/image/upload/v1678398558/Portfolio/china_bj6yfe.png",
      "https://res.cloudinary.com/dirwjcohx/image/upload/v1678398558/Portfolio/Grandfather_clock_qzixua.png"



      ],
      categories: [filters.VFX3D]
    },
  ];

  // initialize an Isotope object with configs
  useEffect(() => {
    isotope.current = new Isotope(".portfolio-filter", {
      itemSelector: ".filter-item",
      layoutMode: "masonry",
    });

    // cleanup
    return () => {
      isotope.current.destroy();
    };
  }, []);

  // handling filter key change
  useEffect(() => {
    if (imagesLoaded) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey, imagesLoaded]);

  const handleFilterKeyChange = (key) => () => setFilterKey(key);

  return (
    <>
      <section id="portfolio" className={"portfolio-section " + (darkTheme ? "dark-bg" : "light-bg")}>
        <div className={"portfolio-container " + (classicHeader ? "" : "px-lg-5")}>
          <div className="position-relative d-flex text-center mb-5">
            <h2 className={"portfolio-heading text-uppercase fw-600 w-100 mb-0 " + (darkTheme ? "text-muted opacity-1" : "text-light opacity-4")}>
              Portfolio
            </h2>
            <p className={"portfolio-subheading text-dark fw-600 position-absolute w-100 align-self-center lh-base mb-0 " + (darkTheme ? "text-white" : "text-dark")}>
              My Work
              <span className="heading-separator-line" />
            </p>
          </div>
          <ul className={"portfolio-menu nav nav-tabs justify-content-center " + (darkTheme ? "nav-light" : "")}>
            <li className="nav-item">
              <button className={"portfolio-menu-btn " + (filterKey === "*" ? "active" : "")} onClick={handleFilterKeyChange("*")}>All</button>
            </li>
            {Object.keys(filters).map((oneKey, i) => (
              <li className="nav-item" key={i}>
                <button className={"portfolio-menu-btn " + (filterKey === filters[oneKey] ? "active" : "")} onClick={handleFilterKeyChange(filters[oneKey])}>{filters[oneKey]}</button>
              </li>
            ))}
          </ul>
          <div className="portfolio-gallery">
            <div className="row portfolio-filter filter-container g-4">
              {projectsData.length > 0 &&
                projectsData.map((project, index) => (
                  <div className={"col-sm-6 col-lg-4 portfolio-item " + project.categories.join(" ")} key={index}>
                    <div className="portfolio-box rounded">
                      <div className="portfolio-img rounded">
                        {!project.video && (
                          <img
                            onLoad={() => {
                              setImagesLoaded(imagesLoaded + 1);
                            }}
                            className="portfolio-img-item img-fluid d-block"
                            src={project.thumbImage}
                            alt=""
                          />
                        )}
                        {project?.video && (
                          <video
                            src={project.video}
                            autoPlay
                            muted
                            loop
                            className="portfolio-video-item"
                          ></video>
                        )}
                        <div className="portfolio-overlay">
                          <a
                            className="popup-ajax stretched-link"
                            href=""
                            onClick={() => {
                              setSelectedProjectDetails(projectsData[index]);
                            }}
                          />
                          <div className="portfolio-overlay-details">
                            <h5 className="portfolio-title">{project.title}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      <div className="project-details-modal">
        <ProjectDetailsModal projectDetails={selectedProjectDetails} darkTheme={darkTheme} />
      </div>
    </>
  );
};

export default Portfolio;