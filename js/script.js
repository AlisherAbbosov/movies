"use strict";

let elForm = document.querySelector(".form");
let elNameInput = document.querySelector(".name__input");
let elRetingInput = document.querySelector(".reting__input");
let elCategorySelect = document.querySelector(".category__select");
let elFilterMovie = document.querySelector(".filter__movie");
let elBookmarkList = document.querySelector(".bookmark__list");

let elList = document.querySelector(".movie__list");
let elResult = document.querySelector(".result__num");

// MODAL
let elModal = document.querySelector(".movie-modal");
let elCloseModalBtn = document.querySelector(".close-modal");
let elModalTitle = document.querySelector(".modal__title");
let elModalReting = document.querySelector(".modal__reting");
let elModalRuntime = document.querySelector(".modal__runtime");
let elModalYear = document.querySelector(".modal__year");
let elModalCategory = document.querySelector(".modal__categoty");
let elModalInfo = document.querySelector(".modal__info");

let youTubeLink = "https://www.youtube.com/watch?v=";

let localBookmarkedMovies = JSON.parse(
  window.localStorage.getItem("bookmarkedMovies")
);

let newbookmarkedMovies = localBookmarkedMovies || [];

const bookmarkedMovies = function (arr, element) {
  arr.forEach(bookmark => {
    let newBookItem = document.createElement("li");
    let newBookTitle = document.createElement("p");
    let newBookBtnRemove = document.createElement("button");

    element.appendChild(newBookItem);
    newBookItem.appendChild(newBookTitle);
    newBookItem.appendChild(newBookBtnRemove);

    newBookItem.setAttribute("class", "list-group-item d-flex flex-column ");
    newBookTitle.setAttribute("class", "mb-1");
    newBookBtnRemove.setAttribute(
      "class",
      "btn bg-danger text-white p-1 mt-2 w-25 "
    );
    newBookBtnRemove.textContent = "Remove";
    newBookTitle.textContent = bookmark.title;
    newBookBtnRemove.dataset.newBookBtnRemoveId = bookmark.imdbId;

    newBookBtnRemove.addEventListener("click", evt => {
      const bookmarkedRemoveBtn = evt.target.dataset.newBookBtnRemoveId;

      let foundMovieIndex = newbookmarkedMovies.findIndex(
        movie => movie.imdbId === bookmarkedRemoveBtn
      );

      newbookmarkedMovies.splice(foundMovieIndex, 1);
      elBookmarkList.innerHTML = null;
      window.localStorage.setItem(
        "bookmarkedMovies",
        JSON.stringify(newbookmarkedMovies)
      );
      if (newbookmarkedMovies.length === 0) {
        window.localStorage.removeItem("bookmarkedMovies");
      }
      bookmarkedMovies(newbookmarkedMovies, elBookmarkList);
    });
  });
};

bookmarkedMovies(newbookmarkedMovies, elBookmarkList);

// FOR CATEGORY SELECT
const generateGenres = function () {
  const uniqueGenres = [];
  movies.forEach(movie => {
    movie.categories.forEach(category => {
      if (!uniqueGenres.includes(category)) {
        uniqueGenres.push(category);
      }
    });
  });
  uniqueGenres.forEach(option => {
    let newSelectItem = document.createElement("option");
    newSelectItem.setAttribute("value", option);

    newSelectItem.textContent = option;

    elCategorySelect.appendChild(newSelectItem);
  });
};
generateGenres();

const renderFilms = function (filmsArray, element) {
  elResult.textContent = filmsArray.length;
  filmsArray.forEach(movie => {
    let newMovieItem = document.createElement("li");
    let newCard = document.createElement("div");
    let newMovieImg = document.createElement("img");
    let newCardBody = document.createElement("div");
    let newMovieTitle = document.createElement("h3");
    let newMovieYear = document.createElement("p");
    let newMovieYearIcon = document.createElement("i");
    let newMovieYearr = document.createElement("span");

    let newMovieReting = document.createElement("p");
    let newMovieRetingIcon = document.createElement("i");
    let newMovieRetingg = document.createElement("span");

    let newBtnBox = document.createElement("div");
    let newBtnWatch = document.createElement("a");
    let newBtnInfo = document.createElement("button");
    let newBtnBookmark = document.createElement("button");

    element.appendChild(newMovieItem);
    newMovieItem.appendChild(newCard);
    newCard.appendChild(newMovieImg);
    newCard.appendChild(newCardBody);
    newCardBody.appendChild(newMovieTitle);
    newCardBody.appendChild(newMovieYear);
    newMovieYear.appendChild(newMovieYearIcon);
    newMovieYear.appendChild(newMovieYearr);
    newCardBody.appendChild(newMovieReting);
    newMovieReting.appendChild(newMovieRetingIcon);
    newMovieReting.appendChild(newMovieRetingg);
    newCardBody.appendChild(newBtnBox);
    newBtnBox.appendChild(newBtnWatch);
    newBtnBox.appendChild(newBtnInfo);
    newBtnBox.appendChild(newBtnBookmark);

    newCard.setAttribute("class", "card movies__card mb-3");
    newMovieImg.setAttribute("src", movie.smallThumbnail);
    newMovieImg.setAttribute("class", "movie__img");
    newCardBody.setAttribute("class", "card-body");
    newMovieTitle.setAttribute("class", "card-title fs-5");
    newMovieYearIcon.setAttribute("class", " fas fa-calendar me-1 ");
    newMovieRetingIcon.setAttribute("class", " fas fa-star reting__star me-1");
    newMovieYear.setAttribute("class", "card-text ");
    newBtnBox.setAttribute("class", "d-flex justify-content-between");
    newBtnWatch.setAttribute("class", "btn btn-outline-primary");
    newBtnWatch.setAttribute("href", `${youTubeLink}${movie.youtubeId}`);
    newBtnWatch.setAttribute("target", "blank");
    newBtnInfo.setAttribute("class", "btn btn-outline-info");
    newBtnBookmark.setAttribute("class", "btn btn-outline-success");

    newMovieTitle.textContent = movie.title;
    newMovieYearr.textContent = movie.year;
    newMovieRetingg.textContent = movie.imdbRating;
    newBtnWatch.textContent = "Watch trailer";
    newBtnInfo.textContent = "More info";
    newBtnBookmark.textContent = "Bookmark";

    //DATASET
    newBtnBookmark.dataset.bookmarkId = movie.imdbId;

    newBtnBookmark.addEventListener("click", evt => {
      let bookmarkId = evt.target.dataset.bookmarkId;

      let foundElement = movies.find(movie => movie.imdbId === bookmarkId);

      if (!newbookmarkedMovies.includes(foundElement)) {
        newbookmarkedMovies.push(foundElement);

        window.localStorage.setItem(
          "bookmarkedMovies",
          JSON.stringify(newbookmarkedMovies)
        );

        elBookmarkList.innerHTML = null;

        bookmarkedMovies(newbookmarkedMovies, elBookmarkList);
      }
      console.log(newbookmarkedMovies);
    });

    // MODAL
    newBtnInfo.addEventListener("click", () => {
      elModal.classList.remove("hidden");
      elModalTitle.textContent = movie.title;
      elModalReting.textContent = movie.imdbRating;
      elModalYear.textContent = movie.year;
      elModalCategory.textContent = movie.categories.join(", ");

      elModalRuntime.textContent = countTime(movie.runtime);
      elModalInfo.textContent = movie.summary;
    });

    elCloseModalBtn.addEventListener("click", () => {
      closeModal();
    });
    document.addEventListener("keydown", evt => {
      if (evt.key === "Escape") {
        closeModal();
      }
    });

    /////////////////////////////////
    /////////////////////////////////
  });
};
renderFilms(movies, elList);

elForm.addEventListener("submit", evt => {
  evt.preventDefault();
  let nameValue = elNameInput.value;
  let filteredName = movies.filter(movie => {
    if (elNameInput.value == "") {
      return movies;
    } else if (elNameInput.value != "") {
      return movie.title.toUpperCase().includes(nameValue.toUpperCase());
    }
  });
  // console.log(filteredName);
  let filteredReting = filteredName.filter(movie => {
    return movie.imdbRating >= Number(elRetingInput.value);
  });
  // console.log(filteredReting);
  let filteredCotegory = filteredReting.filter(movie => {
    if (elCategorySelect.value == "All") {
      return movies;
    } else if (elCategorySelect.value != "All") {
      return movie.categories.includes(elCategorySelect.value);
    }
  });
  let sorteredRetingHight = () => {
    let newArr = [];
    let filtered = [];
    let filteredMovies = filteredCotegory.forEach(movie => {
      if (!newArr.includes(movie.imdbRating)) {
        newArr.push(movie.imdbRating);
      }
    });
    let sortedArr = newArr.sort((a, b) => {
      return a - b;
    });
    console.log(sortedArr);

    for (let reting of sortedArr) {
      for (let movie of filteredCotegory) {
        if (movie.imdbRating === reting) {
          filtered.push(movie);
        }
      }
    }
    return filtered;
  };

  let sortedYearHight = () => {
    let newArr = [];
    let filtered = [];
    let filteredMovies = filteredCotegory.forEach(movie => {
      if (!newArr.includes(movie.year)) {
        newArr.push(movie.year);
      }
    });
    let sortedArr = newArr.sort((a, b) => {
      return a - b;
    });
    console.log(sortedArr);
    for (let year of sortedArr) {
      for (let movie of filteredCotegory) {
        if (movie.year === year) {
          filtered.push(movie);
        }
      }
    }
    return filtered;
  };

  console.log(sortedYearHight());
  if (elFilterMovie.value === "rating") {
    elList.innerHTML = null;
    renderFilms(sorteredRetingHight(), elList);
  } else if (elFilterMovie.value === "year") {
    elList.innerHTML = null;
    renderFilms(sortedYearHight(), elList);
  } else {
    elList.innerHTML = null;
    renderFilms(filteredCotegory, elList);
  }
});
console.log(sortedYearHight());
function closeModal() {
  elModal.classList.add("hidden");
}

function countTime(num) {
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = Math.round((hours - rhours) * 60);
  return `${rhours} hours, ${minutes} minutes`;
}

// const bookmarkedMovies = function (arr, element) {
//   arr.forEach(bookmark => {
//     let newBookItem = document.createElement("li");
//     let newBookTitle = document.createElement("p");
//     let newBookBtnRemove = document.createElement("button");

//     element.appendChild(newBookItem);
//     newBookItem.appendChild(newBookTitle);
//     newBookItem.appendChild(newBookBtnRemove);

//     newBookItem.setAttribute(
//       "class",
//       "list-group-item d-flex flex-column "
//     );
//     newBookTitle.setAttribute("class", "mb-1");
//     newBookBtnRemove.setAttribute(
//       "class",
//       "btn bg-danger text-white p-1 mt-2 w-25 "
//     );
//     newBookBtnRemove.textContent = "Remove";
//     newBookBtnRemove.dataset.bookmarkId = bookmark.id;
//     newBookTitle.textContent = bookmark.title;

//     let bookmarkBtnId = newBookBtnRemove.dataset.bookmarkId * 1;

//     newBookBtnRemove.addEventListener("click", function () {
//       let foundMovieIndex = newbookmarkedMovies.findIndex(movie => {
//         return movie.id === bookmarkBtnId;
//       });

//       newbookmarkedMovies.splice(foundMovieIndex, 1);

//       elBookmarkList.innerHTML = null;
//       bookmarkedMovies(newbookmarkedMovies, elBookmarkList);
//     });
//   });
// };

// newBtnBookmark.addEventListener("click", () => {
//   let newBoolmark = {
//     id: newbookmarkedMovies[newbookmarkedMovies.length - 1]?.id + 1 || 0,
//     title: movie.title,
//   };

//   elBookmarkList.innerHTML = null;

//   newbookmarkedMovies.push(newBoolmark);

//   bookmarkedMovies(newbookmarkedMovies, elBookmarkList);
//   console.log(newbookmarkedMovies);
// });
