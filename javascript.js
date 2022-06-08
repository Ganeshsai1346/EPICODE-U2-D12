/** @format */

const pexels = {
  method: "GET",
  headers: {
    Authorization:
      "Bearer 563492ad6f91700001000001b07674885c924af7977a9caff9777d55",
  },
};

const loadImages = (query) => {
  fetch(`https://api.pexels.com/v1/search?query=${query}`, pexels)
    .then((response) => response.json())
    .then((data) => {
      const cards = document.querySelector(".album > .container > .row");

      for (let i = 0; i < data.photos.length; i++) {
        const image = data.photos[i];

        //5. Replace the “9 mins” string in the card template with the ID of the Image
        const cardsAll = document.getElementsByClassName("card");
        for (let i = 0; i < cardsAll.length; i++) {
          cardsAll[i].querySelector("small").innerText =
            "ID:" + data.photos[i].id;
        }

        const col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = ` <div class="single-album card mb-4 shadow-sm">
                              <img src= ${image.src.original} class="card-img-top" alt="">
                              <div class="card-body">
                                <p class="card-text">
                                  ${image.width}
                                </p>
                                <div
                                  class="d-flex justify-content-between align-items-center"
                                >
                                  <div class="btn-group">
                                    <button
                                      type="button"
                                      class="btn btn-sm btn-outline-secondary"
                                    >
                                      View
                                    </button>
                                    <button
                                      type="button"
                                      class="btn btn-sm btn-outline-secondary"
                                      onclick="hideCard(event)"
                                    >
                                      Hide
                                    </button>
                                  </div>
                                  <small class="text-muted">9 mins</small>
                                </div>
                              </div>
                            </div> `;

        cards.appendChild(col);
      }
    });
};

//3. The Edit button should be replaced with a “Hide” button.

/* function changeEdit() {
  let edits = document.querySelectorAll("button:last-of-type");
  for (let i = 1; i < edits.length; i++) {
    edits[i].innerText = "Hide";
  }
}
changeEdit(); */
//4.
const hideCard = (e) => {
  e.target.closest(".col-md-4").remove();
};

//6. Add in the “jumbotron” a search field. Use the value of the search field to search new images and replace the existing ones.

const input = document.querySelector(".input-group input.form-control");
const button = document.querySelector(
  ".input-group button.btn-outline-secondary"
);

const searchPhotos = (userEvent) => {
  console.log(userEvent);
  if (userEvent.key === "Enter") {
    loadImages(userEvent.target.value);
  } else if (userEvent.type === "click") {
    loadImages(input.value);
  }
};

input.addEventListener("keyup", searchPhotos);
button.addEventListener("click", searchPhotos);
