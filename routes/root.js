'use strict'

const fetch = require('node-fetch');

const apiKey = process.env.APIKEY;
const city = process.env.CITY;

const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

module.exports = async function (fastify, opts) {
  
  fastify.get('/', async function (request, reply) {
    try {
      // Read HTML content from a file
      //const htmlFilePath = path.join(__dirname, "../views/index.html");
      //const htmlContent = await readFile(htmlFilePath, "utf-8");
      //console.log(await fetch(apiUrl));
      
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
      
      const htmlContent = `
      <html>
        <head>
          <title>Weather App</title>
        </head>
        <body>
          <h1>Weather in ${city}</h1>
          <p>Temperature: ${temperature} K</p>
          <p>Description: ${description}</p>
        </body>
      </html>
    `;

      // Send HTML response
      reply.type("text/html").send(htmlContent);
    } catch (err) {
      console.error("Error reading HTML file:", err);
      reply.status(500).send("Internal Server Error");
    }
  })
}
