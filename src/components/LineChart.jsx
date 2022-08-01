import React, { useEffect, useState } from 'react'
import { Col, Row, Typography } from 'antd';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const LineChart = ({ coinHistory, coinName, currentPrice })=> {
    
    const coinPrice = [];
    const coinTimestamp = [];


    for(let index in coinHistory.history){
        coinPrice.push(coinHistory.history[index].price);
        coinTimestamp.push(coinHistory.history[index].timestamp);
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };


    return (
        <>
            <Row className='chart-header'>
                <Typography.Title> {coinName} Price Chart</Typography.Title>
                <Col className='price-container'>
                    <Typography.Title level={5} className='price-change'>{ coinHistory?.change }%</Typography.Title>
                    <Typography.Title level={5} className='current-price'>Current { coinName } Price: { currentPrice }</Typography.Title>
                </Col>
            </Row>
            <Line data={data} />
        </>
    )
}

export default LineChart