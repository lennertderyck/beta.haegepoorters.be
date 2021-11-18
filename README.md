# Haegepoorters v3

## Technologies
#### Front-end
- Created with the help of [create-react-app](https://github.com/facebook/create-react-app)
- Content is loaded from [Storyblok](https://www.storyblok.com/) via a [GraphQL](https://github.com/graphql) api connection, using [Apollo Client](https://github.com/apollographql/apollo-client)
- The login & registration feature is made possible with the SSO integration from [Scouts & Gidsen Vlaanderen](https://github.com/ScoutsGidsenVL). [Keycloak client](https://www.npmjs.com/package/keycloak-js) is used for the initialization, redirection and handeling of login tokens.
- The [Google Calendar api](https://developers.google.com/calendar) is used in some places for getting calendar data in JSON format

#### Back-end
- [Storyblok](https://www.storyblok.com/) is used for managing content. The data is exposed over a public GraphQL connection.
- [Serverless functions from Vercel](https://vercel.com/docs/concepts/functions/introduction) are used to get data from other API's such as [Airtable](https://airtable.com/) without exposing their API-keys.

#### Deploys
- New releases are deployed using Vercel. Vercel is connected to GitHub so auto-deploys are possible

## Setup
#### Installation
- Clone or download this repo
- Run `npm i` to install the required packages
- Run `npm start` to run the application locally

> The SSO from Scouts & Gidsen Vlaanderen will only work on our domain (beta.haegepoorters.be) considering security. Fake data is loaded instead.
