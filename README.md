# strikes-router
NOTE: Renders free hosting automatically spins down servers with inactivity - when launching the front end this causes delay in the data populating. You may need to also refresh the page.

The goal of this project is to provide a front-end for a bowling score-keeping application. Part of my motivation for creating this app was to build functionality on top of the database I built in CS669.

The application is built with Vue CLI version 5.0 (using Vue 3.2.13). It allows users to register as a player and log scores. Once registered (on Create Account page), the users name will become available in the Log Score Select a Player dropdown. There is also a form to register bowling alleys - this data will be utilized in future iterations. The Home page of the site provides a dashboard with a widget to log scores and also displays scores in tabular format based on scores received from the back-end API. The View All Scores page displays all scores that have been logged.

The back-end of this application is built with Node and Express. It consists of APIs to handle data retrieval from a Postgres database. The repository for the back end is stored at: https://github.com/dobogdas-bu/strikes-api . Both the back-end and Postgres database are hosted on Render.

 
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
