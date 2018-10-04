# My First Xeneta




## Usage

```sh
# Install dependencies
$ yarn install
# Single build
$ yarn build
# Watcher build (Rebuilds on file changes)
$ yarn watch
# Start development server at localhost:3000
$ yarn start
```
 
# TODO

* Rewrite the autocomplete using Trie data structure for faster lookup and auto-completion.
* Use my own datepicker library `goDatePicker` for DatePicker functionality, due to short time, couldn't use it. https://github.com/RUPOJS/goDatepicker 
* Test-coverage
* Add Comments

# Building
The project will build HTML using EJS templates from the `views` folder. Client-side JavaScript is built
from the `src/index.js` entrypoint with Webpack 4 and Babel 7. CSS is currently loaded
statically from the `public/stylesheets` folder.

You are free to install any frameworks, libraries, and software you want using NPM or Yarn. You can also change
any aspect of the build process if needed. For example, the build setup supports React/JSX out of the box,
but if you are more comfortable using for example Vue.js, we're not going to stop you.

# API
Provided is a simple web server, with an API that allows looking up ports and querying for time-series of freight
rates between the respective ports. It is available from http://localhost:3000/

## /api/ports/:id
Returns a single port based on the provided port code. (NOOSL, CNSGH, NLRTM)

```json
{"id":"NOOSL","country":"NO","name":"Oslo"}
```

## /api/ports/search/:query
Free text search for port codes and port names. Returns an object with matching ports.

```json
{"results":[{"id":"CNSGH","country":"CN","name":"Shanghai"},{"id":"CNSTG","country":"CN","name":"Shantou"}]}
```

## /api/rates/:origin/:destination/:fromdate/:todate
Returns a timeseries of rates from port to port, within the given time-period. `origin` and `destination`
are port codes, the date formats are ISO-8601 dates, e.g. `2018-06-30`.
This returns an object containing a time-series of freight rates. The time-series is an array of arrays,
containing the date and the price for that given day.

```json
{"rates":[["2018-06-30",1972],["2018-07-01",2022],["2018-07-02",2022],["2018-07-03",2022]]}
```

Note that the dataset only contains data between `2017-08-30` and `2018-06-30`. If there is no rate available
on a specific date within the dataset, the price is set to `null`.
