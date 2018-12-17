import React, { Component } from 'react';
import './App.css';

import store from './store';
import { Provider } from 'react-redux';

import FFSchedulesEnhance from './FFSchedulesEnhance';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <FFSchedulesEnhance title="FF Scheduler!!" />
        </div>
      </Provider>
    );
  }
}

export default App;
