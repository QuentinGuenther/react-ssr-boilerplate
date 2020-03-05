import React, { Component } from 'react'

interface IProps {
  data: string;
}

class App extends Component<IProps> {
  render() {
    return (
      <div>
        Hello {this.props.data}
      </div>
    )
  }
}

export default App