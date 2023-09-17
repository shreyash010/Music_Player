const songs = [
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
    },
    {
        id: 3,
        songName: 'Hall of Fame',
        artist: 'The Script',
        genre: 'Hip Hop',
        imgSrc: 'https://i.ytimg.com/vi/1yBc5aDEk5o/maxresdefault.jpg',
        audioSrc: './audio/HallofFame.mp3'
    },
    {
        id: 4,
        songName: 'Unstoppable',
        artist: 'Sia',
        genre: 'Electronic',
        imgSrc: 'https://i.ytimg.com/vi/h3h035Eyz5A/maxresdefault.jpg',
        audioSrc: './audio/unstoppable.mp3'
    }
]

// fetching elments from dom:
const optionEl = document.getElementById('song-genre');
const songEl = document.getElementById('song-list');
const songDetailsEl = document.getElementById('song-details');
const songControlEl = document.getElementById('song-controls');
const prevEl = document.getElementById('prev');
const nextEl = document.getElementById('next');
const createPlaylist = document.getElementById('create-playlist');
const createInput = document.getElementById('create-input');
const songPlaylistEl = document.getElementById('song-playlist');
const addToPlaylistEl = document.getElementById('add-playlist');
const playlistSongEl = document.getElementById('playlist-song');

// variable required:
let songList = [];
let playlist;
const currentPlaylist = {};


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

// adding event listener to add songs to playlist
addToPlaylistEl.addEventListener('click', () => {
    const songCardName = document.querySelector('#song-details p');
    let index = songs.findIndex(song => song.songName === songCardName.textContent);

    const songPl = `${songs[index]['songName']} ${songs[index]['artist']}`;

    if(currentPlaylist.playlist){
        currentPlaylist[playlist].add(songPl);
    }else if(playlist){
        currentPlaylist[playlist] = new Set();
        currentPlaylist[playlist].add(songPl);
    }
    console.log(currentPlaylist);
    renderPlaylistSong(playlist);
})

// adding event listener to create playlist button
createPlaylist.addEventListener('click', () => {
    
    const playlistLi = document.createElement('li');
    playlistLi.classList.add('song-li');
    playlistLi.textContent = createInput.value;
    
    if(createInput.value.match(/^[A-Za-z\s]+$/)){
        songPlaylistEl.appendChild(playlistLi);
    }else{
        alert("Please enter playlist name");
    }

    playlist = playlistLi.textContent;

    playlistLi.addEventListener('click', () => {
        playlist = playlistLi.textContent;
        renderPlaylistSong(playlist);
    })
})

// showing playlist song in current playlist:
function renderPlaylistSong(playlistObj){
    playlistSongEl.innerHTML = '';
    const songToAdd = currentPlaylist[playlistObj];
    if(songToAdd){
        songToAdd.forEach(song => {
            const songLi = document.createElement('li');
            songLi.classList.add('song-li');
            songLi.textContent = song;
    
            playlistSongEl.appendChild(songLi);
        });
    }
}