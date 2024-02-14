import React from "react";
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { MemberGroup } from "../components/MemberGroup";
import { PageProps } from "../App";


class AlumniPage extends React.Component<RouteComponentProps & PageProps> {

    renderAlumniYears() {
        const alumniYears = this.props.mmData?.alumniYears
        if (!alumniYears) {
            return <div className="loading">Loading...</div>
        }
        const arr = Array.from(alumniYears.entries())
        arr.sort((a, b) => b[0] - a[0]);
        return <div className="voice-groups">
            {arr.map((val) => <MemberGroup key={val[0]} members={val[1]} title={val[0].toString()} />)}
        </div>

    }

    render() {
        return (<div className="create">
            <div className="members-title">
                <h1>Alumni</h1>
                <div onClick={() => this.props.history.goBack()}
                    className="members-visit-alumni">
                    <img src="/resources/icons/chevron-left.png" alt="Go back icon" className="chevron" />
                    <h2>Go Back</h2>
                </div>
            </div>
            <div className="members-about">
                <p>Established in the Spring of 2018, The Mediocre Melodies is an a cappella group that prides itself on
                    being the worst a cappella group on campus. The group is comprised of individuals with singing ability
                    ranging from "please stop" to "that doesn't sound too bad". The Mediocre Melodies is a growing club that
                    connects over humor and a passion for mediocrity.</p>
            </div>

            {this.renderAlumniYears()}
        </div>)
    }

}


export default withRouter(AlumniPage);