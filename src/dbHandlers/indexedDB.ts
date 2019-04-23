import * as Rx from "rxjs";
import { finalize } from "rxjs/operators";
import * as db from "localforage";
import * as moment from "moment";
import * as lodash from "lodash";

import { DATE_FORMAT } from "src/constants/formats";
import { ICCDBHandler, IInsertRecordResponse } from "./dbHandler";
import { ICCRecord, CCRecord } from "../models/record";
import { ICCCollection } from "../models/collection";
import { ICCDay } from "../models/day";
import { ICCYear } from "../models/year";
import { ICCSerie } from "src/models/serie";

export class IndexedDB implements ICCDBHandler {
    dbYears: LocalForage;
    dbDays: LocalForage;
    dbRecords: LocalForage;
    dbSeries: LocalForage;

    constructor() {
        this.dbYears = db.createInstance({ name: "dbYears" });
        this.dbDays = db.createInstance({ name: "dbDays" });
        this.dbRecords = db.createInstance({ name: "dbRecords" });
        this.dbSeries = db.createInstance({ name: "dbSeries" });
    }

    insert(cc: ICCRecord): Rx.Observable<IInsertRecordResponse> {
        const resp: IInsertRecordResponse = { duplicate: false, record: null };
        return new Rx.Observable(observer => {
            this.insertRecord(cc)
                .pipe(
                    finalize(() => {
                        observer.next(resp);
                        observer.complete();
                    })
                )
                .subscribe(
                    dbData => resp.record = dbData,
                    dbData => {
                        resp.duplicate = true;
                        resp.record = dbData;
                    }
                );
        });
    }

    private insertRecord(cc: ICCRecord): Rx.Observable<CCRecord> {
        cc.id = new CCRecord(cc).id;
        return new Rx.Observable(observer => {
            this.dbRecords.getItem(cc.id, (recErr, record) => {
                if (recErr || record) {
                    observer.error(record);
                    observer.complete();
                } else {
                    this.dbRecords.setItem(cc.id, cc, (err, recordItem) => {
                        if (err) {
                            observer.error(err);
                        } else {
                            const ccInstance = new CCRecord(cc);
                            const dataHandlers = [
                                this.insertYear(ccInstance),
                                this.insertDay(ccInstance),
                                this.insertSerie(ccInstance)
                            ];
                            Rx.merge(...dataHandlers)
                                .pipe(
                                    finalize(() => {
                                        observer.next(ccInstance);
                                        observer.complete();
                                    })
                                )
                                .subscribe();
                        }
                    });
                }
            });
        });
    }

    private insertYear(cc: CCRecord): Rx.Observable<ICCYear> {
        const year = cc.getPublishYear();
        const day = cc.getPublishDate();
        return new Rx.Observable(observer => {
            this.getYear(year).subscribe(
                yearData => {
                    if (yearData) {
                        yearData.days.push(day);
                        yearData.days = lodash.uniq(yearData.days);
                        yearData.total += cc.price;
                    } else {
                        yearData = {
                            year,
                            days: [day],
                            total: cc.price
                        };
                    }
                    this.dbYears.setItem(year.toString(), yearData, (err, val) => {
                        if (err) {
                            observer.error(err);
                        } else {
                            observer.next(val);
                        }
                        observer.complete();
                    });
                }
            );
        });
    }

    private insertDay(cc: CCRecord): Rx.Observable<ICCDay> {
        return new Rx.Observable(observer => {
            const day = cc.getPublishDate();
            this.getDay(cc.title).subscribe(
                dayData => {
                    if (dayData) {
                        dayData.records.push(cc.id);
                        dayData.records = lodash.uniq(dayData.records);
                        dayData.total += cc.price;
                    } else {
                        dayData = {
                            date: day,
                            records: [cc.id],
                            total: cc.price
                        };
                    }
                    this.dbDays.setItem(day, dayData, (err, val) => {
                        if (err) {
                            observer.error(err);
                        } else {
                            observer.next(val);
                        }
                        observer.complete();
                    });
                }
            );
        });
    }

    private insertSerie(cc: CCRecord): Rx.Observable<ICCSerie> {
        return new Rx.Observable(observer => {
            this.getSerie(cc.title).subscribe(
                serieData => {
                    if (serieData) {
                        serieData.records.push(cc.id);
                        serieData.records = lodash.uniq(serieData.records);
                        serieData.total += cc.price;
                    } else {
                        serieData = {
                            name: cc.title,
                            records: [cc.id],
                            total: cc.price
                        };
                    }
                    this.dbSeries.setItem(serieData.name, serieData, (err, val) => {
                        if (err) {
                            observer.error(err);
                        } else {
                            observer.next(val);
                        }
                        observer.complete();
                    });
                }
            );
        });
    }

    private getYear(year: number): Rx.Observable<ICCYear> {
        return new Rx.Observable(observer => {
            const yStr = year.toString();
            this.dbYears.getItem(yStr, (err, yearData: ICCYear) => {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(yearData);
                }
                observer.complete();
            });
        });
    }

    private getDay(day: string): Rx.Observable<ICCDay> {
        return new Rx.Observable(observer => {
            this.dbDays.getItem(day, (err, dayData: ICCDay) => {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(dayData);
                }
                observer.complete();
            });
        });
    }

    private getSerie(serie: string): Rx.Observable<ICCSerie> {
        return new Rx.Observable(observer => {
            this.dbSeries.getItem(serie, (err, serieData: ICCSerie) => {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(serieData);
                }
                observer.complete();
            });
        });
    }

    check(data: ICCRecord): Rx.Observable<ICCRecord> {
        return new Rx.Observable(observer => {

        });
    }

    uncheck(data: ICCRecord): Rx.Observable<ICCRecord> {
        return new Rx.Observable(observer => {

        });
    }

    delete(data: ICCRecord): Rx.Observable<boolean> {
        return new Rx.Observable(observer => {

        });
    }

    getYears(): Rx.Observable<ICCCollection> {
        return new Rx.Observable(observer => { });
    }

    getDays(year: number): Rx.Observable<ICCDay> {
        return new Rx.Observable(observer => { });
    }
}
