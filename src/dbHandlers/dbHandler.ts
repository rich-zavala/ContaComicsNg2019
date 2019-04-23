import { Observable } from "rxjs";
import { ICCRecord } from "../models/record";
import { ICCCollection } from "../models/collection";
import { ICCDay } from "../models/day";

export interface IInsertRecordResponse {
    duplicate: boolean;
    record: ICCRecord;
}

export interface ICCDBHandler {
    insert(data: ICCRecord): Observable<IInsertRecordResponse>;
    check(data: ICCRecord): Observable<ICCRecord>;
    uncheck(data: ICCRecord): Observable<ICCRecord>;
    delete(data: ICCRecord): Observable<boolean>;
    // addYear(year: number): Observable<boolean>;
    // removeYear(year: number): Observable<boolean>;
    getYears(): Observable<ICCCollection>;
    // getRecotdByDate(year: number): Observable<ICCDay>;
    // getRecotdBySerie(year: number): Observable<ICCDay>;
    // addDate(date: ICCDay): Observable<boolean>;
    // removeDate(date: ICCDay): Observable<boolean>;
    // getRecordsByDate(date: number): Observable<ICCDay>;
    // getRecordsBySerie(serie: string): Observable<ICCRecord[]>;
}
