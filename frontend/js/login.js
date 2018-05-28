'use strict';

var anonstats = anonstats || {};

anonstats.login = function () {
    var userName = document.getElementById('userName').value;
    var password = document.getElementById('password').value;

    his.session.login(userName, password).then(anonstats._redirectIndex, anonstats._loginError);
};


anonstats._redirectIndex = function () {
    window.location.replace('overview.html');
};


anonstats._loginError = function () {
    swal({
        type: 'error',
        title: 'Fehler',
        text: 'Benutzername oder Passwort inkorrekt.'
    });
};