import React, { Component } from 'react';

import './index.css';

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="lds lds-css ng-scope">
          <div className="lds-spinner" style={{width:'100%',height:'100%'}}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
          </div>
        </div>
      </div> 
    );
  }
}

export default Loading
