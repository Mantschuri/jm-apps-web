const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  const closeMenu = ({ returnFocus = false } = {}) => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    if (returnFocus) menuButton.focus();
  };

  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.addEventListener('click', () => closeMenu());

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu({ returnFocus: true });
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav') && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });

  window.matchMedia('(min-width: 761px)').addEventListener('change', () => closeMenu());
}

document.querySelectorAll('[data-current-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});
