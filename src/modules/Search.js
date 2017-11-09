import { 
        searchHandler,
        firstSearchHandler,
} from '../handlers/search-hendlers';


export const renderSearch = function() {
    const searchNode = document.createElement('div');
    const searchInput = document.createElement('input');
    const searchButton = document.createElement('button');

    searchInput.setAttribute('id', 'search');
    searchInput.setAttribute('placeholder', 'Search');

    searchButton.setAttribute('id', 'searchButton');
    searchButton.innerHTML = '<i class="material-icons">search</i>';

    searchNode.classList.add('search');
    searchNode.appendChild(searchInput);
    searchNode.appendChild(searchButton);
    searchNode.addEventListener('keyup', firstSearchHandler);
    searchNode.addEventListener('keyup', searchHandler);
    searchNode.addEventListener('click', firstSearchHandler);
    searchNode.addEventListener('click', searchHandler);

    document.body.appendChild(searchNode);
}