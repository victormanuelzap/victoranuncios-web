document.addEventListener('DOMContentLoaded', () => {
  // Desktop
  if (document.querySelector('.splide')) {
    new Splide('.splide', {
      type: 'loop',
      autoplay: true,
      interval: 3000,//MAS RAPIDO (antes 4000
      pauseOnHover: false,
      arrows: true,
      pagination: true,
      gap: '0rem',
      padding: 0,
    }).mount();
  }

  // Móvil
  if (document.querySelector('.splide2')) {
    new Splide('.splide2', {
      type: 'loop',
      autoplay: true,
      interval: 3000,//MAS RAPIDO (antes 4000
      pauseOnHover: false,
      arrows: true,
      pagination: true,
      gap: '0rem',   // importante para que no deje bordes
      padding: 0,
    }).mount();
  }
});
