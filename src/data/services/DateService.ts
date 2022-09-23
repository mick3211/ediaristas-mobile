export const DateService = {
    addHours(startTime: string, hours: number): string {
        let [hour, minute] = startTime.split(':').map(Number);
        hour = Math.min(hour + hours, 23);

        const newHour = hour.toString().padStart(2, '0');
        const newMinute = minute.toString().padStart(2, '0');

        return newHour + ':' + newMinute;
    },

    minAdultBirthday(): Date {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 100);

        return date;
    },

    maxAdultBirthday(): Date {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 18);

        return date;
    },

    transformDate(value: any, originalValue: any): any {
        if (typeof originalValue === 'string') {
            const [dia, mes, ano] = originalValue.split('/');
            if (+mes < 1 || +mes > 12) {
                return new Date();
            }
            return new Date(+ano, +mes - 1, +dia);
        }
        return value;
    },

    getTimeFromDate(date: string): string {
        const [_date, time] = date.split('T');
        const [hours, minutes, ..._others] = time.split(':');

        return `${hours}:${minutes}`;
    },

    getDifferenceHours(datetime: Date): number {
        const now = Date.now();
        const futureDate = datetime.getTime();
        return (futureDate - now) / 1000 / 60 / 60;
    },
};
