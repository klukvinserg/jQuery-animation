$(document).ready(function () {
  let arr = [
    'slide1.jpg',
    'slide2.jpg',
    'slide3.jpg',
    'slide4.jpg',
    'slide5.jpg',
  ];

  let count = 0;

  let widthSlide = 800;

  let stopSlide = 1;

  let resizeStatus = 0;

  function pointMotion() {
    let arrPointShow = document.getElementsByClassName('point-inner');

    for (let i = 0; i < arrPointShow.length; i++) {
      $(`.point${i + 1}`).css('background-color', 'transparent');
    }
    $(`.point${count + 1}`).css('background-color', 'rgb(16, 133, 151)');

    if (count === 0) {
      $('.fa-step-backward').addClass('disabled-fa');
      $('.fa-backward').addClass('disabled-fa');
      $('.fa-step-forward').removeClass('disabled-fa');
      $('.fa-forward').removeClass('disabled-fa');
      $('.fa-play-circle').removeClass('disabled-fa');
      $('.fa-expand-arrows-alt').removeClass('disabled-fa');
      $('.fa-compress-arrows-alt').removeClass('disabled-fa');
      $('.point-inner').removeClass('disabled-point');
    } else if (count > 0 && count < arr.length - 1) {
      $('.fa-step-backward').removeClass('disabled-fa');
      $('.fa-backward').removeClass('disabled-fa');
      $('.fa-play-circle').removeClass('disabled-fa');
      $('.fa-step-forward').removeClass('disabled-fa');
      $('.fa-forward').removeClass('disabled-fa');
      $('.fa-expand-arrows-alt').removeClass('disabled-fa');
      $('.fa-compress-arrows-alt').removeClass('disabled-fa');
      $('.point-inner').removeClass('disabled-point');
    } else if (count >= arr.length - 1) {
      $('.fa-step-backward').removeClass('disabled-fa');
      $('.fa-backward').removeClass('disabled-fa');
      $('.fa-step-forward').addClass('disabled-fa');
      $('.fa-forward').addClass('disabled-fa');
      $('.fa-play-circle').addClass('disabled-fa');
      $('.fa-expand-arrows-alt').removeClass('disabled-fa');
      $('.fa-compress-arrows-alt').removeClass('disabled-fa');
      $('.point-inner').removeClass('disabled-point');
    }
  }

  for (let i = 0; i < arr.length; i++) {
    $('#slide-inner').append(`<img src="img/${arr[i]}" alt="slide${i + 1}">`);
    $('#point').append(
      `<div class="point-inner point${i + 1}" key="${i + 1}"></div>`
    );
  }

  $(`.point${count + 1}`).css('background-color', 'rgb(16, 133, 151)');

  $('.point-inner').click(function (e) {
    count = Number(e.currentTarget.attributes[1].nodeValue) - 1;

    let showSlide = -count * widthSlide;

    $('#slide-inner').animate(
      {
        left: `${showSlide}px`,
      },
      500
    );

    pointMotion();
  });

  $('.fa-forward').click(function (e) {
    stopSlide = 1;
    showSlide = (-count - 1) * widthSlide;

    count = count + 1;

    $('#slide-inner').animate(
      {
        left: `${showSlide}px`,
      },
      500
    );

    pointMotion();
  });

  $('.fa-backward').click(function (e) {
    stopSlide = 1;
    showSlide = -(count - 1) * widthSlide;

    count = count - 1;

    $('#slide-inner').animate(
      {
        left: `${showSlide}px`,
      },
      500
    );

    pointMotion();
  });

  $('.fa-step-forward').click(function (e) {
    stopSlide = 1;
    count = arr.length - 1;

    showSlide = count * widthSlide;

    $('#slide-inner').animate(
      {
        left: `-${showSlide}`,
      },
      500
    );

    pointMotion();
  });

  $('.fa-step-backward').click(function (e) {
    stopSlide = 1;
    count = 0;

    $('#slide-inner').animate(
      {
        left: `0px`,
      },
      500
    );

    pointMotion();
  });

  $('.fa-stop-circle').click(function (e) {
    $('.fa-stop-circle').addClass('div-none');
    $('.fa-play-circle').removeClass('div-none');
    stopSlide = 0;
  });

  $('.fa-play-circle').click(function (e) {
    $('.fa-play-circle').addClass('div-none');
    $('.fa-stop-circle').removeClass('div-none');
    $('.point-inner').addClass('disabled-point');
    if (stopSlide === 1) {
      slideMotion();
    }
  });

  $('.fa-expand-arrows-alt').click(function (e) {
    resizeStatus = 1;

    let windowInnerHeight = document.documentElement.clientHeight - 180;

    widthSlide = windowInnerHeight * 1.78;

    $('#slide-inner').css('left', `-${widthSlide * count}px`);

    $('.main').css('width', `${widthSlide}`);
    $('.slide').css('width', `${widthSlide}`);
    $('img').css('width', `${widthSlide}`);

    $('.resize').css('display', 'none');
    $('.compress').css('display', 'block');
    $('.compress').css('margin-left', `${widthSlide - 80}px`);
  });

  $('.fa-compress-arrows-alt').click(function (e) {
    resizeStatus = 0;

    widthSlide = 800;

    $('#slide-inner').css('left', `-${widthSlide * count}px`);

    $('.main').css('width', `${widthSlide}`);
    $('.slide').css('width', `${widthSlide}`);
    $('img').css('width', `${widthSlide}`);

    $('.resize').css('display', 'block');
    $('.compress').css('display', 'none');
  });

  function slideMotion() {
    if (stopSlide === 0) {
      $('.point-inner').removeClass('disabled-point');
      stopSlide = 1;
      return false;
    }

    $('.fa-backward').addClass('disabled-fa');
    $('.fa-step-backward').addClass('disabled-fa');
    $('.fa-forward').addClass('disabled-fa');
    $('.fa-step-forward').addClass('disabled-fa');
    $('.fa-expand-arrows-alt').addClass('disabled-fa');
    $('.fa-compress-arrows-alt').addClass('disabled-fa');

    if (resizeStatus === 0) {
      widthSlide = 800;
    } else if (resizeStatus === 1) {
      windowInnerHeight = document.documentElement.clientHeight - 180;
      widthSlide = windowInnerHeight * 1.78;
    }

    $('#slide-inner')
      .delay(1000)
      .animate(
        {
          left: `-=${widthSlide}px`,
        },
        2000,
        function () {
          count += 1;

          pointMotion();

          if (count < arr.length - 1) {
            next();
          } else {
            $('.fa-play-circle').addClass('disabled-fa');
            $('.fa-stop-circle').addClass('div-none');
            $('.fa-play-circle').removeClass('div-none');
          }
        }
      );
  }

  function next() {
    $('.point-inner').addClass('disabled-point');
    slideMotion();
  }
});
