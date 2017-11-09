export const Store = (function() {
    let instance;
    function init() {
        let nextPageToken = '';
        let lastSearchQuery = '';
        let currentPage = 0;
        let pagesCount = 0;
        let videosPerPage = 1;
        return {
            nextPageToken,
            lastSearchQuery,
            currentPage,
            pagesCount,
            videosPerPage,
        };
    };
    return {
        getInstance: function() {
            if ( !instance ) {
                instance = init();
                window.store = instance;
            }
            return instance;
        }
    }
})();