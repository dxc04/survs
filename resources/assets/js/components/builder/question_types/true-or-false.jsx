import React, { Component } from 'react';
import Radio from 'react-bootstrap/lib/Radio';
import FormControl from 'react-bootstrap/lib/FormControl';

export default class TrueOrFalse extends Component {
    constructor (props) {
        super(props);    
    }

    render () {
        return (
            <div className="options-container">
                <Radio disabled>
                    <FormControl
                        type="text"
                        name="option_1"
                        defaultValue="True"
                        bsClass="form-control"
                    />
                </Radio>
                <Radio disabled>
                    <FormControl
                        type="text"
                        name="option_2"
                        defaultValue="False"
                        bsClass="form-control"
                    />
                </Radio>
            </div>
        );
    }
}
