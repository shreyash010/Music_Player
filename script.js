let songs = [
    {
        id: 1,
        songName: 'Whistle',
        artist: 'Flo Rida',
        genre: 'Hip Hop',
        imgSrc: 'https://i.ytimg.com/vi/TRWSj95xsTc/mqdefault.jpg',
        audioSrc: './audio/Whistle.mp3'
    },
    {
        id: 2,
        songName: 'Solo Dance',
        artist: 'Martin Jensen',
        genre: 'Pop',
        imgSrc: 'https://i.ytimg.com/vi/-PBQa9aEDPk/maxresdefault.jpg',
        audioSrc: './audio/Solo.mp3'
    }
]

// fetching elments from dom:
const optionEl = document.getElementById('song-genre');
const songEl = document.getElementById('song-list');
const songDetailsEl = document.getElementById('song-details');
const songControlEl = document.getElementById('song-controls');
const prevEl = document.getElementById('prev');
const nextEl = document.getElementById('next');

// variable required:
let songList = [];

// adding song to list:
function showSong(songList){
    songEl.textContent = '';
    songList.forEach(songL => {
        const addSong = document.createElement('li');
        addSong.textContent = `${songL.songName}  ${songL.artist}`;
        songEl.appendChild(addSong);
        addSong.classList.add('song-li');
        // adding event handler to list:
        addSong.addEventListener('click', (event) =>{
            const index = songs.findIndex(song => song.songName === songL.songName);
            renderCurrentSong(index);
        });
    })
}

// adding song to left nav
function addSong(inputValue){
    songList = [];
    if(inputValue === 'All'){
        songs.forEach(song => {
            const {songName, artist} = song;
            songList.push({songName : songName, artist : artist});    
        });
    }else{
        songs.forEach(song => {
            const {songName, artist} = song;
            if(inputValue === song.genre){
                songList.push({songName : songName, artist : artist});      
            }
        });
    }
    // console.log(songList);
    showSong(songList);
}
addSong('All');
// creating song list:
optionEl.addEventListener("input", (event) => {
    addSong(event.target.value);
})


// function to render the selected song details from songList.
function renderCurrentSong(songIndex) {
    const song = songs[songIndex];
    songDetailsEl.innerHTML = `
        <img src=${song.imgSrc} alt=''>
        <p>${song.songName}</p>
        <span>${song.artist}</span>
    `;
    songControlEl.innerHTML = `
        <audio controls="controls" src=${song.audioSrc}>
        </audio>
    `;
}

// function for changing the song using btn:
function changeSong(btnValue){
    const songCardName = document.querySelector('#song-details p');
    let index = songs.findIndex(song => song.songName === songCardName.textContent);
    if(btnValue === 'prev'){
        index = index - 1;
        if(index < 0){
            index = songs.length-1;
            renderCurrentSong(index);
        }else{
            renderCurrentSong(index);
        }
    }else if(btnValue === 'next'){
        index = index + 1;
        if(index === songs.length){
            index = 0;
            renderCurrentSong(index);
        }else{
            renderCurrentSong(index);
        }
    }
}

// adding event listener to prev and next button:
prevEl.addEventListener('click', () => {
    changeSong('prev');
})

nextEl.addEventListener('click', () => {
    changeSong('next');
})