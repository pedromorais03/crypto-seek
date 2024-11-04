let mobileMenu = document.querySelector('.mobile-menu')
let navList = document.querySelector('.nav-list')
let navLinks = document.querySelectorAll('.nav-link')


function toggleNav(){
   navList.classList.toggle("active")
   navLinks.forEach((links) => {
      links.classList.toggle("active")
   })
}

mobileMenu.addEventListener('click', toggleNav)