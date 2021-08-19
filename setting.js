const fs = require("fs");
const { Builder, By } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const path = require("path");
const body = document.querySelector(".in-stock-data-table-body");
const dateNow = document.querySelector(".date");

const service = new chrome.ServiceBuilder(`${path.join(__dirname)}/chromedriver.exe`).build();
const options = new chrome.Options();
options.addArguments(['user-agent= "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"']);
chrome.setDefaultService(service);
