angular
      .module('vowolita.menuDrawer.drawer', [        
        'vowolita.menuDrawer.translateService',
        'vowolita.menuDrawer.LayoutConfig',
        'vowolita.menuDrawer.elements'])
      .factory('menuDrawer',['appElements','menuDrawerLayoutConfig','translationService',menuDrawer]);


function menuDrawer(appElements,menuDrawerLayoutConfig,translationService) {
  var menuDrawer = {
    init:init,
    move:move,
    show:show,
    hide:hide,
    touchEnd:touchEnd,
    toggle:toggle
  };
  return menuDrawer;


  function init (){
    console.log("drawer init");
    appElements.swipe = document.getElementById('swipeArea');
    appElements.hammerSwipe = new Hammer(appElements.swipe);
    appElements.menuDrawer = document.getElementById('menuDrawer');
    appElements.hammerMenuDrawer = new Hammer(appElements.menuDrawer);
    appElements.menuDrawerBackDrop = document.getElementById('backDrop');
    appElements.hammerMenuDrawerBackDrop = new Hammer(appElements.menuDrawerBackDrop);
    menuDrawerLayoutConfig.deviceWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    menuDrawerLayoutConfig.deviceHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    menuDrawerLayoutConfig.maxWidth = menuDrawerLayoutConfig.options.maxWidth > menuDrawerLayoutConfig.deviceWidth-56 ? menuDrawerLayoutConfig.deviceWidth-56 : menuDrawerLayoutConfig.options.maxWidth;
    translationService.translate( appElements.menuDrawer, menuDrawerLayoutConfig.maxWidth, '-', 0, '', 0, '', menuDrawerLayoutConfig.maxWidth );
    // console.log(appElements)
    appElements.hammerMenuDrawer.on("panleft panright", function( ev ){
      // console.log('hammerMenuDrawer ok');
      if ( menuDrawer.openned ) menuDrawer.move( ev, true );
    });
    appElements.hammerMenuDrawerBackDrop.on("panleft panright", function(ev) {
      // console.log('hammerMenuDrawerBackDrop ok');
      if ( menuDrawer.openned ) menuDrawer.move( ev );
    });
    appElements.hammerSwipe.on("panright panleft", function(ev) {
      // console.log('hammerSwipe ok');
      menuDrawer.move( ev );
    });


    window.onresize = function(event) {
      menuDrawerLayoutConfig.deviceWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      menuDrawerLayoutConfig.deviceHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      menuDrawerLayoutConfig.maxWidth = menuDrawerLayoutConfig.options.maxWidth > menuDrawerLayoutConfig.deviceWidth-56 ? menuDrawerLayoutConfig.deviceWidth-56 : menuDrawerLayoutConfig.options.maxWidth;

      if ( !menuDrawer.openned ){
        translationService.translate( appElements.menuDrawer, menuDrawerLayoutConfig.maxWidth, '-', 0, '', 0, '', menuDrawerLayoutConfig.maxWidth );
      }else{
        translationService.translate( appElements.menuDrawer, 0, '', 0, '', 0, '', menuDrawerLayoutConfig.maxWidth );
      }

    };

    menuDrawer.touchEnd( appElements.swipe );
    menuDrawer.touchEnd( appElements.menuDrawer );
    menuDrawer.touchEnd( appElements.menuDrawerBackDrop );
    // console.log('menu drawer init ok')
  }

  function show() {
    // show drawer with animation
    appElements.menuDrawer.style.transition = 'all '+menuDrawerLayoutConfig.options.speed+'s '+menuDrawerLayoutConfig.options.animation;
    menuDrawerLayoutConfig.maxWidth = menuDrawerLayoutConfig.options.maxWidth > menuDrawerLayoutConfig.deviceWidth-56 ? menuDrawerLayoutConfig.deviceWidth-56 : menuDrawerLayoutConfig.options.maxWidth;
    translationService.translate( appElements.menuDrawer, 0, '', 0, '', 0, '', menuDrawerLayoutConfig.maxWidth );
    // show backdrop
    // appElements.menuDrawerBackDrop.style.transition = 'all '+menuDrawerLayoutConfig.options.speed+'s '+menuDrawerLayoutConfig.options.animation;
    appElements.menuDrawerBackDrop.style.transition = 'none';
    appElements.menuDrawerBackDrop.style.visibility = 'visible';
    appElements.menuDrawerBackDrop.style.opacity = '0.5';
    menuDrawer.openned = true;
    menuDrawerLayoutConfig.options.reverse = true;
    // console.log('show ok');
  }

  function hide() {
    // hide drawer
    appElements.menuDrawer.style.transition = 'all '+menuDrawerLayoutConfig.options.speed+'s '+menuDrawerLayoutConfig.options.animation;
    translationService.translate( appElements.menuDrawer, menuDrawerLayoutConfig.maxWidth, '-', 0, '', 0, '' );
    // show backdrop
    // appElements.menuDrawerBackDrop.style.transition = 'all '+menuDrawerLayoutConfig.options.speed+'s '+menuDrawerLayoutConfig.options.animation;
    appElements.menuDrawerBackDrop.style.transition = 'none';
    appElements.menuDrawerBackDrop.style.visibility = 'hidden';
    appElements.menuDrawerBackDrop.style.opacity = '0';
    menuDrawer.openned = false;
    // console.log('hide ok')
  }

  function move(ev , hold) {
    // check for direction
    menuDrawerLayoutConfig.options.direction = ev.type === 'panleft' ? 'left' : 'right';
    // figure out position, depending on wheter we are holding drawer itself somwhere in the middle
    // or just the edge
    var pos = ev.center.x - menuDrawerLayoutConfig.maxWidth;
    if (hold){
      menuDrawerLayoutConfig.options.holdPos = menuDrawerLayoutConfig.options.holdPos ? menuDrawerLayoutConfig.options.holdPos : pos;
      pos = pos + Math.abs(menuDrawerLayoutConfig.options.holdPos);
      // console.log('onhold position',pos)
    }
    pos = pos < 0 ? pos: 0;
    console.log('Position',pos);
    // calculate opacity of background dimmer based on touch position (within max width range 0-100%)
    var opacityModder = menuDrawerLayoutConfig.options.maxWidth - Math.abs(pos);
    var opacity = ( opacityModder / (menuDrawerLayoutConfig.options.maxWidth/100) / 100 ).toFixed(2);
        opacity = opacity < 0.5 ? opacity : 0.5;
    // animate  menu icon
    // show  background backdrop
    appElements.menuDrawerBackDrop.style.transition = 'none';
    appElements.menuDrawerBackDrop.style.visibility = 'visible';
    appElements.menuDrawerBackDrop.style.opacity = opacity;
    // move the menu drawer
    appElements.menuDrawer.style.transition = 'none';
    menuDrawerLayoutConfig.maxWidth = menuDrawerLayoutConfig.options.maxWidth > menuDrawerLayoutConfig.deviceWidth-56 ? menuDrawerLayoutConfig.deviceWidth-56 : menuDrawerLayoutConfig.options.maxWidth;
    translationService.translate( appElements.menuDrawer, pos, '', 0, '', 0, '', menuDrawerLayoutConfig.maxWidth );
    // if this is final touch (mouse move) event
    // show or hide the drawer (pannig left = open, right = close)
    // and clean our temp values
    menuDrawer.openned = true;
    if ( ev.isFinal ){
      if ( menuDrawerLayoutConfig.options.direction === 'left' ){
        menuDrawer.hide();
      }else{
        menuDrawer.show();
      }
      menuDrawerLayoutConfig.options.holdPos = null;
      menuDrawerLayoutConfig.options.endTrue = false;
    }else{
      menuDrawerLayoutConfig.options.endTrue = true;
    }
    // console.log('move ok')
  }

  function touchEnd(element) {
    // listen for touch end event on touch devices
    menuDrawerLayoutConfig.onTouch = 'ontouchstart' in window ? true : false;
    if ( menuDrawerLayoutConfig.onTouch ){
      element.addEventListener('touchend', function(e){
        // console.log('touchend function')
        onEnd(e, true);
      }, false);
    }else{
      element.addEventListener('mouseup', function(e){
          // console.log('mouseup function')
        onEnd(e, false);
      }, false);
    }
    var onEnd = function(e, touch){
      // console.log('onEnd function')
      // get the touch reference
      // reference first touch point for this event
      var touchobj = touch ? e.changedTouches[0] : e;
      // if the drawer is pulled more than 25% of its maxWidth
      var isBigger = touchobj.clientX > (menuDrawerLayoutConfig.options.maxWidth/4);
      // combined with the direction
      // console.log('Touch point',touchobj.clientX)
      var isLeft = menuDrawerLayoutConfig.options.direction === 'left';
      var isRight = menuDrawerLayoutConfig.options.direction === 'right';
      var endTrue = menuDrawerLayoutConfig.options.endTrue;
      // decide if show or hide the drawer
      if ( (isBigger && isLeft && endTrue) || (isBigger && isRight && endTrue) ){
        // console.log('show onEnd')
        menuDrawer.show();
      }else if ( (!isBigger && isLeft && endTrue) || (!isBigger && isRight && endTrue) ){
        menuDrawer.hide();
        console.log('hide onEnd');
      }
      // clean up our temp variables
      menuDrawerLayoutConfig.options.direction = false;
      menuDrawerLayoutConfig.options.endTrue = false;
      menuDrawerLayoutConfig.options.holdPos = null;
      e.preventDefault();
    };
  }

  function toggle () {
    if ( menuDrawer.openned ){
      // console.log('menu hide')
      menuDrawer.hide();
    }else{
      // console.log(' menu show')
      menuDrawer.show();
    }
  }
}
