/* ===========================================================
   SENOPATI INSTITUTE — Interactive Profile · main.js
   Lenis smooth scroll + GSAP ScrollTrigger
   =========================================================== */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmt = (n) => n.toLocaleString("id-ID");
  document.body.classList.add("is-ready");

  /* ---------- NAV: scrolled state + mobile menu ---------- */
  const hdr = document.getElementById("hdr");
  const onScrollNav = () => hdr && hdr.classList.toggle("scrolled", window.scrollY > 40);
  onScrollNav();
  window.addEventListener("scroll", onScrollNav, { passive: true });
  const menuBtn = document.getElementById("menuBtn");
  if (menuBtn) menuBtn.addEventListener("click", () => {
    const l = document.querySelector(".navlinks");
    if (l) l.style.display = l.style.display === "flex" ? "" : "flex";
  });

  /* ---------- COUNT-UP (works with or without motion) ---------- */
  function countUp(el) {
    const t = +el.dataset.count;
    if (!t) return;
    if (reduce) { el.textContent = fmt(t); return; }
    const d = 1500; let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / d, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.floor(eased * t));
      if (p < 1) requestAnimationFrame(tick); else el.textContent = fmt(t);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- REVEAL (IntersectionObserver + stagger) ---------- */
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  if (reduce) {
    revealEls.forEach((e) => e.classList.add("in"));
    document.querySelectorAll("[data-count]").forEach(countUp);
  } else {
    // stagger: delay by index within the same section
    revealEls.forEach((el) => {
      const sibs = Array.from(el.parentElement.querySelectorAll(":scope > .reveal"));
      const i = sibs.indexOf(el);
      if (i > 0) el.style.transitionDelay = Math.min(i * 0.08, 0.4) + "s";
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach((el) => io.observe(el));

    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        countUp(e.target);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));
  }

  /* ---------- STOP HERE if reduced motion ---------- */
  if (reduce) return;

  /* ---------- LENIS + GSAP ---------- */
  const hasGSAP = window.gsap && window.ScrollTrigger;
  const hasLenis = typeof window.Lenis === "function";
  if (!hasGSAP) return; // graceful: reveals + count-up already work

  gsap.registerPlugin(ScrollTrigger);

  let lenis = null;
  if (hasLenis) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    // anchor links via lenis
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (ev) => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (target) { ev.preventDefault(); lenis.scrollTo(target, { offset: -10 }); }
      });
    });
  }

  /* ---------- DOLLY-ZOOM HERO ---------- */
  const coverBg = document.getElementById("coverBg");
  const coverSubject = document.getElementById("coverSubject");
  const cover = document.getElementById("cover");
  if (cover && coverBg) {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: cover, start: "top top", end: "bottom top", scrub: true },
    });
    tl.fromTo(coverBg, { scale: 1, filter: "blur(0px)" }, { scale: 1.35, filter: "blur(6px)", ease: "none" }, 0);
    if (coverSubject) tl.fromTo(coverSubject, { scale: 1.18, yPercent: -50 }, { scale: 1.0, yPercent: -50, ease: "none" }, 0);
    const wrap = cover.querySelector(".wrap");
    if (wrap) tl.fromTo(wrap, { y: 0, opacity: 1 }, { y: -60, opacity: 0.15, ease: "none" }, 0);
  }

  /* ---------- PARALLAX FLOATS ---------- */
  gsap.utils.toArray(".float").forEach((el) => {
    const speed = parseFloat(el.dataset.speed || "0");
    if (speed) {
      gsap.to(el, {
        y: () => speed,
        ease: "none",
        scrollTrigger: { trigger: el.closest("section") || el, start: "top bottom", end: "bottom top", scrub: true },
      });
    }
    // idle drift
    if (el.dataset.drift) {
      gsap.to(el, { yPercent: "+=8", rotation: "+=2", duration: 4 + Math.random() * 2, ease: "sine.inOut", repeat: -1, yoyo: true });
    }
  });

  /* ---------- TILT 3D on cards ---------- */
  const MAX = 8;
  document.querySelectorAll(".tilt").forEach((card) => {
    let raf = null;
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        gsap.to(card, { rotationY: px * MAX, rotationX: -py * MAX, transformPerspective: 800, duration: 0.4, ease: "power2.out" });
      });
    };
    const reset = () => gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.6, ease: "power3.out" });
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", reset);
  });

  /* ---------- MAGNETIC buttons ---------- */
  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.4, ease: "power2.out" });
    });
    btn.addEventListener("mouseleave", () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" }));
  });

  /* ---------- PRINT: stop smooth scroll, refresh ---------- */
  window.addEventListener("beforeprint", () => { if (lenis) lenis.stop(); ScrollTrigger.getAll().forEach((s) => s.disable(false)); });
  window.addEventListener("afterprint", () => { if (lenis) lenis.start(); ScrollTrigger.getAll().forEach((s) => s.enable()); ScrollTrigger.refresh(); });

  window.addEventListener("load", () => ScrollTrigger.refresh());
})();