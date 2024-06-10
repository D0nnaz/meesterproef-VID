document.addEventListener("DOMContentLoaded", function () {
  const planets = [
    {
      name: "Sun",
      distance: "147 million km",
      survivalTime: "0,0001 sec",
      videoSrc: "/video/sun.mp4",
      description:
        "Humans stand absolutely no chance near the Sun. We would get vaporized in less than a second, even with a spacesuit on, let alone without one!",
      imageSrc:
        "https://www.solarsystemscope.com/spacepedia/images/handbook/renders/sun.png",
    },
    {
      name: "Mercury",
      distance: "82.5 million km",
      survivalTime: "1,1 min",
      videoSrc: "",
      description:
        "Mercury is a planet of extremes. The side facing the Sun is extremely hot, whereas the other side is incredibly cold. Without a spacesuit, you’d either freeze or turn into a carbon brick, depending on which side of the planet you were standing on.",
      imageSrc:
        "https://www.solarsystemscope.com/spacepedia/images/handbook/renders/mercury.png",
    },
    {
      name: "Venus",
      distance: "39.79 million km",
      survivalTime: "0,075 sec",
      videoSrc: "/video/venus.mp4",
      description:
        "Visiting Venus would squash you in seconds under a pressure ninety four times greater than on Earth, turning you into jelly. If that didn't get you, the extreme temperature would, as Venus is the hottest planet in our solar system!",
      imageSrc:
        "https://www.solarsystemscope.com/spacepedia/images/handbook/renders/venus.png",
    },
    {
      name: "Mars",
      distance: "55.65 million km",
      survivalTime: "2,3 min",
      videoSrc: "",
      description:
        "Mars is full of deserts, extremely cold, and has very little atmosphere or gravity. Without any protective gear, your bodily fluids would evaporate giving you about two minutes to explore the planet if you hold your breath.",
      imageSrc:
        "https://www.solarsystemscope.com/spacepedia/images/handbook/renders/mars.png",
    },
    {
      name: "Saturn",
      distance: "1 204.28 million km",
      survivalTime: "2,35 sec",
      videoSrc: "",
      description:
        "Saturn doesn't have any solid surface to land on, just gases and liquid. You wouldn't survive on Saturn because of the intense atmosphere, unbreathable environment, extreme temperature, and violent storms will kill you in seconds.",
      imageSrc:
        "https://www.solarsystemscope.com/spacepedia/images/handbook/renders/saturn.png",
    },
    {
      name: "Neptune",
      distance: "4 311.02 million km",
      survivalTime: "0,78 sec",
      videoSrc: "",
      description:
        "There is no solid ground on Neptune, so you would simply fall through its atmosphere until the intense pressure crushes you. You would perish long before reaching the core, not to mention the extreme cold and wind.",
      imageSrc:
        "https://www.solarsystemscope.com/spacepedia/images/handbook/renders/neptune.png",
    },
    {
      name: "Jupiter",
      distance: "591.97 million km",
      survivalTime: "3,1 sec",
      videoSrc: "",
      description:
        "Jupiter's gravity is a lot stronger than Earth's. Besides the lack of oxygen and winds that can keep you suspended in the air forever, the immense pressure would crush you.",
      imageSrc:
        "https://www.solarsystemscope.com/spacepedia/images/handbook/renders/jupiter.png",
    },

    {
      name: "Uranus",
      distance: "2 586.88 million km",
      survivalTime: "1,2 sec",
      videoSrc: "/video/uranus.mp4",
      description:
        "Uranus, the coldest plantet of our solar system with a temperature of minus two hundred and twenty four degrees celcius. If the cold doesn't get you the pressure will and you can't even stand on it because it's a gas giant.",
      imageSrc:
        "https://www.solarsystemscope.com/spacepedia/images/handbook/renders/uranus.png",
    },

    {
      name: "Pluto",
      distance: "4 293.37 million km",
      survivalTime: "8 sec",
      videoSrc: "",
      description:
        "Pluto is a small, cold, and rocky dwarf planet. The gravity is weak, so you’d have to hold your breath while floating in the air before freezing like an ice cube.",
      imageSrc:
        "https://www.solarsystemscope.com/spacepedia/images/handbook/renders/pluto.png",
    },
    {
      name: "Earth",
      distance: "0 km",
      survivalTime: "80 years",
      videoSrc: "",
      description:
        "Earth is the only planet in our solar system where humans can survive without the need for advanced technology. Without holding our breaths or wearing any kind of spacesuit",
      imageSrc:
        "https://www.solarsystemscope.com/spacepedia/images/handbook/renders/earth.png",
    },
  ];

  const popup = document.querySelector(".pop-up");
  const closeBtn = document.querySelector(".close");
  const textBlock = document.querySelector(".textBlock");
  const planetImg = document.querySelector(".planetImg");
  const deathContainer = document.querySelector(".death-container");

  function openPopup(index) {
    const planet = planets[index];

    textBlock.innerHTML = `
            <h1>${planet.name}</h1>
            <p>${planet.description}</p>
        `;

    planetImg.src = planet.imageSrc;

    deathContainer.innerHTML = `
            <div class="death-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="92.875" height="65.925" viewBox="0 0 92.875 65.925">
                    <g id="Ellipse_6" data-name="Ellipse 6" transform="translate(58.571 3.551)" fill="#fff" stroke="#fff"
                        stroke-width="3">
                        <circle cx="8" cy="8" r="8" stroke="none" />
                        <circle cx="8" cy="8" r="6.5" fill="none" />
                    </g>
                    <g id="Ellipse_7" data-name="Ellipse 7" transform="translate(25.571 37.551)" fill="#fff" stroke="#fff"
                        stroke-width="3">
                        <circle cx="5" cy="5" r="5" stroke="none" />
                        <circle cx="5" cy="5" r="3.5" fill="none" />
                    </g>
                    <g id="Ellipse_8" data-name="Ellipse 8" transform="translate(0 20.321) rotate(-14)" fill="none" stroke="#fff"
                        stroke-width="3">
                        <ellipse cx="42" cy="23.5" rx="42" ry="23.5" stroke="none" />
                        <ellipse cx="42" cy="23.5" rx="40.5" ry="22" fill="none" />
                    </g>
                    <g id="Ellipse_9" data-name="Ellipse 9" transform="translate(21.629 27.875) rotate(-14)" fill="none" stroke="#fff"
                        stroke-width="3">
                        <ellipse cx="21.5" cy="11" rx="21.5" ry="11" stroke="none" />
                        <ellipse cx="21.5" cy="11" rx="20" ry="9.5" fill="none" />
                    </g>
                    <g id="Ellipse_10" data-name="Ellipse 10" transform="translate(34.322 31.667) rotate(-14)" fill="none" stroke="#fff"
                        stroke-width="3">
                        <ellipse cx="10" cy="4.32" rx="10" ry="4.32" stroke="none" />
                        <ellipse cx="10" cy="4.32" rx="8.5" ry="2.82" fill="none" />
                    </g>
                </svg>
                <div class="death-info">
                    <p>${planet.distance}</p>
                    <p>from Earth</p>
                </div>
            </div>
            <div class="death-item">
               <svg class = "time" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
  <g id="Ellipse_11" data-name="Ellipse 11" fill="none" stroke="#fff" stroke-width="3">
    <circle cx="30" cy="30" r="30" stroke="none"/>
    <circle cx="30" cy="30" r="28.5" fill="none"/>
  </g>
  <path id="Path_681" data-name="Path 681" d="M-842,7058v19.764l7.532-4.074,2.983-1.625" transform="translate(872.5 -7047.763)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
  <g id="Ellipse_12" data-name="Ellipse 12" transform="translate(27 28)" fill="#fff" stroke="#fff" stroke-width="10">
    <circle cx="3" cy="3" r="3" stroke="none"/>
    <circle cx="3" cy="3" r="2" fill="none"/>
  </g>
</svg>




                <div class="death-info">
                    <p>Survival time</p>
                    <p>${planet.survivalTime}</p>
                </div>
                </div>
    ${
      planet.videoSrc
        ? `
      <div class="video-cta" data-video-src="${planet.videoSrc}">
      <div class = "play-cta">
       <div class = "play-button">
      </div>
      </div>
    `
        : ""
    }
  `;

    popup.style.display = "flex";
  }

  const planetItems = document.querySelectorAll(".planets .item h3");
  planetItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      openPopup(index);
    });
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";

    const videos = popup.querySelectorAll("video");
    videos.forEach((video) => video.pause());
  });
});

document.addEventListener("click", function (event) {
  if (
    event.target.matches(".video-cta") ||
    event.target.matches(".play-button") ||
    event.target.matches(".play-cta")
  ) {
    let videoSrc;
    if (event.target.matches(".video-cta")) {
      videoSrc = event.target.getAttribute("data-video-src");
    } else if (event.target.matches(".play-button")) {
      videoSrc = event.target.parentElement.getAttribute("data-video-src");
    } else if (event.target.matches(".play-cta")) {
      videoSrc = event.target.parentElement.getAttribute("data-video-src");
    }
    console.log("Clicked on video-cta or play-button, videoSrc is: ", videoSrc);

    const video = document.createElement("video");
    video.src = videoSrc;
    video.controls = false;
    video.autoplay = true;
    video.style.pointerEvents = "none";
    video.onended = function () {
      document.body.removeChild(video);
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    };
    document.body.appendChild(video);
    video.play();
    console.log(video);

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  }
});
