/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters cleanup.
 * Removes non-authorable site chrome (navigation, footer, skip links).
 * All selectors verified against captured DOM in migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove skip link that overlays content (found: <a href="#main-content" class="skip-link">)
    WebImporter.DOMUtils.remove(element, ['a.skip-link']);
  }
  if (hookName === TransformHook.afterTransform) {
    // Remove navigation bar (found: <div class="navbar">)
    // Remove footer (found: <footer class="footer inverse-footer">)
    WebImporter.DOMUtils.remove(element, ['.navbar', 'footer.footer']);
  }
}
