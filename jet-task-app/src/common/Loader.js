import React from 'react';

const Loader = (props) => {
  if(props.isLoading) {
    return (
      <h1>Loading ...</h1>
    )
  }
  else {
    return props.children;
  }
}

export default Loader;