import { MMData } from "../models/MMData";
import { remoteConfig } from "../Firebase"
import { fetchAndActivate, getValue } from "@firebase/remote-config";
import { Member, VoicePart } from "../models/Member";
import { EboardMember } from "../models/EBoardMember";

export interface DirectoryRow {
    "Graduation year": number;
    "Name": string;
    "Voice Part": VoicePart;
    "Fun Fact": string;
    "Major": string;
    "Graduation month": "May" | "December";
    "Email Address": string;
}

export interface EboardRow {
    "Position": string;
    "Name": string;
    "Email Address": string;
}

export class DataUtils {


    private static mapDate(text: string): Date {
        const splt = text.split("-").map((val) => parseInt(val));
        return new Date(2000 + splt[2], splt[0] - 1, splt[1])
    }

    private static memberMap(mem: DirectoryRow): Member {
        const netID = mem["Email Address"].split("@")[0];
        return new Member(
            mem["Name"],
            netID,
            new Date(mem["Graduation year"], mem["Graduation month"] === "May" ? 5 : 11),
            mem["Voice Part"],
            mem["Major"],
            mem["Fun Fact"]
        )
    }

    public static async getData(): Promise<MMData> {
        await fetchAndActivate(remoteConfig)

        const applicationDue = DataUtils.mapDate(getValue(remoteConfig, "applicationDue").asString())
        const applicationOpens = DataUtils.mapDate(getValue(remoteConfig, "applicationOpens").asString())

        const interestedLink = getValue(remoteConfig, "interestedLink").asString()
        const cashRaised = getValue(remoteConfig, "cashRaised").asString()
        const applicationLink = getValue(remoteConfig, "applicationLink").asString()
        const homeYouTubeLink = getValue(remoteConfig, "homeYouTubeLink").asString()
        const applyYouTubeLink = getValue(remoteConfig, "applyYouTubeLink").asString()

        const members: Member[] = [];
        const memberMap = new Map<string, Member>();
        const jsonMembers: DirectoryRow[] = JSON.parse(getValue(remoteConfig, "members").asString())

        for (var i = 0; i < jsonMembers.length; i++) {
            var member = DataUtils.memberMap(jsonMembers[i]);
            members.push(member)
            memberMap.set(member.netID, member);
        }

        const eboardList: EboardMember[] = [];
        const jsonEboard: EboardRow[] = JSON.parse(getValue(remoteConfig, "eboard").asString())

        jsonEboard.forEach((val: EboardRow) => {
            const netID = val["Email Address"].split("@")[0];
            const member = memberMap.get(netID);
            member && eboardList.push(new EboardMember(
                val["Position"],
                member,
            ));
        });

        return new MMData(interestedLink,
            cashRaised,
            applicationDue,
            applicationOpens,
            applicationLink,
            homeYouTubeLink,
            applyYouTubeLink,
            members,
            eboardList)
    }

    private static formatDateNumber(num: number) {
        const strung = num.toString();
        const lastDigit = num.toString()[num.toString().length - 1]
        if (num <= 20 && num >= 10) return strung + "th";
        switch (lastDigit) {
            case "1":
                return strung + "st";
            case "2":
                return strung + "nd";
            case "3":
                return strung + "rd";
            default:
                return strung + "th";
        }
    }

    public static formatDate(date: Date) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[date.getDay()] + ", " + months[date.getMonth()] + " " + DataUtils.formatDateNumber(date.getDate());
    }



}

