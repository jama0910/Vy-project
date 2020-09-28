## Introduksjon
Dette prosjektet var bygd opp med "Create React App" med node.js og yarn/npm. 
Det er viktig at du har installert node.js: Anbefaler nyeste v14.1.0.
Yarn burde også være oppdatert til nyeste: v1.22.4.

## Sette opp webpack med Yarn

Skriv inn i en valgfri terminal (gitbash/visual studio terminal) 
1. Start å skrive "yarn add webpack", for å installere node modules og dependencys.
2. Deretter skriv yarn add webpack@4.42.0, slik at du får riktig webpack.
3. Deretter følg opp med "yarn build", som skal sette opp alt koden i en mappe for å oppnå best ytelse
4. Tilslutt kan man skrive "yarn start" for å kjøre applikasjonen via localhost:3000. 

## Sette opp webpack med NPM

Skriv inn i en valgfri terminal (gitbash/visual studio terminal) 
1. Start å skrive "npm install webpack", for å installere node modules og dependencys.
2. Deretter skriv npm install webpack@4.42.0, slik at du får riktig webpack.
3. Deretter følg opp med "npm build".
4. Tilslutt kan man skrive "npm start" for å kjøre applikasjonen via localhost:3000. 


### Varsel

Det er viktig at du setter webpacken korrekt opp før du kjører den, det gjelder med at du har riktig versjon som ble brukt i package.json, det kan oppsto feil hvis du ikke gjør det. Hvis problemer oppstår les feil meldingen i terminalen. 
PS: Viktig at du kjører i samme webpack 4.42.0.

### `yarn start`

Applikasjonen kjøres i utviklingsmodus.
Åpne [http://localhost:3000](http://localhost:3000).

Siden lastes inn på nytt hvis du gjør endringer.
Du vil også se eventuelle kode feil i konsollen.

### `yarn test`

Lanserer testløperen i interaktiv klokkemodus.

### `yarn build`

Bygger appen for produksjon til `build`-mappen.
Den pakker riktig i React i produksjonsmodus og optimaliserer konstruksjonen for best mulig ytelse.
