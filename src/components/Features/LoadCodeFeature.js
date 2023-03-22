import React, {useEffect, useState} from "react";
import classes from "./LoadCodeFeature.module.css";
import Card from "../UI/Card";
import QRCode from "react-qr-code";

function LoadCodeFeature(props) {
    const url = "https://coopcouponcloudfunction-x2hqhf3efq-oa.a.run.app/";

    // Log messages to console
    console.log("call immediately webpage");
    console.log("start loading");

    // Define state for code and value
    const [data, setData] = useState({code: "", value: ""});
    const [isLoading, setIsLoading] = useState(true);


    // Fetch data from server when component mounts
    useEffect(() => {
        async function fetchData() {
            // if (data.code.length < 1) {
            const response = await fetch(url);
            const jsonResult = await response.json();
            console.log(JSON.stringify(`loaded: ${jsonResult}`));
            setData(jsonResult);
            setIsLoading(false);
        }
        // }
        fetchData();
    }, [data.code]);

    // Render QR code component with fetched code value
    return (<Card className={classes.form}>
            {isLoading ? (<div>Loading...</div>) : (<QRCode value={data.code}/>)}
        </Card>);
}

export default LoadCodeFeature;
