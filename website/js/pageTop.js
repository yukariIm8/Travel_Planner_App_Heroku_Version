// Show the pagetop button when the user scrolls down 100px from the top of the document 
const pageTopButton = document.getElementById('page-top');


const showButton = () => {
  let y = window.scrollY;
  if (y > 100) {
    pageTopButton.className = 'top-button show';
  } else {
    pageTopButton.className = 'top-button hide';
  }
};

const showPageTop = () => {
  window.addEventListener('scroll', showButton);
};


// Scroll to page top if the user click the page top button
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 40);
  }
};

const goTop = () => {
  pageTopButton.onclick = function(e) {
  e.preventDefault();
  scrollToTop();
  }
};


export { showPageTop, goTop }