import React, { useEffect, useState } from 'react'
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { Cryptocurrencies, News } from '../components'

const HomePage = ()=> {

  const [globalStats, setGlobalStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const coinRandingURL = 
  'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0'

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
      console.log(data)
      setGlobalStats(data.data.stats)
      setLoading(false)

    }catch(error){
      console.error(`Got error while fetching global stats ${ error }`)
    }
  }

  useEffect(()=>{
    fetchGlobal()
  }, [])



  return(
    <>
      <Typography.Title level={ 2 } className='Heading'>Global Crypto Stats</Typography.Title>
      {
        loading
        ?
        <Typography.Title level={4}>Loading...</Typography.Title>
        :
        <Row>
          <Col span={12} >
            <Statistic title='Total Cryptocurrencies' value={ globalStats.total }/>         
          </Col>
          <Col span={12} >
            <Statistic title='Total Exchanges' value={ millify(globalStats.totalExchanges) }/>         
          </Col>
          <Col span={12} >
            <Statistic title='Total Market Cap' value={ millify(globalStats.totalMarketCap) }/>        
          </Col>
          <Col span={12} >
            <Statistic title='Total 24hr Volume' value={  millify(globalStats.total24hVolume) } />        
          </Col>
          <Col span={12} >
            <Statistic title='Total Markets' value={ millify(globalStats.totalMarkets) } />  
          </Col>      
      </Row>
      }
      <div className='home-heading-container'>
        <Typography.Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Typography.Title>
        <Typography.Title level={4} className='show-more'> <Link to='/cryptocurrencies'>Show more</Link> </Typography.Title>
      </div>
      <Cryptocurrencies simplified = { true }/>
      <div className='home-heading-container'>
        <Typography.Title level={2} className='home-title'>Latest Crypto News</Typography.Title>
        <Typography.Title level={4} className='show-more'> <Link to='/news'>Show more</Link> </Typography.Title>
      </div>
      <News simplified />
    </>
  )
}



export default HomePage