jQuery(document).ready(function ($) {
  let autoPlayDelay = 5000;
  let options = {
    init: true,
    loop: false,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    centeredSlides: "true",
    autoplay: {
      delay: autoPlayDelay,
    },
    breakpoints: {
      320: {
        // spaceBetween: 0
      },
      480: {
        // spaceBetween: 30
      },
      640: {
        // spaceBetween: 30
      },
    },
  };
  let mySwiper = new Swiper(".swipers", options);
  let slidersCount = mySwiper.params.loop
    ? mySwiper.slides.length - 2
    : mySwiper.slides.length;
  let widthParts = 100 / slidersCount;
  $(".swiper-counter .total").html(slidersCount);
  for (let i = 0; i < slidersCount; i++) {
    $(".swiper-progress-bar .progress-sections").append("<span></span>");
  }
  function initProgressBar() {
    let calcProgress =
      (slidersCount - 1) * (autoPlayDelay + mySwiper.params.speed);
    calcProgress += autoPlayDelay;
    $(".swiper-progress-bar .progress").animate(
      {
        width: "100%",
      },
      calcProgress,
      "linear"
    );
  }
  initProgressBar();
  mySwiper.on("slideChange", function () {
    let progress = $(".swiper-progress-bar .progress");
    $(".swiper-counter .current").html(this.activeIndex + 1);
    if (
      (this.progress == -0 || (this.progress == 1 && this.params.loop)) &&
      !progress.parent().is(".stopped")
    ) {
      progress.css("width", "0");
      if (this.activeIndex == 0) {
        initProgressBar();
      }
    }
    if (progress.parent().is(".stopped")) {
      progress.animate(
        {
          width: Math.round(widthParts * (this.activeIndex + 1)) + "%",
        },
        this.params.speed,
        "linear"
      );
    }
  });

  mySwiper.on("touchMove", function () {
    $(".swiper-progress-bar .progress").stop().parent().addClass("stopped");
  });

  // Slider Setting for partners
  var partnerSwiper = new Swiper(".partners-group-swiper", {
    slidesPerView: 6,
    spaceBetween: 10,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: ".partners-swiper-button-next",
      prevEl: ".partners-swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 4,
      },
      576: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 5,
      },
      992: {
        slidesPerView: 6,
      },
    },
  });

  // Slider Setting for comments
  var commentsSwiper = new Swiper(".comments-swiper", {
    slidesPerView: 3,
    spaceBetween: 10,
    pagination: {
      el: ".comments-swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".comments-swiper-button-next",
      prevEl: ".comments-swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });

  // Search Button
  $(".search-button").click(function () {
    $(".search-input").val("").toggle();
  });
});

const myCountdown = new countdown({
  target: '.countdown',
  dayWord: ' Days',
  hourWord: ' Hours',
  minWord: ' Mins',
  secWord: ' Seconds'
});