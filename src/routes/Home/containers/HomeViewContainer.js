import { connect } from 'react-redux'
// import { login} from '../modules/homeView'
import {fetchData, getSupervisorData, supervisorAction, checkLog, clearLocalLog} from '../modules/homeView'
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import HomeView from '../components/HomeView'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
    fetchData,
    getSupervisorData,
    supervisorAction,
    checkLog,
    clearLocalLog
}

const mapStateToProps = (state) => ({
    GPUData:state.homeView.GPUData,
    fetchError:state.homeView.fetchError,
    lastUpdated:state.homeView.lastUpdated,
    supervisorData:state.homeView.supervisorData,
    processState:state.homeView.processState,
    logData:state.homeView.logData
})


export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
