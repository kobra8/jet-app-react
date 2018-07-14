import React from 'react';
import ReactDOM from 'react-dom';
import MainTable from './MainTable';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MainTable />, document.getElementById('root'));
registerServiceWorker();
