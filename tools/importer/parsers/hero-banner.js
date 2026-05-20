/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-banner
 * Base block: hero
 * Source: https://wknd-trendsetters.site
 * Selector: section.inverse-section .utility-position-relative
 * Generated: 2026-05-20
 *
 * Target structure (from block library):
 *   Row 1: Background image
 *   Row 2: Heading + paragraph + CTA link
 */
export default function parse(element, { document }) {
  // Extract background image
  const bgImage = element.querySelector('img.cover-image, img.utility-overlay, img[class*="cover"]');

  // Extract heading (h2 styled as h1, fallback to h1/h3)
  const heading = element.querySelector('h2.h1-heading, h1, h2, h3, [class*="heading"]');

  // Extract paragraph/subheading
  const description = element.querySelector('p.subheading, p[class*="subheading"], .card-body p, p');

  // Extract CTA link(s)
  const ctaLinks = Array.from(
    element.querySelectorAll('.button-group a.button, .button-group a, a.button, a.inverse-button')
  );

  // Build cells to match block library structure:
  // Row 1: Background image
  // Row 2: Heading + paragraph + CTA link(s)
  const cells = [];

  // Row 1: background image
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: content (heading + paragraph + CTA) in a single cell
  const contentContainer = document.createElement('div');
  if (heading) contentContainer.appendChild(heading);
  if (description) contentContainer.appendChild(description);
  if (ctaLinks.length > 0) {
    ctaLinks.forEach((link) => contentContainer.appendChild(link));
  }
  cells.push([contentContainer]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
