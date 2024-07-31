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

        // Initialize state
        this.currentPage = 1;
        this.currentCategory = "";

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
            //loader
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
    async callData(category, page = 1) {
        this.currentCategory = category.dataset.category;
        this.currentPage = page;

        const categoryData = await this.fetchHomeData(this.currentCategory);
        //Pagination
        const totalPages = Math.ceil(categoryData.length / 20);
        this.ui.displayPagination(totalPages);
        this.paginationClick();

        const start = (this.currentPage - 1) * 20;
        const end = start + 20;
        const data = categoryData.slice(start, end);
        this.ui.displayGames(data);

        // Update pagination active state
        this.updatePaginationActive();
    }

    //Card Click
    async cardClick(card) {
        this.home.classList.add("d-none");
        this.details.classList.remove("d-none");
        const id = card.dataset.id;
        this.details = new Details();
        this.details.fetchDetailsData(id);
    }

    // Pagination click listeners
    paginationClick() {
        document
            .querySelectorAll(".page-item .page-link")
            .forEach((pageLink) => {
                pageLink.addEventListener("click", async (event) => {
                    event.preventDefault();
                    // Get the page number from the clicked link
                    const pageNumber = parseInt(event.target.innerText);

                    // Fetch and display data for the selected page
                    await this.callData(
                        { dataset: { category: this.currentCategory } },
                        pageNumber
                    );
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: "smooth" });
                });
            });
    }

    // Update pagination
    updatePaginationActive() {
        document.querySelectorAll(".page-item").forEach((pageItem) => {
            pageItem.classList.remove("active");
        });
        const activePageItem = Array.from(
            document.querySelectorAll(".page-item")
        ).find(
            (item) =>
                parseInt(item.querySelector(".page-link").innerText) ===
                this.currentPage
        );
        if (activePageItem) {
            activePageItem.classList.add("active");
        }
    }
}
