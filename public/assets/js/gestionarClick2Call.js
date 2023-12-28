
let seguro = null, sexo = null, fecha_nac = null, provincia = null, pago = null, salud = null,
  estudiante = null, capital = null;
$('#modal-te-llamamos-gratis').on('hidden.bs.modal', function (e){
  seguro = null;
  sexo = null;
  fecha_nac = null;
  provincia = null;
  pago = null;
  salud = null;
  estudiante = null;
  capital = null;
  document.getElementById('phone_response_block_modal').innerHTML = '<input type="text" placeholder="Teléfono" class="campo-telefono" id="campo_telefono_modal" maxlength="9">';
  document.getElementById('acept_polit_modal').checked = false;
});

function isMobile(phone){
  if (/[0-9]{9}/.test(phone) && phone.length == 9 && (phone.substr(0, 1) == '6' || phone.substr(0, 1) == '7')){
    if (phone != '666666666'){
      return true
    }
  }
  return false
}
function isFijo(phone){
  return (/[0-9]{9}/.test(phone) && phone.length == 9 && (phone.substr(0, 1) == '8' || phone.substr(0, 1) == '9') && (phone.substr(0, 2) != '90') && (phone != 999999999));
}

function meInteresa(seguro_param){
  seguro = seguro_param;
}

function meInteresaCalculo(seguro_param=null, sexo_param=null, fecha_nac_param=null, provincia_param=null, pago_param=null, salud_param=null, estudiante_param=null, capital_param=null, telefono_param=null){
  let reg = /_/gi;
  seguro = encodeURIComponent(seguro_param.toUpperCase().replace(reg, ' '));
  sexo = sexo_param;
  if (fecha_nac_param){
    let array_fecha = fecha_nac_param.split('-');
    let nueva_fecha = array_fecha[2] + '-' + array_fecha[1] + '-' + array_fecha[0].substr(2);
    fecha_nac = nueva_fecha;
  }
  provincia = encodeURIComponent(provincia_param);
  pago = pago_param;
  salud = salud_param;
  estudiante = estudiante_param;
  capital = capital_param;
  if (telefono_param)
    $('#campo_telefono_modal').val(telefono_param)
}

function sendClick2call(id_block, telefono, checked, response=null){
  if (isMobile(telefono) || isFijo(telefono)){
    if (checked){
      // let url = 'https://lepho20.aviloncenter.com/Artemisa/leads.php?';
      let url = 'http://backend.agrmediacion.com/es/api/send_click2call?';

      if (docCookies.hasItem('fuente'))
        url += 'fuente=' + docCookies.getItem('fuente') + '&';
      if (docCookies.hasItem('campana'))
        url += 'campana=' + docCookies.getItem('campana') + '&';
      if (seguro)
        url += 'seguro=' + seguro + '&';
      if (sexo)
        url += 'sexo=' + sexo + '&';
      if (fecha_nac)
        url += 'fecha_nac=' + fecha_nac + '&';
      if (provincia)
        url += 'provincia=' + provincia + '&';
      if (pago)
        url += 'pago=' + pago + '&';
      if (salud)
        url += 'salud=' + (salud === 'si' ? 1 : 0) + '&';
      if (salud)
        url += 'estudiante=' + (estudiante === 'si' ? 1 : 0) + '&';
      if (capital)
        url += 'capital=' + capital + '&';
      url += 'telefono=' + telefono + '&';
      url += "privacidad=1&cookies=1&id_cargue=1&id_cons=abcd1234";

      fetch(url, {method: 'GET'}).then(function (res){
        return res.json();
      }).then(function (data){
        if (data['success'] && data['message'] == 'ok'){
          if (typeof response === 'function'){
            response();
          }else{
            let respuesta = '';
            if (typeof response === 'string'){
              respuesta = response;
            }else{
              respuesta = '<div ><span class="ctc-resp", id="alert_success">Uno de nuestros agentes<br>se pondrá en contacto contigo.<br></span></div>';
            }
            document.getElementById(id_block).innerHTML = respuesta;
          }
          // virginEvent('formulario conversion');
          // adsConversion('formSubmitOK');
        }else{
          console.error(data['message']);
        }
      }).catch(function (error){
        console.error('Error:', error)
      })
    }else{
      crearMensaje("Debes aceptar la política de privacidad", 'danger');
    }
  }else{
    crearMensaje("Debes introducir un Teléfono válido", 'danger');
  }
  return false;
}
