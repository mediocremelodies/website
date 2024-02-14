import React from 'react';
import { MMData } from '../models/MMData';
import { DataUtils } from '../utilities/DataUtils';
import ReactPlayer from 'react-player';

interface ApplyPageProps {
    mmData?: MMData
}

class ApplyPage extends React.Component<ApplyPageProps> {



    renderNotice() {
        if (!this.props.mmData) return <div>Loading...</div>

        const currentDate = new Date();
        const dueDate = new Date(this.props.mmData.applicationDue.getTime());
        dueDate?.setDate(dueDate.getDate() + 1);

        if (this.props.mmData.applicationLink
            && dueDate && currentDate < dueDate
            && currentDate > this.props.mmData.applicationOpens) {
            dueDate.setDate(dueDate.getDate() - 1);
            return <div className="apply-notice">
                <p>{"The Mediocre Melodies is currently accepting applications until " + DataUtils.formatDate(dueDate) + " at 11:59pm"} </p>
                <p>{"Click "}<a href={this.props.mmData.applicationLink} target="_blank" rel="noreferrer">{"here"}</a>
                    {" for the application! Good luck, and have fun with it!"}</p>
            </div>
        }

        return <div className="apply-notice">
            <p>
                <span>The Mediocre Melodies is currently not accepting new members. </span>
                {currentDate < this.props.mmData.applicationOpens ?
                    <span>Applications will open on {DataUtils.formatDate(this.props.mmData.applicationOpens)}.</span> :
                    <span>We accept applications at the start of each
                        semester.</span>}
            </p>

            <p>If you wish to be notified when we release our applications, click <a
                href={this.props.mmData.interestedLink} target="_blank" rel="noreferrer">here!</a>
            </p>
        </div>
    }

    render() {
        return (
            <div className="apply-page">
                <h1>Apply</h1>
                {this.renderNotice()}
                <div className="concert-video">
                    <ReactPlayer
                        url={this.props.mmData?.applyYouTubeLink}
                    />
                </div>
            </div>

        );
    }
}

export default ApplyPage