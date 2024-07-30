"use strict";

import { Ui } from "./ui.module.js";

export class Home {
    constructor() {
        // Loader
        this.loader = document.querySelector(".loading");
        // Ui instance
        this.ui = new Ui();
        //Navbar click event handler
        document.querySelectorAll(".nav-link").forEach((element) => {
            element.addEventListener("click", () => {
                this.toggleNavLinks(element);
                this.callData(element);
            });
        });
        //default data call
        this.callData(document.querySelectorAll(".nav-link")[0]);
    }

    //fetch data function
    async fetchData(cat) {
        this.loader.classList.remove("d-none");
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`;
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
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    //Navbar active toggle
    toggleNavLinks(element) {
        document.querySelector(".active").classList.remove("active");
        element.classList.add("active");
    }

    //Call data function
    async callData(element) {
        const categoryData = await this.fetchData(element.dataset.category);
        this.ui.displayGames(categoryData);
    }
}
