const animations = {
  mainPageAnimation: {
    info: {
      // markers: {startColor: "yellow", endColor: "red"},
      markers: false,
      id: "main-page-animation",
      trigger: "#main-page",
      start: "top top+=1",
      end: "+=200% bottom-=1"
    },
    startSession: {
      "dark-theme": [
        {
          folderName: "dark-theme/catto",
          frameCount: 132,
          duration: 6
        }
      ],
      "light-theme": [
        {
          folderName: "light-theme/catto",
          frameCount: 103,
          duration: 6
        }
      ]
    },
    currentSession: {
      "dark-theme": [
        {
          folderName: "dark-theme/catto-blue",
          frameCount: 101,
          duration: 6
        },
        {
          folderName: "dark-theme/catto-red",
          frameCount: 101,
          duration: 6
        }
      ],
      "light-theme": [
        {
          folderName: "light-theme/catto-blue",
          frameCount: 104,
          duration: 6
        },
        {
          folderName: "light-theme/catto-red",
          frameCount: 97,
          duration: 6
        }
      ]
    }
  }
}

export default animations;