import { Member } from "./Member";

export type VoicePart = "Bass" | "Tenor" | "Alto" | "Soprano";

export class EboardMember extends Member {
    constructor(
        public position: string,
        member: Member,
    ) {
        super(member.name,
            member.netID,
            member.graduationDate,
            member.voicePart,
            member.major,
            member.funFact);
    }


}