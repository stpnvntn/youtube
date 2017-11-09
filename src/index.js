require('../styles/entry.styl');

import { renderSearch } from './modules/search';
import { initResizeHandler } from './handlers/resize-handler';

document.addEventListener('DOMContentLoaded', () => {
    renderSearch();
    initResizeHandler();
});
