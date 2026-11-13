(function () {
  "use strict";

  window.VYRO_CONFIG = {
    currency: "EGP",
    freeShippingThreshold: 3000,
    shippingFee: 80,
    whatsappNumber: "201050466142",
    storeName: "VYRO"
  };

  window.VYRO_MEDIA = {
    hero: { src: "images/campaign/hero.jpg", label: "Hero visual" },
    campaign: [
      { src: "images/campaign/campaign-01.jpg", label: "Campaign 01" },
      { src: "images/campaign/campaign-02.jpg", label: "Campaign 02" },
      { src: "images/campaign/campaign-03.jpg", label: "Campaign 03" }
    ]
  };

  window.VYRO_HERO_PRODUCTS = ["eye-02", "top-04"];

  const COLOR = {
    onyx: { name: "Onyx", hex: "#0B0D14" },
    chrome: { name: "Chrome", hex: "#C9CED8" },
    ice: { name: "Ice", hex: "#9FD3FF" },
    tortoise: { name: "Tortoise", hex: "#7A4B2A" },
    gold: { name: "Gold", hex: "#D8B15A" },
    rose: { name: "Rose", hex: "#E7A1B0" },
    ruby: { name: "Ruby", hex: "#C21F2D" },
    bone: { name: "Bone", hex: "#EFEBDD" },
    slate: { name: "Slate", hex: "#3A4466" },
    navy: { name: "Midnight", hex: "#14204A" },
    burgundy: { name: "Burgundy", hex: "#6B1426" },
    heather: { name: "Heather", hex: "#B9BCC4" },
    smoke: { name: "Smoke", hex: "#4A4D57" },
    denim: { name: "Denim", hex: "#4F6F94" },
    indigo: { name: "Indigo", hex: "#1B2540" },
    camo: { name: "Camo", hex: "#9EA3AB" },
    tan: { name: "Tan", hex: "#B79569" },
    cocoa: { name: "Cocoa", hex: "#5A4636" },
    volt: { name: "Volt", hex: "#C8FF4D" },
    leopard: { name: "Leopard", hex: "#6A6258" }
  };

  const SIZES = ["S", "M", "L", "XL"];
  const SHOE_SIZES = ["37", "38", "39", "40", "41", "42"];

  const pick = function (list) {
    return list.split(",").map(function (key) {
      return COLOR[key.trim()];
    });
  };

  const categories = [
    {
      slug: "eyewear",
      name: "Eyewear",
      tagline: "Frames with a signal",
      keywords: "sunglasses glasses shades",
      image: "images/eyewear/eyewear-01.jpg"
    },
    {
      slug: "clothing",
      name: "Clothing",
      tagline: "Silhouettes for the next era",
      keywords: "apparel clothes outfit",
      image: "images/clothing/top-01.jpg"
    },
    {
      slug: "watches",
      name: "Watches",
      tagline: "Time, re-engineered",
      keywords: "watch timepiece",
      image: "images/watches/watches-08.jpg"
    },
    {
      slug: "accessories",
      name: "Accessories",
      tagline: "The finishing signal",
      keywords: "accessory jewelry belt scarf necklace bracelet hair",
      image: "images/accessories/accessories-04.jpg"
    },
    {
      slug: "bags",
      name: "Bags",
      tagline: "Carry the signal",
      keywords: "bag handbag tote purse shoulder crossbody",
      image: "images/bags/bags-07.jpg"
    },
    {
      slug: "shoes",
      name: "Shoes",
      tagline: "Step out loud",
      keywords: "shoe sneakers heels clogs slippers footwear",
      image: "images/shoes/shoes-03.jpg"
    }
  ];

  const subLabels = { tops: "Tops", pants: "Pants" };

  const EYEWEAR = [
    ["Volt Shard Rimless", 1450, 0, "onyx,gold", "New", 1, "Razor-cut rimless lenses in a lightning-bolt silhouette. Sharp enough to start a conversation."],
    ["Chrome Flare Wrap", 2350, 0, "chrome,onyx", "New", 1, "A liquid-chrome wrap frame with sculpted flame temples and a star accent."],
    ["Mono Gold Rectangle", 2850, 0, "onyx,gold", "", 1, "Bold black acetate with a polished gold temple emblem. Slim, sharp, unmistakable."],
    ["Starlight Shield", 2650, 3100, "gold,tortoise", "Sale", 0, "A frameless gradient shield with star-capped gold temples. Y2K, rebuilt."],
    ["Link Gold Rectangle", 1950, 0, "gold,onyx", "", 0, "A matte-gold rectangular frame with a chain-link bridge and chunky black temples."],
    ["Needle Oval Black", 690, 0, "onyx", "", 0, "Ultra-slim micro ovals in a thin black metal frame. Minimal, nineties, effortless."],
    ["Honey Cat-Eye Gold", 1750, 0, "gold,tortoise", "", 0, "A gold cat-eye with warm brown lenses and tortoise temples."],
    ["Pearl Glass Rectangle", 3200, 0, "chrome,ice", "New", 1, "Icy blue lenses in a crystal-trimmed silver frame with pearl temple details."],
    ["Dusk Cat-Eye Slim", 890, 0, "gold,tortoise", "", 0, "A slim gold cat-eye with smoky brown lenses. Lightweight and low-key bold."],
    ["Bubblegum Wrap", 1150, 0, "rose", "New", 0, "A pastel-pink sport wrap with mirrored rainbow lenses. Loud in the best way."],
    ["Ruby Needle Oval", 790, 0, "ruby,gold", "", 0, "Tiny gold ovals with ruby-red lenses. Tinted, tiny, iconic."],
    ["Prism Facet Black", 2950, 0, "onyx", "", 1, "A faceted black acetate frame with a sculpted geometric temple."],
    ["Chrome Racer Wrap", 2450, 0, "chrome,onyx", "", 0, "A race-inspired chrome wrap with dark mirrored lenses and grip temple tips."],
    ["Glacier Cat-Eye", 2250, 0, "ice", "", 0, "A pearly pale-blue cat-eye with soft gradient lenses."],
    ["Hex Gold Frame", 1550, 0, "gold,onyx", "", 0, "A hexagonal gold-rim frame with deep black lenses and flat temple tips."],
    ["Sleek Slab Black", 2750, 0, "onyx,gold", "", 1, "A thick, low-profile black slab frame with a gold monogram on the temple."],
    ["Slim Gold Rectangle", 1250, 0, "gold,onyx", "", 0, "A wire-thin gold rectangle with dark lenses. Quietly sharp."],
    ["Oval Gold Metal", 1650, 0, "gold,onyx", "", 0, "A polished oval with wide gold temples and black tips."],
    ["Rose Star Rimless", 1850, 0, "rose,gold", "New", 0, "Rose-tinted rimless lenses with gold star temple charms."],
    ["Link Rimless Silver", 3400, 0, "chrome,onyx", "", 1, "A rimless silver frame with a braided link temple and dark lenses."]
  ];

  const TOPS = [
    ["Will Lead Zip Hoodie", 1850, 0, "onyx", "New", 1, "A cropped boxy zip hoodie with flowing script down both sleeves."],
    ["Burgundy Cropped Biker Jacket", 3650, 4300, "burgundy", "Sale", 1, "A cropped faux-leather jacket with a collar, side pockets and a belted hem."],
    ["Velocity Graphic Hoodie", 1950, 0, "onyx,navy", "", 0, "An oversized hoodie with a superbike back graphic and tribal sleeve prints."],
    ["Arachne Rhinestone Zip Hoodie", 2450, 0, "onyx,bone", "New", 1, "A heavyweight zip hoodie with a rhinestone spider and studded hood lettering."],
    ["Eyes Never Lie Hoodie", 1750, 0, "onyx", "", 0, "A relaxed black hoodie with a cinematic eyes graphic and script type."],
    ["Navy Stripe V-Neck Knit", 1650, 0, "navy,bone", "", 0, "A chunky striped knit with a deep V-neck and a small embroidered mark."],
    ["Wild West Off-Shoulder Tee", 790, 0, "onyx", "New", 0, "A washed black off-shoulder tee with a distressed red western print."],
    ["Midnight Bloom Mesh Top", 1250, 0, "slate", "", 0, "A sheer floral mesh top with flared sleeves, ruching and tie details."],
    ["Cape Drape Ruched Top", 1350, 0, "navy", "", 0, "A draped cape-sleeve top over a ruched fitted base."],
    ["Distressed Knit Vest", 1550, 0, "onyx,bone", "", 1, "A hand-knit style vest with frayed tassels and a collegiate V-neck trim."],
    ["Cloud Off-Shoulder Sweater", 1450, 0, "bone", "New", 0, "A soft cream knit with an asymmetric off-shoulder neckline."],
    ["Star Mesh Halter Top", 1150, 0, "onyx,smoke", "", 0, "A layered mesh halter with lace-up front, star graphics and charm details."],
    ["Gridiron 91 Mesh Jersey", 1350, 0, "navy,bone", "", 0, "An oversized mesh football jersey with contrast sleeves and number prints."],
    ["Vision Calligraphy Hoodie", 1950, 0, "onyx", "", 1, "A boxy black hoodie with an engraved eye illustration and Arabic calligraphy on the back."],
    ["Vintage Motor V-Neck Tee", 690, 0, "burgundy", "", 0, "A fitted V-neck tee with a classic car print, layered over a black base."],
    ["Leopard Shade Zip Hoodie", 1850, 0, "leopard,onyx", "New", 0, "A tonal leopard-print zip hoodie in a heavy, relaxed fit."],
    ["Vision Red Script Hoodie", 1950, 0, "onyx", "", 0, "A black hoodie with a triptych eyes graphic and a red calligraphy overlay."],
    ["Apex Racer Hoodie", 1850, 0, "onyx", "", 0, "An oversized black hoodie with a racing graphic on the back and a streak mark on the chest."],
    ["Cosmos Boxy Tee", 890, 0, "onyx", "New", 0, "A boxy heavyweight tee with a feathered eyes front print and a galaxy back graphic."],
    ["Monochrome Stripe Knit", 1550, 0, "onyx,bone", "", 0, "A thick crewneck knit in bold black and white stripes."]
  ];

  const PANTS = [
    ["Wide Wash Jeans", 1650, 0, "denim", "", 0, "Wide-leg jeans in a faded mid-blue wash with a high rise."],
    ["Heather Wide Sweatpants", 1250, 0, "heather", "", 0, "Wide drawstring sweatpants in soft heather-grey fleece."],
    ["Calligraphy Burgundy Set", 3450, 0, "burgundy", "New", 1, "A matching hoodie and wide-leg pants set with oversized script embroidery."],
    ["Essential Black Zip Set", 2950, 0, "onyx", "", 1, "A zip hoodie and wide sweatpants set in heavyweight black fleece."],
    ["Drift Black Sweatpants", 1150, 0, "onyx", "", 0, "Extra-wide black sweatpants with a drawstring waist and side pockets."],
    ["Faded Balloon Sweatpants", 1450, 0, "onyx,smoke", "", 0, "Balloon-fit sweatpants with a washed finish and a small embroidered mark."],
    ["Mono Plaid Pants", 950, 0, "onyx,bone", "", 0, "Wide-leg plaid pants in black and white with an elastic waist."],
    ["Heather Zip Set", 2950, 0, "heather", "New", 0, "A cropped zip hoodie and wide-leg sweatpants set in heather grey."],
    ["Wreck Graphic Sweatpants", 1550, 0, "smoke", "", 0, "Washed charcoal sweatpants with a printed text strap and a vintage graphic."],
    ["Prep Ribbon Denim", 1850, 0, "denim,burgundy", "New", 1, "Baggy jeans with a striped ribbon belt, charm details and a worn finish."],
    ["Raw Indigo Wide Jeans", 1750, 0, "indigo", "", 0, "Rigid raw-indigo denim with a relaxed wide leg and contrast stitching."],
    ["Chain Black Wash Jeans", 1850, 0, "onyx,smoke", "", 0, "Washed black baggy jeans with a wide belt and a silver key chain."],
    ["Silver Wash Wide Jeans", 1650, 0, "heather,camo", "", 0, "Ultra-wide jeans in a bleached silver-grey wash."],
    ["Urban Camo Cargo", 2150, 0, "camo", "", 1, "Oversized barrel-leg cargos in grey camo with big flap pockets."],
    ["Seam Balloon Sweatpants", 1350, 0, "onyx", "", 0, "Black balloon sweatpants with sculpted front seams and elastic cuffs."],
    ["Smoke Acid Wash Jeans", 1950, 0, "smoke,onyx", "New", 0, "Wide-leg jeans in a smoky acid wash with a studded belt."],
    ["Tan Plaid Pants", 950, 0, "tan,cocoa", "", 0, "Wide-leg plaid pants in warm tan and brown with an elastic waist."],
    ["Cocoa Track Pants", 1950, 0, "cocoa,tan", "", 0, "Cocoa balloon track pants with a layered leopard waistband and toggle hems."],
    ["Crimson Plaid Pants", 950, 0, "ruby,onyx", "", 0, "Wide-leg pants in a red and black plaid with a drawstring waist."],
    ["Ombre Balloon Sweatpants", 1450, 0, "heather,smoke", "", 0, "Balloon sweatpants in grey with a dark ombre edge and a small emblem."]
  ];

  const WATCHES = [
    ["Star Orbit Bracelet Watch", 1850, 0, "chrome,navy", "New", 1, "A tiny midnight-blue dial on a silver star-link bracelet. Part watch, part jewelry."],
    ["Steel Date Classic", 2150, 0, "chrome", "", 0, "A clean silver dial with a date window on a polished steel bracelet."],
    ["Blush Crystal Square", 2450, 0, "rose,chrome", "New", 1, "A blush-pink square dial framed in crystals on a silver link bracelet."],
    ["Silver Date Automatic", 2350, 0, "chrome", "", 0, "A sunray silver dial with a date window and a five-link steel bracelet."],
    ["Oval Bangle Silver", 1650, 0, "chrome", "", 0, "A slim oval face on a sculpted open silver bangle."],
    ["Crystal Bezel Roman", 3200, 3900, "chrome", "Sale", 1, "A crystal-set bezel and bracelet with a Roman numeral silver dial."],
    ["Rose Jubilee Classic", 2950, 0, "rose,chrome", "", 0, "A rose-pink dial on a jubilee-style steel bracelet, gift-boxed."],
    ["Gold Serpent Coil", 3650, 0, "gold", "New", 1, "A gold coiled serpent watch with a crystal-set case that wraps the wrist."],
    ["Vintage Leather Gold", 1950, 0, "gold,cocoa", "", 0, "A gold case with a cream Roman dial on a dark croc-embossed leather strap."],
    ["Two-Tone Serpent Coil", 3850, 0, "gold,chrome", "", 0, "A two-tone steel and rose-gold coil watch with a teardrop crystal-trimmed case."]
  ];

  const ACCESSORIES = [
    ["Signature Buckle Belt", 1250, 0, "onyx,gold", "New", 1, "A slim black leather belt with a bold gold monogram buckle."],
    ["Clover Bracelet Stack", 1150, 0, "gold,bone", "", 0, "A gold-tone stack with clover charms and a nail bracelet, packed on a pillow."],
    ["Leopard Calf Belt", 950, 0, "leopard,gold", "", 0, "A leopard-print belt with a brushed gold buckle."],
    ["Leopard Silk Scarf", 790, 0, "leopard,tan", "New", 1, "A square silky scarf in a bold leopard print. Wear it on the neck, hair or bag."],
    ["Gold Charm Bangle Stack", 1350, 0, "gold,rose", "", 0, "Stackable gold bangles with pink clover charms."],
    ["Nail Bracelet Gift Set", 1450, 0, "gold", "", 1, "Gold nail, bangle and crystal bracelets arranged in a gift box."],
    ["Oval Buckle Belt", 1150, 0, "onyx,chrome", "", 0, "A wide black belt with an oversized silver oval buckle."],
    ["Flower Claw Clips", 290, 0, "tortoise,onyx", "New", 0, "A set of glossy flower hair claws in amber, brown and black."],
    ["Dagger & Heart Necklaces", 690, 0, "chrome,ruby", "", 0, "A silver dagger chain and a ruby-heart necklace. Sold as a pair."],
    ["Sun Pendant Necklace", 590, 0, "gold", "", 0, "A fine gold chain with a sculpted sun pendant."],
    ["North Star Necklace", 650, 0, "gold,chrome", "New", 0, "A gold link chain with a crystal North Star pendant."],
    ["Pink Gift Bracelet Box", 1350, 0, "gold,rose", "", 0, "A boxed bracelet set with pink clovers, a nail bangle and a crystal tennis bracelet."],
    ["Check Wool Scarf", 1450, 0, "bone,tan", "", 1, "A soft cream and beige check scarf with fringed edges."],
    ["Spiral Hair Ties", 190, 0, "ice", "New", 0, "A pack of blue and clear spiral hair ties that never leave a crease."],
    ["Reversible Monogram Belt", 1250, 0, "cocoa,gold", "", 0, "A reversible brown belt with a polished gold monogram buckle."],
    ["Pearl & Star Hair Clips", 350, 0, "gold,bone", "", 0, "A mixed set of pearl and gold star hair clips."],
    ["Pearl Shell Necklace", 690, 0, "chrome", "", 0, "A silver chain with a tiny shell holding a pearl."],
    ["Burgundy Wool Scarf", 1250, 0, "burgundy", "New", 0, "A deep burgundy wool scarf with long fringe."],
    ["Star Snap Clips", 220, 0, "onyx", "", 0, "A set of black enamel star snap clips."],
    ["Red Clover Bracelet Stack", 1450, 0, "ruby,gold", "", 0, "A gold nail bangle and red clover bracelets on a cushioned stand."]
  ];

  const SHOES = [
    ["Grey Court High-Top", 3200, 0, "heather,bone", "New", 1, "A grey and white high-top with black leather overlays. A street classic."],
    ["Suede Terrace Sneaker", 2650, 0, "heather,bone", "", 0, "A soft grey suede sneaker with oversized white laces and a gum sole."],
    ["Chicago Red High-Top", 3450, 0, "ruby,onyx", "", 1, "A red, black and white high-top with bold colour blocking."],
    ["Suede Buckle Clog", 2450, 0, "onyx", "New", 0, "A black suede clog with silver buckle hardware and a cushioned footbed."],
    ["Panda High-Top", 3250, 0, "onyx,bone", "", 0, "A black and white high-top with a clean, graphic contrast."],
    ["Shearling Platform Slipper", 1850, 0, "tan,bone", "", 0, "A fluffy shearling slipper on a chunky platform sole."],
    ["Suede Cork Clog", 1650, 0, "tan,cocoa", "", 0, "A sand suede clog with a cork footbed and an adjustable buckle."],
    ["Black Suede Skate", 2450, 0, "onyx", "New", 1, "A black suede skate sneaker with tonal stripes and chunky laces."],
    ["Lace Mary Jane Flat", 1750, 0, "onyx", "", 0, "A delicate black lace flat with a cross-strap and buckle."],
    ["Racer Suede Sneaker", 2850, 0, "onyx,bone", "", 0, "A low-profile black suede racer with a contrast white stripe."],
    ["Gold Heel Stiletto", 3650, 4200, "onyx,gold", "Sale", 0, "A patent black stiletto sandal with a sculpted gold heel."],
    ["Pink Lace Skate", 2650, 0, "onyx,rose", "New", 0, "A black skate sneaker with oversized satin pink laces."],
    ["Retro High-Top Cement", 3450, 0, "bone,navy", "", 1, "A white, grey and navy retro high-top with visible air cushioning."],
    ["Wine Bow Slingback", 1950, 0, "burgundy", "", 0, "A wine patent slingback with a pointed toe and a bow."],
    ["Cross-Strap Ballet Sneaker", 2650, 0, "onyx,bone", "New", 0, "A ballet-flat sneaker hybrid with criss-cross straps and a suede finish."]
  ];

  const BAGS = [
    ["Double Handle Shoulder Bag", 1950, 0, "onyx", "", 0, "A sleek black shoulder bag with twin curved handles and a buckle detail."],
    ["Cocoa Flap Baguette", 2250, 0, "cocoa,gold", "New", 1, "A compact cocoa baguette with a gold turn-lock and a long strap."],
    ["Oval Mono Shoulder Bag", 2950, 0, "onyx,chrome", "", 1, "A black glossy shoulder bag with an oversized oval front emblem."],
    ["Cloud Oval Shoulder Bag", 2950, 0, "bone", "New", 0, "A white glossy shoulder bag with an oversized oval front emblem."],
    ["Midnight Fold Mini", 2450, 0, "navy,cocoa", "", 0, "A foldable navy mini with leather trim, a top handle and a crossbody strap."],
    ["Tan Slouch Tote", 3450, 0, "tan,cocoa", "", 1, "A slouchy tan leather tote with a roomy soft shape."],
    ["Quilted Top-Handle Mini", 3850, 4500, "burgundy,gold", "Sale", 0, "A burgundy quilted mini with a top handle, gold chain and logo clasp."],
    ["Cherry Patent Shoulder Bag", 2250, 0, "burgundy", "New", 0, "A glossy cherry shoulder bag with long handles and a charm."],
    ["Linen Knot Tote", 1850, 0, "bone,cocoa", "", 0, "A cream textured tote with knotted leather handles and a charm."],
    ["Saddle Mini Bag", 3250, 0, "slate,gold", "", 0, "A monogram saddle-shape mini with a gold initial charm."]
  ];

  const products = [];
  let counter = 0;

  const build = function (rows, config) {
    rows.forEach(function (row, index) {
      counter += 1;
      const number = String(index + 1).padStart(2, "0");
      const isNew = row[4] === "New";
      const day = String(Math.max(1, 30 - ((counter * 3) % 28))).padStart(2, "0");
      const added = isNew ? "2026-10-" + String(Math.max(10, 31 - ((counter * 2) % 21))).padStart(2, "0") : "2026-0" + (4 + (counter % 6)) + "-" + day;
      const subLabel = config.sub ? subLabels[config.sub] : "";
      products.push({
        id: config.prefix + "-" + number,
        name: row[0],
        category: config.category,
        sub: config.sub || "",
        subLabel: subLabel,
        price: row[1],
        oldPrice: row[2] || null,
        image: "images/" + config.category + "/" + config.file + "-" + number + ".jpg",
        tag: row[4],
        isNew: isNew,
        featured: row[5] === 1,
        added: added,
        colors: pick(row[3]),
        sizes: config.sizes === true ? SIZES : (Array.isArray(config.sizes) ? config.sizes : null),
        desc: row[6],
        details: config.details
      });
    });
  };

  build(EYEWEAR, {
    prefix: "eye",
    category: "eyewear",
    file: "eyewear",
    sizes: false,
    details: ["UV400 protective lenses", "Includes protective case and cloth", "Lightweight, comfortable fit"]
  });
  build(TOPS, {
    prefix: "top",
    category: "clothing",
    sub: "tops",
    file: "top",
    sizes: true,
    details: ["Premium soft-touch fabric", "Relaxed modern fit, true to size", "Machine wash cold, do not tumble dry"]
  });
  build(PANTS, {
    prefix: "pnt",
    category: "clothing",
    sub: "pants",
    file: "pants",
    sizes: true,
    details: ["Mid to high rise with a relaxed wide leg", "Durable fabric with a comfortable feel", "Machine wash cold, wash inside out"]
  });
  build(WATCHES, {
    prefix: "wat",
    category: "watches",
    file: "watches",
    sizes: false,
    details: ["Water resistant", "Scratch-resistant crystal", "Includes gift box and warranty card"]
  });
  build(ACCESSORIES, {
    prefix: "acc",
    category: "accessories",
    file: "accessories",
    sizes: false,
    details: ["Carefully selected materials", "Made to pair with every VYRO piece", "Gift-ready packaging"]
  });
  build(BAGS, {
    prefix: "bag",
    category: "bags",
    file: "bags",
    sizes: false,
    details: ["Soft-touch lining with an inner pocket", "Secure closure", "Dust bag included"]
  });
  build(SHOES, {
    prefix: "shoe",
    category: "shoes",
    file: "shoes",
    sizes: SHOE_SIZES,
    details: ["Cushioned comfortable sole", "True to size, size up for a relaxed fit", "Includes original box"]
  });

  products.forEach(function (product, index) {
    product.order = index;
  });

  const productMap = {};
  products.forEach(function (product) {
    productMap[product.id] = product;
  });

  const categoryMap = {};
  categories.forEach(function (category) {
    categoryMap[category.slug] = category;
  });

  window.VyroCatalog = {
    all: products,
    categories: categories,
    subLabels: subLabels,
    byId: function (id) {
      return productMap[id] || null;
    },
    category: function (slug) {
      return categoryMap[slug] || null;
    },
    categoryName: function (slug) {
      return categoryMap[slug] ? categoryMap[slug].name : "";
    },
    formatPrice: function (value) {
      return window.VYRO_CONFIG.currency + " " + Math.round(value).toLocaleString("en-US");
    }
  };
})();
