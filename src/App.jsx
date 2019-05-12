import React from 'react';
import logo from './logo.svg';
import './App.css';

import Square from './Square';

function App({ days, hours, minutes, seconds }) {
  return (
    <div className="App">
      <header className="App-header">
        <Square value={days} label={'Days'} />
        <Square value={hours} label={'Hours'} />
        <Square value={minutes} label={'Minutes'} />
        <Square value={seconds} label={'Seconds'} />
      </header>
    </div>
  );
}

function withTimer({ days, hours, minutes, seconds }) {
  return WrappedComponent =>
    class extends React.Component {
      constructor() {
        super();

        this.state = {
          days,
          hours,
          minutes,
          seconds
        };
        this.timeInSeconds =
          seconds + ((days * 24 + hours) * 60 + minutes) * 60;
      }

      componentDidMount() {
        this.tick = setInterval(() => {
          this.setState({
            days: Math.floor(this.timeInSeconds / (3600 * 24)),
            hours: Math.floor((this.timeInSeconds % (3600 * 24)) / 3600),
            minutes: Math.floor((this.timeInSeconds % 3600) / 60),
            seconds: Math.floor(this.timeInSeconds % 60)
          });
          this.timeInSeconds--;
        }, 1000);
      }

      componentWillUnmount() {
        clearInterval(this.tick);
      }

      render() {
        return <WrappedComponent {...this.state} {...this.props} />;
      }
    };
}

export default withTimer({
  days: 2,
  hours: 0,
  minutes: 0,
  seconds: 0
})(App);
