import React from "react";
import { observer } from "mobx-react";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ReactPlayer from "react-player";
import { animateScroll as scroll } from "react-scroll";
import { PageProps } from "../App";


@observer
class Home extends React.Component<RouteComponentProps & PageProps> {


    render() {
        const navbarHeight = document.getElementById("navbar")?.offsetHeight;
        return (
            <div className="home">
                <div className="home-welcome"
                    id="home-welcome"
                    style={{ height: navbarHeight ? "calc(100vh - " + navbarHeight + "px)" : "50vh" }}>
                    <h1><span className="the-text">The</span> <span>Mediocre Melodies</span></h1>
                    <h2>Cornell's Premier <span className="average-text">(average)</span> <span>a cappella</span> Group</h2>
                    <button className="apply-now"
                        onClick={() => this.props.history.push("/apply")}>
                        Apply Now
                    </button>
                    <div className="arrow-down" onClick={
                        () => {
                            const navbarHeight = document.getElementById("navbar")!.offsetHeight;
                            const welcomeHeight = document.getElementById("home-welcome")!.offsetHeight;
                            scroll.scrollTo(navbarHeight + welcomeHeight);
                        }
                    }>
                        <img className="arrow-down-icon"
                            src="/resources/icons/arrowdown.png"
                            alt="Arrow Down"
                        />
                    </div>
                </div>
                <div >
                    <h1>Who we are</h1>
                    <div className="home-about">
                        <p>The Mediocre Melodies is a revolutionary a cappella group that is truly the first of its kind. We are,
                            quite frankly, average singers who have always wanted an a cappella experience but don't quite have what
                            it takes to make one of the big ones! We are co-ed and focused on having fun and making friends while
                            also creating some beautiful music along the way. Along with being an a cappella group, we donate all
                            possible proceeds to charity. In short, we are "Bad Singers for a Good Cause".</p>
                    </div>
                    <div className="home-group">
                        <div className="home-grouping">
                            <div className="home-icon-figure">
                                <img src="/resources/icons/aud.png" alt="Members Icon" className="home-icon" />
                                <h2 className="home-icon-number">{this.props.mmData?.activeMembers.length ?? "--"}</h2>
                                <h3 className="home-icon-desc">Active Members</h3>
                            </div>
                            <div className="home-icon-figure">
                                <img src="/resources/icons/money.png" alt="Cash Icon" className="home-icon" />
                                <h2 className="home-icon-number">{this.props.mmData?.cashRaised ?? "10,069"}</h2>
                                <h3 className="home-icon-desc">Dollars Raised</h3>
                            </div>
                        </div>
                        <div className="home-grouping">
                            <div className="home-icon-figure">
                                <img src="/resources/icons/flag.png" alt="Flag Icon" className="home-icon" />
                                <h2 className="home-icon-number">2018</h2>
                                <h3 className="home-icon-desc">Founding Year</h3>
                            </div>
                            <div className="home-icon-figure">
                                <img src="/resources/icons/hat.png" alt="Graduation Cap Icon" className="home-icon" />
                                <h2 className="home-icon-number">4.20</h2>
                                <h3 className="home-icon-desc">Average GPA</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="concert-video">
                    <ReactPlayer
                        url={this.props.mmData?.homeYouTubeLink}
                    />
                </div>

            </div>
        );
    }
}

export default withRouter(Home);