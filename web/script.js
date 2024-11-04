let mobileMenu = document.querySelector('.mobile-menu')
let navList = document.querySelector('.nav-list')
let navLinks = document.querySelectorAll('.nav-link')

mobileMenu.addEventListener('click', () => {
   navList.classList.toggle("active")
   navLinks.forEach((links) => {
      links.classList.toggle("active")
   })
})