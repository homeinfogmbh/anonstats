var anonstats = anonstats || {};


anonstats.statisticsEntry = function (json) {
    var element = document.createElement('table');
    element.setAttribute('border', 1);

    for (var property in json) {
        if (json.hasOwnProperty(property)) {
            element.appendChild(anonstats.statisticsRow(property, json[property]));
        }
    }

    return element;
};


anonstats.statisticsRow = function (key, value) {
    var element = document.createElement('tr');
    element.appendChild(anonstats.statisticsKey(key));
    element.appendChild(anonstats.statisticsValue(value));
    return element;
};


anonstats.statisticsKey = function (key) {
    var element = document.createElement('td');
    element.innerHTML = key;
    return element;
};


anonstats.statisticsValue = function (value) {
    var element = document.createElement('td');
    element.innerHTML = value;
    return element;
};


anonstats.domainsEntry = function (json) {
    var element = document.createElement('table');
    element.setAttribute('border', 1);
    var stats;

    console.log('JSON: ' + JSON.stringify(json));

    for (var domain in json) {
        if (json.hasOwnProperty(domain)) {
            stats = json[domain];
            console.log('Stats: ' + domain + ' ' + stats);
            element.appendChild(anonstats.domainRow(domain, stats));
        }
    }

    return element;
};


anonstats.domainRow = function (domain, stats) {
    var element = document.createElement('tr');
    element.appendChild(anonstats.domainKey(domain));
    var dates = anonstats.dates(stats);
    element.appendChild(anonstats.from(dates));
    element.appendChild(anonstats.until(dates));
    element.appendChild(anonstats.count(stats));
    return element;
};


anonstats.domainKey = function (key) {
    var element = document.createElement('td');
    element.innerHTML = key;
    return element;
};


anonstats.domainValue = function (stats) {
    var element = document.createElement('td');

    for (var i = 0; i < stats.length; i++) {
        element.appendChild(anonstats.statisticsEntry(stats[i]));
    }

    return element;
};


anonstats.from = function (dates) {
    var element = document.createElement('td');
    element.innerHTML = anonstats.minDate(dates);
    return element;
};


anonstats.until = function (dates) {
    var element = document.createElement('td');
    element.innerHTML = anonstats.maxDate(dates);
    return element;
};


anonstats.count = function (stats) {
    var element = document.createElement('td');
    element.innerHTML = stats.length;
    return element;
};


anonstats.dates = function (stats) {
    var dates = [];

    for (var i = 0; i < stats.length; i++) {
        dates.push(new Date(stats[i].timestamp));
    }

    return dates;
};


anonstats.maxDate = function (dates) {
    return new Date(Math.max.apply(null, dates));
};


anonstats.minDate = function (dates) {
    return new Date(Math.min.apply(null, dates));
};