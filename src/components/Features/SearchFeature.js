import React, {useRef, useState} from "react";
import classes from "./SearchFeature.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import * as cheerio from "cheerio";

function SearchFeature(props) {
  const addressInputRef = useRef();
    const [htmlPage, setHtmlPage] = useState({});



  console.log("call immediately webpage")


  async function fetchAddress() {
      if (htmlPage && htmlPage.length) {
          console.log("already loaded")
          console.log(htmlPage)
      } else {
          console.log("start loading")
          fetch("https://bon.coop-pronto.ch/de/start/newsletter")
              .then(response => {
                  if (response.ok) {

                      response.clone().text().then(text => {
                      const $ = cheerio.load(text);
                      console.log($('form').html());
                      setHtmlPage(text)
                      })
                  } else {
                      console.log(`error:`)
                  }
              })
          // const html = await fetch(`https://bon.coop-pronto.ch/de/start/newsletter`);
          // console.log(html)

          // const fetchedResponse = await searchByAdressResponse.json();
          // setLocationObject(fetchedResponse.results);
      }
      }

      // async function fetchBuildingInformation(egid) {
  //   if (egid && egid.length) {
  //     const response = await fetch(`https://api3.geo.admin.ch/rest/services/api/MapServer/find?layer=ch.bfs.gebaeude_wohnungs_register&searchText=${egid}&searchField=egid&returnGeometry=false&contains=false`)
  //     const fetchedResponse = await response.json();
  //     setBuildingInformationObject(fetchedResponse.results);
  //   }
  // }

  // async function searchByFeatureId(featureId) {
  //   var myHeaders = new Headers();
  //   myHeaders.append("accept", "application/json, text/plain, */*");
  //
  //   let getByFeatureResponse = await fetch(`https://api3.geo.admin.ch/rest/services/ech/MapServer/ch.bfs.gebaeude_wohnungs_register/${featureId}?geometryFormat=geojson`, {
  //     method: 'GET',
  //     headers: myHeaders,
  //     redirect: 'follow'
  //   });
  //   const response = await getByFeatureResponse.json();
  //   return response.feature.properties.egid;
  // }


  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("clicked")
      fetchAddress()
  };

  return (
    <Card className={classes.form}>
      <form onSubmit={onSubmitHandler}>
        <input
          id="searchAddress"
          type="text"
          placeholder="Search Location ..."
          ref={addressInputRef}
        />
        <Button type="submit">Search</Button>
      </form>
    </Card>
  );
}

export default SearchFeature;
