import React from 'react'
import PropTypes from 'prop-types'
import './index.css'
import title from '../../styles/img/title.png'
import Switch from '../Switch'


function OperatePannel ({data, keys, handleGpuState, checkLog}){
	return(
		<div className="operate">
			<div className="operate-title">
				<img src={title} className="title"/>
				supervisor
			</div>
			<table className="operate-container" >
				<thead className="operate-thead">
					<tr>
						<td>id</td>
						{keys&&keys.map((value,i)=>
							<td key={i}>{value}</td>
						)}
						<td>操作面板</td>
					</tr>
				</thead>
				<tbody className="operate-tbody">
		          {data.map((post, i) =>
		            <tr className="operate-content" key={i}>
		              <td>{i+1}</td>
		              {keys&&keys.map((value,index)=>
							<td key={index}>
								{post[value]}
							</td>
						)}
					  <td className="operatePanner">
					  		<Switch onClick={()=>handleGpuState(i)} isStart={post.statename === 'RUNNING'}/>
							<a className="checkLog" href="javascript:void(0)" onClick={()=>checkLog(i)}>查看日志</a>
							
					  </td>		             
		            </tr>
		          )}
		        </tbody>
			</table>
		</div>
	)
}

OperatePannel.PropTypes = {
	data:PropTypes.array.isRequired,
	handleClick:PropTypes.func,
	isShowTitle:PropTypes.bool,
	keys:PropTypes.array
}

export default OperatePannel