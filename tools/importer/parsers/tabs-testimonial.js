/* eslint-disable */
/* global WebImporter */

/**
 * Parser: tabs-testimonial
 * Base block: tabs
 * Source: https://wknd-trendsetters.site
 * Selector: .tabs-wrapper
 * Description: Tabbed testimonial interface with person image, name, role, and quote per tab.
 * Generated: 2026-05-20
 */
export default function parse(element, { document }) {
  // Get all tab panes (content panels)
  const tabPanes = element.querySelectorAll('.tab-pane');
  // Get all tab menu buttons (for labels)
  const tabButtons = element.querySelectorAll('.tab-menu-link, .tab-menu button');

  const cells = [];

  tabPanes.forEach((pane, index) => {
    // --- Column 1: Tab label (person name from menu button) ---
    let tabLabel = '';
    const button = tabButtons[index];
    if (button) {
      const nameEl = button.querySelector('.paragraph-sm strong, strong');
      tabLabel = nameEl ? nameEl.textContent.trim() : '';
    }
    // Fallback: extract name from pane content if button label not found
    if (!tabLabel) {
      const paneName = pane.querySelector('.paragraph-xl strong, strong');
      tabLabel = paneName ? paneName.textContent.trim() : `Tab ${index + 1}`;
    }

    // --- Column 2: Tab content (image + name + role + quote) ---
    const contentContainer = document.createElement('div');

    // Image
    const img = pane.querySelector('img.cover-image, img');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src || img.getAttribute('src');
      imgEl.alt = img.alt || img.getAttribute('alt') || '';
      contentContainer.appendChild(imgEl);
    }

    // Person name
    const personName = pane.querySelector('.paragraph-xl strong, .grid-layout strong');
    if (personName) {
      const nameP = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = personName.textContent.trim();
      nameP.appendChild(strong);
      contentContainer.appendChild(nameP);
    }

    // Role - the div immediately after the name div
    const nameContainer = pane.querySelector('.paragraph-xl.utility-margin-bottom-0, .paragraph-xl strong');
    if (nameContainer) {
      const nameParent = nameContainer.closest ? nameContainer.closest('div') : nameContainer.parentElement;
      if (nameParent) {
        const roleEl = nameParent.nextElementSibling || nameParent.parentElement?.querySelector('div:not(.paragraph-xl)');
        // Look for the role text in the sibling div after the name
        const roleDiv = nameParent.closest('div')?.parentElement?.querySelector('div:last-child:not(.paragraph-xl)');
        // Better approach: get the div that follows the name div within the same parent
        const infoBlock = pane.querySelector('.grid-layout > div:nth-child(2) > div:first-child');
        if (infoBlock) {
          const roleDivEl = infoBlock.querySelector('div:not(.paragraph-xl):not(:has(strong))');
          if (roleDivEl && roleDivEl.textContent.trim()) {
            const roleP = document.createElement('p');
            roleP.textContent = roleDivEl.textContent.trim();
            contentContainer.appendChild(roleP);
          }
        }
      }
    }

    // Quote - the paragraph with class paragraph-xl that contains the testimonial
    const quote = pane.querySelector('p.paragraph-xl');
    if (quote) {
      const quoteP = document.createElement('p');
      quoteP.textContent = quote.textContent.trim();
      contentContainer.appendChild(quoteP);
    }

    cells.push([tabLabel, contentContainer]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
