import { injectReducer } from '../../store/reducers'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    //change state every time

    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const HomeViewContainer = require('./containers/HomeViewContainer').default
      const homeView=require('./modules/homeView')
      const reducer = homeView.default

      /*  Add the reducer to the store on key 'AutoCompleteContainer'  */
      injectReducer(store, { key: 'homeView', reducer })

      /*  Return getComponent   */
      cb(null, HomeViewContainer)
      
    }, 'homeView')
  }
})