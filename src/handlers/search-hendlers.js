import { renderVideosWrapper, clearVideosWrapper } from '../modules/video-panel';
import { renderDotsWrapper, setCurrentDot, clearDotList } from '../modules/pagination';
import { getNewVideos } from '../utils/search';
import { Store } from '../utils/Store';

export const searchHandler = function(e) {
    if (
        e.keyCode === 13 ||
        e.target.getAttribute('id') === 'searchButton' ||
        e.target.tagName === 'I'
    ) {
        const store = Store.getInstance();
        const searchQuery = document.querySelector('#search').value;
        if (searchQuery === store.lastSearchQuery) {
            return;
        }
        clearVideosWrapper();
        clearDotList();
        store.lastSearchQuery = searchQuery;
        store.currentPage = 0;
        store.nextPageToken = '';
        getNewVideos(store.videosPerPage).then(data => {
            store.currentPage = 0;
            store.pagesCount = Math.ceil(data.items.length / store.videosPerPage) - 1;
            setCurrentDot(0);
        });
    }
};

export const firstSearchHandler = function(e) {
    if (
        e.keyCode === 13 ||
        e.target.getAttribute('id') === 'searchButton' ||
        e.target.tagName === 'I'
    ) {
        renderVideosWrapper();
        renderDotsWrapper();
        e.currentTarget.classList.remove('-centred');
        e.currentTarget.removeEventListener('click', firstSearchHandler);
        e.currentTarget.removeEventListener('keyup', firstSearchHandler);
    }
};
