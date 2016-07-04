import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './components/CommentBox.jsx';

export function bootstrap(props) {
  ReactDOM.render(
    <CommentBox comments={props.comments} url={props.url} pollInterval={props.pollInterval} />,
    document.getElementById('content')
  );
}
