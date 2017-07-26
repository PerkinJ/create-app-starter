import React, {Component} from 'react'
import './index.css' 
import close from '../../styles/img/close.svg'

class Dialog extends Component {
  render() {
  	const {data, onClose, open} = this.props
    return (
      <div className="dialog" style={{display:open?'block':'none'}}>
      	<img className="close" src={close} onClick={onClose}/>
        <section>{data&&data.length>0?data:'无日志'}</section>
      </div> 
    );
  }
}

export default Dialog