import { setCurrentDot } from '../modules/pagination';
import { turnPage } from '../modules/video-panel';
import { Store } from '../utils/Store';
import { getNewVideos } from '../utils/search';

export const dotClickHandler = function(e) {
    if (e.target.tagName === 'LI') {
        const store = Store.getInstance();
        const dotList = e.currentTarget;    
        const dot = e.target;
        const position = Array.prototype.findIndex.call(dotList.children, (element) => {
            return element === dot;
        });
        store.currentPage = position;
        setCurrentDot(position);
        turnPage(position, store.videosPerPage);
        if (store.currentPage + 3 > store.pagesCount) {
            getNewVideos(store.videosPerPage).then(data => {
                store.pagesCount += Math.ceil(data.items.length / store.videosPerPage) - 1;
            });
        }
    }
}