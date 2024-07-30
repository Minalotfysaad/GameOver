"use strict";

export class Ui {
    constructor() {}
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
    }
}
