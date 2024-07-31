"use strict";

import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Home {
    constructor() {
        // Ui instance
        this.ui = new Ui();
        //Elements
        this.home = document.getElementById("home");
        this.details = document.getElementById("details");
        // Loader
        this.loader = document.querySelector(".loading");

        //Navbar click event handler
        const navbarToggler = document.querySelector(".navbar-toggler");
        document.querySelectorAll(".nav-link").forEach((element) => {
            element.addEventListener("click", () => {
                this.toggleNavLinks(element);
                this.callData(element);
                // Close navbar after click
                if (getComputedStyle(navbarToggler).display !== "none") {
                    navbarToggler.click();
                }
            });
        });
        //default data call
        this.callData(document.querySelectorAll(".nav-link")[0]);
    }

    //fetch Homedata function
    async fetchHomeData(cat) {
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

    //Navbar Call data function
    async callData(element) {
        const categoryData = await this.fetchHomeData(element.dataset.category);
        this.ui.displayGames(categoryData);
    }

    //Card Click
    async cardClick(card) {
        this.home.classList.add("d-none");
        this.details.classList.remove("d-none");
        const id = card.dataset.id;
        this.details = new Details();
        this.details.fetchDetailsData(id);
    }
}
