(function () {
  "use strict";

  const Catalog = window.VyroCatalog;
  const Store = window.VyroStore;
  const Motion = window.VyroMotion;
  const Media = window.VYRO_MEDIA;
  const THEME_KEY = "vyro_theme";
  const NEWSLETTER_KEY = "vyro_newsletter";
  const PAGE_SIZE = 12;

  const $ = function (selector, root) {
    return (root || document).querySelector(selector);
  };

  const $$ = function (selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  };

  const state = {
    category: "all",
    sub: "all",
    query: "",
    sort: "featured",
    visible: PAGE_SIZE,
    rendered: 0,
    qv: null
  };

  const ICONS = {
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    heart: '<path d="M12 20.5s-7.5-4.6-9.2-9.4C1.7 7.8 3.8 4.5 7.2 4.5c2 0 3.5 1 4.8 2.8 1.3-1.8 2.8-2.8 4.8-2.8 3.4 0 5.5 3.3 4.4 6.6-1.7 4.8-9.2 9.4-9.2 9.4z"/>',
    bag: '<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
    "arrow-right": '<path d="M4 12h16M14 6l6 6-6 6"/>',
    "arrow-left": '<path d="M20 12H4M10 6l-6 6 6 6"/>',
    "arrow-up-right": '<path d="M7 17L17 7M8 7h9v9"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    "chevron-down": '<path d="M6 9l6 6 6-6"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.8" fill="currentColor"/>',
    whatsapp: '<path d="M3.5 20.5l1.3-4.6A8.5 8.5 0 1 1 8 19.3z"/><path d="M9 8.6c.2 2.6 3.2 5.6 5.8 5.8l1.2-1.2-1.9-1-.9.7c-.9-.4-1.8-1.3-2.2-2.2l.7-.9-1-1.9z"/>',
    tiktok: '<path d="M14 3.5v11a3.6 3.6 0 1 1-3.6-3.6"/><path d="M14 3.5c.4 2.5 2 4.1 4.6 4.3"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'
  };

  const INFO = {
    shipping: {
      title: "Shipping",
      html: "<p>We ship across Egypt within 2 to 4 working days. Orders over EGP 3,000 ship free. Orders under that amount have a flat EGP 80 delivery fee.</p><p>Cash on delivery is available in all major cities.</p>"
    },
    returns: {
      title: "Returns",
      html: "<p>Not feeling it? Return unworn items with their tags within 14 days of delivery for an exchange or store credit.</p><p>Eyewear, watches, bags and accessories must be returned in their original packaging.</p>"
    },
    sizeguide: {
      title: "Size guide",
      html: '<p>Our fits run relaxed. Pick your usual size for an oversized look or size down for a closer fit.</p><table class="size-table"><thead><tr><th>Size</th><th>Chest (cm)</th><th>Waist (cm)</th></tr></thead><tbody><tr><td>S</td><td>96</td><td>74</td></tr><tr><td>M</td><td>102</td><td>80</td></tr><tr><td>L</td><td>108</td><td>86</td></tr><tr><td>XL</td><td>114</td><td>92</td></tr></tbody></table>'
    },
    faq: {
      title: "FAQ",
      html: "<p><strong>Is this a real store?</strong> This is a demo storefront. No payments are processed and no orders are shipped.</p><p><strong>Can I save items for later?</strong> Yes. Tap the heart on any piece to add it to your wishlist.</p><p><strong>Is my cart saved?</strong> Your cart and wishlist are saved in this browser.</p>"
    },
    contact: {
      title: "Contact",
      html: "<p>Questions about an order or a piece? Reach the VYRO studio at hello@vyro.example or send us a message on Instagram.</p><p>Support hours: Sunday to Thursday, 10am to 6pm Cairo time.</p>"
    },
    about: {
      title: "About VYRO",
      html: "<p>VYRO is a premium fashion and lifestyle house built for a generation that moves faster than the feed. We design eyewear, clothing, watches, accessories, bags and shoes as one system, with sharp silhouettes and honest materials.</p>"
    },
    privacy: {
      title: "Privacy",
      html: "<p>This demo store keeps your cart, wishlist and theme choice in your own browser storage. Nothing is sent to a server.</p>"
    },
    terms: {
      title: "Terms",
      html: "<p>This is a demo storefront. Products, prices and checkout are for demonstration only. No real purchase can be made.</p>"
    }
  };

  const reduced = function () {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  const esc = function (value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  const fmt = function (value) {
    return Catalog.formatPrice(value);
  };

  const icon = function (name, size) {
    const px = size || 22;
    return '<svg class="svg-ic" viewBox="0 0 24 24" width="' + px + '" height="' + px + '" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (ICONS[name] || "") + "</svg>";
  };

  const hydrateIcons = function (root) {
    $$("i.ic[data-icon]", root || document).forEach(function (element) {
      if (element.dataset.ready) return;
      element.dataset.ready = "1";
      element.innerHTML = icon(element.getAttribute("data-icon"), Number(element.getAttribute("data-size")) || 22);
    });
  };

  const mediaHTML = function (src, label, fit, cat) {
    const image = src ? '<img class="media-img" src="' + esc(src) + '" alt="' + esc(label) + '" loading="lazy" decoding="async" draggable="false">' : "";
    return (
      '<div class="media media--' + fit + '" data-cat="' + esc(cat || "") + '">' +
      '<div class="ph" aria-hidden="true"><span class="ph-grid"></span><span class="ph-mark">V</span><span class="ph-label">' + esc(label) + '</span><span class="ph-note">Image coming soon</span></div>' +
      image +
      "</div>"
    );
  };

  const bindMedia = function (root) {
    $$(".media-img:not([data-bound])", root || document).forEach(function (img) {
      img.dataset.bound = "1";
      const media = img.closest(".media");
      const loaded = function () {
        media.classList.add("is-loaded");
      };
      const failed = function () {
        media.classList.add("is-missing");
        img.remove();
      };
      if (img.complete) {
        if (img.naturalWidth > 0) loaded();
        else failed();
      } else {
        img.addEventListener("load", loaded, { once: true });
        img.addEventListener("error", failed, { once: true });
      }
    });
  };

  const fillSlots = function () {
    $$("[data-media-slot]").forEach(function (slot) {
      const key = slot.getAttribute("data-media-slot");
      let entry = null;
      if (key === "hero") {
        entry = Media.hero;
      } else if (key.indexOf("campaign-") === 0) {
        entry = Media.campaign[Number(key.split("-")[1])];
      }
      if (!entry) return;
      slot.innerHTML = mediaHTML(entry.src, entry.label, "cover", slot.getAttribute("data-cat"));
      bindMedia(slot);
    });
  };

  const priceHTML = function (product) {
    return (
      '<span class="price">' + fmt(product.price) + "</span>" +
      (product.oldPrice ? '<s class="price-old">' + fmt(product.oldPrice) + "</s>" : "")
    );
  };

  const swatchesHTML = function (product, max) {
    const list = product.colors.slice(0, max);
    const extra = product.colors.length - list.length;
    return (
      '<ul class="swatches" aria-label="Available colors">' +
      list.map(function (color) {
        return '<li style="--sw:' + color.hex + '" title="' + esc(color.name) + '"></li>';
      }).join("") +
      (extra > 0 ? '<li class="swatch-more">+' + extra + "</li>" : "") +
      "</ul>"
    );
  };

  const kindLabel = function (product) {
    return Catalog.categoryName(product.category) + (product.subLabel ? " / " + product.subLabel : "");
  };

  const productCard = function (product, index, scroll) {
    const wished = Store.hasWishlist(product.id);
    const tag = product.tag ? '<span class="pc-tag pc-tag--' + product.tag.toLowerCase() + '">' + esc(product.tag) + "</span>" : "";
    return (
      '<article class="product-card' + (scroll ? " product-card--scroll" : "") + '" data-id="' + product.id + '" data-reveal data-delay="' + (index % 4) * 70 + '">' +
      '<div class="pc-media">' +
      mediaHTML(product.image, product.name, "contain", product.category) +
      tag +
      '<button type="button" class="pc-wish' + (wished ? " is-active" : "") + '" data-action="wish" data-id="' + product.id + '" aria-pressed="' + wished + '" aria-label="' + (wished ? "Remove " : "Add ") + esc(product.name) + (wished ? " from wishlist" : " to wishlist") + '">' + icon("heart", 20) + "</button>" +
      '<button type="button" class="pc-quick" data-action="quick" data-id="' + product.id + '">' + icon("eye", 16) + "Quick view</button>" +
      "</div>" +
      '<div class="pc-body">' +
      '<p class="pc-cat">' + esc(kindLabel(product)) + "</p>" +
      '<h3 class="pc-name"><button type="button" data-action="quick" data-id="' + product.id + '">' + esc(product.name) + "</button></h3>" +
      '<div class="pc-row"><p class="pc-price">' + priceHTML(product) + "</p>" + swatchesHTML(product, 4) + "</div>" +
      '<button type="button" class="pc-add" data-action="add" data-id="' + product.id + '">' + icon("bag", 18) + "<span>Add to cart</span></button>" +
      "</div>" +
      "</article>"
    );
  };

  const toast = function (message, options) {
    const region = $("#toastRegion");
    if (!region) return;
    const settings = options || {};
    const element = document.createElement("div");
    element.className = "toast toast--" + (settings.type || "default");
    element.innerHTML =
      '<span class="toast-icon">' + icon(settings.icon || "check", 18) + "</span>" +
      "<p>" + esc(message) + "</p>" +
      (settings.action ? '<button type="button" class="toast-action">' + esc(settings.action.label) + "</button>" : "") +
      '<button type="button" class="toast-close" aria-label="Dismiss notification">' + icon("close", 16) + "</button>";
    let timer = null;
    const remove = function () {
      window.clearTimeout(timer);
      if (!element.parentNode) return;
      element.classList.remove("is-in");
      element.classList.add("is-out");
      window.setTimeout(function () {
        if (element.parentNode) element.parentNode.removeChild(element);
      }, reduced() ? 0 : 320);
    };
    element.querySelector(".toast-close").addEventListener("click", remove);
    if (settings.action) {
      element.querySelector(".toast-action").addEventListener("click", function () {
        remove();
        settings.action.run();
      });
    }
    region.appendChild(element);
    const all = $$(".toast", region);
    if (all.length > 3) {
      const oldest = all[0];
      if (oldest.parentNode) oldest.parentNode.removeChild(oldest);
    }
    window.requestAnimationFrame(function () {
      element.classList.add("is-in");
    });
    timer = window.setTimeout(remove, settings.duration || 3600);
  };

  const overlays = [];
  let menuOpen = false;

  const syncScrollLock = function () {
    const lock = overlays.length > 0 || menuOpen || document.body.classList.contains("is-loading");
    document.body.classList.toggle("no-scroll", lock);
    document.body.classList.toggle("overlay-open", overlays.length > 0);
    const backdrop = $("#backdrop");
    if (backdrop) backdrop.classList.toggle("is-visible", overlays.length > 0);
  };

  const focusables = function (container) {
    return $$('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', container).filter(function (element) {
      return element.getClientRects().length > 0 && !element.hasAttribute("hidden");
    });
  };

  const hideOverlay = function (element) {
    element.classList.remove("is-open");
    element.setAttribute("aria-hidden", "true");
  };

  const closeOverlay = function (element, restore) {
    const index = overlays.indexOf(element);
    if (index === -1) return;
    overlays.splice(index, 1);
    hideOverlay(element);
    syncScrollLock();
    if (restore !== false && element._returnFocus && typeof element._returnFocus.focus === "function") {
      try {
        element._returnFocus.focus({ preventScroll: true });
      } catch (error) {
        return;
      }
    }
  };

  const closeAllOverlays = function (restore) {
    overlays.slice().forEach(function (element) {
      closeOverlay(element, restore);
    });
  };

  const openOverlay = function (element) {
    if (!element || overlays.indexOf(element) !== -1) return;
    let returnTarget = document.activeElement;
    if (overlays.length) {
      returnTarget = overlays[0]._returnFocus || returnTarget;
      closeAllOverlays(false);
    }
    setMenu(false);
    element._returnFocus = returnTarget;
    element.classList.add("is-open");
    element.setAttribute("aria-hidden", "false");
    overlays.push(element);
    syncScrollLock();
    window.setTimeout(function () {
      const target = element.querySelector("[data-autofocus]") || focusables(element)[0];
      if (target) target.focus({ preventScroll: true });
    }, reduced() ? 0 : 90);
  };

  function setMenu(open) {
    if (menuOpen === open) return;
    menuOpen = open;
    const menu = $("#mobileMenu");
    const toggle = $("#menuToggle");
    document.body.classList.toggle("menu-open", open);
    if (menu) {
      menu.classList.toggle("is-open", open);
      menu.setAttribute("aria-hidden", String(!open));
    }
    if (toggle) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    syncScrollLock();
  }

  const scrollToTarget = function (selector) {
    const target = $(selector);
    if (!target) return;
    target.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
  };

  const currentTheme = function () {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  };

  const applyTheme = function (theme, persist) {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = $("#metaThemeColor");
    if (meta) meta.setAttribute("content", theme === "light" ? "#F4F5F8" : "#060912");
    const button = $("#themeToggle");
    if (button) {
      button.setAttribute("aria-label", theme === "light" ? "Switch to dark mode" : "Switch to light mode");
      button.setAttribute("aria-pressed", String(theme === "light"));
    }
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (error) {
        return;
      }
    }
  };

  const toggleTheme = function () {
    const root = document.documentElement;
    root.classList.add("theme-anim");
    applyTheme(currentTheme() === "light" ? "dark" : "light", true);
    window.setTimeout(function () {
      root.classList.remove("theme-anim");
    }, 600);
  };

  const tokensOf = function (query) {
    return query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  };

  const matchesTokens = function (product, tokens) {
    if (!tokens.length) return true;
    const category = Catalog.category(product.category);
    const hay = [product.name, category.name, category.keywords, product.subLabel, product.tag].join(" ").toLowerCase();
    return tokens.every(function (token) {
      return hay.indexOf(token) !== -1;
    });
  };

  const sortList = function (list, sort) {
    const sorted = list.slice();
    const byName = function (a, b) {
      return a.name.localeCompare(b.name);
    };
    if (sort === "newest") {
      sorted.sort(function (a, b) {
        return b.added.localeCompare(a.added) || a.order - b.order;
      });
    } else if (sort === "price-asc") {
      sorted.sort(function (a, b) {
        return a.price - b.price || a.order - b.order;
      });
    } else if (sort === "price-desc") {
      sorted.sort(function (a, b) {
        return b.price - a.price || a.order - b.order;
      });
    } else if (sort === "name-asc") {
      sorted.sort(byName);
    } else if (sort === "name-desc") {
      sorted.sort(function (a, b) {
        return byName(b, a);
      });
    } else {
      sorted.sort(function (a, b) {
        return Number(b.featured) - Number(a.featured) || a.order - b.order;
      });
    }
    return sorted;
  };

  const getFiltered = function () {
    const tokens = tokensOf(state.query);
    const list = Catalog.all.filter(function (product) {
      if (state.category !== "all" && product.category !== state.category) return false;
      if (state.sub !== "all" && product.sub !== state.sub) return false;
      return matchesTokens(product, tokens);
    });
    return sortList(list, state.sort);
  };

  const syncFilterUI = function () {
    $$("#filterChips .chip").forEach(function (chip) {
      const active = chip.getAttribute("data-filter") === state.category;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", String(active));
    });
    const subRow = $("#subFilters");
    if (subRow) subRow.hidden = state.category !== "clothing";
    $$("#subFilters .chip").forEach(function (chip) {
      const active = chip.getAttribute("data-sub") === state.sub;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", String(active));
    });
    const search = $("#shopSearch");
    if (search && search.value !== state.query) search.value = state.query;
    const clear = $("#shopSearchClear");
    if (clear) clear.hidden = !state.query;
    const sort = $("#sortSelect");
    if (sort) sort.value = state.sort;
  };

  const renderChipCounts = function () {
    $$("#filterChips .chip").forEach(function (chip) {
      const key = chip.getAttribute("data-filter");
      const count = key === "all" ? Catalog.all.length : Catalog.all.filter(function (product) {
        return product.category === key;
      }).length;
      const badge = $(".chip-count", chip);
      if (badge) badge.textContent = String(count);
    });
  };

  const renderShop = function (reset) {
    const grid = $("#productGrid");
    if (!grid) return;
    const list = getFiltered();
    if (reset) {
      grid.innerHTML = "";
      state.rendered = 0;
    }
    const slice = list.slice(0, state.visible);
    const fresh = slice.slice(state.rendered);
    grid.insertAdjacentHTML("beforeend", fresh.map(function (product, index) {
      return productCard(product, index, false);
    }).join(""));
    state.rendered = slice.length;
    bindMedia(grid);
    Motion.observe(grid);

    const empty = $("#emptyState");
    if (empty) empty.hidden = list.length > 0;
    grid.hidden = list.length === 0;

    const more = $("#loadMore");
    if (more) {
      const left = list.length - state.rendered;
      more.hidden = left <= 0;
      more.textContent = "Load more pieces (" + left + " left)";
    }

    const count = $("#resultCount");
    if (count) {
      let text = list.length + (list.length === 1 ? " piece" : " pieces");
      if (state.category !== "all") text += " in " + Catalog.categoryName(state.category);
      if (state.sub !== "all") text += " / " + Catalog.subLabels[state.sub];
      if (state.query) text += " for “" + state.query + "”";
      count.textContent = text;
    }
    syncFilterUI();
  };

  const setCategory = function (slug, scroll) {
    state.category = slug;
    state.sub = "all";
    state.visible = PAGE_SIZE;
    renderShop(true);
    if (scroll) scrollToTarget("#shop");
  };

  const resetFilters = function () {
    state.category = "all";
    state.sub = "all";
    state.query = "";
    state.sort = "featured";
    state.visible = PAGE_SIZE;
    renderShop(true);
  };

  const renderCategories = function () {
    const grid = $("#categoryGrid");
    if (!grid) return;
    grid.innerHTML = Catalog.categories.map(function (category, index) {
      const count = Catalog.all.filter(function (product) {
        return product.category === category.slug;
      }).length;
      return (
        '<a class="cat-card" href="#shop" data-category="' + category.slug + '" data-reveal data-delay="' + index * 90 + '" aria-label="Shop ' + esc(category.name) + '">' +
        '<div class="cat-media">' + mediaHTML(category.image, category.name, "cover", category.slug) + "</div>" +
        '<span class="cat-index">0' + (index + 1) + "</span>" +
        '<div class="cat-info"><h3>' + esc(category.name) + "</h3><p>" + esc(category.tagline) + '</p><span class="cat-count">' + count + " pieces</span></div>" +
        '<span class="cat-arrow">' + icon("arrow-up-right", 22) + "</span>" +
        "</a>"
      );
    }).join("");
    bindMedia(grid);
    Motion.observe(grid);
  };

  const renderNewArrivals = function () {
    const track = $("#newTrack");
    if (!track) return;
    const list = Catalog.all.filter(function (product) {
      return product.isNew;
    }).sort(function (a, b) {
      return b.added.localeCompare(a.added);
    }).slice(0, 12);
    track.innerHTML = list.map(function (product, index) {
      return productCard(product, index, true);
    }).join("");
    bindMedia(track);
    Motion.observe(track);
  };

  const updateScrollerButtons = function () {
    const scroller = $("#newScroller");
    const prev = $("#newPrev");
    const next = $("#newNext");
    if (!scroller || !prev || !next) return;
    prev.disabled = scroller.scrollLeft <= 4;
    next.disabled = scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 4;
  };

  const renderHeroChips = function () {
    const ids = window.VYRO_HERO_PRODUCTS || [];
    ["heroCardA", "heroCardB"].forEach(function (elementId, index) {
      const element = document.getElementById(elementId);
      const product = Catalog.byId(ids[index]);
      if (!element || !product) {
        if (element) element.hidden = true;
        return;
      }
      element.setAttribute("data-action", "quick");
      element.setAttribute("data-id", product.id);
      element.setAttribute("aria-label", "Quick view " + product.name);
      element.innerHTML =
        '<span class="hc-thumb">' + mediaHTML(product.image, product.name, "contain", product.category) + "</span>" +
        '<span class="hc-info"><b>' + esc(product.name) + "</b><i>" + fmt(product.price) + "</i></span>";
      bindMedia(element);
    });
  };

  const syncWishButtons = function () {
    $$('[data-action="wish"], [data-action="qv-wish"]').forEach(function (button) {
      const id = button.getAttribute("data-id");
      const active = Store.hasWishlist(id);
      const product = Catalog.byId(id);
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
      if (product && button.getAttribute("data-action") === "wish") {
        button.setAttribute("aria-label", (active ? "Remove " : "Add ") + product.name + (active ? " from wishlist" : " to wishlist"));
      }
    });
  };

  const bumpBadge = function (element) {
    if (!element) return;
    element.classList.remove("is-bump");
    void element.offsetWidth;
    element.classList.add("is-bump");
  };

  let lastCartCount = Store.count();
  let lastWishCount = Store.wishlistCount();

  const updateBadges = function () {
    const cart = Store.count();
    const wish = Store.wishlistCount();
    const cartBadge = $("#cartCount");
    const wishBadge = $("#wishCount");
    if (cartBadge) {
      cartBadge.textContent = cart > 99 ? "99+" : String(cart);
      cartBadge.setAttribute("data-count", String(cart));
      if (cart !== lastCartCount) bumpBadge(cartBadge);
    }
    if (wishBadge) {
      wishBadge.textContent = String(wish);
      wishBadge.setAttribute("data-count", String(wish));
      if (wish !== lastWishCount) bumpBadge(wishBadge);
    }
    lastCartCount = cart;
    lastWishCount = wish;
    const cartLabel = $("#cartOpen");
    const wishLabel = $("#wishlistOpen");
    if (cartLabel) cartLabel.setAttribute("aria-label", "Open cart, " + cart + (cart === 1 ? " item" : " items"));
    if (wishLabel) wishLabel.setAttribute("aria-label", "Open wishlist, " + wish + (wish === 1 ? " item" : " items"));
  };

  const variantText = function (item) {
    return [item.color, item.size].filter(Boolean).join(" / ");
  };

  const renderCart = function () {
    const items = Store.getItems();
    const list = $("#cartItems");
    const empty = $("#cartEmpty");
    const footer = $("#cartFooter");
    const meter = $("#shippingMeter");
    const count = $("#cartDrawerCount");
    if (count) count.textContent = String(Store.count());
    if (empty) empty.hidden = items.length > 0;
    if (footer) footer.hidden = items.length === 0;
    if (meter) meter.hidden = items.length === 0;
    if (!list) return;
    list.hidden = items.length === 0;
    list.innerHTML = items.map(function (item) {
      const product = item.product;
      return (
        '<li class="line" data-key="' + esc(item.key) + '">' +
        '<div class="line-media">' + mediaHTML(product.image, product.name, "contain", product.category) + "</div>" +
        '<div class="line-info">' +
        "<h3>" + esc(product.name) + "</h3>" +
        '<p class="line-meta">' + esc(variantText(item)) + "</p>" +
        '<p class="line-price">' + fmt(product.price) + "</p>" +
        '<div class="line-actions">' +
        '<div class="qty qty--sm" role="group" aria-label="Quantity of ' + esc(product.name) + '">' +
        '<button type="button" data-action="cart-dec" data-key="' + esc(item.key) + '" aria-label="Decrease quantity"' + (item.qty <= 1 ? " disabled" : "") + ">" + icon("minus", 14) + "</button>" +
        "<output>" + item.qty + "</output>" +
        '<button type="button" data-action="cart-inc" data-key="' + esc(item.key) + '" aria-label="Increase quantity">' + icon("plus", 14) + "</button>" +
        "</div>" +
        '<button type="button" class="text-btn" data-action="cart-remove" data-key="' + esc(item.key) + '" aria-label="Remove ' + esc(product.name) + ' from cart">Remove</button>' +
        "</div></div>" +
        '<p class="line-total">' + fmt(item.lineTotal) + "</p>" +
        "</li>"
      );
    }).join("");
    bindMedia(list);

    const subtotal = $("#cartSubtotal");
    const shipping = $("#cartShipping");
    const total = $("#cartTotal");
    if (subtotal) subtotal.textContent = fmt(Store.subtotal());
    if (shipping) shipping.textContent = Store.shipping() === 0 ? "Free" : fmt(Store.shipping());
    if (total) total.textContent = fmt(Store.total());

    const text = $("#shippingText");
    const bar = $("#shippingBar");
    const remaining = Store.freeShippingRemaining();
    const threshold = window.VYRO_CONFIG.freeShippingThreshold;
    if (text) {
      text.textContent = remaining > 0 ? "Add " + fmt(remaining) + " more for free shipping" : "You unlocked free shipping";
    }
    if (bar) bar.style.transform = "scaleX(" + Math.min(1, Store.subtotal() / threshold).toFixed(3) + ")";
  };

  const renderWishlist = function () {
    const items = Store.getWishlist();
    const list = $("#wishlistItems");
    const empty = $("#wishlistEmpty");
    const footer = $("#wishlistFooter");
    const count = $("#wishDrawerCount");
    if (count) count.textContent = String(items.length);
    if (empty) empty.hidden = items.length > 0;
    if (footer) footer.hidden = items.length === 0;
    if (!list) return;
    list.hidden = items.length === 0;
    list.innerHTML = items.map(function (product) {
      return (
        '<li class="line" data-id="' + product.id + '">' +
        '<div class="line-media">' + mediaHTML(product.image, product.name, "contain", product.category) + "</div>" +
        '<div class="line-info">' +
        "<h3>" + esc(product.name) + "</h3>" +
        '<p class="line-meta">' + esc(kindLabel(product)) + "</p>" +
        '<p class="line-price">' + priceHTML(product) + "</p>" +
        '<div class="line-actions">' +
        '<button type="button" class="btn btn-primary btn-sm" data-action="wish-add-cart" data-id="' + product.id + '">Add to cart</button>' +
        '<button type="button" class="text-btn" data-action="wish-remove" data-id="' + product.id + '" aria-label="Remove ' + esc(product.name) + ' from wishlist">Remove</button>' +
        "</div></div></li>"
      );
    }).join("");
    bindMedia(list);
  };

  const openCart = function () {
    openOverlay($("#cartDrawer"));
  };

  const openWishlist = function () {
    openOverlay($("#wishlistDrawer"));
  };

  const askForSize = function (product) {
    toast("Please choose a size first", { type: "warn", icon: "info" });
    if (!state.qv || state.qv.id !== product.id || !$("#quickView").classList.contains("is-open")) {
      openQuick(product.id);
    }
    const group = $("#qvSizeGroup");
    if (group) {
      group.classList.remove("is-needed");
      void group.offsetWidth;
      group.classList.add("is-needed");
    }
  };

  const addToCart = function (id, options) {
    const product = Catalog.byId(id);
    if (!product) return;
    if (product.sizes && !(options && options.size)) {
      askForSize(product);
      return;
    }
    const key = Store.add(id, options);
    const item = Store.getItems().filter(function (entry) {
      return entry.key === key;
    })[0];
    const detail = item ? variantText(item) : "";
    toast(product.name + (detail ? " (" + detail + ")" : "") + " added to cart", {
      icon: "bag",
      action: { label: "View cart", run: openCart }
    });
  };

  const toggleWish = function (id) {
    const product = Catalog.byId(id);
    if (!product) return;
    const active = Store.toggleWishlist(id);
    toast(active ? product.name + " saved to wishlist" : product.name + " removed from wishlist", {
      icon: "heart",
      action: active ? { label: "View", run: openWishlist } : null
    });
  };

  const focusCartControl = function (action, key) {
    const target = $$('#cartItems [data-action="' + action + '"]').filter(function (button) {
      return button.getAttribute("data-key") === key;
    })[0];
    if (target && !target.disabled) target.focus({ preventScroll: true });
  };

  const quickQtyTotal = function () {
    const product = Catalog.byId(state.qv.id);
    return fmt(product.price * state.qv.qty);
  };

  const renderQuick = function () {
    const body = $("#quickViewBody");
    const product = state.qv && Catalog.byId(state.qv.id);
    if (!body || !product) return;
    const wished = Store.hasWishlist(product.id);
    const tag = product.tag ? '<span class="pc-tag pc-tag--' + product.tag.toLowerCase() + '">' + esc(product.tag) + "</span>" : "";
    const sizes = product.sizes
      ? '<div class="qv-group" id="qvSizeGroup"><div class="qv-label-row"><p class="qv-label">Size <b id="qvSizeName">' + (state.qv.size ? esc(state.qv.size) : "Select a size") + '</b></p><button type="button" class="text-btn" data-info="sizeguide">Size guide</button></div><div class="qv-sizes" role="radiogroup" aria-label="Size">' +
        product.sizes.map(function (size) {
          const on = size === state.qv.size;
          return '<button type="button" class="qv-size' + (on ? " is-active" : "") + '" role="radio" aria-checked="' + on + '" data-action="qv-size" data-value="' + size + '">' + size + "</button>";
        }).join("") +
        "</div></div>"
      : "";
    body.innerHTML =
      '<div class="qv-media">' + mediaHTML(product.image, product.name, "contain", product.category) + tag + "</div>" +
      '<div class="qv-info">' +
      '<p class="eyebrow"><span class="dot"></span>' + esc(kindLabel(product)) + "</p>" +
      '<h2 id="quickTitle" class="qv-title">' + esc(product.name) + "</h2>" +
      '<p class="qv-price">' + priceHTML(product) + "</p>" +
      '<p class="qv-desc">' + esc(product.desc) + "</p>" +
      '<div class="qv-group"><p class="qv-label">Color: <b id="qvColorName">' + esc(state.qv.color) + '</b></p><div class="qv-swatches" role="radiogroup" aria-label="Color">' +
      product.colors.map(function (color) {
        const on = color.name === state.qv.color;
        return '<button type="button" class="qv-swatch' + (on ? " is-active" : "") + '" role="radio" aria-checked="' + on + '" data-action="qv-color" data-value="' + esc(color.name) + '" style="--sw:' + color.hex + '" aria-label="' + esc(color.name) + '"></button>';
      }).join("") +
      "</div></div>" +
      sizes +
      '<div class="qv-buy">' +
      '<div class="qty" role="group" aria-label="Quantity">' +
      '<button type="button" data-action="qv-dec" aria-label="Decrease quantity">' + icon("minus", 16) + "</button>" +
      '<output id="qvQty">' + state.qv.qty + "</output>" +
      '<button type="button" data-action="qv-inc" aria-label="Increase quantity">' + icon("plus", 16) + "</button>" +
      "</div>" +
      '<button type="button" class="btn btn-primary qv-add" data-action="qv-add"><span>Add to cart</span><span id="qvTotal">' + quickQtyTotal() + "</span></button>" +
      '<button type="button" class="round-btn qv-wish' + (wished ? " is-active" : "") + '" data-action="qv-wish" data-id="' + product.id + '" aria-pressed="' + wished + '" aria-label="Toggle wishlist">' + icon("heart", 20) + "</button>" +
      "</div>" +
      '<ul class="qv-details">' + product.details.map(function (line) {
        return "<li>" + icon("check", 16) + "<span>" + esc(line) + "</span></li>";
      }).join("") + "</ul>" +
      "</div>";
    bindMedia(body);
  };

  const openQuick = function (id) {
    const product = Catalog.byId(id);
    if (!product) return;
    const variant = Store.defaultVariant(product);
    state.qv = { id: id, color: variant.color, size: variant.size, qty: 1 };
    renderQuick();
    openOverlay($("#quickView"));
  };

  const updateQuickControls = function () {
    if (!state.qv) return;
    $$("#quickViewBody .qv-swatch").forEach(function (button) {
      const on = button.getAttribute("data-value") === state.qv.color;
      button.classList.toggle("is-active", on);
      button.setAttribute("aria-checked", String(on));
    });
    $$("#quickViewBody .qv-size").forEach(function (button) {
      const on = button.getAttribute("data-value") === state.qv.size;
      button.classList.toggle("is-active", on);
      button.setAttribute("aria-checked", String(on));
    });
    const colorName = $("#qvColorName");
    if (colorName) colorName.textContent = state.qv.color;
    const sizeName = $("#qvSizeName");
    if (sizeName) sizeName.textContent = state.qv.size || "Select a size";
    const sizeGroup = $("#qvSizeGroup");
    if (sizeGroup && state.qv.size) sizeGroup.classList.remove("is-needed");
    const qty = $("#qvQty");
    if (qty) qty.textContent = String(state.qv.qty);
    const total = $("#qvTotal");
    if (total) total.textContent = quickQtyTotal();
  };

  const openInfo = function (key) {
    const entry = INFO[key];
    if (!entry) return;
    $("#infoTitle").textContent = entry.title;
    $("#infoBody").innerHTML = entry.html;
    openOverlay($("#infoModal"));
  };

  const waNumber = function () {
    const raw = String(window.VYRO_CONFIG.whatsappNumber || "");
    const digits = raw.replace(/[^0-9]/g, "");
    if (/[a-z]/i.test(raw) || digits.length < 10 || digits.length > 15) return "";
    return digits;
  };

  const waLink = function (text) {
    const number = waNumber();
    if (!number) return "";
    return "https://wa.me/" + number + (text ? "?text=" + encodeURIComponent(text) : "");
  };

  const renderCheckout = function () {
    const body = $("#checkoutBody");
    if (!body) return;
    const items = Store.getItems();
    body.innerHTML =
      '<p class="eyebrow"><span class="dot"></span>Checkout</p>' +
      '<h2 id="checkoutTitle" class="info-title">Review your order</h2>' +
      '<div class="demo-note">' + icon("info", 20) + "<p><strong>Order on WhatsApp.</strong> Fill in your details and we will open WhatsApp with your order ready to send. You pay on delivery.</p></div>" +
      '<ul class="summary-list">' + items.map(function (item) {
        return "<li><span>" + esc(item.product.name) + "<small>" + esc(variantText(item)) + " x " + item.qty + "</small></span><b>" + fmt(item.lineTotal) + "</b></li>";
      }).join("") + "</ul>" +
      '<dl class="totals">' +
      "<div><dt>Subtotal</dt><dd>" + fmt(Store.subtotal()) + "</dd></div>" +
      "<div><dt>Shipping</dt><dd>" + (Store.shipping() === 0 ? "Free" : fmt(Store.shipping())) + "</dd></div>" +
      '<div class="totals-grand"><dt>Total</dt><dd>' + fmt(Store.total()) + "</dd></div>" +
      "</dl>" +
      '<form id="orderForm" class="order-form" novalidate>' +
      '<label class="co-field"><span>Full name</span><input id="coName" name="name" type="text" autocomplete="name" placeholder="Your name" required></label>' +
      '<label class="co-field"><span>Phone number</span><input id="coPhone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="01XXXXXXXXX" required></label>' +
      '<label class="co-field"><span>Delivery address</span><textarea id="coAddress" name="address" rows="2" autocomplete="street-address" placeholder="City, area, street, building" required></textarea></label>' +
      '<label class="co-field"><span>Notes (optional)</span><input id="coNotes" name="notes" type="text" placeholder="Anything we should know?"></label>' +
      '<p id="orderMessage" class="form-message" role="alert" aria-live="assertive"></p>' +
      '<button type="submit" class="btn btn-primary btn-block" data-autofocus>' + icon("whatsapp", 20) + "<span>Send order on WhatsApp</span></button>" +
      "</form>" +
      '<button type="button" class="text-btn" data-action="back-to-cart">Back to cart</button>';
  };

  const openCheckout = function () {
    if (!Store.count()) {
      toast("Your cart is empty", { type: "warn", icon: "info" });
      return;
    }
    renderCheckout();
    openOverlay($("#checkoutModal"));
  };

  const buildOrderText = function (number, customer) {
    const items = Store.getItems();
    const lines = [
      "*New order " + number + "*",
      "",
      "Name: " + customer.name,
      "Phone: " + customer.phone,
      "Address: " + customer.address
    ];
    if (customer.notes) lines.push("Notes: " + customer.notes);
    lines.push("", "*Items*");
    items.forEach(function (item, index) {
      const detail = variantText(item);
      lines.push((index + 1) + ". " + item.product.name + (detail ? " (" + detail + ")" : "") + " x" + item.qty + " - " + fmt(item.lineTotal));
    });
    lines.push("", "Subtotal: " + fmt(Store.subtotal()));
    lines.push("Shipping: " + (Store.shipping() === 0 ? "Free" : fmt(Store.shipping())));
    lines.push("*Total: " + fmt(Store.total()) + "*");
    lines.push("Payment: Cash on delivery");
    return lines.join("\n");
  };

  const placeOrder = function (form) {
    const body = $("#checkoutBody");
    const message = $("#orderMessage");
    const customer = {
      name: form.elements.name.value.trim(),
      phone: form.elements.phone.value.trim(),
      address: form.elements.address.value.trim(),
      notes: form.elements.notes.value.trim()
    };
    const fail = function (text, field) {
      if (message) {
        message.textContent = text;
        message.classList.add("is-error");
      }
      if (field) field.focus();
    };
    if (customer.name.length < 2) return fail("Please enter your name.", form.elements.name);
    if (customer.phone.replace(/[^0-9]/g, "").length < 8) return fail("Please enter a valid phone number.", form.elements.phone);
    if (customer.address.length < 6) return fail("Please enter your delivery address.", form.elements.address);
    if (!waNumber()) {
      toast("WhatsApp number is not set yet", { type: "warn", icon: "info" });
      return fail("The store WhatsApp number is not configured yet.");
    }
    const number = "VY-" + String(Math.floor(100000 + Math.random() * 900000));
    const total = fmt(Store.total());
    const link = waLink(buildOrderText(number, customer));
    Store.clear();
    if (body) {
      body.innerHTML =
        '<div class="order-done"><span class="order-check">' + icon("check", 34) + "</span>" +
        '<p class="eyebrow"><span class="dot"></span>Almost done</p>' +
        '<h2 id="checkoutTitle" class="info-title">Send your order</h2>' +
        "<p>Your order <strong>" + number + "</strong> for " + total + " is ready. Press send in WhatsApp to confirm it. If WhatsApp did not open, use the button below.</p>" +
        '<a class="btn btn-primary btn-block" href="' + esc(link) + '" target="_blank" rel="noopener noreferrer" data-autofocus>' + icon("whatsapp", 20) + "<span>Open WhatsApp</span></a>" +
        '<button type="button" class="text-btn" data-close data-goto="#shop">Continue shopping</button></div>';
    }
    toast("Order " + number + " is ready to send", { icon: "check" });
    const opened = window.open(link, "_blank", "noopener,noreferrer");
    if (!opened) toast("Tap Open WhatsApp to send your order", { icon: "info" });
  };

  const renderSearchResults = function () {
    const input = $("#searchInput");
    const results = $("#searchResults");
    const viewAll = $("#searchViewAll");
    const suggest = $("#searchSuggest");
    if (!input || !results) return;
    const query = input.value.trim();
    if (suggest) suggest.hidden = query.length > 0;
    if (!query) {
      results.innerHTML = "";
      if (viewAll) viewAll.hidden = true;
      return;
    }
    const tokens = tokensOf(query);
    const list = Catalog.all.filter(function (product) {
      return matchesTokens(product, tokens);
    });
    if (!list.length) {
      results.innerHTML = '<li class="sr-empty">No results for “' + esc(query) + "”. Try another word.</li>";
      if (viewAll) viewAll.hidden = true;
      return;
    }
    results.innerHTML = list.slice(0, 6).map(function (product) {
      return (
        '<li><button type="button" class="sr-item" data-action="quick" data-id="' + product.id + '">' +
        '<span class="sr-thumb">' + mediaHTML(product.image, product.name, "contain", product.category) + "</span>" +
        '<span class="sr-text"><b>' + esc(product.name) + "</b><i>" + esc(kindLabel(product)) + "</i></span>" +
        '<span class="sr-price">' + fmt(product.price) + "</span></button></li>"
      );
    }).join("");
    bindMedia(results);
    if (viewAll) {
      viewAll.hidden = false;
      viewAll.textContent = "View all " + list.length + (list.length === 1 ? " result" : " results");
    }
  };

  const applySearchToShop = function (query) {
    state.query = query.trim();
    state.category = "all";
    state.sub = "all";
    state.visible = PAGE_SIZE;
    closeAllOverlays(false);
    renderShop(true);
    scrollToTarget("#shop");
  };

  const handleAction = function (element, event) {
    const action = element.getAttribute("data-action");
    const id = element.getAttribute("data-id");
    const key = element.getAttribute("data-key");
    if (element.tagName === "A") event.preventDefault();

    if (action === "wish") {
      toggleWish(id);
    } else if (action === "quick") {
      openQuick(id);
    } else if (action === "add") {
      const target = Catalog.byId(id);
      if (target && target.sizes) askForSize(target);
      else addToCart(id);
    } else if (action === "cart-inc") {
      Store.increment(key);
      focusCartControl("cart-inc", key);
    } else if (action === "cart-dec") {
      Store.decrement(key);
      focusCartControl("cart-dec", key);
    } else if (action === "cart-remove") {
      const item = Store.getItems().filter(function (entry) {
        return entry.key === key;
      })[0];
      Store.remove(key);
      if (item) toast(item.product.name + " removed from cart", { icon: "trash" });
    } else if (action === "wish-remove") {
      Store.removeWishlist(id);
    } else if (action === "wish-add-cart") {
      const product = Catalog.byId(id);
      if (product && product.sizes) {
        closeAllOverlays(false);
        askForSize(product);
        return;
      }
      Store.addWishlistToCart(id);
      if (product) toast(product.name + " moved to cart", { icon: "bag", action: { label: "View cart", run: openCart } });
    } else if (action === "qv-color") {
      state.qv.color = element.getAttribute("data-value");
      updateQuickControls();
    } else if (action === "qv-size") {
      state.qv.size = element.getAttribute("data-value");
      updateQuickControls();
    } else if (action === "qv-inc") {
      state.qv.qty = Math.min(20, state.qv.qty + 1);
      updateQuickControls();
    } else if (action === "qv-dec") {
      state.qv.qty = Math.max(1, state.qv.qty - 1);
      updateQuickControls();
    } else if (action === "qv-add") {
      addToCart(state.qv.id, { color: state.qv.color, size: state.qv.size, qty: state.qv.qty });
    } else if (action === "qv-wish") {
      toggleWish(id);
    } else if (action === "back-to-cart") {
      openCart();
    }
  };

  const bindEvents = function () {
    document.addEventListener("click", function (event) {
      const target = event.target;

      const actionElement = target.closest("[data-action]");
      if (actionElement) {
        handleAction(actionElement, event);
        return;
      }

      const closeElement = target.closest("[data-close]");
      if (closeElement) {
        const container = closeElement.closest(".drawer, .modal, .search-layer");
        if (container) closeOverlay(container);
        const goto = closeElement.getAttribute("data-goto");
        if (goto) window.setTimeout(function () {
          scrollToTarget(goto);
        }, 60);
        return;
      }

      const categoryElement = target.closest("[data-category]");
      if (categoryElement) {
        event.preventDefault();
        closeAllOverlays(false);
        setMenu(false);
        setCategory(categoryElement.getAttribute("data-category"), true);
        return;
      }

      const infoElement = target.closest("[data-info]");
      if (infoElement) {
        openInfo(infoElement.getAttribute("data-info"));
        return;
      }

      const media = target.closest(".pc-media");
      if (media) {
        const card = media.closest("[data-id]");
        if (card) openQuick(card.getAttribute("data-id"));
        return;
      }

      if (target.closest("[data-close-menu]")) {
        setMenu(false);
        return;
      }

      if (target === $("#backdrop") && overlays.length) {
        closeOverlay(overlays[overlays.length - 1]);
        return;
      }

      if (target.classList && (target.classList.contains("modal") || target.classList.contains("search-layer")) && overlays.indexOf(target) !== -1) {
        closeOverlay(target);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        if (overlays.length) {
          closeOverlay(overlays[overlays.length - 1]);
        } else if (menuOpen) {
          setMenu(false);
          const toggle = $("#menuToggle");
          if (toggle) toggle.focus();
        }
        return;
      }
      if (event.key === "Tab" && overlays.length) {
        const top = overlays[overlays.length - 1];
        const items = focusables(top);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (!top.contains(document.activeElement)) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    $("#themeToggle").addEventListener("click", toggleTheme);
    $("#menuToggle").addEventListener("click", function () {
      setMenu(!menuOpen);
    });
    $("#cartOpen").addEventListener("click", openCart);
    $("#wishlistOpen").addEventListener("click", openWishlist);
    $("#searchOpen").addEventListener("click", function () {
      openOverlay($("#searchLayer"));
    });

    $("#filterChips").addEventListener("click", function (event) {
      const chip = event.target.closest("[data-filter]");
      if (chip) setCategory(chip.getAttribute("data-filter"), false);
    });

    $("#subFilters").addEventListener("click", function (event) {
      const chip = event.target.closest("[data-sub]");
      if (!chip) return;
      state.sub = chip.getAttribute("data-sub");
      state.visible = PAGE_SIZE;
      renderShop(true);
    });

    let searchTimer = null;
    $("#shopSearch").addEventListener("input", function (event) {
      const value = event.target.value;
      window.clearTimeout(searchTimer);
      searchTimer = window.setTimeout(function () {
        state.query = value.trim();
        state.visible = PAGE_SIZE;
        renderShop(true);
      }, 140);
      $("#shopSearchClear").hidden = value.length === 0;
    });

    $("#shopSearchClear").addEventListener("click", function () {
      state.query = "";
      state.visible = PAGE_SIZE;
      renderShop(true);
      $("#shopSearch").focus();
    });

    $("#sortSelect").addEventListener("change", function (event) {
      state.sort = event.target.value;
      state.visible = PAGE_SIZE;
      renderShop(true);
    });

    $("#resetFilters").addEventListener("click", resetFilters);

    $("#loadMore").addEventListener("click", function () {
      state.visible += PAGE_SIZE;
      renderShop(false);
    });

    const scroller = $("#newScroller");
    const step = function (direction) {
      scroller.scrollBy({ left: direction * scroller.clientWidth * 0.8, behavior: reduced() ? "auto" : "smooth" });
    };
    $("#newPrev").addEventListener("click", function () {
      step(-1);
    });
    $("#newNext").addEventListener("click", function () {
      step(1);
    });
    scroller.addEventListener("scroll", updateScrollerButtons, { passive: true });
    window.addEventListener("resize", updateScrollerButtons, { passive: true });

    $("#clearCart").addEventListener("click", function () {
      if (!Store.count()) return;
      Store.clear();
      toast("Cart cleared", { icon: "trash" });
    });
    $("#checkoutBtn").addEventListener("click", openCheckout);
    document.addEventListener("submit", function (event) {
      if (event.target && event.target.id === "orderForm") {
        event.preventDefault();
        placeOrder(event.target);
      }
    });
    const footerWa = $("#footerWhatsapp");
    if (footerWa) {
      const link = waLink("Hi VYRO, I have a question.");
      if (link) footerWa.setAttribute("href", link);
      else footerWa.hidden = true;
    }
    $("#wishlistAddAll").addEventListener("click", function () {
      const result = Store.addAllWishlistToCart();
      if (result.moved) toast(result.moved + (result.moved === 1 ? " item" : " items") + " moved to cart", { icon: "bag", action: { label: "View cart", run: openCart } });
      if (result.skipped) toast(result.skipped + (result.skipped === 1 ? " item needs" : " items need") + " a size. Choose a size first.", { type: "warn", icon: "info" });
    });

    $("#searchInput").addEventListener("input", renderSearchResults);
    $("#searchForm").addEventListener("submit", function (event) {
      event.preventDefault();
      const value = $("#searchInput").value.trim();
      if (value) applySearchToShop(value);
    });
    $("#searchViewAll").addEventListener("click", function () {
      applySearchToShop($("#searchInput").value);
    });
    $("#searchSuggest").addEventListener("click", function (event) {
      const chip = event.target.closest("[data-suggest]");
      if (!chip) return;
      const input = $("#searchInput");
      input.value = chip.getAttribute("data-suggest");
      renderSearchResults();
      input.focus();
    });

    $("#newsletterForm").addEventListener("submit", function (event) {
      event.preventDefault();
      const input = $("#newsletterEmail");
      const message = $("#newsletterMessage");
      const value = input.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
      message.classList.toggle("is-error", !valid);
      message.classList.toggle("is-success", valid);
      if (!valid) {
        message.textContent = "Please enter a valid email address.";
        input.focus();
        return;
      }
      try {
        localStorage.setItem(NEWSLETTER_KEY, value);
      } catch (error) {
        message.textContent = "You're in. Check your inbox for your 10% code.";
      }
      message.textContent = "You're in. Check your inbox for your 10% code.";
      input.value = "";
      toast("Welcome to the VYRO inner circle", { icon: "check" });
    });

    window.matchMedia("(min-width: 901px)").addEventListener("change", function (event) {
      if (event.matches) setMenu(false);
    });

    Store.subscribe(function () {
      updateBadges();
      renderCart();
      renderWishlist();
      syncWishButtons();
    });
  };

  const setupScrollSpy = function () {
    if (!("IntersectionObserver" in window)) return;
    const links = $$(".main-nav a");
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["categories", "shop", "new-arrivals", "editorial"].forEach(function (id) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  };

  const init = function () {
    applyTheme(currentTheme(), false);
    const stat = $('.hero-stats [data-count="24"]');
    if (stat) {
      stat.setAttribute("data-count", String(Catalog.all.length));
      stat.textContent = Catalog.all.length + "+";
    }
    hydrateIcons(document);
    fillSlots();
    renderCategories();
    renderChipCounts();
    renderShop(true);
    renderNewArrivals();
    renderHeroChips();
    renderCart();
    renderWishlist();
    updateBadges();
    hydrateIcons(document);
    bindEvents();
    setupScrollSpy();
    Motion.init();
    Motion.refreshParallax();
    updateScrollerButtons();
    syncWishButtons();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
