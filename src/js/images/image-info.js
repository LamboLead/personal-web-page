const images = {
  dynamic: {
    mainPageImage: {
      info: {
        markers: {startColor: "yellow", endColor: "red"},
        // markers: false,
        id: "main-page-animation",
        trigger: "#main-page",
        start: "top top+=1",
        end: "+=200% bottom-=1"
      },
      startSession: {
        "vertical": {
          "dark-theme": [
            {src: "main-page/dark-theme/catto-vertical-1.png"}
          ],
          "light-theme": [
            {src: "main-page/light-theme/catto-vertical-1.png"}
          ]
        },
        "horizontal": {
          "dark-theme": [
            {src: "main-page/dark-theme/catto-horizontal-1.png"}
          ],
          "light-theme": [
            {src: "main-page/light-theme/catto-horizontal-1.png"}
          ]
        }
      },
      currentSession: {
        "vertical": {
          "dark-theme": [
            {src: "main-page/dark-theme/catto-red-vertical.png"},
            {src: "main-page/dark-theme/catto-blue-vertical.png"}
          ],
          "light-theme": [
            {src: "main-page/light-theme/catto-red-vertical.png"},
            {src: "main-page/light-theme/catto-blue-vertical.png"}
          ]
        },
        "horizontal": {
          "dark-theme": [
            {src: "main-page/dark-theme/catto-red-horizontal.png"},
            {src: "main-page/dark-theme/catto-blue-horizontal.png"}
          ],
          "light-theme": [
            {src: "main-page/light-theme/catto-red-horizontal.png"},
            {src: "main-page/light-theme/catto-blue-horizontal.png"}
          ]
        }
      }
    }
  },
  normal: {
    tutdlImage: {
      "vertical": {
        "dark-theme": {src: "my-portfolio/the-ultimate-to-do-list/dark-theme/app-mobile.png"}
        ,
        "light-theme": {src: "my-portfolio/the-ultimate-to-do-list/light-theme/app-mobile.png"}
      },
      "horizontal": {
        "dark-theme": {src: "my-portfolio/the-ultimate-to-do-list/dark-theme/app.png"}
        ,
        "light-theme": {src: "my-portfolio/the-ultimate-to-do-list/light-theme/app.png"}
      }
    }
  }
}

export default images;