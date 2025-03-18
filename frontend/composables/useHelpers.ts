import type {AxiosResponse} from 'axios';
import axios from 'axios';
import {useCookie, useNuxtApp} from "#app";
// axios.defaults.withCredentials = true;

axios.defaults.withCredentials = true;  // اصلاح با withCredentials

interface IResponse {
    status: number;
    message: string;
    data: {
        [key: string]: any;
    };
    errors: IError[];
    timestamp?: string;
}

interface IError {
    message: string;
    code: string;
    field: string;
}

interface FetchDataOptions {
    url: string;
    data?: any | null;
    method?: string | HttpMethods;
    authorization?: boolean;
    headers?: Record<string, string>;
    parameters?: Record<string, string> | any;
    content_type?: string;
}

interface IAlertOptions {
    icon: string;
    text: string;
    title: string;
    timer: number;
    palette: string;
}

/**
 * @var HttpMethods Allowed http methods
 */
enum HttpMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

// A collection of helper functions.
export function useHelpers() {
    const { $toast ,$i18n} = useNuxtApp()
    const runtimeConfig = useRuntimeConfig();
    const backEndUrl: string | null = runtimeConfig.public?.BACK_END_URL
    const isDev: boolean = process.env.NODE_ENV === 'development';
    const router = useRouter()

    function isFilled(value: any): boolean {
        return value !== undefined && value !== null && value !== '';
    }

    function isSet(value: any): boolean {
        return typeof value !== 'undefined' && value !== null;
    }

    function isNumber(value: any): boolean {
        return typeof value === 'number' && !isNaN(value);
    }


    function objectOrArrayIsNotEmpty(value: any): boolean {
        if (value !== null && Array.isArray(value)) {
            return value.length > 0;
        } else if (value !== null && typeof value === 'object') {
            return Object.keys(value).length > 0;
        }
        return false;
    }

    function generateRandomString(n: number = 2): string {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        const alphabetLength = alphabet.length;
        for (let i = 0; i < n; i++) {
            const randomIndex = Math.floor(Math.random() * alphabetLength);
            result += alphabet.charAt(randomIndex);
        }
        const timestamp = Date.now().toString();
        result = `${result}_${timestamp}_${result}`;
        return result;
    }

    function searchInArray(items: any[] = [], search: string | null): any[] {
        return search && isFilled(search) ? items.filter(item => {
            const lowerSearch = search.toLowerCase();
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    let value = item[key];
                    if (typeof value === 'number') {
                        value = value.toString();
                    }
                    if (typeof value === 'string' && isFilled(value) && value.toLowerCase().includes(lowerSearch)) {
                        return true;
                    }
                }
            }
            return false;
        }) : items;
    }

    function getUrl(url: string, api: boolean = true, hash_data: string | null = null): string {
        const baseUrl = backEndUrl;
        let normalizedUrl = url.replace(/\/+/g, '/');
        normalizedUrl = normalizedUrl.startsWith('/') ? normalizedUrl.slice(1) : normalizedUrl;
        normalizedUrl = api ? `api/${normalizedUrl}` : normalizedUrl;

        if (hash_data && isFilled(hash_data)) {
            normalizedUrl += `#${hash_data}`;
        }

        if (baseUrl?.endsWith('/') && normalizedUrl.startsWith('/')) {
            normalizedUrl = normalizedUrl.slice(1);
        } else if (!baseUrl?.endsWith('/') && !normalizedUrl.startsWith('/')) {
            normalizedUrl = `/${normalizedUrl}`;
        }

        return `${baseUrl}${normalizedUrl}`;
    }

    function addBackendToImageUrl(imageUrl: string): string {
        const cleanedImageUrl = imageUrl.replace(/^\/+/, '');
        return `${backEndUrl}/${cleanedImageUrl}`;
    }


    function extractDate(dateTimeString:string) {
        const date = new Date(dateTimeString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getUTCDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    function getDateToday() {
        // Get the current date and time
        const date = new Date();

        // Extract components and pad with leading zeros if necessary
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        // Format the date and time as YYYY-MM-DDTHH:mm:ss
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    function outUser(){
        const token = useCookie<string | null>("auth_token");
        token.value = null;
        navigateTo('/login',{external:true})
    }

    async function fetchData(
        {
            url,
            data = null,
            method = 'get',
            headers = {},
            authorization = false,
            parameters = null,
        }: FetchDataOptions
    ) {

        url = url.replace(/^\/|\/$/g, '');
        headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Language":"fa",
            ...headers,
        };

        if (authorization) {
            const token = useCookie('auth_token').value;
            if (token) {
                headers = {
                    'Authorization': `Bearer ${token}`,
                    ...headers,
                };
            }
        }
        const options = {
            url,
            method,
            headers: {
                ...headers,
            },
            data,
            params: parameters,
            withCredentials: false,
        };

        try {
            const res: AxiosResponse = await axios(options);
            const data: IResponse = res.data;
            return {
                status: res.status,
                data: data.data,
                errors: data.errors,
                message: data.message,
            };
        } catch (error: any) {
            if (error.response.data.error_code === 'AuthenticationException') {
                outUser()
            }
            if (error.response) {
                return {
                    status: error.response.status,
                    errors: error.response.data?.errors || [],
                    message: error.response.data?.message || 'An error occurred',
                };
            } else {
                return {
                    status: 500,
                    errors: [{ message: 'An unknown error occurred', code: '', field: '' }],
                    message: 'An error occurred',
                };
            }
        }
    }


    const showErrorToast = (message: string) => {
        $toast(message, {
            type: 'error',
            position: 'top-center',
            duration: 3000,
            theme: 'light',
        })
    }

    const showSuccessToast = (message: string) => {
        $toast(message, {
            type: 'success',
            position: 'top-center',
            duration: 3000,
            theme: 'light',
        })
    }
    function toPersianNumber(num) {
        const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
        return num.toString().replace(/[0-9]/g, (digit) => persianDigits[digit]);
    }

    function getJalaliOptions(type) {
        const options = [];

        if (type === 'year') {
            const currentDate = new Date();
            const gYear = currentDate.getFullYear();
            const gMonth = currentDate.getMonth() + 1;
            const gDay = currentDate.getDate();

            // Approximate conversion from Gregorian to Jalali
            const jalaliYear = gYear - 621 - ((gMonth < 3 || (gMonth === 3 && gDay < 21)) ? 1 : 0);

            for (let i = jalaliYear; i > jalaliYear - 100; i--) {
                options.push({ name: i, id: i });
            }
        } else if (type === 'month') {
            const jalaliMonths = [
                "فروردین", "اردیبهشت", "خرداد",
                "تیر", "مرداد", "شهریور",
                "مهر", "آبان", "آذر",
                "دی", "بهمن", "اسفند"
            ];
            jalaliMonths.forEach((month, index) => {
                options.push({ name: month, id: index + 1 });
            });
        } else if (type === 'day') {
            for (let i = 1; i <= 31; i++) {
                options.push({ name: i, id: i });
            }
        } else {
            throw new Error("Invalid type. Valid types are 'year', 'month', or 'day'.");
        }

        return options;
    }
    const isObjectEmpty = (obj:any) => Object.keys(obj).length === 0;

    const route = useRoute();
    // const runtimeConfig = useRuntimeConfig();

    const isShowingMobileMenu = useState<boolean>('isShowingMobileMenu', () => false);
    const productsPerPage: number = runtimeConfig.public?.PRODUCTS_PER_PAGE || 24;
    const wooNuxtSEO = runtimeConfig.public?.WOO_NUXT_SEO as WooNuxtSEOItem[];
    const frontEndUrl = runtimeConfig.public?.FRONT_END_URL?.replace(/\/$/, '') || null;
    // const isDev: boolean = process.env.NODE_ENV === 'development';
    const FALLBACK_IMG = '/images/placeholder.jpg';

    /**
     * Toggles the mobile menu.
     */
    function toggleMobileMenu(state: boolean | undefined = undefined): void {
        isShowingMobileMenu.value = state ?? !isShowingMobileMenu.value;
    }

    /**
     * Formats an array of variation objects by removing spaces and hyphens from the 'name' and 'value' properties.
     * @param {any[]} arr - The array of variation objects to format. Each object should have 'name' and 'value' properties.
     * @returns {any[]} The formatted array of variation objects.
     */
    const formatVariationArrays = (arr: any[]): any[] => arr.map((a) => ({ name: a.name.replace(/[-\s]/g, ''), value: a.value.replace(/[-\s]/g, '') }));

    /**
     * Determines if two arrays of variations are equal by comparing the formatted arrays.
     * @param {any[]} a1 - The first array of variations to compare.
     * @param {any[]} a2 - The second array of variations to compare.
     * @returns {boolean} True if the arrays are equal, false otherwise.
     */
    const arraysEqual = (a1: any[], a2: any[]): boolean => JSON.stringify(formatVariationArrays(a1)) === JSON.stringify(formatVariationArrays(a2));

    // Formats an array of variations by converting the name and value properties to lowercase.
    const formatArray = (arr: any[]): any[] => {
        return arr.map((v) => {
            let name = v.name.toLowerCase();
            name = name.startsWith('pa_') ? name.replace('pa_', '') : name;
            const value = v.value.toLowerCase();
            return { name, value };
        });
    };

    /**
     * Clears all cookies.
     */
    function clearAllCookies(): void {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
    }

    /**
     * Clear all local storage.
     */
    function clearAllLocalStorage(): void {
        localStorage.clear();
    }

    /**
     * Replaces a query parameter in a URL.Replace a query parameter in a URL
     * @param {string} param - The query parameter to replace.
     * @param {string} newval - The new value for the query parameter.
     * @param {string} search - The URL to search.
     * @returns {string} The updated URL.
     */
    function replaceQueryParam(param: string, newval: string, search: string): string {
        const regex = new RegExp('([?;&])' + param + '[^&;]*[;&]?');
        const query = search.replace(regex, '$1').replace(/&$/, '');
        return (query.length > 2 ? query + '&' : '?') + (newval ? param + '=' + newval : '');
    }

    /**
     * Removes a class from the body element.
     * @param {string} className - The class to remove.
     */
    function removeBodyClass(className: string): void {
        const body = document.querySelector('body');
        body?.classList.remove(className);
    }

    /**
     * Adds a class to the body element.
     * @param {string} className - The class to add.
     */
    function addBodyClass(className: string): void {
        const body = document.querySelector('body');
        body?.classList.add(className);
    }

    /**
     * Toggles a class on the body element.
     * @param {string} className - The class to toggle.
     */
    function toggleBodyClass(className: string): void {
        const body = document.querySelector('body');
        body?.classList.contains(className) ? body.classList.remove(className) : body?.classList.add(className);
    }

    /**
     * Checks for variation type of 'any' and returns an array of the indexes of those variations.
     * @param {Product} product - The product to check.
     * @returns {number[]} An array of the indexes of variations with a type of 'any'.
     */
    const checkForVariationTypeOfAny = (product: Product): number[] => {
        const numberOfVariation = product?.attributes?.nodes?.length ?? 0;
        let indexOfTypeAny = [] as number[];

        for (let index = 0; index < numberOfVariation; index++) {
            const tempArray = [] as string[];
            product.variations?.nodes.forEach((element) => {
                // @ts-ignore
                if (element.attributes?.nodes[index]?.value) tempArray.push(element.attributes.nodes[index].value);
            });

            if (!tempArray.some(Boolean)) indexOfTypeAny.push(index);
        }

        return indexOfTypeAny;
    };

    /**
     * Determines if the route query is empty.
     * @returns {boolean} True if the route query is empty, false otherwise.
     */
    const isQueryEmpty = computed<boolean>(() => Object.keys(route.query).length === 0);

    /**
     * Formats a date string.
     * @param {string} date - The date string to format.
     * @returns {string} The formatted date string.
     */
    const formatDate = (date?: string | null): string => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    /**
     * Formats a price string.
     * @param {string} price - The price string to format.
     * @returns {string} The formatted price string.
     */
    const formatPrice = (price: string): string => parseFloat(price).toLocaleString('en-US', { style: 'currency', currency: 'EUR' });

    /**
     * Scrolls to the top of the page.
     */
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /**
     * Strips HTML tags from a string.
     * @param {string} str - The string to strip.
     * @returns {string} The stripped string.
     */
    const stripHtml = (str: string | null | undefined = ''): string => {
        return str === null ? '' : str.replace(/(<([^>]+)>)/gi, '');
    };

    /**
     * Debounces a function.
     * @param {Function}
     * @param {number} delay - The delay in milliseconds.
     * @returns {Function} The debounced function.
     */
    const debounce = (func: Function, delay: number = 100) => {
        let inDebounce: NodeJS.Timeout;
        return function (this: any, ...args: any[]) {
            clearTimeout(inDebounce);
            inDebounce = setTimeout(() => func.apply(this, args), delay);
        };
    };

    /**
     *  Logs a GraphQL error message. Only show logs in development or when the 'debug' query parameter is present.
     * @param error
     */
    const logGQLError = (error: any) => {
        if (!isDev && !route.query.debug) return;
        const errorMessage = error?.gqlErrors?.[0]?.message;
        if (errorMessage) {
            console.error(errorMessage);
        }
    };

    /**
     * Get domain from URL
     * @param {string} url - The URL to get the domain from.
     * @returns {string} The domain.
     */
    const getDomain = (url: string): string => {
        const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match !== null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            return match[2];
        }
        return '';
    };

    const isRtl = computed(() => $i18n.locale.value === 'fa' || $i18n.locale.value === 'ar');


    // function extractDate(datetime: string): string {
    //     return datetime.split(' ')[0]; // فقط بخش تاریخ را جدا می‌کند
    // }
    return {
        outUser,
        backEndUrl,
        isDev,
        isFilled,
        isSet,
        isNumber,
        objectOrArrayIsNotEmpty,
        generateRandomString,
        searchInArray,
        fetchData,
        getUrl,
        addBackendToImageUrl,
        showSuccessToast,
        showErrorToast,
        extractDate,
        getJalaliOptions,
        isObjectEmpty,
        getDateToday,
        isRtl,
        isShowingMobileMenu,
        productsPerPage,
        isQueryEmpty,
        wooNuxtSEO,
        frontEndUrl,
        isDev,
        FALLBACK_IMG,
        formatArray,
        arraysEqual,
        clearAllCookies,
        clearAllLocalStorage,
        replaceQueryParam,
        addBodyClass,
        removeBodyClass,
        toggleBodyClass,
        toggleMobileMenu,
        checkForVariationTypeOfAny,
        formatDate,
        formatPrice,
        scrollToTop,
        stripHtml,
        debounce,
        logGQLError,
        getDomain,
    };
}
