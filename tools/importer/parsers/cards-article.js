/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-article
 * Base block: cards
 * Source selector: .secondary-section .grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-md
 * Generated: 2026-05-20
 *
 * Source structure: Grid of article cards, each card is an <a.article-card> containing:
 *   - div.article-card-image > img.cover-image
 *   - div.article-card-body > div.article-card-meta > span.tag + span.paragraph-sm (date)
 *   - div.article-card-body > h3.h4-heading (title)
 *
 * Target structure (per card row): Image, Tag + Date, Heading (linked)
 */
export default function parse(element, { document }) {
  // Find all article cards within the grid
  const cards = element.querySelectorAll('a.article-card, a.card-link');

  const cells = [];

  cards.forEach((card) => {
    // Extract image
    const img = card.querySelector('.article-card-image img, img.cover-image');

    // Extract tag and date from meta section
    const tag = card.querySelector('.article-card-meta .tag, .article-card-meta span:first-child');
    const date = card.querySelector('.article-card-meta .paragraph-sm, .article-card-meta span:nth-child(2)');

    // Extract heading
    const heading = card.querySelector('h3, .h4-heading, .article-card-body h3');

    // Build cell content for this card
    const cardContent = [];

    // Image
    if (img) {
      cardContent.push(img);
    }

    // Tag and Date as a paragraph
    if (tag || date) {
      const metaP = document.createElement('p');
      if (tag) metaP.append(tag.textContent);
      if (tag && date) metaP.append(', ');
      if (date) metaP.append(date.textContent);
      cardContent.push(metaP);
    }

    // Heading wrapped in a link to preserve the card URL
    if (heading) {
      const link = document.createElement('a');
      link.href = card.href || card.getAttribute('href') || '';
      link.textContent = heading.textContent;
      const h3 = document.createElement('h3');
      h3.append(link);
      cardContent.push(h3);
    }

    // Each card becomes one row with a single cell containing all content
    if (cardContent.length > 0) {
      cells.push([cardContent]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
