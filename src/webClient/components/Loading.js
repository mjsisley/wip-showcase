import React from "react";
const Loading = props => {
  // Handle the loading state
  if (props.isLoading) {
    return props.children || <div>Loading...</div>;
  } else if (props.error) {
    // Handle the error state
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};

export default Loading;
