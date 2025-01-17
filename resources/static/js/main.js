
const API_LINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cda4b2a56a6d23bc982930192e2c565d&page=1';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=cda4b2a56a6d23bc982930192e2c565d&query=";
const VIDEO_PATH = 'https://video.tmdb.org/t/p/w1280';

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

function returnMovies(url){
    fetch(url).then(res => res.json())
    .then(function(data){
        data.results.forEach(element => {
            fetch(`https://api.themoviedb.org/3/movie/${element.id}/videos?api_key=cda4b2a56a6d23bc982930192e2c565d`)
            .then(res => res.json())
            .then(function(videoData) {
                if(videoData.results.length > 0){
                    const div_card = document.createElement('div');
                    div_card.setAttribute('class', 'card');

                    const div_row = document.createElement('div');
                    div_row.setAttribute('class', 'row');

                    const div_column = document.createElement('div');
                    div_column.setAttribute('class', 'column');

                    const iframe = document.createElement('iframe');
                    iframe.setAttribute('class', 'video');
                    iframe.setAttribute('id', 'video');
                    iframe.setAttribute('width', '200');
                    iframe.setAttribute('height', '200');
                    iframe.setAttribute('src', `https://www.youtube.com/embed/${videoData.results[0].key}`);
                    iframe.setAttribute('frameborder', '0');
                    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                    iframe.setAttribute('allowfullscreen', true);

                    const title = document.createElement('h3');
                    title.setAttribute('id', 'title');
                    const center = document.createElement('center');

                    title.innerHTML = `${element.title}`;

                    center.appendChild(iframe);
                    div_card.appendChild(center);
                    div_card.appendChild(title);
                    div_column.appendChild(div_card);
                    div_row.appendChild(div_column);

                    main.appendChild(div_row);
                }
            });
        });
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const searchItem = search.value;

    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";
    }
});
