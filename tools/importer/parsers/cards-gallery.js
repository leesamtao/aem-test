/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-gallery
 * Base block: cards
 * Selector: .secondary-section .grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-sm
 * Description: Grid of image-only cards (gallery). Each card row contains a single image.
 * Generated: 2026-05-20
 */
export default function parse(element, { document }) {
  // Extract all image items from the grid
  // Source structure: div.utility-aspect-1x1 > img.cover-image
  const imageContainers = element.querySelectorAll('.utility-aspect-1x1, [class*="aspect"]');
  const cells = [];

  imageContainers.forEach((container) => {
    const img = container.querySelector('img');
    if (img) {
      // Each card row contains just the image
      cells.push([img]);
    }
  });

  // Fallback: if no aspect-ratio containers found, try direct img children
  if (cells.length === 0) {
    const images = element.querySelectorAll('img');
    images.forEach((img) => {
      cells.push([img]);
    });
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
