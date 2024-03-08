#!/bin/bash
set -e

mongoimport --db dashboard --collection apps --type json --file /docker-entrypoint-initdb.d/db/dashboard.apps.json --jsonArray
mongoimport --db dashboard --collection brands --type json --file /docker-entrypoint-initdb.d/db/dashboard.brands.json --jsonArray
mongoimport --db dashboard --collection widgets --type json --file /docker-entrypoint-initdb.d/db/dashboard.widgets.json --jsonArray
