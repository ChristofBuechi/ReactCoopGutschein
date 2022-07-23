import React from "react";
// @ts-ignore
import logo from '../../logo.svg';
import 'Qrview.css';
import QRCode from "react-qr-code";
import parse from 'html-react-parser';

interface QrviewProps {}
class Qrview extends React.Component<QrviewProps>{
    state = {
        data: []
    };

    fetchData = () => {
        const initialGetUrl = "https://bon.coop-pronto.ch";
        console.log('fetch started');

        let requestInit: RequestInit = {
            method: "POST",
            mode: "cors",
            cache: "default",
            headers: {
                "accept": "text/html",
                "user-agent": "Mozilla/5.0",
                "Referer":"origin"
            }
        };
        fetch(initialGetUrl, requestInit)
            .then(result => result.text())
            .then(result => {
                console.log('data:' + result)
                let object = this.extractValues(result);
                this.setState({
                    data: object
                })
            });
    }

    private extractValues(result: string): string {
        return result;
    }

    private getPicture() {
        if (this.state.data.length === 0) {
            return <img src={logo} className="App-logo" alt="logo" onClick={() => this.fetchData()} style={{'pointerEvents': 'all'}}/>;
        } else {
            let dataValue = this.state.data.toString();
            console.log(dataValue)
            return (
                <div style={{ background : 'white', padding: '16px'}}>
                    <QRCode value={dataValue}/>
                </div>
            );
        }
    }

    render() {
        return (<div className="App">
            <header className="App-header">
                {this.getPicture()}
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Learn React
                </a>
            </header>
        </div> );
    }
}

export default Qrview;