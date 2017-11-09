import { 
    DOT_WIDTH,
    SELECTED_DOT
} from '../utils/constants';
import { dotClickHandler } from '../handlers/pagination-handlers';
import { getTranslate3dString } from '../utils/translate3d';

let dotsList;
let dotsWrapper;

let currentDotListWeight = 0
let currentDotWrapperPosition = 0;

let currentDot = 0;

export const renderDotsWrapper = function() {
    dotsList = document.createElement('ul');
    dotsWrapper = document.createElement('div');
    dotsList.classList.add('control-dots');
    dotsList.addEventListener('click', dotClickHandler);
    dotsWrapper.classList.add('control-dots-wrapper');
    dotsWrapper.appendChild(dotsList);
    document.body.appendChild(dotsWrapper);
};
 
export const renderDots = function(numberOfDots) {
    const tempNode = document.createDocumentFragment();
    for (let i = 0; i < numberOfDots; i++) {
        tempNode.appendChild(createDot(i + 1));
    }
    dotsList.style.width = (currentDotListWeight += (DOT_WIDTH * numberOfDots)) + 'px';
    dotsList.appendChild(tempNode);
}

const createDot = function(number) {
    const dot = document.createElement('li');
    dot.classList.add('control-dot');
    dot.textContent = dotsList.childElementCount + number;
    return dot;
};

export const clearDotList = function() {
    dotsList.innerHTML = '';
    currentDotListWeight = 0;
    currentDot = 0;
}

export const setCurrentDot = function(position) {
    dotsList.children[currentDot].classList.remove(SELECTED_DOT);
    currentDot = position;
    dotsList.children[currentDot].classList.add(SELECTED_DOT);
    moveDotsWrapper();
}

const moveDotsWrapper = function() {
    if (currentDot <= 2) {
        currentDotWrapperPosition = 0;
    } else {
        currentDotWrapperPosition = (currentDot - 2) * -DOT_WIDTH;
    }
    dotsList.style.transform = getTranslate3dString([currentDotWrapperPosition, 0, 0]);
}
