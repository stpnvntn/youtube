import {
    turnPage,
    movePage,
} from '../modules/video-panel';
import { Store } from '../utils/Store';
import { 
    getNewVideos,
} from '../utils/search';

let pointerHorizontalPosition;
let lastPointerPosition;
let lastTouch;

const rightSwipe = function() {
    const store = Store.getInstance();
    if (store.currentPage - 1 >= 0) {
        turnPage(--store.currentPage, store.videosPerPage);
    } else {
        turnPage(store.currentPage, store.videosPerPage);
    }
}

const leftSwipe = function() {
    const store = Store.getInstance();
    if (store.pagesCount >= store.currentPage + 1) {
        if (store.currentPage + 3 > store.pagesCount) {
            getNewVideos(store.videosPerPage).then(data => {
                store.pagesCount += Math.ceil(data.items.length / store.videosPerPage) - 1;
            }).catch(() => {
                
            });
        }
        turnPage(++store.currentPage, store.videosPerPage);
    }
    turnPage(store.currentPage, store.videosPerPage);
}

const swipeDetecting = function(curentPointerPosition) {
    const delta = curentPointerPosition - pointerHorizontalPosition;
    const store = Store.getInstance();
    if (Math.abs(delta) > 40) {
        if (delta > 0) {
           rightSwipe();
        } else {
            leftSwipe();  
        }
    } else {
        turnPage(store.currentPage, store.videosPerPage);
    }
}

export const startSwipeHendler = function(e) {
    e.preventDefault();
    pointerHorizontalPosition = e.clientX;
}

export const stopSwipeHendler = function(e) {
    e.preventDefault();
    swipeDetecting(e.clientX);
}

export const startTouchSwipeHendler = function(e) {
    lastTouch = e.touches[0];
    pointerHorizontalPosition = e.touches[0].clientX;
    lastPointerPosition = e.touches[0].clientX;
}

export const touchMoveHandler = function(e) {
    let currentDelta;
    lastTouch = e.touches[0];
    currentDelta = lastPointerPosition - lastTouch.clientX;
    lastPointerPosition = lastTouch.clientX;
    movePage(-currentDelta);
}

export const stopTouchSwipeHendler = function(e) {
    swipeDetecting(lastTouch.clientX);
}