import { Store } from '../utils';
import { clearDotList, renderDots, turnPage } from '../modules';

const store = Store.getInstance();

const mobile = window.matchMedia('(max-width: 639px)');
const tablet = window.matchMedia('(min-width: 641px) and (max-width: 960px)');
const laptop = window.matchMedia('(min-width: 961px) and (max-width: 1280px)');
const laptopLarge = window.matchMedia('(min-width: 1281px)');

function setNewPage(newVPP) {
    if (!store.lastSearchQuery) {
        store.videosPerPage = newVPP;
        return;
    }
    const videoPosition = (store.currentPage + 1) * store.videosPerPage - (store.videosPerPage - 1);
    const newPage = Math.ceil(videoPosition / newVPP) - 1;
    store.currentPage = newPage;
    store.pagesCount = Math.ceil((store.pagesCount + 1) * store.videosPerPage / newVPP) - 1;
    clearDotList();
    renderDots(store.pagesCount + 1);
    turnPage(newPage, newVPP);
    store.videosPerPage = newVPP;
}

function changeQuery(query) {
    let videosPerPage;
    switch (query) {
        case '(max-width: 639px)':
            console.log('mobile');
            videosPerPage = 1;
            setNewPage(videosPerPage);
            return;
        case '(max-width: 960px) and (min-width: 641px)':
            console.log('tablet');
            videosPerPage = 2;
            setNewPage(videosPerPage);
            return;
        case '(max-width: 1280px) and (min-width: 961px)':
            console.log('laptop');
            videosPerPage = 3;
            setNewPage(videosPerPage);
            return;
        case '(min-width: 1281px)':
            console.log('laptop large');
            videosPerPage = 4;
            setNewPage(videosPerPage);
            break;
        default:
            console.log('something bad ');
    }
}

function widthChange(mq) {
    if (mq.matches) {
        changeQuery(mq.media);
    }
}

export function initResizeHandler() {
    mobile.addListener(widthChange);
    tablet.addListener(widthChange);
    laptop.addListener(widthChange);
    laptopLarge.addListener(widthChange);

    widthChange(mobile);
    widthChange(tablet);
    widthChange(laptop);
    widthChange(laptopLarge);
}
