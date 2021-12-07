let tl = gsap.timeline({ repeat: -1 });

gsap.set('ellipse', {autoAlpha: 0})
gsap.set('svg', {rotationY: 180, rotationX: -180, rotationZ: -180, scale: 0.5, transformOrigin: '50% 50%'})

tl.to("ellipse", { autoAlpha: 1, duration: 1, stagger: 0.05, ease: "power4.out" })
 .to('svg', {scale: 1, duration: 50, rotationY: 150}, "<")
.fromTo('.container', {perspective: '20rem'}, {perspective: '180rem', duration: 50}, "<")

tl.timeScale(8);
