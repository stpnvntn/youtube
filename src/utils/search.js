import { Store } from '../utils/Store';
import { API_KEY } from '../utils/constants';
import { renderVideoPanels } from '../modules/video-panel';
import { renderDots } from '../modules/pagination';

const getSearchLink = function(lastSearchQuery, nextPageToken) {
    return `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&type=video&q=${lastSearchQuery}&key=${API_KEY}&pageToken=${nextPageToken}`;
};

const getVideoListLink = function(commaSeparatedVideoIds) {
    return `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${commaSeparatedVideoIds}&key=${API_KEY}`;
};

const search = function() {
    let query;
    const store = Store.getInstance();
    if (store.nextPageToken === undefined) {
        return new Promise(() => {
            throw new Error('no new videos');
        });
    }
    query = getSearchLink(store.lastSearchQuery, store.nextPageToken);
    return fetch(query)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let commaSeparatedVideoIds = '';
            store.nextPageToken = data.nextPageToken;
            data.items.forEach((cur, position, array) => {
                commaSeparatedVideoIds += `,${cur.id.videoId}`;
            });
            return fetch(getVideoListLink(commaSeparatedVideoIds));
        })
        .then(statistic => {
            return statistic.json();
        });
};

export const getNewVideos = function(vpp) {
    return search().then(data => {
        if (data.items.length) {
            renderVideoPanels(data.items);
            renderDots(Math.ceil(data.items.length / vpp));
            return data;
        }
    });
};
