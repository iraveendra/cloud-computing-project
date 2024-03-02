#!/bin/bash
set -e

mongoimport --db dashboard --collection apps --type json --file ./db/dashboard.apps.json --jsonArray
mongoimport --db dashboard --collection brands --type json --file ./db/dashboard.brands.json --jsonArray
mongoimport --db dashboard --collection widgets --type json --file ./db/dashboard.widgets.json --jsonArray
