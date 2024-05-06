import React, { useEffect, useRef, useState } from "react";
import Isotope from "isotope-layout";
import ProjectDetailsModal from "./ProjectDetailsModal";
import './isotope.scss'

interface Project {
    title: string;
    projectInfo: string;
    client: string;
    technologies: string;
    industry: string;
    date: string;
    url: {
        name: string;
        link: string;
    };
    socialLinks: {
        [key: string]: string;
    };
    thumbImage: string;
    sliderImages: string[];
    categories: string[];
    video?: string;
}

interface PortfolioProps {
    classicHeader: boolean;
    darkTheme: boolean;
}

const Portfolio: React.FC<PortfolioProps> = ({ classicHeader, darkTheme }) => {
    const isotope = useRef<Isotope|null>(null);

    const [filterKey, setFilterKey] = useState("*");
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const [selectedProjectDetails, setSelectedProjectDetails] = useState<Project | null>(null);

    const filters: { [key: string]: string } = {
        WebDev: "web-dev",
        GameDev: "game-dev",
        VFX3D: "vfx-3d",
    };

    const projectsData: Project[] = [
        {
            title: "3Depot - Search",
            projectInfo: "3Depot's engaging search UI was created using React-Three-Fiber. You can search models by their names, keywords, or phrases included in their descriptions. Once clicked, selected boxes flip and show a rotating preview of the 3d model. On click, the user is taken to the garage.",
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
            title: "Squid Game",
            projectInfo: "A game made for a halloween event in a Korean English learning academy at the height of Squid Game's (the show) popularity. The game was inspired by Kirby Air Ride City Trial.",
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
            title: "Camera Tracking",
            projectInfo: "The camera tracking and modelling was done in Blender and the video editing was done in Adobe Premiere.",
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
            sliderImages: [],
            categories: [filters.VFX3D],
            video: "https://res.cloudinary.com/dirwjcohx/video/upload/v1678398977/Portfolio/Motion_track_1_jjvp0m.mp4"
        },
    ];

    useEffect(() => {
        isotope.current = new Isotope(".portfolio-filter", {
            itemSelector: ".portfolio-item",
            layoutMode: "masonry",
        });

        return () => {
            isotope.current?.destroy();
        };
    }, []);

    useEffect(() => {
        if (imagesLoaded && isotope.current) {
            isotope.current.arrange({ filter: filterKey });
        }
    }, [filterKey, imagesLoaded]);

    const handleFilterKeyChange = (key: string) => () => setFilterKey(key);

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
                            {projectsData.map((project, index) => (
                                <div className={"col-sm-6 col-lg-4 portfolio-item " + project.categories.join(" ")} key={index}>
                                    <div className="portfolio-box rounded">
                                        <div className="portfolio-img rounded">
                                            {!project.video && (
                                                <img
                                                    onLoad={() => setImagesLoaded(prev => prev + 1)}
                                                    className="portfolio-img-item img-fluid d-block"
                                                    src={project.thumbImage}
                                                    alt=""
                                                />
                                            )}
                                            {project.video && (
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
                                                    onClick={() => setSelectedProjectDetails(project)}
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