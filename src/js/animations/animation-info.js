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
            folderName: "dark-theme/catto-vertical",
            frameCount: 149,
            duration: 6,
            bestFrame: 100
          }
        ],
        "light-theme": [
          {
            folderName: "light-theme/catto-vertical",
            frameCount: 103,
            duration: 6,
            bestFrame: 100
          }
        ]
      },
      "horizontal": {
        "dark-theme": [
          {
            folderName: "dark-theme/catto-horizontal",
            frameCount: 146,
            duration: 6,
            bestFrame: 100
          }
        ],
        "light-theme": [
          {
            folderName: "light-theme/catto-horizontal",
            frameCount: 3,
            duration: 3,
            bestFrame: 2
          }
        ]
      }
    },
    currentSession: {
      "vertical": {
        "dark-theme": [
          {
            folderName: "dark-theme/catto-blue-vertical",
            frameCount: 151,
            duration: 6,
            bestFrame: 100
          },
          {
            folderName: "dark-theme/catto-red-vertical",
            frameCount: 141,
            duration: 6,
            bestFrame: 100
          }
        ],
        "light-theme": [
          {
            folderName: "light-theme/catto-blue-vertical",
            frameCount: 104,
            duration: 6,
            bestFrame: 100
          },
          {
            folderName: "light-theme/catto-red-vertical",
            frameCount: 97,
            duration: 6,
            bestFrame: 50
          }
        ]
      },
      "horizontal": {
        "dark-theme": [
          {
            folderName: "dark-theme/catto-blue-horizontal",
            frameCount: 148,
            duration: 6,
            bestFrame: 100
          },
          {
            folderName: "dark-theme/catto-red-horizontal",
            frameCount: 148,
            duration: 6,
            bestFrame: 100
          }
        ],
        "light-theme": [
          {
            folderName: "light-theme/catto-blue-horizontal",
            frameCount: 3,
            duration: 3,
            bestFrame: 2
          },
          {
            folderName: "light-theme/catto-red-horizontal",
            frameCount: 3,
            duration: 3,
            bestFrame: 2
          }
        ]
      }
    }
  }
  // contactAnimation: {
  //   info: {},
  //   currentSession: {"vertical": {},"horizontal": {}}
  // }
}

export default animations;