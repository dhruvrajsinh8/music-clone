// DOM Elements
const cards = document.querySelectorAll('.card');
const playPauseBtn = document.getElementById('masterBtn');
const seekBar = document.getElementById('range');
const songNameEl = document.getElementById('songName');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const gif = document.getElementById('gif');

// Audio Element
let audioElement = new Audio();
let currentSongIndex = -1;
let isPlaying = false;

// Songs Data
const songs = [
    { id: 1, name: 'Bol Do Na Zara', file: 'Bol Do Na Zara.mp3' },
    { id: 2, name: 'Ghungroo', file: 'Ghungroo.mp3' },
    { id: 3, name: 'Main Rang Sharbaton Ka', file: 'Main Rang Sharbaton Ka.mp3' },
    { id: 4, name: 'Barsaat', file: 'Barsaat.mp3' },
    { id: 5, name: 'Paniyon Sa', file: 'Paniyon Sa.mp3' }
];

// Format Time Helper Function
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Load Song
function loadSong(index) {
    const song = songs[index];
    if (!song) return;

    audioElement.src = song.file;
    songNameEl.textContent = song.name;
    gif.style.opacity = 0;
    isPlaying = false;
    currentSongIndex = index;
    resetUI();
}

// Play Song
function playSong() {
    audioElement.play();
    isPlaying = true;
    playPauseBtn.classList.replace('fa-circle-play', 'fa-circle-pause');
    gif.style.opacity = 1;
}

// Pause Song
function pauseSong() {
    audioElement.pause();
    isPlaying = false;
    playPauseBtn.classList.replace('fa-circle-pause', 'fa-circle-play');
    gif.style.opacity = 0;
}

// Toggle Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (currentSongIndex === -1) {
        loadSong(0); // Load the first song if no song is selected
    }

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Update Timer and SeekBar
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        seekBar.value = progress;
        currentTimeEl.textContent = formatTime(audioElement.currentTime);
        durationEl.textContent = formatTime(audioElement.duration);
    }
});

// Seek Functionality
seekBar.addEventListener('input', () => {
    const seekTime = (seekBar.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});

// Song Selection Logic
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        if (currentSongIndex === index) {
            // If same song, toggle play/pause
            if (isPlaying) {
                pauseSong();
            } else {
                playSong();
            }
        } else {
            // Load and play the selected song
            loadSong(index);
            playSong();
        }
        updateCardUI(index);
    });
});

// Reset UI
function resetUI() {
    seekBar.value = 0;
    currentTimeEl.textContent = '0:00';
    durationEl.textContent = '0:00';
}

// Update Active Card UI
function updateCardUI(activeIndex) {
    cards.forEach((card, index) => {
        if (index === activeIndex) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

// Load the first song initially
loadSong(0);
