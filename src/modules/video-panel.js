import { VIDEO_WIDTH, NOTHING_TO_SHOW_TEMPALTE, ANIMATED_PANEL } from '../utils/constants';
import * as handlers from '../handlers/swipe-handlers';
import { getTranslate3dString } from '../utils/translate3d';
import { setCurrentDot } from './pagination';

let videosWrapper;
let currentWrapperPosition;
let currentWrapperWidth;

const getPanelTemplate = function(data) {
    return `
        <div class="video-panel-thumb">
            <img src="${data.snippet.thumbnails.high.url}">
        </div>
        <div class="video-panel-header">
            <a href="https://www.youtube.com/watch?v=${data.id}" class="title">${data.snippet
        .title}</a>
            <a href="https://www.youtube.com/" class="chanel">by ${data.snippet.channelTitle}</a>
        </div>
        <div class="video-panel-body">
            <p>${data.snippet.description}</p>
        </div>
        <div class="video-panel-footer">
            <span class="date">
                ${new Date(data.snippet.publishedAt).toDateString()}
            </span>
            <span class="views">
                ${parseInt(data.statistics.viewCount).toLocaleString()}
            </span>
        </div>`;
};

export const renderVideoPanels = function(videos) {
    let tempNode;
    if (!videos.length) {
        noFound();
        return;
    }
    tempNode = document.createDocumentFragment();
    currentWrapperWidth += videos.length * VIDEO_WIDTH;
    for (let i = 0; i < videos.length; i++) {
        tempNode.appendChild(createVideo(videos[i]));
    }
    videosWrapper.style.width = currentWrapperWidth + 'px';
    videosWrapper.appendChild(tempNode);
};

export const createVideo = function(data) {
    const videoPanel = document.createElement('div');
    videoPanel.innerHTML = getPanelTemplate(data);
    videoPanel.classList.add('video');
    return videoPanel;
};

export const renderVideosWrapper = function() {
    const videosContainer = document.createElement('div');
    videosWrapper = document.createElement('div');
    videosContainer.classList.add('videos-container');
    videosWrapper.classList.add('videos-wrapper');
    videosWrapper.classList.add('clearfix');
    videosContainer.appendChild(videosWrapper);

    videosContainer.addEventListener('mousedown', handlers.startSwipeHendler);
    videosContainer.addEventListener('mouseup', handlers.stopSwipeHendler);
    videosContainer.addEventListener('touchstart', handlers.startTouchSwipeHendler, {
        passive: true,
    });
    videosContainer.addEventListener('touchmove', handlers.touchMoveHandler, { passive: true });
    videosContainer.addEventListener('touchend', handlers.stopTouchSwipeHendler, { passive: true });

    currentWrapperPosition = 0;
    currentWrapperWidth = 0;
    document.body.appendChild(videosContainer);
};

export const clearVideosWrapper = function() {
    videosWrapper.innerHTML = '';
    currentWrapperPosition = 0;
    currentWrapperWidth = 0;
    videosWrapper.style.width = currentWrapperWidth;
    videosWrapper.style.transform = getTranslate3dString([currentWrapperPosition, 0, 0]);
};

export const noFound = function() {
    videosWrapper.innerHTML = NOTHING_TO_SHOW_TEMPALTE;
};

export const turnPage = function(pageNumber, videosPerPage) {
    videosWrapper.classList.add(ANIMATED_PANEL);
    currentWrapperPosition = -VIDEO_WIDTH * videosPerPage * pageNumber;
    videosWrapper.style.transform = getTranslate3dString([currentWrapperPosition, 0, 0]);
    setCurrentDot(pageNumber);
};

export const movePage = function(delta) {
    videosWrapper.classList.remove(ANIMATED_PANEL);
    currentWrapperPosition += delta;
    videosWrapper.style.transform = getTranslate3dString([currentWrapperPosition, 0, 0]);
};
