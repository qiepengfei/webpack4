import React, { Component } from 'react';
import { Route, IndexRedirect, Switch, Redirect, IndexRoute } from 'react-router-dom';
import PropTypes from 'prop-types';

import './css/index.scss';

class TopNav extends Component {
    goBack = () => {
        this.props.history.goBack();
    }
    render() {
        const { pageTitle, refreshClick } = this.props;
        return (
            <div className='msz-nav'>
                <span className="icon-angle_left nav-left" onClick={this.goBack} />
                <h2>{pageTitle}</h2>
                <span className="nav-right">
                    <span onClick={refreshClick}>刷新</span>
                </span>
            </div>
        );
    }
}

TopNav.propTypes = {
    history: PropTypes.object.isRequired,
    pageTitle: PropTypes.string,
    refreshClick: PropTypes.func
};
TopNav.defaultProps = {
    pageTitle: '',
    refreshClick: () => {}
}
export default TopNav;
