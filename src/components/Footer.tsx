import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';


class Footer extends React.Component<RouteComponentProps> {

    render() {
        return (
            <div className="footer-basic">
                <footer>
                    <div className="social">
                        <a href="https://www.youtube.com/channel/UCOC5F8S88nD56j_D_PPDgMg/featured" target="_blank" rel="noreferrer" className="social-icon-circle">
                            <img src="/resources/icons/youtube.png" alt="Youtube Icon" className="social-icon icon-youtube" />
                        </a>
                        <a href="https://www.instagram.com/themediocremelodies" target="_blank" rel="noreferrer" className="social-icon-circle">
                            <img src="/resources/icons/instagram.png" alt="Instagram Icon" className="social-icon icon-instagram" />
                        </a>
                        <a href="https://www.linkedin.com/in/jackcallard/" target="_blank" rel="noreferrer" className="social-icon-circle">
                            <img src="/resources/icons/linkedin.png" alt="LinkedIn Icon" className="social-icon icon-linkedin" />
                        </a>
                    </div>
                    <ul className="list-inline">
                        <li className="list-inline-item"><Link to="/">Home</Link></li>
                        <li className="list-inline-item"><Link to="/members">Meet the Group</Link></li>
                        <li className="list-inline-item"><Link to="/apply">Apply</Link></li>
                    </ul>
                    <p className="copyright">The Mediocre Melodies</p>
                </footer>
            </div >
        );
    }
}

export default withRouter(Footer);