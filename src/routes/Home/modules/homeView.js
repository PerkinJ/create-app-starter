import fetch from 'isomorphic-fetch'
// requireAuthentication(path)
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_DATA = 'FETCH_DATA'
export const LAST_UPDATE = 'LAST_UPDATE'
export const FETCH_ERROR = 'FETCH_ERROR'
export const FETCH_DATA_IP = 'FETCH_DATA_IP'
export const SUPERVISOR_DATA = 'SUPERVISOR_DATA'
export const SUPERVISOR_STATE = 'SUPERVISOR_STATE'
export const CHECK_LOG = 'CHECK_LOG'
// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */


//获取GPU信息
export function fetchData(ip){
  return (dispatch, getState) => {      
      //抓取时间
      dispatch({
        type:'LAST_UPDATE',
        lastUpdated:Date.now()
      })
      if(ip&&Object.prototype.toString.call(ip)==='[object Array]'){
        //区别第一次获取，跟后面抓取
        var preData = getState().homeView.GPUData
        var posts = preData.length > 0? preData.slice(0):[]
        ip.forEach((ip,index)=>{
          fetch(`http://${ip}:9000/gpu_information`)
          .then(response => response.json())
          .then(data => {
            var gpu_used_total = data[0].gpu_used_total, 
                gpu_used_num = data[0].gpu_used_num
            var obj = { ip, gpu_used_num, gpu_used_total}
            if(preData.length ===0){
              posts.push(obj)
              posts = Array.prototype.concat.apply([], posts)
            }else{
              posts.forEach((value)=>{
                if(value.ip === obj.ip){
                  if(value.gpu_used_num !==obj.gpu_used_num){
                    value.gpu_used_num = obj.gpu_used_num
                  }
                }
              })
            }
            dispatch({
              type:'FETCH_DATA',
              GPUData:posts
            })
          })
        })
      }else if(ip&& typeof ip === 'string'){
        var posts = []
        fetch(`http://${ip}:9000/gpu_information`)
          .then(response => response.json())
          .then(data => {
            data[0].tasks.forEach((task)=>{
              task.ip = data[0].ip
            })
            posts.push(data[0].tasks.slice(0))
            posts = Array.prototype.concat.apply([], posts)
            dispatch({
              type:'FETCH_DATA',
              GPUData:posts
            })
          })
      }else{
        dispatch({
              type:'FETCH_ERROR',
              fetchError:true
            })
      }
    
  }
}

export function getSupervisorData(ip){
  return dispatch =>{
    fetch(`http://192.168.2.31:9050/supervisord_api/state`,{
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `ip_address=http://${ip}:9001`
    })
    .then(response => response.json())
    .then(data => {
      dispatch({
        type:'SUPERVISOR_DATA',
        supervisorData:data.state
      })
    })
  }
}

export function supervisorAction(obj={}){
  return (dispatch, getState) =>{
    dispatch({
      type:'SUPERVISOR_STATE',
      processState:'processing'
    })
    fetch(`http://192.168.2.31:9050/supervisord_api/action`,{
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `process=${obj.process}&action=${obj.action}&ip_address=http://${obj.ip_address}:9001`
    })
    .then(response => response.json())
    .then(data => {
      if(data.message === 'success'){
         dispatch({
            type:'SUPERVISOR_STATE',
            processState:'success'
          })
         setTimeout(()=>{
          dispatch({
            type:'SUPERVISOR_STATE',
            processState:'null'
          })
         },1500)
        getSupervisorData(obj.ip_address)(dispatch)
      }else{
        dispatch({
            type:'SUPERVISOR_STATE',
            processState:'fail'
          })
        setTimeout(()=>{
          dispatch({
            type:'SUPERVISOR_STATE',
            processState:'null'
          })
         },1500)
      }
    }).catch((err)=>{
      dispatch({
        type:'SUPERVISOR_STATE',
        processState:'fail'
      })
      setTimeout(()=>{
        dispatch({
            type:'SUPERVISOR_STATE',
            processState:'null'
          })
         },1500)
      })
  }
}

//查看log
export function checkLog(obj={}){
  return (dispatch,getState) => {
    dispatch({
      type:'SUPERVISOR_STATE',
      processState:'processing'
    })
    fetch(`http://192.168.2.31:9050/supervisord_api/action`,{
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `process=${obj.process}&action=${obj.action}&ip_address=http://${obj.ip_address}:9001`
    })
    .then(response => response.json())
    .then(data => {
      dispatch({
        type:'SUPERVISOR_STATE',
        processState:'null'
      })
      dispatch({
        type:'CHECK_LOG',
        logData:data.tail
      })
    })
    .catch((err)=>{
      console.log('err',err)
    })
  }
}
export function clearLocalLog(){
  return dispatch =>{
    dispatch({
        type:'CHECK_LOG',
        logData:''
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_DATA]:(state,action)=>Object.assign({},state,{GPUData:action.GPUData}),
  [FETCH_ERROR]:(state,action)=>Object.assign({},state,{fetchError:action.fetchError}),
  [LAST_UPDATE]:(state,action)=>Object.assign({},state,{lastUpdated:action.lastUpdated}),
  [SUPERVISOR_DATA]:(state,action)=>Object.assign({},state,{supervisorData:action.supervisorData}),
  [SUPERVISOR_STATE]:(state,action)=>Object.assign({},state,{processState:action.processState}),
  [CHECK_LOG]:(state,action)=>Object.assign({},state,{logData:action.logData})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  GPUData:[],
  fetchError:false,
  lastUpdated:0,
  supervisorData:[],
  processState:'null',
  logData:''
}
export default function homeViewReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
