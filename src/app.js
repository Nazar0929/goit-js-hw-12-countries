import fetchCountries from "./fetchCountries";
import debounce from 'debounce';
import {error, defaultModules } from '@pnotify/core/dist/PNotify.js';

import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
import { success } from "@pnotify/core";

defaultModules.set(PNotifyMobile, {});

const inputRef = document.querySelector(".data-input");
const listRef = document.querySelector(".list");
const contRef = document.querySelector(".sucesfull-box");


if (inputRef) {
    inputRef.addEventListener("input", debounce(searchCountry, 500));
}


function searchCountry(event) {
    const countryName = event.target.value.trim();
                listRef.innerHTML = ""
                contRef.innerHTML = "";
            if (countryName === "") {
                return

            }
    fetchCountries(countryName).then(res => {
        if(res.length >= 10) {
            error ({
                text: "Зробіть запит більш якіснішим!",
                delay: 1000,
            })
        }

        if (res.length > 1 && res.length <= 10) {
            listRef.innerHTML = "";
            contRef.innerHTML = "";
            const country = res.map((item ) => {

                return `<li class="item">${item.name.common}</li>`
            }).join("")
            listRef.innerHTML = country;
        }
       if (res.length === 1) {
    listRef.innerHTML = "";
    contRef.innerHTML = "";    

    const item = res[0];
    const launguege = Object.values(item.languages || {});

    contRef.innerHTML = `
        <h1 class="title">${item.name.common}</h1>
        <div class="wrap">
            <div class="box-one">
                <h3 class="capital">Capital: ${item.capital}</h3>
                <p class="popularit">Population: ${item.population}</p>
                <ul class="list-laun">
                    ${launguege.map(lang => `<li>${lang}</li>`).join("")}
                </ul>
            </div>
            <img class="img" src="${item.flags.png}" alt="${item.name.common}">
        </div>
    `;
}
        return
    }).catch(error => console.log(error)
    )
     
}