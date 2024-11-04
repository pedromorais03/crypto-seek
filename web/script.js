const mobileMenu = document.querySelector('.mobile-menu')
const navList = document.querySelector('.nav-list')
const navLinks = document.querySelectorAll('.nav-link')

window.document.addEventListener('DOMContentLoaded', () => {
   if(localStorage.getItem('username')){
      const platform = navigator.platform || 'Unknown'
      const nav = navigator.userAgent
   
      if (/Chrome/i.test(nav) && !/Edg/i.test(nav)) {
         browser = "Chrome";
      } else if (/Firefox/i.test(nav)) {
         browser = "Firefox";
      } else if (/Safari/i.test(nav) && !/Chrome/i.test(nav)) {
         browser = "Safari";
      } else if (/Edg/i.test(nav)) {
         browser = "Edge";
      } else if (/Opera|OPR/i.test(nav)) {
         browser = "Opera";
      } else if (/MSIE|Trident/i.test(nav)) {
         browser = "Internet Explorer";
      } else {
         browser = "Unknown";
      }
   }
})

mobileMenu.addEventListener('click', () => {
   navList.classList.toggle("active")
   navLinks.forEach((links) => {
      links.classList.toggle("active")
   })
})