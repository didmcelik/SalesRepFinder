const express = require("express");
const countryModel = require("../models/models");
const app = express();
const axios = require("axios");

app.get("/countries", async (request, response) => {
  const region = request?.body?.region;
  let countries;
  region == null
    ? (countries = await countryModel.find({}, { _id: 0 })) //  _id: 0 : exclude id
    : (countries = await countryModel.find(
        { region: `${region}` },
        { projection: { _id: 0 } }
      ));

  try {
    response.send(countries);
  } catch (error) {
    response.status(500).send(error);
  }
  return countries;
});

app.get("/salesrep", async (request, response) => {
  try {
    const res = await axios.get("http://127.0.0.1:3000/countries"); //TODO

    if (res) {
      const countries = res["data"];
      const regions = [...new Set(countries.map((item) => item.region))]; //Find distinct region values
      let countryCountsByRegion = [];
      regions.map((region) => {
        let countryCount = countries.filter(
          (country) => country.region == region
        ).length;
        let salesrep = {};
        salesrep.region = region;
        salesrep.minSalesReq =
          countryCount % 7 == 0
            ? Math.trunc(countryCount / 7)
            : Math.trunc(countryCount / 7 + 1);
        salesrep.maxSalesReq = Math.trunc(countryCount / 3);
        countryCountsByRegion.push(salesrep);
      });
      response.send(countryCountsByRegion);
    }
  } catch (err) {
    response.status(500).send(err);
  }
});

module.exports = app;
