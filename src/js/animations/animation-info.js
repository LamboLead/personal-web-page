const animations = {
  mainPageImage: {
    info: {
      // markers: {startColor: "yellow", endColor: "red"},
      markers: false,
      id: "main-page-animation",
      trigger: "#main-page",
      start: "top top+=1",
      end: "+=200% bottom-=1"
    },
    startSession: {
      "vertical": {
        "dark-theme": [
          {
            folderName: "dark-theme/saludo-1",
            frameCount: 61,
            duration: 6
          },
          {
            folderName: "dark-theme/saludo-2",
            frameCount: 44,
            duration: 6
          },
          {
            folderName: "dark-theme/saludo-3",
            frameCount: 72,
            duration: 6
          },
          {
            folderName: "dark-theme/saludo-4",
            frameCount: 70,
            duration: 6
          },
          {
            folderName: "dark-theme/baile-1",
            frameCount: 207,
            duration: 10
          },
          {
            folderName: "dark-theme/baile-2",
            frameCount: 327,
            duration: 11
          },
          {
            folderName: "dark-theme/baile-4",
            frameCount: 218,
            duration: 10
          },
          {
            folderName: "dark-theme/baile-5",
            frameCount: 225,
            duration: 10
          },
          {
            folderName: "dark-theme/baile-6",
            frameCount: 181,
            duration: 10
          }
        ],
        "light-theme": [
          {
            folderName: "light-theme/saludo-1",
            frameCount: 80,
            duration: 6
          },
          {
            folderName: "light-theme/baile-1",
            frameCount: 216,
            duration: 10
          },
          {
            folderName: "light-theme/baile-2",
            frameCount: 262,
            duration: 10
          },
          {
            folderName: "light-theme/baile-3",
            frameCount: 283,
            duration: 10
          },
        ]
      },
      "horizontal": {
        "dark-theme": [
          {
            folderName: "light-theme/saludo-2-movil",
            frameCount: 94,
            duration: 6
          }
        ],
        "light-theme": [
          {
            folderName: "light-theme/saludo-1-movil",
            frameCount: 67,
            duration: 6
          },
          {
            folderName: "light-theme/saludo-2-movil",
            frameCount: 94,
            duration: 6
          }
        ]
      }
    },
    currentSession: {
      "vertical": {
        "dark-theme": [
          {
            folderName: "dark-theme/baje-1",
            frameCount: 124,
            duration: 6,
          },
          {
            folderName: "dark-theme/baje-2",
            frameCount: 175,
            duration: 6,
          },
          {
            folderName: "dark-theme/baje-3",
            frameCount: 148,
            duration: 6,
          },
          {
            folderName: "dark-theme/baje-4",
            frameCount: 125,
            duration: 6,
          },

        ],
        "light-theme": [
          {
            folderName: "light-theme/baje-1",
            frameCount: 138,
            duration: 6,
          },
          {
            folderName: "light-theme/baje-2",
            frameCount: 127,
            duration: 6,
          },
          {
            folderName: "light-theme/bonus",
            frameCount: 95,
            duration: 6,
          },
          {
            folderName: "light-theme/chocorramo",
            frameCount: 170,
            duration: 6,
          },
          {
            folderName: "light-theme/gato",
            frameCount: 445,
            duration: 10,
          },
        ]
      },
      "horizontal": {
        "dark-theme": [
          {
            folderName: "light-theme/saludo-2-movil",
            frameCount: 94,
            duration: 6
          }
        ],
        "light-theme": [
          {
            folderName: "light-theme/saludo-1-movil",
            frameCount: 67,
            duration: 6
          },
          {
            folderName: "light-theme/saludo-2-movil",
            frameCount: 94,
            duration: 6
          }
        ]
      }
    }
  }
}

export default animations;

/*
const animations = {
  section1: {
    info: {},
    startSession: {"vertical": {}, "horizontal": {}},
    currentSession: {"vertical": {}, "horizontal": {}}
  },
  section2: {
    ...
  }
}
*/