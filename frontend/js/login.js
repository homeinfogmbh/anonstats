'use strict';

var anonstats = anonstats || {};


anonstats.login = function () {
    const userName = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
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
