import React from 'react';
import PropTypes from 'prop-types';
import TopNav from '../aaaCommon/topNav/Index';

class Aceshi2 extends React.Component {
    refresh = () => {
        console.log('ceshi3 shuaxin')
    }
    render() {
        const { oriProps } = this.props;
        return (
            <React.Fragment>
                <div id='aceshi3'>
                    <TopNav 
                        history={oriProps.history}
                        pageTitle='ceshi3'
                        refreshClick={this.refresh}
                    />
                    <h1>aceshi2!!</h1>
                </div>
            </React.Fragment>
        );
    }
}

Aceshi2.propTypes = {
    oriProps: PropTypes.object.isRequired
};

export default Aceshi2;