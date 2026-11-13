(function () {
  "use strict";

  const Catalog = window.VyroCatalog;
  const Config = window.VYRO_CONFIG;
  const CART_KEY = "vyro_cart";
  const WISH_KEY = "vyro_wishlist";
  const MAX_QTY = 99;
  const listeners = new Set();

  const readStorage = function (key) {
    try {
      const raw = localStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  };

  const writeStorage = function (key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      return;
    }
  };

  const makeKey = function (id, color, size) {
    return [id, color || "", size || ""].join("|");
  };

  const sanitizeCart = function (raw) {
    const seen = {};
    const clean = [];
    raw.forEach(function (entry) {
      if (!entry || !Catalog.byId(entry.id)) return;
      const qty = Math.floor(Number(entry.qty));
      if (!Number.isFinite(qty) || qty < 1) return;
      const key = makeKey(entry.id, entry.color, entry.size);
      if (seen[key]) {
        seen[key].qty = Math.min(MAX_QTY, seen[key].qty + qty);
        return;
      }
      const item = {
        key: key,
        id: entry.id,
        qty: Math.min(MAX_QTY, qty),
        color: entry.color || null,
        size: entry.size || null
      };
      seen[key] = item;
      clean.push(item);
    });
    return clean;
  };

  const sanitizeWishlist = function (raw) {
    const clean = [];
    raw.forEach(function (id) {
      if (typeof id === "string" && Catalog.byId(id) && clean.indexOf(id) === -1) clean.push(id);
    });
    return clean;
  };

  let cart = sanitizeCart(readStorage(CART_KEY));
  let wishlist = sanitizeWishlist(readStorage(WISH_KEY));

  const emit = function (type, detail) {
    listeners.forEach(function (listener) {
      listener(type, detail || {});
    });
  };

  const persistCart = function () {
    writeStorage(CART_KEY, cart);
  };

  const persistWishlist = function () {
    writeStorage(WISH_KEY, wishlist);
  };

  const findItem = function (key) {
    return cart.find(function (item) {
      return item.key === key;
    });
  };

  const Store = {
    subscribe: function (listener) {
      listeners.add(listener);
      return function () {
        listeners.delete(listener);
      };
    },

    defaultVariant: function (product) {
      const color = product.colors && product.colors.length ? product.colors[0].name : null;
      let size = null;
      if (product.sizes && product.sizes.length) {
        size = null;
      }
      return { color: color, size: size };
    },

    add: function (id, options) {
      const product = Catalog.byId(id);
      if (!product) return null;
      const settings = options || {};
      const variant = Store.defaultVariant(product);
      const color = settings.color || variant.color;
      if (product.sizes && !settings.size) return null;
      const size = product.sizes ? settings.size : null;
      const qty = Math.max(1, Math.floor(settings.qty || 1));
      const key = makeKey(id, color, size);
      const existing = findItem(key);
      if (existing) {
        existing.qty = Math.min(MAX_QTY, existing.qty + qty);
      } else {
        cart.push({ key: key, id: id, qty: Math.min(MAX_QTY, qty), color: color, size: size });
      }
      persistCart();
      emit("cart-add", { id: id, key: key });
      return key;
    },

    setQty: function (key, qty) {
      const item = findItem(key);
      if (!item) return;
      item.qty = Math.max(1, Math.min(MAX_QTY, Math.floor(qty)));
      persistCart();
      emit("cart-update", { key: key });
    },

    increment: function (key) {
      const item = findItem(key);
      if (item) Store.setQty(key, item.qty + 1);
    },

    decrement: function (key) {
      const item = findItem(key);
      if (item && item.qty > 1) Store.setQty(key, item.qty - 1);
    },

    remove: function (key) {
      const before = cart.length;
      cart = cart.filter(function (item) {
        return item.key !== key;
      });
      if (cart.length === before) return;
      persistCart();
      emit("cart-remove", { key: key });
    },

    clear: function () {
      cart = [];
      persistCart();
      emit("cart-clear");
    },

    getItems: function () {
      return cart.map(function (item) {
        const product = Catalog.byId(item.id);
        return Object.assign({}, item, { product: product, lineTotal: product.price * item.qty });
      });
    },

    count: function () {
      return cart.reduce(function (sum, item) {
        return sum + item.qty;
      }, 0);
    },

    subtotal: function () {
      return cart.reduce(function (sum, item) {
        return sum + Catalog.byId(item.id).price * item.qty;
      }, 0);
    },

    shipping: function () {
      const subtotal = Store.subtotal();
      if (subtotal === 0 || subtotal >= Config.freeShippingThreshold) return 0;
      return Config.shippingFee;
    },

    total: function () {
      return Store.subtotal() + Store.shipping();
    },

    freeShippingRemaining: function () {
      return Math.max(0, Config.freeShippingThreshold - Store.subtotal());
    },

    hasWishlist: function (id) {
      return wishlist.indexOf(id) !== -1;
    },

    toggleWishlist: function (id) {
      if (!Catalog.byId(id)) return false;
      const index = wishlist.indexOf(id);
      let active;
      if (index === -1) {
        wishlist.push(id);
        active = true;
      } else {
        wishlist.splice(index, 1);
        active = false;
      }
      persistWishlist();
      emit(active ? "wish-add" : "wish-remove", { id: id });
      return active;
    },

    removeWishlist: function (id) {
      const index = wishlist.indexOf(id);
      if (index === -1) return;
      wishlist.splice(index, 1);
      persistWishlist();
      emit("wish-remove", { id: id });
    },

    getWishlist: function () {
      return wishlist.map(function (id) {
        return Catalog.byId(id);
      });
    },

    wishlistCount: function () {
      return wishlist.length;
    },

    addWishlistToCart: function (id) {
      const product = Catalog.byId(id);
      if (!product || !Store.hasWishlist(id) || product.sizes) return false;
      Store.add(id);
      Store.removeWishlist(id);
      return true;
    },

    addAllWishlistToCart: function () {
      const ids = wishlist.slice();
      let moved = 0;
      ids.forEach(function (id) {
        const product = Catalog.byId(id);
        if (product && !product.sizes) {
          Store.add(id);
          wishlist = wishlist.filter(function (entry) {
            return entry !== id;
          });
          moved += 1;
        }
      });
      persistWishlist();
      emit("wish-clear");
      return { moved: moved, skipped: ids.length - moved };
    }
  };

  window.addEventListener("storage", function (event) {
    if (event.key === CART_KEY) {
      cart = sanitizeCart(readStorage(CART_KEY));
      emit("sync");
    } else if (event.key === WISH_KEY) {
      wishlist = sanitizeWishlist(readStorage(WISH_KEY));
      emit("sync");
    }
  });

  window.VyroStore = Store;
})();
