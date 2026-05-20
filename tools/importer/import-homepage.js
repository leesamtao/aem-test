/* eslint-disable */
/* global WebImporter */

import columnsHeroParser from './parsers/columns-hero.js';
import columnsArticleParser from './parsers/columns-article.js';
import cardsGalleryParser from './parsers/cards-gallery.js';
import tabsTestimonialParser from './parsers/tabs-testimonial.js';
import cardsArticleParser from './parsers/cards-article.js';
import accordionFaqParser from './parsers/accordion-faq.js';
import heroBannerParser from './parsers/hero-banner.js';

import cleanupTransformer from './transformers/wknd-trendsetters-cleanup.js';
import sectionsTransformer from './transformers/wknd-trendsetters-sections.js';

const parsers = {
  'columns-hero': columnsHeroParser,
  'columns-article': columnsArticleParser,
  'cards-gallery': cardsGalleryParser,
  'tabs-testimonial': tabsTestimonialParser,
  'cards-article': cardsArticleParser,
  'accordion-faq': accordionFaqParser,
  'hero-banner': heroBannerParser,
};

const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Homepage template for WKND Trendsetters site',
  urls: [
    'https://wknd-trendsetters.site'
  ],
  blocks: [
    {
      name: 'columns-hero',
      instances: ['header.section.secondary-section .grid-layout.tablet-1-column.grid-gap-xxl']
    },
    {
      name: 'columns-article',
      instances: ['main > section:nth-child(2) .grid-layout.tablet-1-column.grid-gap-lg']
    },
    {
      name: 'cards-gallery',
      instances: ['.secondary-section .grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-sm']
    },
    {
      name: 'tabs-testimonial',
      instances: ['.tabs-wrapper']
    },
    {
      name: 'cards-article',
      instances: ['.secondary-section .grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-md']
    },
    {
      name: 'accordion-faq',
      instances: ['.faq-list']
    },
    {
      name: 'hero-banner',
      instances: ['section.inverse-section .utility-position-relative']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: 'header.section.secondary-section',
      style: 'secondary',
      blocks: ['columns-hero'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'Article Feature',
      selector: 'main > section:nth-child(2)',
      style: null,
      blocks: ['columns-article'],
      defaultContent: []
    },
    {
      id: 'section-3',
      name: 'Photo Gallery',
      selector: 'main > section:nth-child(3)',
      style: 'secondary',
      blocks: ['cards-gallery'],
      defaultContent: ['.utility-text-align-center .h2-heading', '.utility-text-align-center .paragraph-lg']
    },
    {
      id: 'section-4',
      name: 'Testimonials',
      selector: 'main > section:nth-child(4)',
      style: null,
      blocks: ['tabs-testimonial'],
      defaultContent: []
    },
    {
      id: 'section-5',
      name: 'Latest Articles',
      selector: 'main > section:nth-child(5)',
      style: 'secondary',
      blocks: ['cards-article'],
      defaultContent: ['.utility-text-align-center .h2-heading', '.utility-text-align-center .paragraph-lg']
    },
    {
      id: 'section-6',
      name: 'FAQ',
      selector: 'main > section:nth-child(6)',
      style: null,
      blocks: ['accordion-faq'],
      defaultContent: ['.grid-layout.tablet-1-column.grid-gap-xxl > div:first-child .h2-heading', '.grid-layout.tablet-1-column.grid-gap-xxl > div:first-child .subheading']
    },
    {
      id: 'section-7',
      name: 'CTA Banner',
      selector: 'section.inverse-section',
      style: null,
      blocks: ['hero-banner'],
      defaultContent: []
    }
  ]
};

const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE
  };

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

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

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

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      }
    }];
  }
};
