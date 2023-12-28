
function Captcha(mainCaptcha, divCaptcha, btnRefresh, inputName, alertCaptcha){
  var alpha1 = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0');
  var alpha2 = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
  var alpha3 = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '0');
  var i;
  for (i = 0; i < 6; i++){
    var a = alpha1[Math.floor(Math.random() * alpha1.length)];
    var b = alpha2[Math.floor(Math.random() * alpha2.length)];
    var c = alpha3[Math.floor(Math.random() * alpha3.length)];
    var d = alpha1[Math.floor(Math.random() * alpha1.length)];
    var e = alpha2[Math.floor(Math.random() * alpha2.length)];
    var f = alpha3[Math.floor(Math.random() * alpha3.length)];
    // var g = alpha1[Math.floor(Math.random() * alpha1.length)];
  }
  var code = a + ' ' + b + ' ' + c + ' ' + d + ' ' + e + ' ' + f;
  docCookies.setItem('c', code, 0.0025); //solo 3 minutos de cookie
  //crear el captcha en el div seleccionado
  var contenedor = document.getElementById(mainCaptcha);
  contenedor.innerHTML = '';
  //primera columna
  var div = document.createElement('div');
  div.className = "col-sm-12";
  //columna para la imagen
  var div1 = document.createElement('div');
  div1.className = "col-sm-10";
  div1.style = "float: left";
  var captcha = document.createElement('canvas');
  captcha.id = divCaptcha;
  div1.appendChild(captcha);
  div.appendChild(div1);
  //columna para el refresh
  div1 = document.createElement('div');
  div1.className = "col-sm-2";
  div1.style = "float: left";
  var refresh = document.createElement('a');
  refresh.id = btnRefresh;
  refresh.innerHTML = '';
  refresh.className = "btn btn-primary btn-sm";
  refresh.href = "javascript:void(0);";
  refresh.setAttribute('onclick', "Captcha('" + mainCaptcha + "','" + divCaptcha + "','" + btnRefresh + "', '" + inputName + "', '" + alertCaptcha + "');");
  var icon = document.createElement('i');
  icon.className = "mbri-refresh mbr-bold";
  refresh.appendChild(icon);
  div1.appendChild(refresh);
  div.appendChild(div1);
  contenedor.appendChild(div);
  //columna para el texto
  div = document.createElement('div');
  div.className = "form-group";
  div1 = document.createElement('div');
  div1.className = "form-horizontal text-center";
  var input = document.createElement('input');
  input.id = inputName;
  input.placeholder = 'Escriba lo que muestra la imagen';
  input.className = "form-control text-center";
  var span = document.createElement('span');
  span.className = "text-center text-danger";
  span.id = alertCaptcha;
  span.style = "display: none; color: darkred !important";
  span.innerText = "Captcha incorrecto o ha caducado.";
  div1.appendChild(input);
  div1.appendChild(span);
  div.appendChild(div1);
  contenedor.appendChild(div);
  //columna para el boton
  /*
   div = document.createElement('div');
   div.className = "col-lg-4 col-md-4 col-sm-6 col-xs-12";
   var check = document.createElement('input');
   check.id = "check";
   check.value = "Check";
   check.className = "btn btn-default pull-right";
   check.setAttribute('onclick', "alert(ValidCaptcha('" + mainCaptcha + "', 'txtInput'));");
   div.appendChild(check);
   contenedor.appendChild(div);*/
  CreaIMG(code, divCaptcha);
}

function ValidCaptcha(mainCaptcha, inputName){
  var string1 = removeSpaces(docCookies.getItem('c')).toLowerCase();
  var string2 = removeSpaces(document.getElementById(inputName).value).toLowerCase();
  if (string1 === string2)
    return true;
  else{
    // Captcha(mainCaptcha, inputName);
    return false;
  }

}

function removeSpaces(string){
  return string.split(' ').join('');
}

function CreaIMG(texto, divCaptcha){
  var ctxCanvas = document.getElementById(divCaptcha).getContext('2d');
  var fontSize = "30px";
  var fontFamily = "Arial";
  var width = 200;
  var height = 50;
  //tamaño
  ctxCanvas.canvas.width = width;
  ctxCanvas.canvas.height = height;
  //color de fondo
  ctxCanvas.fillStyle = "whitesmoke";
  ctxCanvas.fillRect(0, 0, width, height);
  //puntos de distorsion
  ctxCanvas.setLineDash([7, 10]);
  ctxCanvas.lineDashOffset = 5;
  ctxCanvas.beginPath();
  var line;
  for (var i = 0; i < (width); i++){
    line = i * 5;
    ctxCanvas.moveTo(line, 0);
    ctxCanvas.lineTo(0, line);
  }
  ctxCanvas.stroke();
  //formato texto
  ctxCanvas.direction = 'ltr';
  ctxCanvas.font = fontSize + " " + fontFamily;
  //texto posicion
  var x = (width / 9);
  var y = (height / 3) * 2;
  //color del borde del texto
  ctxCanvas.strokeStyle = "yellow";
  ctxCanvas.strokeText(texto, x, y);
  //color del texto
  ctxCanvas.fillStyle = "red";
  ctxCanvas.fillText(texto, x, y);
}