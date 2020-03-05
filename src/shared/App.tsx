import React, { Component } from 'react'
import Grid from './Grid'

interface IProps {
  data: string;
}

class App extends Component<IProps> {
  render() {
    return (
      <div>
        <Grid data={this.props.data} />
      </div>
    )
  }
}

export default App