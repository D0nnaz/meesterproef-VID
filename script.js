let audio = new Audio("audio/rocket-engine.mp3");
audio.volume = 0;
let secondAudio = new Audio("audio/rocket-engine.mp3");
secondAudio.volume = 0;

function playAudio() {
    setTimeout(() => {
      audio.volume = 0.2;
      secondAudio.volume = 0.2;
    }, 2000);
  audio.play();
  secondAudio.play();
}

function stopAudio() {
  audio.pause();
  secondAudio.pause();
}

let scrollTimeout;
let firstPlay = true;

window.addEventListener("scroll", function () {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  if (firstPlay) {
    firstPlay = false;
    scrollTimeout = setTimeout(playAudio, 5100);
  } else {
    playAudio();
    scrollTimeout = setTimeout(stopAudio, 100);
  }
});

let backgroundMusic = new Audio("audio/music.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;

function playBackgroundMusic() {
  backgroundMusic.play();
}

window.addEventListener("DOMContentLoaded", playBackgroundMusic);

let muteButton = document.querySelector(".mute");

let isMuted = false;

let savedMuteStatus = localStorage.getItem("muteStatus");
if (savedMuteStatus !== null) {
  isMuted = savedMuteStatus === "true";
  audio.muted = isMuted;
  backgroundMusic.muted = isMuted;
  if (secondAudio) secondAudio.muted = isMuted;
  muteButton.style.backgroundImage = isMuted
    ? "url('./img/unmute.svg')"
    : "url('./img/mute.svg')";
}

muteButton.addEventListener("click", function () {
  isMuted = !isMuted;
  audio.muted = isMuted;
  backgroundMusic.muted = isMuted;
  if (secondAudio) secondAudio.muted = isMuted;

  if (!isMuted) {
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
    muteButton.style.backgroundImage = "url('./img/mute.svg')";
  } else {
    muteButton.style.backgroundImage = "url('./img/unmute.svg')";
  }

  localStorage.setItem("muteStatus", isMuted);
});

window.addEventListener("click", function startMusic() {
  if (!isMuted) {
    backgroundMusic.play();
  }

  window.removeEventListener("click", startMusic);
});

window.onload = function () {
  window.scrollTo(0, document.body.scrollHeight);
};

function setupIntersectionObserver() {
  const endElements = document.querySelectorAll(
    ".end h1, .end h3, .return-button"
  );
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
        if (entry.target.matches(".end h1")) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, 2000);
        } else if (entry.target.matches(".end h3")) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, 5000);
        } else if (entry.target.matches(".return-button")) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, 8000);
        }
        observer.unobserve(entry.target);
      }
    });
  }, options);

  endElements.forEach((element) => observer.observe(element));
}

setupIntersectionObserver();

document.querySelector(".return-button").addEventListener("click", () => {
  window.scrollTo(0, document.body.scrollHeight);
});


  var button = document.querySelector(".return-button");
  var img = new Image();
  img.src = "/img/CTA.png";
  img.onload = function () {
    button.style.width = img.width + "px";
  };

document.addEventListener("DOMContentLoaded", function() {
    window.scrollTo(0, document.body.scrollHeight);
});