import React, {useEffect, useState} from "react";
import classes from "./LoadCodeFeature.module.css";
import Card from "../UI/Card";
import Barcode from "react-barcode";

function LoadCodeFeature() {
    const url = "https://coopcouponcloudfunction-x2hqhf3efq-oa.a.run.app/";

    // Log messages to console
    console.log("call immediately webpage");
    console.log("start loading");

    // Define state for code and value
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    // Fetch data from server when component mounts
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const json = await response.json();
            console.log(`loaded: ${JSON.stringify(json)}`);
            setData(json);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <Card className={classes.form}>
            {(<div>Loading...</div>)}
        </Card>;
    }


    // Render QR code component with fetched code value
    return <Card className={classes.form}>
        <h2>Geladener Coop Code:</h2>
        <pre>{`Rabatt ${data.value}`}</pre>
        <div style={{ background: 'white', padding: '16px' }}>
            <Barcode value={data.code} />
        </div>
        <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfFlajp8N4Qa3UUNwNhTrYccwlGi2fes63UnjoGLxdwrFjahQ/viewform?embedded=true"
            width="640" height="662" frameBorder="0" marginHeight="0" marginWidth="0">Loading…
        </iframe>
        </Card>;
}

export default LoadCodeFeature;
