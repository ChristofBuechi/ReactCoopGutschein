import React, {useRef, useState} from "react";
import classes from "./SearchFeature.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";

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
                      setHtmlPage(text)
                      })
                  } else {
                      console.log(`error:`)
                  }
              })
      }
      }


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
