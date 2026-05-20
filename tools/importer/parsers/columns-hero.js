/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-hero
 * Base block: columns
 * Source: https://wknd-trendsetters.site
 * Selector: header.section.secondary-section .grid-layout.tablet-1-column.grid-gap-xxl
 * Structure: Two-column layout - text/CTAs on left, stacked images on right
 * Generated: 2026-05-20
 */
export default function parse(element, { document }) {
  // Column 1: Text content (heading, paragraph, CTA buttons)
  const heading = element.querySelector('h1.h1-heading, h1, h2, [class*="heading"]');
  const description = element.querySelector('p.subheading, p[class*="subheading"], p');
  const ctaLinks = Array.from(element.querySelectorAll('.button-group a.button, a.button'));

  const textCell = [];
  if (heading) textCell.push(heading);
  if (description) textCell.push(description);
  if (ctaLinks.length > 0) textCell.push(...ctaLinks);

  // Column 2: Stacked images
  const images = Array.from(element.querySelectorAll('.grid-layout img.cover-image, .grid-layout img'));

  const imageCell = [];
  if (images.length > 0) {
    imageCell.push(...images);
  }

  // Build cells: single row with two columns matching library example
  const cells = [
    [textCell, imageCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-hero', cells });
  element.replaceWith(block);
}
