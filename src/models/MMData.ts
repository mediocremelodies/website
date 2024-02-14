import { EboardMember } from "./EBoardMember";
import { Member, VoicePart } from "./Member";


export class MMData {

    constructor(
        public interestedLink: string,
        public cashRaised: string,
        public applicationDue: Date,
        public applicationOpens: Date,
        public applicationLink: string,
        public homeYouTubeLink: string,
        public applyYouTubeLink: string,
        public members: Member[],
        public eboard: EboardMember[],
    ) {

    }

    getMember(netID: string): Member | undefined {
        for (var i = 0; i < this.members.length; i++) {
            var mem = this.members[i];
            if (mem.netID === netID) {
                return mem;
            }
        }
        return;
    }

    private getMembers(active?: boolean): Member[] {
        const date = new Date();
        return this.members.filter((mem) => {
            if (active === undefined) return true
            return active ?
                mem.graduationDate > date :
                mem.graduationDate < date
        });
    }

    public get activeMembers(): Member[] {
        return this.getMembers(true);
    }

    public get gradMembers(): Member[] {
        return this.getMembers(false);
    }

    public get voiceParts(): Map<VoicePart, Member[]> {
        return this.activeMembers.reduce((grouped, mem) => {
            const group = grouped.get(mem.voicePart);
            group && group.push(mem);
            !group && grouped.set(mem.voicePart, [mem]);
            return grouped;
        }, new Map<VoicePart, Member[]>());
    }

    public get alumniYears() {
        return this.gradMembers.reduce((grouped, mem) => {
            const group = grouped.get(mem.graduationDate.getFullYear());
            group && group.push(mem);
            !group && grouped.set(mem.graduationDate.getFullYear(), [mem]);
            return grouped;
        }, new Map<number, Member[]>());

    }


}