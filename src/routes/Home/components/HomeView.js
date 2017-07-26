import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from '../../../components/Table'
import Statistic from '../../../components/Statistic'
import Loading from '../../../components/Loading'
import Processing from '../../../components/Processing'
import OperatePannel from '../../../components/OperatePannel'
import Diaglog from '../../../components/Dialog'
import moment from 'moment'
import { browserHistory,Link } from 'react-router' 
const ipArrays = ['192.168.3.192', 
                  '192.168.3.193', 
                  '192.168.3.194',
                  '192.168.3.196', 
                  '192.168.3.197',
                  '192.168.3.198', 
                  '192.168.3.199', 
                  '192.168.3.200', 
                  '192.168.3.151',
                  '192.168.3.152']
const style={
  title:{
    textAlign:'center',
    margin:'22px auto 27px',
    color:'#035dc6',
    fontSize:'23px',
    fontWeight:'bold'
  }
}
class HomeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAll:true,
      showIp:false,
      ip:'',
      openLog:false
    }
    this.handlefetchData = this.handlefetchData.bind(this)
    this.handleGpuInfoByIp = this.handleGpuInfoByIp.bind(this)
    this.handleGpuState = this.handleGpuState.bind(this)
  }
  componentWillMount() {
  }
  componentDidMount() {
    var ip = window.location.pathname.split('/')[1]
    this.setState({ip})
    if(ip){
      this.props.getSupervisorData(ip)
      this.setState({showIp:true,showAll:false})
      this.handlefetchData(ip)
      this.setIntervalFnc(()=>this.handlefetchData(ip))
    }else{
      this.setState({showAll:true,showIp:false})
      var ipArray = ipArrays
      this.handlefetchData(ipArray)
      this.setIntervalFnc(()=>this.handlefetchData(ipArray))
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }
  setIntervalFnc(fn){
    var intervalId = setInterval(fn,60000)
    this.setState({intervalId})
  }
  handlefetchData(ip){
    this.props.fetchData(ip)
  }
  handleGpuInfoByIp = (ip)=>{
    window.location.href=`/${ip}`
    // browserHistory.push(`/${ip}`)
  }
  handleGpuState = (i)=>{
    var data = this.props.supervisorData[i]
    var obj = {
      process:data.name,
      ip_address:this.state.ip
    }
    //控制开关
    if(data.statename === 'RUNNING'){
      obj.action = 'stop'
    }else{
      obj.action = 'start'
    }
    this.props.supervisorAction(obj)
  }
  checkLog = (i) =>{
    var data = this.props.supervisorData[i]
    var obj = {
      process:data.name,
      ip_address:this.state.ip,
      action:'tail'
    }
    this.setState({openLog:true})
    this.props.checkLog(obj)
  }
  closeLogDialog = ()=>{
    this.setState({openLog:false})
    this.props.clearLocalLog()
  }
  render() {
    const { GPUData, lastUpdated ,GPUDataByIp, supervisorData, processState, logData} = this.props
    return (
      <div>
        {GPUData.length === 0 && <Loading/>}
        <div style={style.title}>DGNet</div>
        {/*tips*/}
        <Processing state={processState}/>
        <Diaglog data={logData} open={this.state.openLog} onClose={this.closeLogDialog}/>
        {/*统计页面*/}
        {GPUData.length > 0 && this.state.showAll && 
          <Statistic 
            data={GPUData} 
            handleGpuInfoByIp={this.handleGpuInfoByIp}
            lastUpdated = {moment(lastUpdated).format('YYYY-MM-DD hh:mm:ss')}
          />
        }
        {GPUData.length > 0 && this.state.showIp &&
          <div>
            <Table 
              lastUpdated = {moment(lastUpdated).format('YYYY-MM-DD hh:mm:ss')} 
              data={GPUData} 
              keys={Object.keys(GPUData[0])} 
              isShowTitle={this.state.showIp} 
            />
          </div> 
        }
        <div style={{marginTop:'20px'}}>
          {supervisorData.length > 0 && 
            <OperatePannel
                handleGpuState={this.handleGpuState}
                checkLog={this.checkLog}
                data={supervisorData}
                keys={['name']}
            />
          }
        </div> 
        
      </div>
    )
  }
}

HomeView.propTypes = {
  GPUData: PropTypes.array.isRequired,
  GPUDataByIp: PropTypes.array,
  lastUpdated: PropTypes.number,
  supervisorData:PropTypes.array,
  handleGpuState:PropTypes.func
}

export default HomeView