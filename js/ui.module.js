"use strict";

export class Ui {
    constructor(cardClickFunction) {
        this.cardClickFunction = cardClickFunction; // Store the cardClick function
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
                this.cardClickFunction(element);
            });
        });
    }

    displayDetails(details) {
        const shortDescription = details.description
            .split(" ")
            .slice(0, 100)
            .join(" ");
        const fullDescription = details.description;

        // Screenshots Thumbnails
        let screenshotsThumbnails = ``;
        details.screenshots.forEach((screenshot) => {
            screenshotsThumbnails += `
                        <div class="thumbnail me-3 mb-3">
                        <img class="w-100" src="${screenshot.image}" alt="" data-bs-toggle="modal"
                        data-bs-target="#screenshotsModal">
                        </div>
            `;
        });
        // Carousel Screenshots
        let carouselScreenshots = "";
        details.screenshots.forEach((screenshot, index) => {
            carouselScreenshots += `<div class="carousel-item${
                index === 0 ? " active" : ""
            }">
                                <img src="${
                                    screenshot.image
                                }" class="d-block w-100" alt="">
                            </div>`;
        });
        //Content
        let content = ``;
        content += `
        <div class="container text-white">
            <div class="mt-5 px-5 title d-flex justify-content-between align-items-center">
                <h2 class="m-0">${details.title}</h2>
                <i class="fa-solid fa-x"></i>
            </div>
            <div class="row p-5 gx-4">
                <div class="left col-md-4 mb-md-0 mb-4">
                    <img class="w-100 rounded-2 mb-4" src="${
                        details.thumbnail
                    }" alt="">
                    <div class="text">
                        <h5>Publisher: <span class="publisher ms-2">${
                            details.publisher
                        }</span></h5>
                        <h5>Developer: <span class="developer ms-2">${
                            details.developer
                        }</span></h5>
                        <h5>Release Date: <span class="developer ms-2">${
                            details.release_date
                        }</span></h5>
                    </div>
                    <div class="screenshots mt-4">
                        <h5>Screenshots:</h5>
                        <div class="screenshots-slider d-flex mt-3 flex-wrap">
                            ${screenshotsThumbnails}</div>
                        <!-- Start Modal -->
                        <div class="modal fade" id="screenshotsModal" tabindex="-1"
                            aria-labelledby="screenshotsModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="screenshotsModalLabel">${
                                            details.title
                                        }</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <!-- Start Carousel -->
                                        <div id="screenshotsCarousel" class="carousel slide">
                                            <div class="carousel-inner">
                                                ${carouselScreenshots}
                                            </div>
                                            <button class="carousel-control-prev" type="button"
                                                data-bs-target="#screenshotsCarousel" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Previous</span>
                                            </button>
                                            <button class="carousel-control-next" type="button"
                                                data-bs-target="#screenshotsCarousel" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                        <!-- End Carousel -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End Modal -->

                    </div>
                    <div class="accordion mt-3" id="systemReqAccordion">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    System Requirements
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse"
                                data-bs-parent="#systemReqAccordion">
                                <div class="accordion-body">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">OS: <span class="ms-1 os">${
                                            details?.minimum_system_requirements
                                                ?.os ?? "N/A"
                                        }</span></li>
                                        <li class="list-group-item">Processor: <span class="ms-1 processor">${
                                            details?.minimum_system_requirements
                                                ?.processor ?? "N/A"
                                        }</span>
                                        </li>
                                        <li class="list-group-item">Memory: <span class="ms-1 memory">${
                                            details?.minimum_system_requirements
                                                ?.memory ?? "N/A"
                                        }</span></li>
                                        <li class="list-group-item">Graphics: <span class="ms-1 graphics">${
                                            details?.minimum_system_requirements
                                                ?.graphics ?? "N/A"
                                        }</span>
                                        </li>
                                        <li class="list-group-item">Storage: <span class="ms-1 storage">${
                                            details?.minimum_system_requirements
                                                ?.storage ?? "N/A"
                                        }</span></li>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="right col-md-8">
                    <h3 class="mb-4">Details:</h3>
                    <div class="category d-flex align-items-center mb-2">
                        <h5 class="mb-0 me-3">Category: </h5>
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
                    <p class="fst-italic short-description">
                        ${shortDescription} <span class="ellipsis">...</span>
                        <span class="see-more text-primary">See more</span>
                        <span class="full-description d-none">${fullDescription} <span class="see-less text-primary">See
                                less</span></span>
                    </p>
                    <button class="btn play-button"><a href="${
                        details.game_url
                    }"
                            class="text-decoration-none text-white" target="_blank">Play Now!</a></button>
                </div>
            </div>
        </div>`;

        document.getElementById("details").innerHTML = content;

        // See More and See Less Click
        document
            .querySelector(".see-more")
            .addEventListener("click", function () {
                const fullDescription = this.nextElementSibling;
                fullDescription.classList.toggle("d-none");
                this.previousElementSibling.style.display =
                    fullDescription.classList.contains("d-none")
                        ? "inline"
                        : "none";
                this.style.display = fullDescription.classList.contains(
                    "d-none"
                )
                    ? "inline"
                    : "none";
            });

        document
            .querySelector(".see-less")
            .addEventListener("click", function () {
                const fullDescription = this.parentElement;
                fullDescription.classList.toggle("d-none");
                document.querySelector(".see-more").style.display = "inline";
                document.querySelector(".ellipsis").style.display = "inline";
            });
    }

    displayPagination(totalPages) {
        let content = ``;

        for (let i = 1; i <= totalPages; i++) {
            content += `<li class="page-item"><a class="page-link">${i}</a></li>`;
        }
        document.querySelector(".pagination").innerHTML = content;
    }
}
