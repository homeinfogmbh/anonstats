'use strict';

var anonstats = anonstats || {};

anonstats.STATS = null;
anonstats.GROUPED = true;


anonstats._getArgs = function () {
    const args = {};
    const from = document.getElementById('from').value;

    if (from) {
        args['start'] = from;
    }

    const until = document.getElementById('until').value;

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
    const list = document.getElementById('#list');
    list.innerHTML = '';

    if (anonstats.GROUPED) {
        const domains = anonstats.groupByDomain(anonstats.STATS);
        list.appendChild(anonstats.domainsEntry(domains));
    } else {
        for (let stats of anonstats.STATS) {
            list.appendChild(anonstats.statisticsEntry(stats));
        }
    }
};


anonstats.groupByDomain = function (json) {
    const grouped = {};

    console.log('JSON: ' + JSON.stringify(json));

    for (let domain of json) {
        domain = anonstats._extractDomain(domain.host);

        if (grouped[domain] == null) {
            grouped[domain] = [];
        }

        grouped[domain].push(domain);
    }

    return grouped;
};


anonstats._extractDomain = function (string) {
    const elements = string.split('.');
    const domain = elements.slice(elements.length - 2, elements.length);
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
