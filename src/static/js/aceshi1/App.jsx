import React from 'react';
import PropTypes from 'prop-types';
import TopNav from '../aaaCommon/topNav/Index';

class Aceshi1 extends React.Component {
    refresh = () => {
        console.log('ceshi1 shuaxin')
    }
    render() {
        const { oriProps } = this.props;
        return (
            <React.Fragment>
                <div id='aceshi1'>
                    <TopNav 
                        history={oriProps.history} 
                        pageTitle='ceshi1' 
                        refreshClick={this.refresh}
                    />
                    <h1>aceshi1!!</h1>
                </div>
            </React.Fragment>
        );
    }
}

Aceshi1.propTypes = {
    oriProps: PropTypes.object.isRequired
};

export default Aceshi1;