import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
    if (process.client) {
        // const jQuery = require('jquery');
        // window.$ = window.jQuery = jQuery;

        // require('persian-date');
        // require('persian-datepicker/dist/js/persian-datepicker.min.js');

        import('persian-datepicker/dist/css/persian-datepicker.min.css');
    }
});
