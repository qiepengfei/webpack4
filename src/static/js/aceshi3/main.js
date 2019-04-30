import React from 'react';
import { render } from 'react-dom';
import App from './App';

const asyncRender = (props) => {
    render(
        <App oriProps={props}/>,
        document.getElementById('main')
    );
};

export default asyncRender;
