import React from "react";
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { MemberGroup } from "../components/MemberGroup";
import { PageProps } from "../App";


class MembersPage extends React.Component<RouteComponentProps & PageProps> {

    renderEBoard() {
        const eboardMembers = this.props.mmData?.eboard;
        if (!eboardMembers) {
            return <></>
        }
        return <MemberGroup members={eboardMembers} title="E-board" />
    }

    renderVoiceParts() {
        const voiceGroups = this.props.mmData?.voiceParts;
        if (!voiceGroups) {
            return <div className="loading">Loading...</div>
        }
        const basses = voiceGroups.get("Bass");
        const tenors = voiceGroups.get("Tenor");
        const altos = voiceGroups.get("Alto");
        const sopranos = voiceGroups.get("Soprano");
        return <div className="voice-groups">
            {basses && <MemberGroup members={basses} title="People who sing low" />}
            {tenors && <MemberGroup members={tenors} title="People who sing medium-low" />}
            {altos && <MemberGroup members={altos} title="People who sing medium-high" />}
            {sopranos && <MemberGroup members={sopranos} title="People who sing high" />}
        </div>

    }

    render() {
        return (<div className="create">
            <div className="members-title">
                <h1>Meet the Group</h1>
                <div onClick={() => this.props.history.push('/alumni')} className="members-visit-alumni">
                    <h2>Visit Alumni</h2>
                    <img src="/resources/icons/chevron-right.png" alt="Go forward icon" className="chevron" />
                </div>
            </div>
            <div className="members-about">
                <p>Established in the Spring of 2018, The Mediocre Melodies is an a cappella group that prides itself on
                    being the worst a cappella group on campus. The group is comprised of individuals with singing ability
                    ranging from "please stop" to "that doesn't sound too bad". The Mediocre Melodies is a growing club that
                    connects over humor and a passion for mediocrity.</p>
            </div>
            {this.renderEBoard()}
            {this.renderVoiceParts()}
        </div >)
    }

}


export default withRouter(MembersPage);