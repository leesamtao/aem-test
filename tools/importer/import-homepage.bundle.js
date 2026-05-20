/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/columns-hero.js
  function parse(element, { document }) {
    const heading = element.querySelector('h1.h1-heading, h1, h2, [class*="heading"]');
    const description = element.querySelector('p.subheading, p[class*="subheading"], p');
    const ctaLinks = Array.from(element.querySelectorAll(".button-group a.button, a.button"));
    const textCell = [];
    if (heading) textCell.push(heading);
    if (description) textCell.push(description);
    if (ctaLinks.length > 0) textCell.push(...ctaLinks);
    const images = Array.from(element.querySelectorAll(".grid-layout img.cover-image, .grid-layout img"));
    const imageCell = [];
    if (images.length > 0) {
      imageCell.push(...images);
    }
    const cells = [
      [textCell, imageCell]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-article.js
  function parse2(element, { document }) {
    const image = element.querySelector(":scope > div:first-child img, :scope > div:first-child picture");
    const contentDiv = element.querySelector(":scope > div:nth-child(2)");
    const contentCell = [];
    if (contentDiv) {
      const breadcrumbs = contentDiv.querySelector(".breadcrumbs");
      if (breadcrumbs) {
        contentCell.push(breadcrumbs);
      }
      const heading = contentDiv.querySelector('h1, h2, h3, .h2-heading, [class*="heading"]');
      if (heading) {
        contentCell.push(heading);
      }
      const metaDivs = contentDiv.querySelectorAll(".flex-horizontal");
      metaDivs.forEach((metaDiv) => {
        contentCell.push(metaDiv);
      });
      if (contentCell.length === 0) {
        contentCell.push(contentDiv);
      }
    }
    const imageCell = image ? [image] : [];
    const cells = [
      [imageCell, contentCell]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse3(element, { document }) {
    const imageContainers = element.querySelectorAll('.utility-aspect-1x1, [class*="aspect"]');
    const cells = [];
    imageContainers.forEach((container) => {
      const img = container.querySelector("img");
      if (img) {
        cells.push([img]);
      }
    });
    if (cells.length === 0) {
      const images = element.querySelectorAll("img");
      images.forEach((img) => {
        cells.push([img]);
      });
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse4(element, { document }) {
    const tabPanes = element.querySelectorAll(".tab-pane");
    const tabButtons = element.querySelectorAll(".tab-menu-link, .tab-menu button");
    const cells = [];
    tabPanes.forEach((pane, index) => {
      var _a, _b, _c;
      let tabLabel = "";
      const button = tabButtons[index];
      if (button) {
        const nameEl = button.querySelector(".paragraph-sm strong, strong");
        tabLabel = nameEl ? nameEl.textContent.trim() : "";
      }
      if (!tabLabel) {
        const paneName = pane.querySelector(".paragraph-xl strong, strong");
        tabLabel = paneName ? paneName.textContent.trim() : `Tab ${index + 1}`;
      }
      const contentContainer = document.createElement("div");
      const img = pane.querySelector("img.cover-image, img");
      if (img) {
        const imgEl = document.createElement("img");
        imgEl.src = img.src || img.getAttribute("src");
        imgEl.alt = img.alt || img.getAttribute("alt") || "";
        contentContainer.appendChild(imgEl);
      }
      const personName = pane.querySelector(".paragraph-xl strong, .grid-layout strong");
      if (personName) {
        const nameP = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = personName.textContent.trim();
        nameP.appendChild(strong);
        contentContainer.appendChild(nameP);
      }
      const nameContainer = pane.querySelector(".paragraph-xl.utility-margin-bottom-0, .paragraph-xl strong");
      if (nameContainer) {
        const nameParent = nameContainer.closest ? nameContainer.closest("div") : nameContainer.parentElement;
        if (nameParent) {
          const roleEl = nameParent.nextElementSibling || ((_a = nameParent.parentElement) == null ? void 0 : _a.querySelector("div:not(.paragraph-xl)"));
          const roleDiv = (_c = (_b = nameParent.closest("div")) == null ? void 0 : _b.parentElement) == null ? void 0 : _c.querySelector("div:last-child:not(.paragraph-xl)");
          const infoBlock = pane.querySelector(".grid-layout > div:nth-child(2) > div:first-child");
          if (infoBlock) {
            const roleDivEl = infoBlock.querySelector("div:not(.paragraph-xl):not(:has(strong))");
            if (roleDivEl && roleDivEl.textContent.trim()) {
              const roleP = document.createElement("p");
              roleP.textContent = roleDivEl.textContent.trim();
              contentContainer.appendChild(roleP);
            }
          }
        }
      }
      const quote = pane.querySelector("p.paragraph-xl");
      if (quote) {
        const quoteP = document.createElement("p");
        quoteP.textContent = quote.textContent.trim();
        contentContainer.appendChild(quoteP);
      }
      cells.push([tabLabel, contentContainer]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document }) {
    const cards = element.querySelectorAll("a.article-card, a.card-link");
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".article-card-image img, img.cover-image");
      const tag = card.querySelector(".article-card-meta .tag, .article-card-meta span:first-child");
      const date = card.querySelector(".article-card-meta .paragraph-sm, .article-card-meta span:nth-child(2)");
      const heading = card.querySelector("h3, .h4-heading, .article-card-body h3");
      const cardContent = [];
      if (img) {
        cardContent.push(img);
      }
      if (tag || date) {
        const metaP = document.createElement("p");
        if (tag) metaP.append(tag.textContent);
        if (tag && date) metaP.append(", ");
        if (date) metaP.append(date.textContent);
        cardContent.push(metaP);
      }
      if (heading) {
        const link = document.createElement("a");
        link.href = card.href || card.getAttribute("href") || "";
        link.textContent = heading.textContent;
        const h3 = document.createElement("h3");
        h3.append(link);
        cardContent.push(h3);
      }
      if (cardContent.length > 0) {
        cells.push([cardContent]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document }) {
    const faqItems = element.querySelectorAll("details.faq-item, details");
    const cells = [];
    faqItems.forEach((item) => {
      const questionSpan = item.querySelector("summary span, summary");
      const questionText = questionSpan ? questionSpan.textContent.trim() : "";
      const answerContainer = item.querySelector(".faq-answer, summary ~ div");
      const answerParagraph = answerContainer ? answerContainer.querySelector("p") : null;
      if (questionText) {
        const questionCell = document.createTextNode(questionText);
        const answerCell = answerParagraph ? answerParagraph.cloneNode(true) : document.createTextNode(answerContainer ? answerContainer.textContent.trim() : "");
        cells.push([questionCell, answerCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse7(element, { document }) {
    const bgImage = element.querySelector('img.cover-image, img.utility-overlay, img[class*="cover"]');
    const heading = element.querySelector('h2.h1-heading, h1, h2, h3, [class*="heading"]');
    const description = element.querySelector('p.subheading, p[class*="subheading"], .card-body p, p');
    const ctaLinks = Array.from(
      element.querySelectorAll(".button-group a.button, .button-group a, a.button, a.inverse-button")
    );
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentContainer = document.createElement("div");
    if (heading) contentContainer.appendChild(heading);
    if (description) contentContainer.appendChild(description);
    if (ctaLinks.length > 0) {
      ctaLinks.forEach((link) => contentContainer.appendChild(link));
    }
    cells.push([contentContainer]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, ["a.skip-link"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [".navbar", "footer.footer"]);
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document } = payload;
      const sections = payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "columns-hero": parse,
    "columns-article": parse2,
    "cards-gallery": parse3,
    "tabs-testimonial": parse4,
    "cards-article": parse5,
    "accordion-faq": parse6,
    "hero-banner": parse7
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Homepage template for WKND Trendsetters site",
    urls: [
      "https://wknd-trendsetters.site"
    ],
    blocks: [
      {
        name: "columns-hero",
        instances: ["header.section.secondary-section .grid-layout.tablet-1-column.grid-gap-xxl"]
      },
      {
        name: "columns-article",
        instances: ["main > section:nth-child(2) .grid-layout.tablet-1-column.grid-gap-lg"]
      },
      {
        name: "cards-gallery",
        instances: [".secondary-section .grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-sm"]
      },
      {
        name: "tabs-testimonial",
        instances: [".tabs-wrapper"]
      },
      {
        name: "cards-article",
        instances: [".secondary-section .grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-md"]
      },
      {
        name: "accordion-faq",
        instances: [".faq-list"]
      },
      {
        name: "hero-banner",
        instances: ["section.inverse-section .utility-position-relative"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "header.section.secondary-section",
        style: "secondary",
        blocks: ["columns-hero"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Article Feature",
        selector: "main > section:nth-child(2)",
        style: null,
        blocks: ["columns-article"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Photo Gallery",
        selector: "main > section:nth-child(3)",
        style: "secondary",
        blocks: ["cards-gallery"],
        defaultContent: [".utility-text-align-center .h2-heading", ".utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-4",
        name: "Testimonials",
        selector: "main > section:nth-child(4)",
        style: null,
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Latest Articles",
        selector: "main > section:nth-child(5)",
        style: "secondary",
        blocks: ["cards-article"],
        defaultContent: [".utility-text-align-center .h2-heading", ".utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-6",
        name: "FAQ",
        selector: "main > section:nth-child(6)",
        style: null,
        blocks: ["accordion-faq"],
        defaultContent: [".grid-layout.tablet-1-column.grid-gap-xxl > div:first-child .h2-heading", ".grid-layout.tablet-1-column.grid-gap-xxl > div:first-child .subheading"]
      },
      {
        id: "section-7",
        name: "CTA Banner",
        selector: "section.inverse-section",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
