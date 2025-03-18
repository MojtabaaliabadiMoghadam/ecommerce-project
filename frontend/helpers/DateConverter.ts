import jalaali from 'jalaali-js';
import { useNuxtApp } from '#app';
export default class DateConverter {
    /**
     * Converts Persian numeral characters in a string to English numerals.
     * @param input - String containing Persian numerals.
     * @returns The input string with Persian numerals converted to English numerals.
     */
    static convertPersianNumbersToEnglish(input: string): string {
        // بررسی اینکه آیا ورودی تنها شامل حروف انگلیسی و اعداد انگلیسی است
        const isEnglish = /^[\u0000-\u007F]*$/.test(input);

        if (isEnglish) {
            return input;
        }

        return input.replace(/[\u06F0-\u06F9]/g, (char) => {
            return String.fromCharCode(char.charCodeAt(0) - 1728);
        });
    }

    /**
     * Converts a Jalali date string to a Gregorian date string.
     * @param jalaliDateStr
     * @param outputFormat - Desired output format.
     * @returns The equivalent date string in Gregorian format.
     */
    static convertJalaliToGregorian(jalaliDateStr: string, outputFormat: string = 'yyyy-MM-dd'): string {
        const [datePart, timePart] = jalaliDateStr.split('T');
        const [year, month, day] = datePart.split('/').map(Number);

        // Convert Jalali date to Gregorian date
        const gregorianDate = jalaali.toGregorian(year, month, day);

        // Create a Date object
        const date = new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd);

        return this.formatDate(date, outputFormat, timePart);
    }

    /**
     * Converts a Gregorian date string to a Jalali date string.
     * @param gregorianDateStr - Date string in Gregorian format.
     * @param outputFormat - Desired output format.
     * @returns The equivalent date string in Jalali format.
     */
    static convertGregorianToJalali(gregorianDateStr: string, outputFormat: string = 'yyyy/MM/dd'): string {
        const [datePart, timePart] = gregorianDateStr.split('T');
        const [year, month, day] = datePart.split('-').map(Number);

        // Convert Gregorian date to Jalali date
        const jalaliDate = jalaali.toJalaali(year, month, day);

        // Create a Date object
        const date = new Date(year, month - 1, day);

        return this.formatDate(date, outputFormat, timePart, jalaliDate);
    }

    /**
     * Formats a date object to a specified format.
     * @param date - Date object to format.
     * @param format - Desired output format.
     * @param timePart - Time part of the date string (optional).
     * @param jalaliDate - Jalali date object (optional).
     * @returns The formatted date string.
     */
    static formatDate(date: Date, format: string, timePart?: string, jalaliDate?: {
        jy: number,
        jm: number,
        jd: number
    }): string {
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const jalaliWeekdays = ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
        const jalaliMonths = [
            "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
            "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
        ];

        const gy = date.getFullYear();
        const gm = (date.getMonth() + 1).toString().padStart(2, '0');
        const gd = date.getDate().toString().padStart(2, '0');
        const dayOfWeek = weekdays[date.getDay()];
        const monthName = months[date.getMonth()];

        let jy = jalaliDate ? jalaliDate.jy : gy;
        let jm = jalaliDate ? jalaliDate.jm.toString().padStart(2, '0') : gm;
        let jd = jalaliDate ? jalaliDate.jd.toString().padStart(2, '0') : gd;
        const jalaliMonthName = jalaliDate ? jalaliMonths[jalaliDate.jm - 1] : monthName;
        const jalaliDayOfWeek = jalaliDate ? jalaliWeekdays[date.getDay()] : dayOfWeek;
        let formattedDate = format
            .replace('dddd', jalaliDate ? jalaliDayOfWeek : dayOfWeek)
            .replace('MMMM', jalaliDate ? jalaliMonthName : monthName)
            .replace('yyyy', jalaliDate ? jy.toString() : gy.toString())
            .replace('yy', jalaliDate ? jy.toString().slice(-2) : gy.toString().slice(-2))
            .replace('MM', jalaliDate ? jm : gm)
            .replace('dd', jalaliDate ? jd : gd);

        if (timePart) {
            const [hours, minutes, seconds] = timePart.split(':').map(Number);
            const hh = hours.toString().padStart(2, '0');
            const mm = minutes.toString().padStart(2, '0');
            const ss = seconds ? seconds.toString().padStart(2, '0') : '00';
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const hh12 = (hours % 12 || 12).toString().padStart(2, '0');

            formattedDate = formattedDate
                .replace('HH', hh)
                .replace('hh', hh12)
                .replace('mm', mm)
                .replace('ss', ss)
                .replace('A', ampm);
        }

        return formattedDate;
    }

    /**
     * Converts a date string to the requested format (Gregorian or Jalali).
     * @param dateString - Date string in either Jalali (yyyy/MM/dd) or Gregorian (yyyy-MM-dd) format.
     * @param format - Desired output format: 'jalali' for Jalali format or 'gregorian' for Gregorian format.
     * @param outputFormat - Custom format for the output date string.
     * @returns The date string converted to the specified format.
     * @throws Error if the input format is neither 'jalali' nor 'gregorian'.
     */
    static convertDateFormat(dateString: string, outputFormat: string = 'yyyy-MM-dd', format: 'jalali' | 'gregorian' = 'gregorian'): string {
        const { $i18n } = useNuxtApp();
        const standardizedDateString = this.convertPersianNumbersToEnglish(dateString);
        let formatNew = format;
        let outputFormatNew = outputFormat;
        if (format === 'jalali') {
            formatNew = ($i18n.locale.value === 'ar' || $i18n.locale.value === 'fa') ? 'jalali' : 'gregorian';

            if (outputFormat === 'yyyy/MM/dd') {
                outputFormatNew = ($i18n.locale.value === 'ar' || $i18n.locale.value === 'fa')
                    ? 'yyyy/MM/dd'
                    : 'yyyy-MM-dd';
            }
        }
        if (formatNew === 'jalali') {
            // Check if input date string is in Gregorian format
            const isGregorianDate = standardizedDateString.includes('-');

            if (isGregorianDate) {
                return this.convertGregorianToJalali(standardizedDateString, outputFormatNew);
            } else {
                // Directly format Jalali date if it is already in Jalali format
                const [year, month, day] = standardizedDateString.split('/').map(Number);
                const jalaliDate = {jy: year, jm: month, jd: day};
                const date = new Date(jalaali.toGregorian(year, month, day).gy, jalaali.toGregorian(year, month, day).gm - 1, jalaali.toGregorian(year, month, day).gd);
                return this.formatDate(date, outputFormatNew, undefined, jalaliDate);
            }
        } else if (formatNew === 'gregorian') {
            // Check if input date string is in Jalali format
            const isJalaliDate = standardizedDateString.includes('/');
            if (isJalaliDate) {
                return this.convertJalaliToGregorian(standardizedDateString, outputFormatNew);
            } else {
                // Directly format Gregorian date if it is already in Gregorian format
                const [datePart, timePart] = standardizedDateString.split('T');
                const [year, month, day] = datePart.split('-').map(Number);
                const date = new Date(year, month - 1, day);
                return this.formatDate(date, outputFormatNew, timePart);
            }
        } else {
            throw new Error(`Unsupported format '${formatNew}'. Supported formats are 'jalali' and 'gregorian'.`);
        }
    }
}
