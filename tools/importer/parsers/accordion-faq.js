/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion-faq
 * Base block: accordion
 * Source selector: .faq-list
 * Structure: One row per FAQ item — Col1 = question text, Col2 = answer text
 * Generated: 2026-05-20
 */
export default function parse(element, { document }) {
  // Extract all FAQ items from details elements
  const faqItems = element.querySelectorAll('details.faq-item, details');

  const cells = [];

  faqItems.forEach((item) => {
    // Extract question text from summary > span (avoids picking up the decorative icon)
    const questionSpan = item.querySelector('summary span, summary');
    const questionText = questionSpan ? questionSpan.textContent.trim() : '';

    // Extract answer content from the faq-answer div
    const answerContainer = item.querySelector('.faq-answer, summary ~ div');
    const answerParagraph = answerContainer
      ? answerContainer.querySelector('p')
      : null;

    // Build row: [question, answer]
    if (questionText) {
      const questionCell = document.createTextNode(questionText);
      const answerCell = answerParagraph
        ? answerParagraph.cloneNode(true)
        : document.createTextNode(answerContainer ? answerContainer.textContent.trim() : '');
      cells.push([questionCell, answerCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
