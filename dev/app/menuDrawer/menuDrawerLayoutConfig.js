angular
      .module('vowolita.menuDrawer.LayoutConfig',[])
      .factory('menuDrawerLayoutConfig',[menuDrawerLayoutConfig])

function menuDrawerLayoutConfig () {
  var defaultConfiguration = {
    isOpen:false,
    holdedPosition:false,
    options : {
      maxWidth:300, //maximum width drawer can open
      topBarHeight:100, //use to push down the view content ,currently is set to 100px because topbar (57px)with tab bar(44px)
      speed: 0.3,//animation speed
      animation:'ease',
      menuIcon: {
        endY: 6,
        startScale: 1,
        endScale: 0.7
      }
    }
  }
  return defaultConfiguration;
}
