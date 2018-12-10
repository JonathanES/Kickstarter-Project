import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
const key1 = "ae3a0e0bd0d4445c93ffcc3fd4f8d3d7";
const key2 = "f8e036097992477ab1786bcadf5e1e09";
 
class Mic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false
    }
    this.onStop = this.onStop.bind(this);
  }
 
  startRecording = () => {
    this.setState({
      record: true,
      blob: ""
    });
  }
 
  stopRecording = () => {
    this.setState({
      record: false
    });
  }
 
  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }
 
  onStop(recordedBlob) {
      this.setState({blob: recordedBlob.blobURL});
    console.log('recordedBlob is: ', recordedBlob);
  }
 
  render() {
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
          backgroundColor="#FF4081" />
        <button onClick={() => this.startRecording()} type="button">Start</button>
        <button onClick={() => this.stopRecording()} type="button">Stop</button>
        <audio src={this.state.blob} controls>
Your browser does not support the audio element.
</audio>      </div>
    );
  }
}

export default Mic;