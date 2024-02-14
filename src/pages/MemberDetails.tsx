

import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { PageProps } from '../App';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { animateScroll as scroll } from "react-scroll";


@observer
export class MemberDetails extends React.Component<RouteComponentProps & PageProps> {

    @observable
    private headshotLink = "/resources/icons/square.png";

    private first = true;

    constructor(props: any) {
        super(props);
        scroll.scrollToTop({ duration: 0 });
    }


    render() {
        const netID = this.props.location.pathname.split("/")[2];
        var member = this.props.mmData?.getMember(netID);
        if (this.first && member) {
            const storage = getStorage();
            getDownloadURL(ref(storage, `headshots/${netID}.JPG`))
                .then(action((url: string) => this.headshotLink = url))
                .catch(action((e: Error) => console.log(`No picture of ${netID}`)));
            this.first = false;
        }
        if (!member) {
            return <></>
        }
        return (
            <div className="member-details">
                <div className="member-detail-square">
                    <img src="/resources/icons/back-arrow.png"
                        alt="Go back icon"
                        className="back-arrow clickable"
                        onClick={this.props.history.goBack} />
                    <img className="member-detail-headshot headshot"
                        alt={"Headshot of " + member.name}
                        src={this.headshotLink} />
                    <h1>{member.name}</h1>
                    <h2>{member.voicePart}</h2>
                    <h3>Class of {member.graduationDate.getFullYear()} - {member.major}</h3>
                    <p>{member.funFact}</p>
                </div>
            </div>
        );
    }
}

export default withRouter(MemberDetails);