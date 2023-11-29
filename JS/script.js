//TODO turn pageswhen click next or prev button
const pageTurnBtn = document.querySelectorAll(".next-prev-btn");
// console.log(pageTurnBtn);

pageTurnBtn.forEach((el, index) => {
  el.addEventListener("click", () => {
    const pageTurnId = el.getAttribute("data-page");
    const pageTurn = document.getElementById(pageTurnId);

    if (pageTurn.classList.contains("turn")) {
      pageTurn.classList.remove("turn");
      setTimeout(() => {
        pageTurn.style.zIndex = 20 - index;
      }, 500);
    } else {
      pageTurn.classList.add("turn");
      setTimeout(() => {
        pageTurn.style.zIndex = 20 + index;
      }, 500);
    }
  });
});

//TODO contact me button when clicked
const pages = document.querySelectorAll(".book-page.page-right");
const contactMeBtn = document.querySelector(".btn.contact-me");

contactMeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  pages.forEach((page, index) => {
    setTimeout(() => {
      page.classList.add("turn");

      setTimeout(() => {
        page.style.zIndex = 20 + index;
      }, 500);
    }, (index + 1) * 200 + 100);
  });
});

// TODO create reverse index function

let totalPages = pages.length;
let pageNumber = 0;

function reverseIndex() {
  pageNumber--;
  if (pageNumber < 0) {
    pageNumber = totalPages - 1;
  }
}

const backProfileBtn = document.querySelector(".back-profile");

backProfileBtn.addEventListener("click", (e) => {
  e.preventDefault();
  pages.forEach((_, index) => {
    setTimeout(() => {
      reverseIndex();
      pages[pageNumber].classList.remove("turn");

      setTimeout(() => {
        reverseIndex();
        pages[pageNumber].style.zIndex = 10 + index;
      }, 500);
    }, (index + 1) * 200 + 100);
  });
});

//TODO opening animation

const coverRight = document.querySelector(".cover.cover-right");
const pageLeft = document.querySelector(".book-page.page-left");

//opening animation (cover right animation);
setTimeout(() => {
  coverRight.classList.add("turn");
}, 2100);

setTimeout(() => {
  coverRight.style.zIndex = -1;
}, 2800);

//opening animation (all pages left animation);
setTimeout(() => {
  pageLeft.style.zIndex = 20;
}, 3200);

//opening animation (all pages right animation);
pages.forEach((_, index) => {
  setTimeout(() => {
    reverseIndex();
    pages[pageNumber].classList.remove("turn");

    setTimeout(() => {
      reverseIndex();
      pages[pageNumber].style.zIndex = 10 + index;
    }, 500);
  }, (index + 1) * 200 + 2100);
});

//TODO Email sent

const contactForm = document.querySelector("#contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = e.target.children[0].value;
  let useremail = e.target.children[1].value;
  let message = e.target.children[2].value;
  Email.send({
    SecureToken: "7e7e4ded-65fb-4d08-931c-9d5162c46d33",
    To: "mayankkatheriya4@gmail.com",
    From: `mayankkatheriya4@gmail.com`,
    Subject: "PortFolio contact Enquiry",
    Body: `
    Name: ${username}<br/>
    Email: ${useremail}<br/>
    Message: ${message}
    `,
  }).then((message) => {
    if (message == "OK") {
      Swal.fire({
        title: "Thank You",
        text: "Message Recieved, I'll connect you soon",
        icon: "success",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
    e.target.children[0].value = "";
    e.target.children[1].value = "";
    e.target.children[2].value = "";
  });
});
