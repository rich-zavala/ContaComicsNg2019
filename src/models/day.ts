import * as moment from "moment";
import { ICCRecord } from "./record";

export interface ICCDay {
    date: string;
    total: number;
    records: string[];
}

export class CCDay implements ICCDay {
    date: string;
    total: number;
    records: string[];

    constructor(data: ICCDay) {
        if (data) {
            this.date = data.date;
            this.total = parseInt(data.total.toString(), 10);
            this.records = data.records || [];
        }
    }
}
