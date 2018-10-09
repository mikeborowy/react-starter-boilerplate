# weather-app
Simple Weather App 

Online demo:
http://weather.2bvisible.pl/

# how to run / build / test your creation

1. Download project files.
2. Use 'npm install' command to download node modules.
3. Use 'npm start' to run project in development mode.
4. Use 'npm run build' to build production files (output folder: public).

other commands:
'npm serv-src' - run project from dev mode (http://localhost:3000)
'npm serv-public' - run project from production mode (http://localhost:3001)

# your thought process when creating the solution

First there was a reserach about how I want to design UI of app and what assets (libs, images) I can use to save time in development process.
Then there was research about API of openweathermap and dealing with its limitations (free API).

# any tradeoffs you made

Due to time missing I didn't build preloader and I didn't prepare any test however I managed to implement necessary code for further improvements.
Also I didn't menage to implement city search.

# anything you might implement with more time (features, fixes, technical debt corrections etc).

1. Unit test.
2. Click at day to preview it in CurrentDayWeather component.
3. More details to view in CurrentDayWeather component.
4. Buttons to scroll days forward, backward.
5. City search bar.
6. Celsius / fahrenheit switch button.