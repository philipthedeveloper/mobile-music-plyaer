const volumeBtn = document.querySelector(".bottom_controls #volume");
const volumeRange = document.querySelector(".bottom_controls input");
const title = document.querySelector("main #title");
const artistName = document.querySelector("main #artist");
const thumbnail = document.querySelector("main .audio_img img");
const playBtn = document.querySelector(".top_controls #play");
const prevBtn = document.querySelector(".top_controls #prev");
const nextBtn = document.querySelector(".top_controls #next");
const favBtn = document.querySelector(".top_controls #favourite");
const favIcon = document.querySelector(".top_controls #favourite i");
const shufBtn = document.querySelector(".bottom_controls #shuffle");
const repeatBtn = document.querySelector(".bottom_controls #repeat");
const repeatSpan = document.querySelector(".bottom_controls #repeat span");
const durationRange = document.querySelector(
  'main .duration input[type="range"]'
);

let index = 0;
let shuffle_songs = false;
let trackCurrentTime;
let repeat_all = false;
let repeat_one = false;

const All_song = [
  {
    name: "Player",
    path: "audio/Fireboy-DML-Playboy.mp3",
    img: "imgs/Fireboy-DML-Playboy.jpeg",
    artist: "Fireboy",
    fav: false,
  },
  {
    name: "Live Forever",
    path: "audio/Kayode - Live_Forever.mp3",
    img: "imgs/kayode-live-forever.jpg",
    artist: "Kayode",
    fav: false,
  },
  {
    name: "Side Guy",
    path: "audio/Kayode - Side_Guy.mp3",
    img: "imgs/kayode-siderguy.jpg",
    artist: "Kayode",
    fav: false,
  },
  {
    name: "Thinking",
    path: "audio/NF - Thinking.mp3",
    img: "imgs/nf-thinking.jpg",
    artist: "NF",
    fav: false,
  },
  {
    name: "Time",
    path: "audio/NF - Time.mp3",
    img: "imgs/nf-time.jpg",
    artist: "NF",
    fav: false,
  },
  {
    name: "Trauma",
    path: "audio/NF - Trauma.mp3",
    img: "imgs/nf-trauma-2.jpg",
    artist: "NF",
    fav: false,
  },
  {
    name: "Why",
    path: "audio/NF - Why.mp3",
    img: "imgs/nf-why.jpg",
    artist: "NF",
    fav: false,
  },
];

const track = document.createElement("audio");

function showVolume() {
  volumeRange.classList.toggle("show");
}

function loadtrack(value) {
  durationRange.value = 0;
  clearInterval(trackCurrentTime);
  const { name, path, img, artist, fav } = All_song[value];
  track.src = path;
  title.innerHTML = name;
  artistName.innerHTML = artist;
  thumbnail.src = img;
  track.volume = volumeRange.value / 100;
  track.load();
  checkFav(fav);
}
loadtrack(index);

function playTrack() {
  track.play();
  playBtn.innerHTML = '<i class="fa fa-pause-circle" aria-hidden="true"></i>';
  trackCurrentTime = setInterval(trackDuration, 1000);
}

function pauseTrack() {
  track.pause();
  playBtn.innerHTML = '<i class="fa fa-play-circle" aria-hidden="true"></i>';
  clearInterval(trackCurrentTime);
}

function changePlayMode() {
  if (track.paused) {
    playTrack();
  } else {
    pauseTrack();
  }
}

function prev() {
  let newIndex;
  if (repeat_one || repeat_all) {
    repeater(previouser);
  } else if (shuffle_songs) {
    shuffler();
  } else {
    previouser();
  }
}

function random() {
  return Math.floor(Math.random() * All_song.length);
}

function next() {
  let newIndex;
  if (repeat_one || repeat_all) {
    repeater(nexter);
  } else if (shuffle_songs) {
    shuffler();
  } else {
    nexter();
  }
}

function changeVolume() {
  track.volume = this.value / 100;
}

function checkFav(value) {
  if (value) {
    favIcon.classList.add("fav");
  } else {
    favIcon.classList.remove("fav");
  }
}

function favourite() {
  All_song[index].fav = !All_song[index].fav;
  const { fav } = All_song[index];
  checkFav(fav);
}

function shuffle() {
  shuffle_songs = !shuffle_songs;
  if (shuffle_songs) {
    this.classList.add("fav");
  } else {
    this.classList.remove("fav");
  }
}

function shuffler() {
  do {
    newIndex = random();
  } while (newIndex === index);
  index = newIndex;
  loadtrack(index);
  playTrack();
}

function repeat() {
  if (repeat_one) {
    repeat_one = false;
    repeat_all = false;
    repeatSpan.innerHTML = '<span class="material-icons-round"> repeat </span>';
    repeatBtn.classList.remove("fav");
  } else if (repeat_all) {
    repeat_one = true;
    repeat_all = false;
    repeatSpan.innerHTML =
      '<span class="material-icons-round"> repeat_one </span>';
  } else {
    repeat_all = true;
    repeatBtn.classList.add("fav");
  }
}

function repeater(func) {
  if (repeat_one) {
    loadtrack(index);
    playTrack();
  } else if (repeat_all) {
    if (shuffle_songs) {
      shuffler();
    } else {
      func();
    }
  }
}

function nexter() {
  if (index < All_song.length - 1) {
    index += 1;
    loadtrack(index);
    playTrack();
  } else {
    index = 0;
    loadtrack(index);
    playTrack();
  }
}

function previouser() {
  if (index > 0) {
    index -= 1;
    loadtrack(index);
    playTrack();
  } else {
    index = All_song.length - 1;
    loadtrack(index);
    playTrack();
  }
}

function trackDuration() {
  durationRange.value = (track.currentTime / track.duration) * 100;
}

function changeCurrentTime() {
  track.currentTime = (durationRange.value / 100) * track.duration;
}

volumeBtn.addEventListener("click", showVolume);
playBtn.addEventListener("click", changePlayMode);
prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);
volumeRange.addEventListener("change", changeVolume);
// volumeRange.addEventListener("mousemove", changeVolume);
favBtn.addEventListener("click", favourite);
shufBtn.addEventListener("click", shuffle);
durationRange.addEventListener("change", changeCurrentTime);
durationRange.addEventListener("mousemove", changeCurrentTime);
track.addEventListener("ended", next);
repeatBtn.addEventListener("click", repeat);
