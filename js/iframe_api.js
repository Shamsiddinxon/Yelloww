var scriptUrl =
  "https://www.youtube.com/s/player/8ad9c87a/www-widgetapi.vflset/www-widgetapi.js";
try {
  var ttPolicy = window.trustedTypes.createPolicy("youtube-widget-api", {
    createScriptURL: function (x) {
      return x;
    },
  });
  scriptUrl = ttPolicy.createScriptURL(scriptUrl);
} catch (e) {}
if (!window["YT"]) var YT = { loading: 0, loaded: 0 };
if (!window["YTConfig"]) var YTConfig = { host: "https://www.youtube.com" };
if (!YT.loading) {
  YT.loading = 1;
  (function () {
    var l = [];
    YT.ready = function (f) {
      if (YT.loaded) f();
      else l.push(f);
    };
    window.onYTReady = function () {
      YT.loaded = 1;
      for (var i = 0; i < l.length; i++)
        try {
          l[i]();
        } catch (e$0) {}
    };
    YT.setConfig = function (c) {
      for (var k in c) if (c.hasOwnProperty(k)) YTConfig[k] = c[k];
    };
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.id = "www-widgetapi-script";
    a.src = scriptUrl;
    a.async = true;
    var c = document.currentScript;
    if (c) {
      var n = c.nonce || c.getAttribute("nonce");
      if (n) a.setAttribute("nonce", n);
    }
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b);
  })();
}

window.onYouTubeIframeAPIReady = function () {
  var videoModules = document.querySelectorAll(".video");
  videoModules = Array.prototype.slice.call(videoModules);
  videoModules.forEach(initializeVideoModule);
};
function initializeVideoModule(videoModule) {
  var player = new YT.Player(videoModule.querySelector(".video-placeholder"), {
    videoId: videoModule.dataset.videoId,
    events: {
      onStateChange: function (event) {
        var isEnded = event.data === YT.PlayerState.ENDED;
        videoModule.classList[isEnded ? "remove" : "add"]("playing");
        if (isEnded) {
          player.destroy();
          videoModule.querySelector(".video-layer").innerHTML =
            '<div class="video-placeholder"></div>';
          initializeVideoModule(videoModule);
        }
      },
    },
  });
}
