const parse = require("csv-parser");
const fs = require("fs");

const habitatePlanets = [];

function isHaitablePlanet(planet) {
  return planet["koi_disposition"] === "CONFIRMED"
    && planet["koi_insol"] > 0.36 
    && planet["koi_insol"] < 1.11 
    && planet["koi_prad"] < 1.6;
}

fs.createReadStream("data.csv")
  .pipe(parse({
    comment: "#",
    column: true
  }))
  .on("data", (data) => {
    if(isHaitablePlanet(data))
    habitatePlanets.push(data);    
  })
  .on("error", (err) => {
    console.log(err)
  })
  .on("end", () => {
    console.log("results  => ", habitatePlanets.map((ele)=>{
      return ele["kepler_name"]
    }))
    
  });