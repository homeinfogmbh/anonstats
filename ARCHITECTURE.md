# anonstats
Stand: 2026-07-31, geprüft gegen Commit e9c22b6

## Zweck
Anonyme Website-Statistiken: erfasst datensparsam Nutzungszahlen (ohne
Personenbezug) und stellt sie über eine API bereit.

## Stack & Einstiegspunkte
Python 3, Flask/`wsgilib`, Peewee via `peeweeplus`. Package `anonstats`. Module:
`orm.py`, `wsgi.py` (Endpunkte).

## Schnittstellen
### Konsumiert
- **Dependencies:** `his` (Auth), `mdb`, `flask`, `wsgilib`, `peewee`,
  `peeweeplus`.
### Bietet an
- **WSGI-Endpunkte + ORM** zum Erfassen/Abfragen anonymer Statistiken.
  Verwandt mit `appstats` (Klick-Statistiken).

## Deployment / Laufzeit
WSGI-Anwendung hinter dem HIS-Stack. ⚠️ ANNAHME: mod_wsgi/uwsgi.

## Ersetzbarkeit
Kopplungsgrad: **niedrig–mittel**. Abgegrenzter Statistik-Dienst.

## Weitere Doku
- `README.md`.
- Verwandt: `appstats`, `sysmon`.
- ⚠️ ANNAHME: Zentrales Repo `homeinfo-architektur` noch nicht geprüft.
