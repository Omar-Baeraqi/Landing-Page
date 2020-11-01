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

/**
 * Define Global Variables
 * 
*/
let sections = document.querySelectorAll("section");
let navbar = document.getElementById("navbar__list");
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildmenu(){
    for (i=0; i<sections.length; i++){
        let item = document.createElement("li");
        item.className = "menu__link";
        item.setAttribute("data-nav", sections[i].id);
        item.textContent = sections[i].getAttribute("data-nav");
        navbar.appendChild(item);
    };
}

// Add class 'active' to section when near top of viewport
function setsectionactive(){
    const options = {
        threshold: 0.8
    };
    const observer = new IntersectionObserver(function(containers, observer){
        containers.forEach(container => {
            if (!container.isIntersecting){
                container.target.classList.remove("active");
                return;
            }
            container.target.classList.add("active");
        });
        // Highlight navigation item
        for (i=0; i<sections.length; i++){
            if (sections[i].classList.contains("active")){
                navbar.childNodes[i].classList.add("highlight");
            }
            else {
                navbar.childNodes[i].classList.remove("highlight");
            }
        }
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Scroll to anchor ID using scrollTO event
function scroll(){
    navbar.addEventListener("click", function(evt){
        let anchor = document.querySelector("#" + evt.target.getAttribute("data-nav"));
        anchor.scrollIntoView({behavior: "smooth"});
    });
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildmenu();
// Scroll to section on link click
scroll();
// Set sections as active
setsectionactive();

