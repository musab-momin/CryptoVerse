import React, { useEffect, useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, ThunderboltOutlined, NumberOutlined, CheckOutlined } from '@ant-design/icons'
import LineChart from './LineChart';


const Cryptodetails = ()=> {

  const {coinId} = useParams(); 
  const [loading ,setLoading] = useState(true);
  const [cryptoDetails, setCryptoDetails] = useState([])
  const [coinHistory, setCoinHistory] = useState([])
  const [timePeriod, setTimePeriod] = useState('7d')
  const coinDetailUrl = `https://coinranking1.p.rapidapi.com/coin/${ coinId }`
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];


  const fetchHistory = async()=>{
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '70eb8b16a8msha1755b8e5234f35p1d0d05jsne4b66997c8a7',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };
    try{
      console.log(`${coinDetailUrl}/history/${timePeriod}`);
      const response = await fetch(`${coinDetailUrl}/history?timePeriod=${timePeriod}`, options)
      const historyData  = await response.json()
      console.log({historyData});
      setCoinHistory(historyData.data)
      setLoading(false)
    }catch(err){
      console.error(`Got this error while fetching coin history ${err}`)
      setLoading(false)
    }
  }

  const fetchDetails = async(cb)=>{
    setLoading(true)
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '70eb8b16a8msha1755b8e5234f35p1d0d05jsne4b66997c8a7',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };
    try{
      const response = await fetch(coinDetailUrl, options)
      const data  = await response.json()
      console.log({data});
      setCryptoDetails(data.data.coin)
      cb()
    }catch(err){
      console.error(`Got this error while fetching the details ${err}`)
      setLoading(false)
    }
  }


  useEffect(()=>{
    fetchDetails(fetchHistory)
  }, [])

  useEffect(()=>{
    fetchDetails(fetchHistory)
  }, [timePeriod])

  if(loading){
    return <Typography.Title level={2}>Loading...</Typography.Title>
  }

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Typography.Title level={2} className='coin-name'>
          {cryptoDetails.name} Price
        </Typography.Title>
        <p>
          {cryptoDetails.name} live price in US dollar 
          view value statistics, market cap and supply
        </p>
      </Col>
      <Select
        defaultValue='7d'
        className='select-timeperiod'
        placeholder='Select Time Period'
        onChange={(value)=>setTimePeriod(value)}
        value={ timePeriod }
      >
        { time.map((date, index)=>( <Select.Option key={index} value={date} >{date}</Select.Option> )) }
      </Select>

      <LineChart coinHistory={ coinHistory } coinName={ cryptoDetails.name } currentPrice = { millify(cryptoDetails.price) } />

      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
              <Typography.Title level={3} className='coin-detailes-heading'>
                {cryptoDetails.name} Value Statistics
              </Typography.Title>
              <p>
                An overview showing the stats of {cryptoDetails.name}
              </p>
          </Col>
          {
            stats.map(({icon, title, value})=>(
              <Col className='coin-stats'>
                <Col className='coin-stats-name'>
                  <Typography.Text>{icon}</Typography.Text>
                  <Typography.Text>{title}</Typography.Text>
                </Col>
                <Typography.Text className='stats'>{value}</Typography.Text>
              </Col>
            ))
          }
        </Col>

        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
              <Typography.Title level={3} className='coin-detailes-heading'>
                Other Statistics
              </Typography.Title>
              <p>
                An overview showing the stats of {cryptoDetails.name}
              </p>
          </Col>
          {
            genericStats.map(({icon, title, value})=>(
              <Col className='coin-stats'>
                <Col className='coin-stats-name'>
                  <Typography.Text>{icon}</Typography.Text>
                  <Typography.Text>{title}</Typography.Text>
                </Col>
                <Typography.Text className='stats'>{value}</Typography.Text>
              </Col>
            ))
          }
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Typography.Title level={3} className='coin-details-heading'>
            What is {cryptoDetails.name}
            {HTMLReactParser(cryptoDetails.description)}
          </Typography.Title>
        </Row>
        <Col className='coin-links'>
          <Typography.Title level={3} className='coin-details-heading'>
            { cryptoDetails.name } Links
          </Typography.Title>
          {
            cryptoDetails.links.map((link, index)=>(
              <Row className='coin-link' key={index}>
                <Typography.Title level={5} className='link-name'>
                  {link.type}
                </Typography.Title>
                <a href = {link.url} target="_blank" rel='noreferrer'>
                  {link.name}
                </a>

              </Row>
            ))
          }
        </Col>
      </Col>
     
    </Col>
  )
}

export default Cryptodetails