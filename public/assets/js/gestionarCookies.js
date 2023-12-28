var caduca = new Date();
var validez = 1;
caduca.setTime(caduca.getTime() + (validez * 730 * 24 * 60 * 1000));
var docCookies = {
  getItem: function (sKey){
    if (!sKey){
      return null;
    }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure){
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)){
      return false;
    }
    var sExpires = "; expires=" + (vEnd ? vEnd.toString() : '');
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain){
    if (!this.hasItem(sKey)){
      return false;
    }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey){
    if (!sKey){
      return false;
    }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function (){
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++){
      aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
    }
    return aKeys;
  }
};

function acceptAllCookies(form_cookies){
  if (form_cookies){
    document.getElementById('cookies_necesarias').checked = true;
    document.getElementById('cookies_estadisticas').checked = true;
  }
  docCookies.setItem('famedic', 'famedic', caduca);
  docCookies.setItem('cookies_necesarias', 'cookies_necesarias', caduca);
  docCookies.setItem('cookies_estadisticas', 'cookies_estadisticas', caduca);

  closeSmallModalCookies();
}

function acceptCookie(cookie, accept){
  if (!docCookies.hasItem('famedic'))
    docCookies.setItem('famedic', 'famedic', caduca);
  if (!docCookies.hasItem('cookies_necesarias'))
    docCookies.setItem('cookies_necesarias', 'cookies_necesarias', caduca);

  if (accept && !docCookies.hasItem(cookie))
    docCookies.setItem(cookie, cookie, caduca);
  else if (!accept && docCookies.hasItem(cookie))
    docCookies.removeItem(cookie);

  closeSmallModalCookies();
}

function checkCookiesStatics(){
  return docCookies.hasItem('cookies_estadisticas');
}

function checkCookies(form_cookies){
  if (form_cookies){
    document.getElementById('cookies_necesarias').checked = true;
    document.getElementById('cookies_estadisticas').checked = checkCookiesStatics();
  }
  return docCookies.hasItem('famedic')
}

function showSmallModalCookies(){
  document.getElementById("div_cookies").style.display = "block";
}
function closeSmallModalCookies(){
  document.getElementById("div_cookies").style.display = "none";
}

function checkClick2CallFormSend(){
  if (docCookies.hasItem('form-click2call-send')){
    let date = new Date();
    for (let i = 0; i < document.getElementsByClassName('form_click2call_container').length; i++)
      document.getElementsByClassName('form_click2call_container')[i].style.display = 'none';
    for (let i = 0; i < document.getElementsByClassName('phone_response_block_message').length; i++){
      document.getElementsByClassName('phone_response_block_message')[i].innerText = docCookies.getItem('form-click2call-message');
      document.getElementsByClassName('phone_response_block_message')[i].removeAttribute('hidden');
    }

    setTimeout(function (){
      if (docCookies.hasItem('form-click2call-send')){
        docCookies.removeItem('form-click2call-send');
        docCookies.removeItem('form-click2call-message');
      }
      for (let i = 0; i < document.getElementsByClassName('phone_response_block').length; i++)
        document.getElementsByClassName('form_click2call_container')[i].style.display = 'block';
    }, parseInt(docCookies.getItem('form-click2call-send')) - date.getTime());
  }
}