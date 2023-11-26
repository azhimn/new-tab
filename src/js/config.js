const configDefault = {
  "ver" : "0.4",

  "config" : {
    "command" : "cfg",
    "style" : {
      "background" : "#1E2021",
      "primary" : "#c6d08a",
      "mute" : "#846d57",
      "greet" : "Welcome back!"
    },

    "engine" : {
      "active" : "ddg",
      "ddg" : "https://duckduckgo.com/?q=",
      "google" : "https://www.google.com/search?q=",
      "yandex" : "https://yandex.com/search/?text=",
      "bing" : "https://www.bing.com/search?q="
    }
  },
  
  "web" : {
    "yt" : {
      "description" : "Open or search Youtube",
      "url" : "https://www.youtube.com",
      "param" : {
        "search" : "/results?search_query="
      }
    },
    "w" : {
      "description" : "Open or search Wikipedia",
      "url" : "https://en.wikipedia.org",
      "param" : {
        "search" : "/wiki/"
      }
    },
    "gm" : {
      "description" : "Open Gmail",
      "url" : "https://mail.google.com",
      "param" : {
        "u" : "/mail/u/"
      }
    },
    "gh" : {
      "description" : "Open or search Github",
      "url" : "https://github.com",
      "param" : {
        "search" : "/search?q="
      }
    },
    "arch" : {
      "description" : "Open Arch Linux website or search Arch Linux Wiki",
      "url" : "https://archlinux.org/",
      "param" : {
        "search" : "https://wiki.archlinux.org/index.php?search="
      }
    }
  }
};