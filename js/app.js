// VARIABLES
const form = document.querySelector('#formulario');
const tweetsList = document.querySelector('#lista-tweets');
let tweets = [];

// EVENT LISTENERS
eventListeners();
function eventListeners() {
    // Cuando el usuario adiciona un nuevo tweet
    form.addEventListener('submit', addTweet);
    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        createHTML();
    });
}

// FUNCIONES
function addTweet(event) {
    event.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    if (tweet === '') {
        showError('It is empty');
        return; // evita que se ejecute más lineas de codigo
    }

    const tweetObject = {
        id: Date.now(),
        tweet: tweet
    }
    tweets = [...tweets, tweetObject];
    createHTML();
    form.reset();
}

function showError(error) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = error;
    errorMessage.classList.add('error');
    // adiciona el mensaje de error al contenido
    const contents = document.querySelector('#contenido');
    contents.appendChild(errorMessage);
    // elimina la alerta despues de  3 segundos
    setTimeout(() => {
        errorMessage.remove();
    }, 3000);

}

function createHTML() {
    cleanHTML();
    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            // adicionando boton de eliminar
            const btnDelete = document.createElement('a');
            btnDelete.classList.add('borrar-tweet');
            btnDelete.innerText = 'X';
            // adicion de funcion de eliminar
            btnDelete.onclick = () => {
                deleteTweet(tweet.id);
            };

            // se crea el HTML
            const li = document.createElement('li');
            // inserta el texto
            li.innerText = tweet.tweet;
            // asigacion del boton eliminar
            li.appendChild(btnDelete);
            // inserta en el html
            tweetsList.appendChild(li);
        });
    }
    synchroniseStorage();
}

// adiciona los tweets actuales al localstroge
function synchroniseStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// elimina tweet
function deleteTweet(id) {
    // filtra los tweets a los cuales no le di eliminar y los asigna al array tweets
    tweets = tweets.filter(tweet => tweet.id !== id);
    createHTML();
}
function cleanHTML() {
    while (tweetsList.firstChild) {
        tweetsList.removeChild(tweetsList.firstChild);
    }

}
