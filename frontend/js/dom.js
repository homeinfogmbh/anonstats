var anonstats = anonstats || {};


anonstats.statisticsEntry = function (json) {
    const element = document.createElement('table');
    element.setAttribute('border', 1);

    for (let property in json) {
        if (Object.prototype.hasOwnProperty.call(json, property)) {
            element.appendChild(anonstats.statisticsRow(property, json[property]));
        }
    }

    return element;
};


anonstats.statisticsRow = function (key, value) {
    const element = document.createElement('tr');
    element.appendChild(anonstats.statisticsKey(key));
    element.appendChild(anonstats.statisticsValue(value));
    return element;
};


anonstats.statisticsKey = function (key) {
    const element = document.createElement('td');
    element.innerHTML = key;
    return element;
};


anonstats.statisticsValue = function (value) {
    const element = document.createElement('td');
    element.innerHTML = value;
    return element;
};


anonstats.domainsEntry = function (json) {
    const element = document.createElement('table');
    element.setAttribute('border', 1);
    console.log('JSON: ' + JSON.stringify(json));

    for (let domain in json) {
        if (Object.prototype.hasOwnProperty.call(json, domain)) {
            let stats = json[domain];
            console.log('Stats: ' + domain + ' ' + stats);
            element.appendChild(anonstats.domainRow(domain, stats));
        }
    }

    return element;
};


anonstats.domainRow = function (domain, stats) {
    const element = document.createElement('tr');
    element.appendChild(anonstats.domainKey(domain));
    const dates = anonstats.dates(stats);
    element.appendChild(anonstats.from(dates));
    element.appendChild(anonstats.until(dates));
    element.appendChild(anonstats.count(stats));
    return element;
};


anonstats.domainKey = function (key) {
    const element = document.createElement('td');
    element.innerHTML = key;
    return element;
};


anonstats.domainValue = function (stats) {
    const element = document.createElement('td');

    for (let entry of stats) {
        element.appendChild(anonstats.statisticsEntry(entry));
    }

    return element;
};


anonstats.from = function (dates) {
    const element = document.createElement('td');
    element.innerHTML = anonstats.minDate(dates).toLocaleDateString('de-DE');
    return element;
};


anonstats.until = function (dates) {
    const element = document.createElement('td');
    element.innerHTML = anonstats.maxDate(dates).toLocaleDateString('de-DE');
    return element;
};


anonstats.count = function (stats) {
    const element = document.createElement('td');
    element.innerHTML = stats.length;
    return element;
};


anonstats.dates = function (stats) {
    const dates = [];

    for (let entry of stats) {
        dates.push(new Date(entry.timestamp));
    }

    return dates;
};


anonstats.maxDate = function (dates) {
    return new Date(Math.max.apply(null, dates));
};


anonstats.minDate = function (dates) {
    return new Date(Math.min.apply(null, dates));
};
