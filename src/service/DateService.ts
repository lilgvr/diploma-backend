type AddType = "seconds" | "minutes" | "hours" | "days";

export class DateService {
    static seconds(n: number): number {
        return n * 1000;
    }

    static minutes(n: number): number {
        return this.seconds(n) * 60;
    }

    static hours(n: number): number {
        return this.minutes(n) * 60;
    }

    static days(n: number): number {
        return this.hours(n) * 24;
    }

    static addToNow(n: number, type: AddType): Date {
        return new Date(Date.now() + this[type](n));
    }
}
