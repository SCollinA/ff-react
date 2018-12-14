import React, { Component } from 'react';
import './App.css';

import store from './store';
import { Provider } from 'react-redux';

import FFSchedulerContainer from './FFSchedulerContainer';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <FFSchedulerContainer title="FF Scheduler!!" />
        </div>
      </Provider>
    );
  }
}

export default App;
