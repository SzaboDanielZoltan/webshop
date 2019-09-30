window.onscroll = () => {
    const nav = document.querySelector('nav');
    const top = document.body.scrollTop || document.documentElement.scrollTop;
    if (top !== 0) {
      nav.classList.add('scrolled-nav');
    } else {
      nav.classList.remove('scrolled-nav');
    }
  };