import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Button from 'react-bootstrap/lib/Button';

export default class Checkboxes extends Component {
    constructor (props) {
        super(props);    

        this.state = {
            checkboxes: _.isEmpty(this.props.checkboxes) 
                ?  [
                    'Checkbox 1',
                    'Checkbox 2',
                    'Checkbox 3'
                ]
                : this.props.checkboxes
        }

        this.addCheckbox = this.addCheckbox.bind(this);
        this.removeCheckbox = this.removeCheckbox.bind(this);
    }

    addCheckbox (event) {
        const target = event.target;
        const new_val = target.value;

        if ((event.type == 'blur' && _.isEmpty(new_val)) || (event.type == 'keypress' && event.charCode!=13)) {
            return null;
        }
        this.setState(function(prevState, props) {
            prevState.checkboxes.push(new_val);
            return {checkboxes: prevState.checkboxes};
        });

        target.value = '';
    }

    removeCheckbox (event) {
        const target = event.target;
        this.setState(function(prevState, props) {
            _.pullAt(prevState.checkboxes, target.value);
            return {checkboxes: prevState.checkboxes};
        });
    }

    render () {
        const checkboxes = this.state.checkboxes.map((label, index) => 
            <Checkbox key={index} disabled>
                <FormControl
                    type="text"
                    name={ 'checkbox-' + index + '-label'}
                    defaultValue={label}
                    bsClass="form-control"
                />
                <Button value={index} bsStyle="link" bsClass="btn btn-link link-circle" onClick={this.removeCheckbox}>
                X
                </Button>
            </Checkbox>
        );
        return (
            <div className="checkboxes-container">
                {checkboxes}
                <Checkbox key="add_checkbox" disabled>
                    <FormControl
                        type="text"
                        name="add_checkbox"
                        placeholder="Add Checkbox"
                        bsClass="form-control"
                        onBlur={this.addCheckbox}
                        onKeyPress={this.addCheckbox}
                    />
                </Checkbox>
            </div>
        );
    }
}
