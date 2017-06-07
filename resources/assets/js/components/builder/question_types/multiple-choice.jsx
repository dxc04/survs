import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import Radio from 'react-bootstrap/lib/Radio';
import Button from 'react-bootstrap/lib/Button';

export default class MultipleChoice extends Component {
    constructor (props) {
        super(props);    
        this.state = {
            question_details : {
                options: _.isEmpty(this.props.details.options) 
                    ? [
                        'Option 1',
                        'Option 2',
                        'Option 3'
                    ]
                    : this.props.details.options
            }
        }

        this.update = this.update.bind(this);
        this.updateOption = this.updateOption.bind(this);
        this.addOption = this.addOption.bind(this);
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
            return {question_details: prevState.question_details};
        });

        this.update();
    }

    render () {
        const options = this.state.question_details.options.map((label, index) => 
            <Radio key={label + index} disabled>
                <FormControl
                    data-option_index={index}
		            type="text"
                    name={ 'option-' + index + '-label'}
                    defaultValue={label}
                    bsClass="form-control"
		            onBlur={this.updateOption}
                    onKeyPress={this.updateOption}
                />
                <Button value={index} bsStyle="link" bsClass="btn btn-link link-circle" onClick={this.removeOption}>
                    X
                </Button>
            </Radio>
        );
        return (
            <div className="options-container">
                {options}
                <Radio key="add_option" disabled>
                    <FormControl
                        type="text"
                        name="add_option"
                        placeholder="Add Option"
                        bsClass="form-control"
                        onBlur={this.addOption}
                        onKeyPress={this.addOption}
                    />
                </Radio>
            </div>
        );
    }
}
