import React from 'react'
import PropTypes from 'prop-types'
import './index.css'
import title from '../../styles/img/title.png'

function Table ({data,handleClick,isShowTitle,keys,lastUpdated}){
	return(
		<div className="table">
			<div className="table-title">
				<img src={title} className="title"/>
				{isShowTitle?data[0].ip:''}
				<span className="lastUpdated">当前抓取时间:{lastUpdated}</span>
			</div>
			<table className="table-container" >
				<thead className="table-thead">
					<tr>
						<td>id</td>
						{keys&&keys.map((value,i)=>
							<td key={i}>{value}</td>
						)}
					</tr>
				</thead>
				<tbody className="table-tbody">
		          {data.map((post, i) =>
		            <tr className="table-content" key={i} onClick={handleClick?()=>handleClick(post):''}>
		              <td>{i+1}</td>
		              {keys&&keys.map((value,index)=>
							<td key={index} style={post[value].length > 10?{fontSize:'12px'}:{}} >
							{Object.prototype.toString.call(post[value]) == '[object Array]'?
								<div className="nest">
									{post[value].map((value,index)=>
										<div className="nest-table" key={index}>{value}</div>
									)}
								</div>
							:post[value]}
							</td>
						)}		             
		            </tr>
		          )}
		        </tbody>
			</table>
		</div>
	)
}

Table.PropTypes = {
	data:PropTypes.array.isRequired,
	handleClick:PropTypes.func,
	isShowTitle:PropTypes.bool,
	keys:PropTypes.array
}

export default Table