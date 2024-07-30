"use strict";

import { Home } from "./home.module.js";

export class Ui {
    constructor() {
    }
    displayGames(games) {
        let content = ``;
        games.forEach((game) => {
            content += `
                    <div class="col-lg-3 col-md-4 col-sm-6 col-12">
                    <div class="card p-2" data-id="${game.id}">
                        <img class="w-100" src="${
                            game.thumbnail
                        }" class="card-img-top rounded-1" alt="">
                        <div class="card-body">
                            <div class="top d-flex justify-content-between align-items-center mb-2">
                                <h5 class="card-title m-0">${game.title}</h5>
                                <span class="tag text-uppercase">Free</span>
                            </div>
                            <p class="card-text">${
                                game.short_description
                                    .split(" ")
                                    .slice(0, 5)
                                    .join(" ") + "..."
                            }</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between align-items-center text-center">
                            <span class="tag text-uppercase">${
                                game.genre
                            }</span>
                            <span class="tag">${game.platform}</span>
                        </div>
                    </div>
                </div>`;
        });
        document.getElementById("gamesRow").innerHTML = content;
    
        // Card Click
        document.querySelectorAll(".card").forEach((element) => {
            element.addEventListener("click", () => {
                this.cardClick = new Home();
                this.cardClick.cardClick(element);
            });
        });
    }

    displayDetails(details) {
        let content = ``;
        content += `
            <div class="container text-white">
            <div class="mt-5 px-5 title d-flex justify-content-between align-items-center">
                <h2>Game Details</h2>
                <i class="fa-solid fa-x"></i>
            </div>
            <div class="row p-5 gx-4">
                <div class="col-md-4 mb-md-0 mb-4">
                    <img class="w-100 rounded-2" src="${details.thumbnail}" alt="">
                </div>
                <div class="details col-md-8">
                    <h3 class="mb-4">${details.title}</h3>
                    <div class="category d-flex align-items-center mb-2">
                        <h5 class="mb-0 me-3">Cateogory: </h5>
                        <span class="tag">${details.genre}</span>
                    </div>
                    <div class="platform d-flex align-items-center mb-2">
                        <h5 class="mb-0 me-3">Platform: </h5>
                        <span class="tag">${details.platform}</span>
                    </div>
                    <div class="status d-flex align-items-center mb-2">
                        <h5 class="mb-0 me-3">Status: </h5>
                        <span class="tag">${details.status}</span>
                    </div>
                    <p class="fst-italic">${details.description}</p>
                    <button class="btn">Play Now!</button>
                </div>
            </div>
        </div>`

        document.getElementById("details").innerHTML = content;

    }
}
