import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Redirect, Switch, NavLink } from 'react-router-dom';
import { cloneDeep } from '../../util/util.js';
import $ from 'n-zepto';
import './css/index.scss';

// 触发路由时，加载内容
const getAsyncComponent = (pathId, props) => {
    import(
        /* webpackChunkName: "[request]" */
        /* webpackExclude: /componentsdemo/ */
        `../../${pathId}/main.js`
    ).then(
        mod => {
            mod.default(props);
        },
        e => {
            console.log(e);
        }
    );
    // note: 待确认用途
    return <noscript />;
};

const BottomNav = props => {
    const navConfig = props.navConfig;  
    return (
        <BrowserRouter>
            <React.Fragment>
                <div id="main"></div>
                <ul id='nav-menu'>
                    {
                        navConfig.map(item => {
                            return (
                                <li key={item.pathId} className={item.pathId}>
                                    <NavLink to={item.navPath} activeClassName="active">
                                        <i className='icon-shop-o icon-menu'/>
                                        <span>{item.navText}</span>
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
                <Switch>
                    {
                        navConfig.map(item => {
                            return (
                                <Route 
                                    key={item.navText}
                                    path={item.navPath} 
                                    render={props => getAsyncComponent(item.pathId, props)} 
                                />
                            )
                        })
                    }
                </Switch>
            </React.Fragment>
        </BrowserRouter>
    );
};

BottomNav.propTypes = {
    navConfig: PropTypes.array.isRequired
};

export default BottomNav;
