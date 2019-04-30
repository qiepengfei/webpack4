import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.scss';
import NavBottom from '../aaaCommon/bottomNav/Index.jsx';
import { navConfig } from './configs/config.js';

ReactDOM.render(
    <NavBottom navConfig={navConfig} />,
    document.getElementById('container'),
    () => {
        // window.jmEvaluation && window.jmEvaluation.init('FW_GOODS-585051');
    }
);







