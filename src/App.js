import React from "react";
import './App.css'
import {Route, Routes} from 'react-router-dom';
import { Layout } from 'antd';
import { Navbar, HomePage, Cryptocurrencies, News, Cryptodetails } from "./components";


function App(){
    return(
        <div className="app">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Routes>
                            <Route exact path="/" element={ <HomePage /> } />
                            <Route exact path="/cryptocurrencies" element={ <Cryptocurrencies /> } />
                            <Route exact path="/cryptodetails/:coinId" element={ <Cryptodetails /> } />
                            <Route exact path="/news" element={ <News /> } />                        
                        </Routes>
                    </div>
                </Layout>
           
                {/* <div className="footer">
                    <Typography.Title level={ 5 } style={{ color: '#fff', textAlign: 'center' }}>
                        Cryptoverse <br />
                        All rights reserverd
                    </Typography.Title>
                    <Space>
                        <Link to="/">Home</Link>
                        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                        <Link to="/exchanges">Exchanges</Link>
                        <Link to="/news">News</Link>
                    </Space>
                </div> */}
            </div>
            
        </div>
    )
}

export default App;