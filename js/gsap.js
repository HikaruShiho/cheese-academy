/* ============================================
 * 	GSAP
 * ===========================================*/
$(function () {

  gsap.to('header', {
    y: 0,
    opacity: 1,
    delay: 5.5,
    duration: 1.5,
    ease: "ease",
  });

  gsap.to('#main_view', {
    scale: 1,
    opacity: 1,
    delay: 1.5,
    ease: "ease",
    duration: 2,
  });

  gsap.to('.main_ttl', {
    y: 0,
    opacity: 1,
    delay: 3.5,
    ease: "ease",
    duration: 1.5,
  });

  gsap.to('.icon_scroll', {
    y: 0,
    opacity: 1,
    delay: 5.5,
    ease: "ease",
    duration: 1.5,
  });



});