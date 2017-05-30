import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Button from 'react-bootstrap/lib/Button';

export default class Checkboxes extends Component {
    constructor (props) {
        super(props);    
        this.state = {
            question_details : {
                options: _.isEmpty(this.props.details.options) 
                ?  [
                    'Checkbox 1',
                    'Checkbox 2',
                    'Checkbox 3'
                ]
                : this.props.details.options
            }
        }

        this.update = this.update.bind(this);
        this.addOption = this.addOption.bind(this);
        this.updateOption = this.updateOption.bind(this);
	this.removeOption = this.removeOption.bind(this);
    }

    update () {
        this.props.actions.update(this.state.question_details);
    }

    addOption (event) {
        const target = event.target;
        const new_val = target.value;

        if ((event.type == 'blur' && _.isEmpty(new_val)) || (event.type == 'keypress' && event.charCode!=13)) {
            return null;
        }
        this.setState(function(prevState, props) {
            prevState.question_details.options.push(new_val);
            return {question_details: prevState.question_details};
        });

        target.value = '';

        this.update();
    }

    updateOption (event) {
        const target = event.target;
        const new_val = target.value;

        if ((event.type == 'blur' && _.isEmpty(new_val)) || (event.type == 'keypress' && event.charCode!=13)) {
            return null;
        }
        this.setState(function(prevState, props) {
            prevState.question_details.options[target.dataset.option_index] = new_val;
            return {question_details: prevState.question_details};
        });

        this.update();
    }

    removeOption (event) {
        const target = event.target;
        this.setState(function(prevState, props) {
            _.pullAt(prevState.question_details.options, target.value);
            return {question_details: prevState.question_details.options};
        });

        this.update();
    }

    render () {
        const options = this.state.question_details.options.map((label, index) => 
            <Checkbox key={index} disabled>
                <FormControl
                    type="text"
                    name={ 'option-' + index + '-label'}
		    data-option_index={index}
		    defaultValue={label}
                    bsClass="form-control"
		    onBlur={this.updateOption}
		    onKeyPress={this.updateOption}
                />
                <Button value={index} bsStyle="link" bsClass="btn btn-link link-circle" onClick={this.removeOption}>
                X
                </Button>
            </Checkbox>
        );
        return (
            <div className="checkboxes-container">
                {options}
                <Checkbox key="add_option" disabled>
                    <FormControl
                        type="text"
                        name="add_option"
                        placeholder="Add Option"
                        bsClass="form-control"
                        onBlur={this.addOption}
                        onKeyPress={this.addOption}
                    />
                </Checkbox>
            </div>
        );
    }
}
