/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters sections.
 * Inserts section breaks (<hr>) and Section Metadata blocks based on template sections.
 * All selectors verified against captured DOM in migration-work/cleaned.html.
 *
 * Sections from template (7 total):
 *   1. Hero: selector "header.section.secondary-section", style "secondary"
 *   2. Article Feature: selector "main > section:nth-child(2)", style null
 *   3. Photo Gallery: selector "main > section:nth-child(3)", style "secondary"
 *   4. Testimonials: selector "main > section:nth-child(4)", style null
 *   5. Latest Articles: selector "main > section:nth-child(5)", style "secondary"
 *   6. FAQ: selector "main > section:nth-child(6)", style null
 *   7. CTA Banner: selector "section.inverse-section", style null
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = payload;
    const sections = payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to avoid index shifting
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue;

      // Add Section Metadata block after the section element if it has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Insert <hr> before non-first sections to create section breaks
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
