/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-article
 * Base block: columns
 * Source selector: main > section:nth-child(2) .grid-layout.tablet-1-column.grid-gap-lg
 * Description: Two-column layout with article image on left, metadata (breadcrumbs, heading, author, date) on right
 * Generated: 2026-05-20
 */
export default function parse(element, { document }) {
  // Column 1: Image
  const image = element.querySelector(':scope > div:first-child img, :scope > div:first-child picture');

  // Column 2: Text content (breadcrumbs, heading, author, date)
  const contentDiv = element.querySelector(':scope > div:nth-child(2)');

  // Build content cell - gather all meaningful content from the right column
  const contentCell = [];

  if (contentDiv) {
    // Breadcrumbs
    const breadcrumbs = contentDiv.querySelector('.breadcrumbs');
    if (breadcrumbs) {
      contentCell.push(breadcrumbs);
    }

    // Heading
    const heading = contentDiv.querySelector('h1, h2, h3, .h2-heading, [class*="heading"]');
    if (heading) {
      contentCell.push(heading);
    }

    // Author and date info - contained in flex-horizontal divs
    const metaDivs = contentDiv.querySelectorAll('.flex-horizontal');
    metaDivs.forEach((metaDiv) => {
      contentCell.push(metaDiv);
    });

    // Fallback: if no specific elements found, use the whole content div
    if (contentCell.length === 0) {
      contentCell.push(contentDiv);
    }
  }

  // Build cells: single row with two columns [image, text content]
  const imageCell = image ? [image] : [];
  const cells = [
    [imageCell, contentCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}
