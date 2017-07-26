import React from 'react'
import PropTypes from 'prop-types'
import './index.css'
import title from '../../styles/img/title.png'
import { Link } from 'react-router'

function numToArr(num,Max=8){
  var arr = []
  for(var i =0;i < Max;i++){
    if(i < num){
      arr.push(1)
    }else{
      arr.push(0)
    }
  }
  return arr
}

function Statistic ({data,handleGpuInfoByIp,lastUpdated}){
	return(
		<div className="statistic">
			<div className="statistic-title">
				<img src={title} className="title"/>
				统计
				<span className="lastUpdated">当前抓取时间:{lastUpdated}</span>
			</div>
			<div className="statistic-container">
				<ul>
					{data.map((value,index)=>(
						<li onClick={()=>handleGpuInfoByIp(value.ip)} key={index}>
							<span className="ip">{value.ip}</span>
							<ul className="gpu">
								{numToArr(value.gpu_used_num,value.gpu_used_total).map((value,index)=>(
									<li key={index} className={value?"gpu-on":"gpu-off"}></li>
								))}
							</ul>
						</li>
						
					))}
					
				</ul>
			</div>
		</div>
	)
}

Statistic.PropTypes = {
	data:PropTypes.array.isRequired,
	handleGpuInfoByIp:PropTypes.func,
	lastUpdated:PropTypes.string
}

export default Statistic