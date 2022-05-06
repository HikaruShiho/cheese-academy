/**
 * @copyright
 * @link
 * @date
 * @project
 * @required
 * @author Hkaru Shiho
 */
/* ============================================
 * 	Main
 * ===========================================*/
$(function () {

  Main = function () {
    this.INNER_WIDTH = $(window).innerWidth();
    this.INNER_HEIGHT = $(window).innerHeight();
    this.$body = $("body");
    this.$sp_menu_btn = $("#sp_menu_btn");
    this.$lf_pagetop = $("#hs_pagetop");
    this.getEventType = this.getEventType();
    this.Init();
  }

  /*
   * Initialize
   *=====================================*/
  Main.prototype.Init = function () {
    let that = this; // Main object
    $(window).resize(function () { that.getWindowSize(); });
    $(window).scroll(function () { that.scrollTrigger(); });
    this.menuOpen();
    this.addFunc();
  }

  /*
   * Get window size
   *=====================================*/
  Main.prototype.getWindowSize = function () {
    this.INNER_WIDTH = $(window).innerWidth();
    this.INNER_HEIGHT = $(window).innerHeight();
  }

  /*
   * Get event type
   * SP:"touchstart", PC:"click"
   *=====================================*/
  Main.prototype.getEventType = function () {
    return $(window).ontouchstart ? "touchstart" : "click";
  }

  /*
   *	Menu open
   *=====================================*/
  Main.prototype.menuOpen = function () {
    let that = this; // Main object
    this.$sp_menu_btn.on(this.getEventType, function () {
      that.$body.toggleClass("menu-open");
    });
  }

  /*
   *	Scroll trigger
   *=====================================*/
  Main.prototype.scrollTrigger = function () {
    let that = this; // Main object

    // Bring up the page-top
    if ($(window).scrollTop() > 0) {
      this.$lf_pagetop.css({ bottom: "200px" });
      this.$body.addClass("start-scrolling");
    } else {
      this.$lf_pagetop.css({ bottom: "-80px" });
      this.$body.removeClass("start-scrolling");
    }

    // Inter section
    let $targets = $(".target");
    $targets.each(function (i, target) {
      let elmDistance = target.getBoundingClientRect().top + ($(target).outerHeight() * 0.5);
      if (that.INNER_HEIGHT > elmDistance) {
        $(target).addClass("inview");
      }
    });
  }

  /*
   *	Additional functions
   *=====================================*/
  Main.prototype.addFunc = function () {

    let that = this;

    // Scrolling in-page links
    $('a[href^="#"]').click(function () {
      if ($(this).parent('#sp_menu')) {
        that.$body.toggleClass("menu-open");
      }
      let href = $(this).attr("href");
      let target = $(href == "#" || href == "" ? 'html' : href);
      let position = target.offset().top;
      $('body, html').animate({ scrollTop: position }, 1000, 'easeInOutExpo');
      return false;
    });

    // Accordion menu
    let $hs_acc_head = $(".hs_acc_head");
    $hs_acc_head.next(".active").show();
    $hs_acc_head.on(this.getEventType, function () {
      $(this).toggleClass("active");
      $(this).next().slideToggle(300);
    });

    // Header mouseover menu
    let $hs_mom_head = $(".hs_mom_head");
    $hs_mom_head.hover(function () {
      $(this).children(".hs_mom_body").stop(true, true).slideDown(300);
    }, function () {
      $(this).children(".hs_mom_body").stop(true, true).slideUp(300);
    });

    // Cursor stalker
    let $cursor = $("#cursor");
    let $stalker = $("#stalker");
    $(document).on('mousemove', function (e) {
      let x = e.clientX;
      let y = e.clientY;
      $cursor.css({
        'top': y + 'px',
        'left': x + 'px',
        'transform': 'translate(-50%, -50%)',
      })
      setTimeout(function () {
        $stalker.css({
          'top': y + 'px',
          'left': x + 'px',
          'transform': 'translate(20px, -16px)',
        });
      }, 100);
    });

    // swiper
    const swiper = new Swiper('.swiper', {
      effect: 'coverflow',
      slidesPerView: 3,
      spaceBetween: 20,
      speed: 800,
      autoheight: true,
      coverflow: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      },
      breakpoints: {//breakpoints
        768: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
      },
      autoplay: {
        delay: 8000, // スライドが切り替わるまでの表示時間(ミリ秒)
        stopOnLast: false, // 最後のスライドまで表示されたら自動再生を中止するか
        disableOnInteraction: true // ユーザーのスワイプ操作を検出したら自動再生を中止するか
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

  }

  new Main();

});