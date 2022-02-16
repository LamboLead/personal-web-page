const images = {
  dynamic: {
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
              src: "main-page/dark-theme/saludo-1.png",
              style: "transform: translate(150%, 5%)"
            },
            {
              src: "main-page/dark-theme/saludo-3.png",
              style: "transform: translate(145%, 0%)"
            }
          ],
          "light-theme": [
            {
              src: "main-page/light-theme/saludo-1.png",
              style: "transform: translate(-100%, 11%)"
            },
            {
              src: "main-page/light-theme/saludo-2.png",
              style: "transform: translate(85%, 5%); z-index: 2"
            }
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
            {
              src: "main-page/dark-theme/portatil-1.png",
              style: "transform: translate(127%, -2%)"
            },
            {
              src: "main-page/dark-theme/baje-1.png",
              style: "transform: translate(131%, -8%)"
            },
            {
              src: "main-page/dark-theme/baje-2.png",
              style: "transform: translate(120%, 0)"

            }
          ],
          "light-theme": [
            {
              src: "main-page/light-theme/baje-1.png",
              style: "transform: translate(14%, -6%); z-index: 2"
            }
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
    },
    contactImage: {
      info: {
        // markers: true,
        id: "contact-animation",
        trigger: "#contact",
        start: "top-=50% top+=1",
        end: "bottom -=30%"
      },
      startSession: {
        "vertical": {
          "dark-theme": [
            {src: "contact/dark-theme/contacto-1.png"},
            {src: "contact/dark-theme/contacto-2.png"}
          ],
          "light-theme": [
            {src: "contact/light-theme/contacto-1.png"}
          ]
        },
        "horizontal": {}
      },
      currentSession: {
        "vertical": {
          "dark-theme": [
            {src: "contact/dark-theme/contacto-1.png"},
            {src: "contact/dark-theme/contacto-2.png"}
          ],
          "light-theme": [
            {src: "contact/light-theme/contacto-1.png"}
          ]
        },
        "horizontal": {}
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