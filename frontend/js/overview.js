'use strict';

var anonstats = anonstats || {};

anonstats.STATS = null;
anonstats.GROUPED = true;


anonstats._getArgs = function () {
    var args = {};
    var from = document.getElementById('from').value;

    if (from) {
        args['start'] = from;
    }

    var until = document.getElementById('until').value;

    if (until) {
        args['end'] = until;
    }

    return args;
};


anonstats.list = function () {
    his.auth.get('https://backend.homeinfo.de/anonstats', anonstats._getArgs()).then(
        anonstats._render, anonstats._listError);
};


anonstats.toggleRender = function () {
    anonstats.GROUPED = ! anonstats.GROUPED;
    anonstats.render();
};


anonstats._render = function (json) {
    if (json != null) {
        anonstats.STATS = json;
    }

    anonstats.render();
};


anonstats.render = function () {
    var container = document.getElementById('#list');
    list.innerHTML = '';

    if (anonstats.GROUPED) {
        var domains = anonstats.groupByDomain(anonstats.STATS);
        list.appendChild(anonstats.domainsEntry(domains));
    } else {
        for (var i = 0; i < anonstats.STATS.length; i++) {
            list.appendChild(anonstats.statisticsEntry(anonstats.STATS[i]));
        }
    }
};


anonstats.groupByDomain = function (json) {
    var grouped = {};
    var domain;

    console.log('JSON: ' + JSON.stringify(json));

    for (var i = 0; i < json.length; i++) {
        domain = anonstats._extractDomain(json[i].host);

        if (grouped[domain] == null) {
            grouped[domain] = [];
        }

        grouped[domain].push(json[i]);
    }

    return grouped;
};


anonstats._extractDomain = function (string) {
    var elements = string.split('.');
    var domain = elements.slice(elements.length - 2, elements.length);
    return domain.join('.');
};


anonstats._listError = function () {
    swal({
        type: 'error',
        title: 'Fehler',
        text: 'Fehler beim Abfragen der Daten.'
    });
};


jQuery(document).ready(anonstats.list);