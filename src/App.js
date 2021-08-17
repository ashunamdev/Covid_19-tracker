import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
 const [mapCenter, setMapCenter] = useState({lat:"20", lng:"77"});
  const [mapZoom, setMapZoom] = useState(3);
console.log("hhhhhhhhhh",mapCenter);
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);
  console.log(country);

  console.log(casesType);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
        console.log(data.countryInfo.long);
        console.log(data.countryInfo.lat);
        
      });
  };


  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;














































// import React, { useState, useEffect } from "react"; 
// import { Card, CardContent,MenuItem, FormControl, Select} from "@material-ui/core";
// import './App.css';
// import InfoBox from "./InfoBox";
// import Map from "./Map";
// import Table from "./Table";
// import LineGraph from "./LineGraph";
// import { sortData } from "./util";
// import "leaflet/dist/leaflet.css";

// function App() {
//   const [countries, setCountries] = useState([])
//   const [country, setCountry] = useState("worldwide")
//   const [countryInfo, setCountryInfo] = useState({})
//   const [mapCountries, setMapCountries] = useState([]);
//   const [tableData, setTableData] = useState([])
//   const [casesType, setCasesType] = useState("cases");
//   const [mapCenter, setMapCenter ] = useState({ lat: 34.8076, lng: -40.4796})
//   const [mapZoom, setMapZoom]  = useState(3)

//   // State = how to write a variable in React <<<<<<<
//   // https://corona.lmao.ninja/v3/covid-19/countries
//   // https://disease.sh/v3/covid-19/countries

//   //useEffect = Runs a piece of code based  on a goiven condition

//   useEffect(() => {
//     fetch('https://disease.sh/v3/covid-19/all')
//     .then(resopnse => resopnse.json())
//     .then(data => {
//       setCountryInfo(data);
//     })
//   },[])
//   useEffect(() => {
//     // the code inside here will run once when the component loads and not again
//     const getCountriesData = async () => {
//       await fetch("https://disease.sh/v3/covid-19/countries")
//     .then((resopnse) => resopnse.json())
//     .then((data) => {
//       const countries = data.map((country) => (
//         {
//           name: country.country,  // United State, United Kingdom
//           value: country.countryInfo.iso2  //uSA, UK,IND
//         }
//       ));

//       const sortedData = sortData(data);
//       setTableData(sortedData);
//       setMapCountries(data);
//       setCountries(countries);
//     });
//     };
//     getCountriesData();
//   }, []);

//   const onCountryChange = async (event) => {
//     const countryCode = event.target.value;
//     // console.log( "yoooo ",countryCode);
//   // https://disease.sh/v3/covid-19/all
//   // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
//     const url = countryCode === 'worldwide' 
//     ? 'https://disease.sh/v3/covid-19/all' 
//     : `https://disease.sh/v3/covid-19/countries/${countryCode}`

//   await fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     setCountry(countryCode);
//     //All of the data....
//     //from the country response
//     setCountryInfo(data);
//     setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
//     setMapZoom(4);
//     })
//   };
//   console.log('Country info ', countryInfo);


//   return (
//     <div className="app"> 
//      <div className="app__left">
//       <div className="app__header">
//       {/* Header */}
//       {/* Title + Select input dropDown field */}
//         <h1>COVID-19 TRACKER</h1>
//         <FormControl className="app__dropDown">
//           <Select variant="outlined"
//             onChange={onCountryChange}
//             value={country}>
//            <MenuItem value="worldwide">Worldwide</MenuItem>

//             {/* Loop through all the countries and show down list of options */}
           
//            {countries.map((country) => (
//             <MenuItem value={country.value}>{country.name}</MenuItem>
//            ))
//            }
//             {/* <MenuItem value="worldwide">Worldwide</MenuItem>
//             <MenuItem value="worldwide">Option Two</MenuItem>
//             <MenuItem value="worldwide">Option Three</MenuItem>
//             <MenuItem value="worldwide">Yoooo</MenuItem> */}
//           </Select>
//         </FormControl>
//     </div>

//     <div className="app__stats">
//     <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>

//     <InfoBox title="Recovered"  cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
    
//     <InfoBox title="Deaths"  cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
     

//      {/* InfoBoxes */}
//      {/* InfoBoxes */}
//      {/* InfoBoxes */}
//      </div>

//      {/* Map */}
//      <Map
//       countries={mapCountries}
//       // casesType={casesType}
//        center = {mapCenter}
//        zoom = {mapZoom} 
//      /> 
//     </div>
//      <Card className="app__right">
//         <CardContent>
//             <h3>Live Cases by Country</h3>
//             {/* Table */} 
//             <Table countries={tableData} />
//             <h3>Worldwide New {casesType} </h3>
//             <LineGraph />
//           {/* Graph */}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default App;
