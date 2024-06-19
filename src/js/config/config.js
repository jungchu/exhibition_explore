"use strict";
const developAjaxURL = "http://127.0.0.1:12345/";
export const web_url = location.href.match('http(s?)://(.*?)/')[0];
export const ajaxURL = 
    web_url.includes('localhost') ? developAjaxURL : 
    web_url.includes('127.0.0.1') ? developAjaxURL : 
    web_url; // : developAjaxURL

export const ajaxTimeout = 300000;