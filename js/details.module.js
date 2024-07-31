"use strict";

import { Ui } from "./ui.module.js";

export class Details {
    constructor() {
        // Loader
        this.loader = document.querySelector(".loading");
        // Ui instance
        this.ui = new Ui();
    }

    //fetch Detailsdata function
    async fetchDetailsData(id) {
        this.loader.classList.remove("d-none");
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key":
                    "dff56b4c12msh4bd369799b442cbp12c403jsn9adc59110ade",
                "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
            },
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            this.loader.classList.add("d-none");
            this.ui.displayDetails(result);
            //Close Details
            this.closeDetails();
        } catch (error) {
            console.error(error);
        }
    }
    //Close Details
    closeDetails() {
        document
            .querySelector("#details .fa-x")
            .addEventListener("click", () => {
                console.log("clicked");
                document.querySelector("#details").classList.add("d-none");
                document.querySelector("#home").classList.remove("d-none");
                document.querySelector("#details").innerHTML = "";
            });
    }
}
