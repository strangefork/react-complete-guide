import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }
  componentDidCatch(error) {
    //Adding this to a class based component makes it an error boundary. Functional components don't have an equivalent.
    console.log(error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong!</p>;
    }
    return this.props.children; //This is a wrapping component
  }
}

export default ErrorBoundary;
