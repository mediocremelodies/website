import React from 'react';
import { Member } from '../models/Member';
import MemberSquare from './MemberSquare';


interface MemberGroupProps {
    title: string;
    members: Member[];
}

export class MemberGroup extends React.Component<MemberGroupProps> {
    render() {
        return (
            <div className="member-group">
                <h2>{this.props.title}</h2>
                <div className="member-group-members">
                    {this.props.members
                        .map((mem) => <MemberSquare member={mem} key={mem.netID} />)}
                </div>
            </div>
        );
    }
}
