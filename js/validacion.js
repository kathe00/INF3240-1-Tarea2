define(["require", "exports", "jquery"], function (require, exports, jquery) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var $ = jquery;
    /* Función del checkbox "otro" */
    funcionOtro();
    /* validación */
    //obtener el formulario
    var formulario = document.querySelectorAll('.needs-validation');
    //obtener los arreglos de checkbox
    var checkLenguaje = document.getElementsByName('stackCheckBox');
    var checkAsignatura = document.getElementsByName('stackCheckBox2');
    var checkRadio = document.getElementsByName('stackRadio');
    //y los otros elementos
    var nom = document.getElementById('nombre');
    var rut = document.getElementById('rut');
    var tel = document.getElementById('telefono');
    var email = document.getElementById('email');
    var check1 = document.getElementById('checkLeng1'); //al cambiar todas a la vez, esta represantará a todas
    var rad = document.getElementById('rad1'); //lo mismo ocurre para los radio
    var check2 = document.getElementById('checkAs1'); //y los checkbox de las asignaturas
    var asig = document.getElementById('asignatura');
    var coments = document.getElementById('coments');
    //se recorre el formulario como un array
    Array.prototype.slice.call(formulario).forEach(function (form) {
        //se crea un event listener del boton "enviar" para validar
        form.addEventListener('submit', function (event) {
            //validar el campo "nombre"
            validarInputSimple("nombre");
            //validar el campo "rut"
            validarRut();
            //validar el campo "email"
            validarInputSimple("email");
            //validar el campo "telefono"
            validarTelefono();
            //validar que se haya seleccionado un lenguaje de interés
            validarCheckBoxRadio(checkLenguaje, 'checkLeng');
            //validar que se seleccione un nivel de programación
            validarCheckBoxRadio(checkRadio, 'rad');
            //validar que se haya seleccionado una asignatura
            validarCheckBoxRadio(checkAsignatura, 'checkAs');
            //validar el campo "asignatura"
            if ($("#checkAs5").is(':checked')) {
                validarInputSimple("asignatura");
            }
            else {
                $("#asignatura").addClass('is-valid');
            }
            //validar que los comentarios no sean más de 500 caracteres
            validarInputSimple("coments");
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            //Si todo ha sido validado, ocultar el formulario
            var estado1 = ((nom === null || nom === void 0 ? void 0 : nom.matches('.is-valid')) && (rut === null || rut === void 0 ? void 0 : rut.matches('.is-valid')) && (email === null || email === void 0 ? void 0 : email.matches('.is-valid')) && (tel === null || tel === void 0 ? void 0 : tel.matches('.is-valid')));
            var estado2 = ((check1 === null || check1 === void 0 ? void 0 : check1.matches('.is-valid')) && (rad === null || rad === void 0 ? void 0 : rad.matches('.is-valid')));
            var estado3 = ((check2 === null || check2 === void 0 ? void 0 : check2.matches('.is-valid')) && (asig === null || asig === void 0 ? void 0 : asig.matches('.is-valid')) && (coments === null || coments === void 0 ? void 0 : coments.matches('.is-valid')));
            if (estado1 && estado2 && estado3) {
                $("#instrucciones").hide();
                $("#formulario").hide();
                //y mostrar el mensaje
                $("#mensaje").prop("hidden", false);
            }
        });
        //event listener para el botón Cancelar
        form.addEventListener('reset', function () {
            //se toman todos los inputs para limpiar y se envian a la función
            var inputs = document.getElementsByTagName("input");
            limpiarDatos(inputs);
            //se quitan los estilos
            limpiarEstilos();
        });
    });
    /* ------------------------------------------------ FUNCIONES ------------------------------------------------- */
    function validarCampoNoVacio(campo) {
        if (campo.val().length == 0) {
            campo.addClass('is-invalid');
            campo.removeClass('is-valid');
            return true; //está vacío
        }
        else {
            campo.addClass('is-valid');
            campo.removeClass('is-invalid');
            return false; //no está vacío
        }
    }
    /* ------------------------------------- Valida nombre, email, asignatura y comentarios -------------------------------*/
    function validarInputSimple(campo) {
        var _a;
        //primera validación al enviar
        validarCampoNoVacio($("#" + campo));
        //se continúa validando luego de presionar el botón "enviar"
        (_a = document.getElementById(campo)) === null || _a === void 0 ? void 0 : _a.addEventListener('input', function () { validarCampoNoVacio($("#" + campo)); });
    }
    /* ------------------------------------------------- Validar rut ----------------------------------------- */
    //rut
    function formatoValidoRut(rut) {
        var pattern = /^\d{7,8}-[k|K|\d]{1}$/;
        return pattern.test(rut);
    }
    function validarRut() {
        var _a;
        //comprobar que no esté vacío
        validarCampoNoVacio($("#rut"));
        //continuar validando
        (_a = document.getElementById('rut')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', function () {
            if (validarCampoNoVacio($("#rut"))) {
                $("#oblRut").prop("hidden", false);
                $("#invRut").prop("hidden", true);
            }
            else {
                //si no está vacío, hay que asegurarse de que tenga el formato válido
                if (!formatoValidoRut($("#rut").val())) {
                    $("#rut").removeClass('is-valid');
                    $("#rut").addClass('is-invalid');
                    $("#oblRut").prop("hidden", true);
                    $("#invRut").prop("hidden", false);
                }
                else {
                    $("#rut").removeClass('is-invalid');
                    $("#rut").addClass('is-valid');
                    $("#oblRut").prop("hidden", true);
                    $("#invRut").prop("hidden", true);
                }
            }
        });
    }
    /* ------------------------------------------------- Validar nro de teléfono ----------------------------------------- */
    function formatoValidoTelefono(numero) {
        if (numero > 99999999 && numero < 1000000000) {
            return true;
        }
        else {
            return false;
        }
    }
    function validarTelefono() {
        var _a;
        //comprobar que no esté vacío
        validarCampoNoVacio($("#telefono"));
        //continuar validando
        (_a = document.getElementById('telefono')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', function () {
            if (validarCampoNoVacio($("#telefono"))) {
                $("#oblTelefono").prop("hidden", false);
                $("#invTelefono").prop("hidden", true);
            }
            else {
                //si no está vacío, hay que asegurarse de que tenga el formato válido
                if (!formatoValidoTelefono($("#telefono").val())) {
                    $("#telefono").removeClass('is-valid');
                    $("#telefono").addClass('is-invalid');
                    $("#oblTelefono").prop("hidden", true);
                    $("#invTelefono").prop("hidden", false);
                }
                else {
                    $("#telefono").removeClass('is-invalid');
                    $("#telefono").addClass('is-valid');
                    $("#oblTelefono").prop("hidden", true);
                    $("#invTelefono").prop("hidden", true);
                }
            }
        });
    }
    /* ------------------------------------------------- Validar checks y radio ----------------------------------------- */
    //función para validar la cantidad de checkbox o radio seleccionadas (al menos una)
    function validarCheck(check, id) {
        var checkeados = 0;
        for (var i = 0; i < check.length; i++) {
            if ($('#' + id + (i + 1)).is(':checked')) {
                checkeados++;
            }
        }
        if (checkeados > 0) {
            //mostramos como válidos
            mostrarValidos(check, id);
        }
        else {
            //mostramos como inválidos
            mostrarInvalidos(check, id);
        }
    }
    //mostrar los check como invalidos
    function mostrarInvalidos(check, id) {
        for (var i = 0; i < check.length; i++) {
            $('#' + id + (i + 1)).addClass('is-invalid');
            $('#' + id + (i + 1)).removeClass('is-valid');
        }
    }
    //mostrar los check como validos
    function mostrarValidos(check, id) {
        for (var i = 0; i < check.length; i++) {
            $('#' + id + (i + 1)).addClass('is-valid');
            $('#' + id + (i + 1)).removeClass('is-invalid');
        }
    }
    //validación general de check
    function validarCheckBoxRadio(check, id) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        //comprobar si es que hay algún checkbox checkeado
        validarCheck(check, id);
        //continuar validando
        (_a = document.getElementById(id + "1")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { validarCheck(check, id); });
        (_b = document.getElementById(id + "2")) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { validarCheck(check, id); });
        (_c = document.getElementById(id + "3")) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { validarCheck(check, id); });
        if (id != "rad") {
            (_d = document.getElementById(id + "4")) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { validarCheck(check, id); });
            (_e = document.getElementById(id + "5")) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () { validarCheck(check, id); });
            if (id == "checkLeng") {
                (_f = document.getElementById(id + "6")) === null || _f === void 0 ? void 0 : _f.addEventListener('click', function () { validarCheck(check, id); });
                (_g = document.getElementById(id + "7")) === null || _g === void 0 ? void 0 : _g.addEventListener('click', function () { validarCheck(check, id); });
                (_h = document.getElementById(id + "8")) === null || _h === void 0 ? void 0 : _h.addEventListener('click', function () { validarCheck(check, id); });
                (_j = document.getElementById(id + "9")) === null || _j === void 0 ? void 0 : _j.addEventListener('click', function () { validarCheck(check, id); });
                (_k = document.getElementById(id + "10")) === null || _k === void 0 ? void 0 : _k.addEventListener('click', function () { validarCheck(check, id); });
                (_l = document.getElementById(id + "11")) === null || _l === void 0 ? void 0 : _l.addEventListener('click', function () { validarCheck(check, id); });
                (_m = document.getElementById(id + "12")) === null || _m === void 0 ? void 0 : _m.addEventListener('click', function () { validarCheck(check, id); });
            }
        }
    }
    /* ------------------------------------------------- Validar campo opinion ----------------------------------------- */
    //opinion
    function validarComentarios() {
        var _a;
        validarCampoNoVacio($("#coments"));
        //continuar validando
        (_a = document.getElementById("coments")) === null || _a === void 0 ? void 0 : _a.addEventListener('input', function () {
            validarCampoNoVacio($("#coments"));
        });
    }
    /*--------------------------------------------- Funciones para limpiar los datos ----------------------------------------*/
    //limpia los datos escritos
    function limpiarDatos(inputs) {
        var i;
        for (i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }
    }
    //limpia los estilos de validación
    function limpiarEstilos() {
        var i;
        $("#nombre").removeClass('is-valid');
        $("#nombre").removeClass('is-invalid');
        $("#rut").removeClass('is-valid');
        $("#rut").removeClass('is-invalid');
        $("#email").removeClass('is-valid');
        $("#email").removeClass('is-invalid');
        $("#telefono").removeClass('is-valid');
        $("#telefono").removeClass('is-invalid');
        //
        for (i = 0; i < checkLenguaje.length; i++) {
            $('#checkLeng' + (i + 1)).removeClass('is-valid');
            $('#checkLeng' + (i + 1)).removeClass('is-invalid');
        }
        for (i = 0; i < checkRadio.length; i++) {
            $('#rad' + (i + 1)).removeClass('is-valid');
            $('#rad' + (i + 1)).removeClass('is-invalid');
        }
        for (i = 0; i < checkAsignatura.length; i++) {
            $('#checkAs' + (i + 1)).removeClass('is-valid');
            $('#checkAs' + (i + 1)).removeClass('is-invalid');
        }
        //
        $("#asignatura").removeClass('is-valid');
        $("#asignatura").removeClass('is-invalid');
        $("#coments").removeClass('is-valid');
        $("#coments").removeClass('is-invalid');
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    /* ----------------------------------------------- Funcionalidad extra ----------------------------------------------*/
    //permite habilitar o desabilitar el campo "asignatura" al seleccionar el checkbox "otro"
    function funcionOtro() {
        $('#checkAs5').on('click', function () {
            if ($(this).is(':checked')) {
                $("#asignatura").prop("disabled", false);
                $("#asignatura").prop("required", true);
            }
            else {
                $("#asignatura").prop("disabled", true);
            }
        });
    }
});
