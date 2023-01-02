import React, {useEffect, useState} from "react";
import classes from "./LoadCodeFeature.module.css";
import Card from "../UI/Card";
import QRCode from "react-qr-code";

function LoadCodeFeature(props) {
    let url = "https://coopcouponcloudfunction-x2hqhf3efq-oa.a.run.app/";
    console.log("call immediately webpage")
    console.log("start loading")

    const [data, setData] = useState({ code: "", value: "" });

    useEffect(() => {
        async function fetchData() {
            if (data.code.length < 1) {
            const result = await fetch(url);
            const jsonResult = await result.json()
            console.log(JSON.stringify(jsonResult))
            setData(jsonResult);
            }
        }
        fetchData();
    }, [data, url]);

    return (
        <Card className={classes.form}>
            <QRCode value={data.code}/>
        </Card>
    );
}

export default LoadCodeFeature;
