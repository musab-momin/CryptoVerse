import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Input, Typography, Avatar, Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Option } from 'antd/lib/mentions';


const News = ({ simplified })=> {

  const [loading, setLoading] = useState(true)
  const [cryptoNews, setCryptoNews] = useState([])
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency")
  const count = simplified ? 6 : 12
  
  
  const cryptoNewsURL = 
  `https://bing-news-search1.p.rapidapi.com/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
  const demoImageURL = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';


  const fetchNews = async()=>{
    console.log({cryptoNewsURL});
    setLoading(true)
    const options = {
      method: 'GET',
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '70eb8b16a8msha1755b8e5234f35p1d0d05jsne4b66997c8a7',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };
    
    try{
      const response = await fetch(cryptoNewsURL, options)
      const newsData = await response.json()
      console.log(newsData);
      setCryptoNews(newsData.value)
      setLoading(false)

    }catch(err){
      console.error(`Got this error while fetching news ${err}`)
    }
  }

  useEffect(()=>{
    fetchNews()
  }, [newsCategory])
  useEffect(()=>{
    fetchNews()
  }, [])

  if(loading){
    return(<Typography.Title level={4} >Loading...</Typography.Title>)
  }

  return (
    <>
    <Row gutter={[ 24, 24 ]}>
      {
        !simplified
        &&
        <Col span={24}>
          <Select
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='childern'
            onChange={(value)=>setNewsCategory(value)}
          >
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
            <Option value='Bitcoin'>Bitcoin</Option>
            <Option value='Ethereum'>Ethereum</Option>
            <Option value='Tether USD'>Tether USD</Option>
            <Option value='USDC'>USDC</Option>
            <Option value='Bianance Coin'>Bianance Coin</Option>
            <Option value='Bianance USD'>Bianance USD</Option>
            <Option value='XRP'>XRP</Option>
            <Option value='Cardano'>Cardano</Option>
            <Option value='Solana'>Solana</Option>
            <Option value='HEX'>HEX</Option>
          </Select>  
        </Col>

      }
      {
        cryptoNews?.map((news, index)=>(
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className='news-card'>
              <a href={news?.url} target='_blank' rel='noreferrer'>
                <div className='news-image-container'>
                  <Typography.Title level={4}>{news?.name}</Typography.Title>
                  <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImageURL } alt='#' />
                </div>
                <p>
                  {news?.description > 50 ? `${news.description.substring(0, 50)}...` : news.description}
                </p>
                <div className='provider-container'> 
                  <div>
                    <Avatar src={ news.provider[0]?.image?.thumbnail?.contentUrl || demoImageURL } alt="#"/>
                    <Typography.Text className='provider-name'>{ news?.provider[0]?.name }</Typography.Text>
                  </div>
                  <Typography.Text>{moment(news?.datePublished).startOf('ss').fromNow() } </Typography.Text>
                </div>
              </a>

            </Card>
          </Col>
        ))
      }
    </Row>
    </>
  )
}

export default News