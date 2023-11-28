import { projectData } from "./projectData.js";

// ---- ---- Const ---- ---- //
let inputBox = document.querySelector(".input-box"),
  searchInput = document.querySelector(".input-box input"),
  searchIcon = document.querySelector(".search"),
  closeIcon = document.querySelector(".close-icon"),
  projectBox = document.querySelector(".projectContainer"),
  filterBtn = document.querySelectorAll(".sort-item"),
  topBtn = document.querySelector("#topbtn"),
  navbar = document.querySelector("nav");

//Todo---------back to top & Navbar scroll----------
window.addEventListener("scroll", () => {
  topBtn.style.transition = "all 1s";
  if (window.scrollY < 200) {
    topBtn.style.display = "none";
    navbar.style.background = "#00abf0";
  } else {
    topBtn.style.display = "block";
    navbar.style.background = "#00abf090";
  }
});

// ---- ---- Open Input ---- ---- //
searchIcon.addEventListener("click", () => {
  inputBox.classList.add("open");
});
// ---- ---- Close Input ---- ---- //
closeIcon.addEventListener("click", () => {
  inputBox.classList.remove("open");
});

//TODO Fuction to append all cards
function appendData(data) {
  projectBox.innerHTML = "";
  data.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  data.forEach((el) => {
    let div = document.createElement("div");
    div.className = "project-card";
    div.setAttribute("data-aos", "zoom-in")
    div.setAttribute("data-aos-duration", "1500")
    div.innerHTML = `
        <div class="project-img">
            <img src="${el.img}" alt="project-img" title = "${el.type}">
        </div>
        <h3>${el.name}</h3>
        <div class="btn-box">
            <a href="${el.hosted}" target="_blank" title="Try it" class="btn">Live Preview <i class='bx bx-link-external' ></i></a>
            <a href="${el.github}" target="_blank" title="Code" class="btn">Source Code <i class='bx bx-code-alt'></i></a>
        </div>`;
    projectBox.appendChild(div);
  });
}

//TODO filter Data

filterBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    filterBtn.forEach((btn) => {
      btn.classList.remove("selected");
    });

    e.target.classList.add("selected");
    let dataCopy = [];
    if (e.target.id === "top") {
      dataCopy = projectData.filter((ele) => {
        return ele.top == true;
      });
      appendData(dataCopy);
    } else if (e.target.id === "html-css") {
      dataCopy = projectData.filter((ele) => {
        return ele.type == "CSS";
      });
      appendData(dataCopy);
    } else if (e.target.id === "javascript") {
      dataCopy = projectData.filter((ele) => {
        return ele.type == "JavaScript";
      });
      appendData(dataCopy);
    } else if (e.target.id === "all") {
      appendData(projectData);
    }
  });
});

//TODO Search Event
searchInput.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase().trim();
  console.log(searchValue);
  const filteredProjects = projectData.filter((project) => {
    return project.name.toLowerCase().includes(searchValue);
  });
  console.log(filteredProjects);
  appendData(filteredProjects);
});

//TODO append All Projects
window.addEventListener("load", () => {
  appendData(projectData);
});
