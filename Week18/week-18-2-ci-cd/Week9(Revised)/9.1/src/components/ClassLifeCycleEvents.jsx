import React from "react";

class ClassLifeCycleEvents extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("component mounts");
  }

  componentWillMount() {
    console.log("Component Unmounts");
  }

  render() {
    return <div>Hi there</div>;
  }
}

export default ClassLifeCycleEvents;
