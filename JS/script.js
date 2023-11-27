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

// TODO Cursor Animation
let script = document.currentScript;
window.addEventListener("DOMContentLoaded", () => {
  let iDiv = document.createElement("div");
  iDiv.id = "cursor";
  if (script.getAttribute("difference") == "disable") {
    iDiv.className = "mscursor-cursor";
  } else {
    iDiv.className = "mscursor-cursor mscursor-difference";
  }
  document.getElementsByTagName("body")[0].appendChild(iDiv);

  let pauseAnimation = script.getAttribute("pause-animation");

  let innerDiv = document.createElement("div");

  if (script.getAttribute("color") !== null) {
    iDiv.style.backgroundColor = script.getAttribute("color");
  } else {
    if (script.getAttribute("difference") == "disable") {
      iDiv.style.backgroundColor = "black";
    } else {
      iDiv.style.backgroundColor = "white";
    }
  }

  if (pauseAnimation !== null && pauseAnimation == "disable") {
    if (script.getAttribute("circle-outline") == "disable") {
      innerDiv.className = "mscursor-circle";
    } else {
      innerDiv.className = "mscursor-circle new";
    }
  } else {
    if (script.getAttribute("circle-outline") == "disable") {
      innerDiv.className = "mscursor-circle mscursor-border-transform";
    } else {
      innerDiv.className = "mscursor-circle new mscursor-border-transform";
    }
  }

  iDiv.appendChild(innerDiv);

  let size = Number(script.getAttribute("size")) || 30;

  for (let i = 0; i < size; i++) {
    let innerDiv = document.createElement("div");
    if (pauseAnimation !== null && pauseAnimation == "disable") {
      innerDiv.className = "mscursor-circle";
    } else {
      innerDiv.className = "mscursor-circle mscursor-border-transform";
    }

    if (script.getAttribute("color") !== null) {
      innerDiv.style.backgroundColor = script.getAttribute("color");
    } else {
      if (script.getAttribute("difference") == "disable") {
        innerDiv.style.backgroundColor = "black";
      } else {
        innerDiv.style.backgroundColor = "white";
      }
    }
    iDiv.appendChild(innerDiv);
  }

  const coords = { x: 0, y: 0 };
  let timeout;
  const circles = document.querySelectorAll(".mscursor-circle");

  const cursor = document.querySelector(".mscursor-cursor");

  circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    if (script.getAttribute("gradient") !== null) {
      let colors = script.getAttribute("gradient").split(",");
      circle.style.backgroundColor =
        colors[Math.floor((index * colors.length) / circles.length)];

      document.querySelector("div.new").border = `0.5px solid ${colors[0]}`;
    }
  });

  const addclass = (e) => {
    if (script.getAttribute("pause-animation") !== "disable") {
      document.body.classList.remove("mscursor-nocursor");
      if (script.getAttribute("circle-outline") !== "disable") {
        document
          .querySelector("div.new")
          .classList.remove("mscursor-scale-outline");
        document.querySelector("div.new").style.border = "";
      }
      document.querySelectorAll("div.mscursor-circle").forEach((element) => {
        element.classList.remove("mscursor-scale");
      });
    }
    coords.x = e.clientX;
    coords.y = e.clientY;
  };

  window.addEventListener("mousemove", (e) => addclass(e));
  window.addEventListener("touchmove", (e) => addclass(e.touches[0]));

  function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    cursor.style.top = x;
    cursor.style.left = y;

    circles.forEach(function (circle, index) {
      circle.style.left = x - 12 + "px";
      circle.style.top = y - 12 + "px";

      circle.style.scale = (circles.length - index) / circles.length;

      circle.x = x;
      circle.y = y;

      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
  }

  animateCircles();

  if (script.getAttribute("cursor") == "disable") {
    document.body.classList.add("mscursor-nocursor");
  }

  if (script.getAttribute("pause-animation") !== "disable") {
    const moove = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        document.body.classList.add("mscursor-nocursor");
        if (script.getAttribute("mscursor-circle-outline") !== "disable") {
          document
            .querySelector("div.new")
            .classList.add("mscursor-scale-outline");

          if (script.getAttribute("color") !== null) {
            if (script.getAttribute("color-outline") !== null) {
              document.querySelector(
                "div.new"
              ).style.border = `0.5px solid ${script.getAttribute(
                "color-outline"
              )}`;
            } else {
              document.querySelector(
                "div.new"
              ).style.border = `0.5px solid ${script.getAttribute("color")}`;
            }
          } else {
            if (script.getAttribute("color-outline") !== null) {
              document.querySelector(
                "div.new"
              ).style.border = `0.5px solid ${script.getAttribute(
                "color-outline"
              )}`;
            } else {
              if (script.getAttribute("difference") == "disable") {
                document.querySelector(
                  "div.new"
                ).style.border = `0.5px solid black`;
              } else {
                document.querySelector(
                  "div.new"
                ).style.border = `0.5px solid white`;
              }
            }
          }
        }
        document.querySelectorAll("div.mscursor-circle").forEach((element) => {
          element.classList.add("mscursor-scale");
        });
      }, 100);
    };

    document.onmousemove = moove;
    document.ontouchmove = moove;
  }
});

//TODO Email sent

const contactForm = document.querySelector("#contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = e.target.children[0].value;
  let useremail = e.target.children[1].value;
  let message = e.target.children[2].value;
  Email.send({
    SecureToken : "7e7e4ded-65fb-4d08-931c-9d5162c46d33",
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
        title: "Good job!",
        text: "Your Details Sent",
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
