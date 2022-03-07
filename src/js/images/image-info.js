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
        "desktop": {
          "dark-theme": [
            {
              src: "main-page/dark-theme/saludo-3.png",
              style: "transform: translate(160%, 5%)"
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
        "phone": {
          "dark-theme": [
            {
              src: "main-page/dark-theme/saludo-3-mobile.png",
              style: "transform: translate(5%, 0) scale(2)"
            }
          ],
          "light-theme": [
            {
              src: "main-page/light-theme/saludo-2-mobile.png",
              style: "transform: translate(31%, -4%) scale(2)"
            }
          ]
        }
      },
      currentSession: {
        "desktop": {
          "dark-theme": [
            {
              src: "main-page/dark-theme/saludo-3.png",
              style: "transform: translate(160%, 0)"
            }
          ],
          "light-theme": [
            {
              src: "main-page/light-theme/saludo-2.png",
              style: "transform: translate(85%, 5%); z-index: 2"
            }
          ]
        },
        "phone": {
          "dark-theme": [
            {
              src: "main-page/dark-theme/portatil-1-mobile.png",
              style: "transform: translate(36%, 90%) scale(1)"
            }
          ],
          "light-theme": [
            {
              src: "main-page/light-theme/baje-1-mobile.png",
              style: "transform: translate(26%, 56%) scale(2.2)",
              elementStyling: [
                {
                  selector: "",
                  style: ""
                }
              ]
            }
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
        "desktop": {
          "dark-theme": [
            {src: "contact/dark-theme/contacto-1.png"},
            {src: "contact/dark-theme/contacto-2.png"}
          ],
          "light-theme": [
            {src: "contact/light-theme/contacto-1.png"}
          ]
        }
      },
      currentSession: {
        "desktop": {
          "dark-theme": [
            {src: "contact/dark-theme/contacto-1.png"},
            {src: "contact/dark-theme/contacto-2.png"}
          ],
          "light-theme": [
            {src: "contact/light-theme/contacto-1.png"}
          ]
        }
      }
    }
  },
  normal: {
    tutdlImage: {
      "desktop": {
        "dark-theme": {src: "my-portfolio/the-ultimate-to-do-list/dark-theme/app.png"}
        ,
        "light-theme": {src: "my-portfolio/the-ultimate-to-do-list/light-theme/app.png"}
      },
      "phone": {
        "dark-theme": {src: "my-portfolio/the-ultimate-to-do-list/dark-theme/app-mobile.png"}
        ,
        "light-theme": {src: "my-portfolio/the-ultimate-to-do-list/light-theme/app-mobile.png"}
      }
    }
  },
  static: {
    artdImage: {
      "desktop": {src: "my-portfolio/art-democracy/app.png"},
      "phone": {src: "my-portfolio/art-democracy/app.png"}
    }
  }
}

export default images;