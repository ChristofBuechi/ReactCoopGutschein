import React, {useEffect, useState} from "react";
import classes from "./LoadCodeFeature.module.css";
import Card from "../UI/Card";
import QRCode from "react-qr-code";
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
        <h2>Loaded QR Code:</h2>
        <div style={{ background: 'white', padding: '25px' }}>
            {<QRCode value={data.code}/>}
        </div>
        <pre>{`Rabatt ${data.value}`}</pre>
        <div style={{ background: 'white', padding: '16px' }}>
            <Barcode value={data.code} />
        </div>
        </Card>;
}

export default LoadCodeFeature;
