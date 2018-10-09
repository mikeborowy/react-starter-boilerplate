import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const propTypes = {
    classes: PropTypes.object.isRequired
};

const defaultProps = {
    classes: {}
};

const Prelaoder = (props) => {
    const {classes} = props;
    return(
        <CircularProgress className={classes.progress}/>
    );
};

Prelaoder.propTypes = propTypes;
Prelaoder.defaultProps = defaultProps;

export default Prelaoder;