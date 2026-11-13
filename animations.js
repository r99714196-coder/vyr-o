(function () {
  "use strict";

  const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const hasObserver = "IntersectionObserver" in window;

  let revealObserver = null;
  let counterObserver = null;
  let parallaxItems = [];
  let ticking = false;
  let lastScroll = 0;
  let loaderDone = false;
  const loaderCallbacks = [];

  const prefersReduced = function () {
    return reduceQuery.matches;
  };

  const easeOutCubic = function (t) {
    return 1 - Math.pow(1 - t, 3);
  };

  const showElement = function (element) {
    const delay = element.getAttribute("data-delay");
    if (delay) element.style.transitionDelay = delay + "ms";
    element.classList.add("is-visible");
  };

  const runCounter = function (element) {
    if (element.dataset.counted === "true") return;
    element.dataset.counted = "true";
    const target = Number(element.getAttribute("data-count")) || 0;
    const suffix = element.getAttribute("data-suffix") || "";
    if (prefersReduced()) {
      element.textContent = target + suffix;
      return;
    }
    const duration = 1600;
    const start = performance.now();
    const step = function (now) {
      const progress = Math.min(1, (now - start) / duration);
      element.textContent = Math.round(target * easeOutCubic(progress)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const setupObservers = function () {
    if (!hasObserver) return;
    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          showElement(entry.target);
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
  };

  const observe = function (root) {
    const scope = root || document;
    const reveals = scope.querySelectorAll("[data-reveal]:not(.is-visible)");
    const counters = scope.querySelectorAll("[data-count]");
    reveals.forEach(function (element) {
      if (!revealObserver || prefersReduced()) {
        showElement(element);
      } else {
        revealObserver.observe(element);
      }
    });
    counters.forEach(function (element) {
      if (!counterObserver) {
        runCounter(element);
      } else {
        counterObserver.observe(element);
      }
    });
  };

  const collectParallax = function () {
    parallaxItems = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  };

  const updateParallax = function () {
    if (prefersReduced()) return;
    const viewport = window.innerHeight;
    parallaxItems.forEach(function (element) {
      const rect = element.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > viewport + 200) return;
      const factor = Number(element.getAttribute("data-parallax")) || 0;
      const offset = (rect.top + rect.height / 2 - viewport / 2) * factor;
      element.style.setProperty("--py", offset.toFixed(1) + "px");
    });
  };

  const updateScrollState = function () {
    const header = document.getElementById("siteHeader");
    const progress = document.getElementById("scrollProgress");
    const y = window.scrollY || window.pageYOffset;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
    if (header) {
      header.classList.toggle("is-scrolled", y > 24);
      const menuOpen = document.body.classList.contains("menu-open");
      const goingDown = y > lastScroll + 4;
      const goingUp = y < lastScroll - 4;
      if (menuOpen || y < 320 || goingUp) header.classList.remove("is-hidden");
      else if (goingDown) header.classList.add("is-hidden");
    }
    lastScroll = y;
  };

  const onScroll = function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      updateScrollState();
      updateParallax();
      ticking = false;
    });
  };

  const setupTilt = function () {
    if (!finePointer.matches) return;
    document.querySelectorAll("[data-tilt]").forEach(function (element) {
      element.addEventListener("pointermove", function (event) {
        if (prefersReduced()) return;
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.setProperty("--ry", (x * 8).toFixed(2) + "deg");
        element.style.setProperty("--rx", (-y * 8).toFixed(2) + "deg");
      });
      element.addEventListener("pointerleave", function () {
        element.style.setProperty("--ry", "0deg");
        element.style.setProperty("--rx", "0deg");
      });
    });
  };

  const setupMagnetic = function () {
    if (!finePointer.matches) return;
    document.querySelectorAll("[data-magnetic]").forEach(function (element) {
      element.addEventListener("pointermove", function (event) {
        if (prefersReduced()) return;
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.22;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.28;
        element.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
      });
      element.addEventListener("pointerleave", function () {
        element.style.transform = "";
      });
    });
  };

  const finishLoader = function () {
    if (loaderDone) return;
    loaderDone = true;
    const loader = document.getElementById("loader");
    const bar = document.getElementById("loaderBar");
    const count = document.getElementById("loaderCount");
    if (bar) bar.style.transform = "scaleX(1)";
    if (count) count.textContent = "100%";
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-ready");
    if (loader) {
      loader.classList.add("is-done");
      window.setTimeout(function () {
        loader.setAttribute("hidden", "");
        loader.style.display = "none";
      }, prefersReduced() ? 50 : 1100);
    }
    document.body.classList.remove("no-scroll");
    loaderCallbacks.forEach(function (callback) {
      callback();
    });
  };

  const runLoader = function () {
    const bar = document.getElementById("loaderBar");
    const count = document.getElementById("loaderCount");
    if (!document.getElementById("loader")) {
      finishLoader();
      return;
    }
    const duration = prefersReduced() ? 250 : 2000;
    const start = performance.now();
    const step = function (now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = progress < 0.7 ? progress * 0.85 : 0.595 + (progress - 0.7) * (0.405 / 0.3);
      const value = Math.min(1, eased);
      if (bar) bar.style.transform = "scaleX(" + value.toFixed(3) + ")";
      if (count) count.textContent = Math.round(value * 100) + "%";
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        window.setTimeout(finishLoader, prefersReduced() ? 0 : 250);
      }
    };
    requestAnimationFrame(step);
    window.setTimeout(finishLoader, 6000);
  };

  const init = function () {
    setupObservers();
    observe(document);
    collectParallax();
    setupTilt();
    setupMagnetic();
    updateScrollState();
    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    runLoader();
  };

  window.VyroMotion = {
    init: init,
    observe: observe,
    prefersReduced: prefersReduced,
    onLoaderDone: function (callback) {
      if (loaderDone) callback();
      else loaderCallbacks.push(callback);
    },
    refreshParallax: function () {
      collectParallax();
      updateParallax();
    }
  };
})();
