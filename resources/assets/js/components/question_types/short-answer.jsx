import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';

export default class ShortAnswer extends Component {
    constructor (props) {
        super(props);    
    }

    render () {
        return (
            <FormControl
                type="text"
                placeholder="Short Answer Text"
                bsClass="form-control"
                disabled
            />
        );
    }
}
