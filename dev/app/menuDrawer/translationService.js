angular
.module('vowolita.menuDrawer.translateService',[])
.factory('translationService',translationService);


function translationService () {
  var translationService = {
    translate:translate
  }
  return translationService;


  function translate (el, x, pmX, y, pmY, deg, pmDeg, width, scale, mozieo, opacity) {
        x = x || 0,
        y = y || 0,
        pmX = pmX || '',
        pmY = pmY || '',
        pmDeg = pmDeg || '',
        width = width || false;
        // el = element;
        // scale = scale ? 'scale3d('+scale+',1,1)' : '';

        console.log(  el.id)
        if ( el.id === 'menuIconTopLine' ){
          el.style.transformOrigin = '100% 100%';
        }else if ( el.id === 'menuIconBottomLine' ){
          el.style.transformOrigin = '100% 0%';
        }
        // el.style.transform = 'translate3d('+pmX+x+'px, '+pmY+y+'px, 10px) rotate3d( 0, 0, 1, '+pmDeg+deg+'deg ) ' + scale;
        el.style.transform = 'translate3d('+pmX+x+'px, '+pmY+y+'px, 10px)';
        // console.log("EEEEEEEEEE");
        // console.log(el.style.transform);
        // el.style.transform =   'translateX('+pmX+x+'px) translateZ(0) rotate('+pmDeg+deg+'deg)' + scale;
        // el.style.webkitTransform = 'translateX('+pmX+x+'px) translateY('+pmY+y+'px) translateZ(0) rotate('+pmDeg+deg+'deg) ' + scale;
        el.style.webkitTransform = 'translateX('+pmX+x+'px) translateY('+pmY+y+'px) translateZ(0)';
        // console.log(el.style.webkitTransform);
    // console.log(  el.id)
    if ( width ) el.style.width = width+'px';
    if ( opacity ) el.style.opacity = opacity;
    if ( width ) el.style['max-width'] = width+'px';
  }
}
