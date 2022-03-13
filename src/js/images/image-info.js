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
              style: "transform: translate(150%, 5%)"
            }
          ],
          "light-theme": [
            {
              src: "main-page/light-theme/saludo-1.png",
              style: "transform: translate(-138%, 6%)"
            },
            {
              src: "main-page/light-theme/saludo-2.png",
              style: "transform: translate(67%, 2%); z-index: 2"
            }
          ]
        },
        "phone": {
          "dark-theme": [
            {
              src: "main-page/dark-theme/saludo-3.png",
              style: "transform: translate(10%, 0)"
            }
          ],
          "light-theme": [
            {
              src: "main-page/light-theme/saludo-1.png",
              style: "transform: translate(40%, 0%)"
            },
            {
              src: "main-page/light-theme/saludo-2.png",
              style: "transform: translate(27%, 2%); z-index: 2"
            }
          ]
        }
      },
      currentSession: {
        "desktop": {
          "dark-theme": [
            {
              src: "main-page/dark-theme/saludo-3.png",
              style: "transform: translate(150%, 0)"
            }
          ],
          "light-theme": [
            {
              src: "main-page/light-theme/saludo-2.png",
              style: "transform: translate(67%, 2%); z-index: 2"
            }
          ]
        },
        "phone": {
          "dark-theme": [
            {
              src: "main-page/dark-theme/saludo-3.png",
              style: "transform: translate(10%, 0)"
            }
          ],
          "light-theme": [
            {
              src: "main-page/light-theme/saludo-2.png",
              style: "transform: translate(27%, 2%); z-index: 2"
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