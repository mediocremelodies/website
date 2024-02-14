import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { EboardMember } from '../models/EBoardMember';
import { Member } from '../models/Member';




interface MemberSquareProps {
    member: Member | EboardMember;
}

@observer
class MemberSquare extends React.Component<MemberSquareProps & RouteComponentProps> {

    @observable
    private headshotLink = "/resources/icons/square.png";

    constructor(props: any) {
        super(props);
        const storage = getStorage();
        getDownloadURL(ref(storage, `headshots/${this.props.member.netID}.JPG`))
            .then(action((url: string) => this.headshotLink = url))
            .catch(action((e: Error) => console.log(`No picture of ${this.props.member.name}: ${this.props.member.netID}`)));
    }
    render() {
        return (
            <div className="member-square clickable"
                onClick={() => this.props.history.push(`/members/${this.props.member.netID}`, { member: this.props.member })}>
                <img className="member-headshot headshot"
                    alt={"Headshot of " + this.props.member.name}
                    src={this.headshotLink} />
                <h3>{this.props.member.name}</h3>
                <h4>{this.props.member instanceof EboardMember
                    ? this.props.member.position
                    : this.props.member.graduationDate.getFullYear()}</h4>
            </div>
        );
    }
}

export default withRouter(MemberSquare);
