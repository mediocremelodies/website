export type VoicePart = "Bass" | "Tenor" | "Alto" | "Soprano";

export class Member {
    constructor(
        public name: string,
        public netID: string,
        public graduationDate: Date,
        public voicePart: VoicePart,
        public major: string,
        public funFact: string,
    ) { }
}