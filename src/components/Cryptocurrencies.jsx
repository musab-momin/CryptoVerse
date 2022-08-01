import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import millify from 'millify';


const Cryptocurrencies = ({ simplified })=> {

  

  const [globalCoins, setGlobalCoins] = useState([]);
  const [activeCoins, setActiveCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("" );
  const count = simplified ? 10 : 100;

  const coinRandingURL = 
  `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=${ count }&offset=0`

  const fetchGlobal = async()=>{
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '70eb8b16a8msha1755b8e5234f35p1d0d05jsne4b66997c8a7',
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };
    try{
      setLoading(true);

      const response = await fetch(coinRandingURL, options)
      const data = await response.json()
      setGlobalCoins(data.data.coins)
      setActiveCoins(data.data.coins)
      setLoading(false)

    }catch(error){
      console.error(`Got error while fetching global stats ${ error }`)
    }
  }

  useEffect(()=>{
    fetchGlobal()
  }, [])


  useEffect(()=>{
    const filteredData = globalCoins.filter(coin=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setActiveCoins(filteredData)
  }, [searchTerm, globalCoins])

  if(loading){
    return (  <Typography.Title level={4}>Loading...</Typography.Title>)
  }


  return (
    <>
      {
        !simplified
        &&
        <div className='search-crypto'>
          <Input placeholder='search...' onChange={(eve)=>setSearchTerm(eve.target.value)} value={ searchTerm } />
        </div>

      }
      <Row gutter={[32, 32]} className="crypto-card-container">
        {
          activeCoins?.map((coin)=>(
            <Col xs={24} sm={12} lg={6} className='crypto-card' key={coin.uuid}>
              <Link to={`/cryptodetails/${ coin.uuid }`}>
                <Card 
                  title={`${coin.rank}. ${coin.name}`}
                  extra={ <img className='crypto-image' src={ coin.iconUrl } alt='#'/> }
                  hoverable
                >
                  <p>Price: { millify(coin.price) }</p>
                  <p>Market Cap: { millify(coin.marketCap) }</p>
                  <p>Daily Change: { millify(coin.change) }</p>
                </Card>
              </Link>
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default Cryptocurrencies