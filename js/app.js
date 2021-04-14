/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

const allSection = document.querySelectorAll("section");
const fragment = document.createDocumentFragment();
//build the navigation menu
//we used for loop to create the elements of the nav
for(var i = 0;i < allSection.length;i++) {
  const newEl = document.createElement("li");
  const element = document.createElement("a");

  element.setAttribute("href","#" + allSection[i].id);
  element.classList.add(allSection[i].getAttribute("id"));
  element.textContent = allSection[i].getAttribute("data-nav");
  newEl.appendChild(element);
  fragment.appendChild(newEl);
}

const list = document.querySelector("#navbar__list");
list.appendChild(fragment);


const listEl = document.querySelectorAll("#navbar__list li");
const navLink = document.querySelectorAll('#navbar__list li a')

const options = {
  root:null,
  threshold:1,
  rootMargin:"215px",



};
//make the intersection observer
const observer = new IntersectionObserver(function(entries,observer){
  entries.forEach(entry => {
    if(entry.intersectionRatio !=1 ){
      entry.target.classList.remove("your-active-class");
      document.querySelector("."+entry.target.id).classList.remove("inverse");

      console.log(entry.target);

     }

    else if(entry.isIntersecting) {
    entry.target.classList.add("your-active-class");
    document.querySelector("."+entry.target.id).classList.add("inverse");
  }

  });

}
,options);

//selecting the active section
function activeElement() {

allSection.forEach(section => {
 observer.observe(section);
});

}
window.addEventListener("scroll",activeElement);


//when you click on an item from the nav ,function scrollToSection will lead you to the section that you clicked
navLink.forEach(a => {
  a.addEventListener("click",function scrollToSection(event) {
    event.preventDefault();
    const selectedSection = document.querySelector(a.getAttribute("href"));
    selectedSection.scrollIntoView({behavior:"smooth",block:"center"});
  })
});
//making the navigation menu more responsive
list.insertAdjacentHTML("beforeend",  '<li class="icon"><a href="javascript:void(0);"  onclick="myFunction()"><i class="fa fa-bars"></i></a></li>')

function myFunction() {
  if(list.className==="navbarList"){
    list.className+=" responsive";
  }
  else{list.className="navbarList";}
}
