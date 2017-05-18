import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import Radio from 'react-bootstrap/lib/Radio';
import Button from 'react-bootstrap/lib/Button';

export default class MultipleChoice extends Component {
    constructor (props) {
        super(props);    

        this.state = {
            options: _.isEmpty(this.props.options) 
                ?  [
                    'Option 1',
                    'Option 2',
                    'Option 3'
                ]
                : this.props.options
        }

        this.addOption = this.addOption.bind(this);
        this.removeOption = this.removeOption.bind(this);
    }

    addOption(event) {
        const target = event.target;
        const new_val = target.value;
        if (_.isEmpty(new_val)) {
            return null;
        }
        this.setState(function(prevState, props) {
            prevState.options.push(new_val);
            return {options: prevState.options};
        });

        target.value = '';
    }

    removeOption(event) {
        const target = event.target;
        this.setState(function(prevState, props) {
            _.pullAt(prevState.options, target.value);
            return {options: prevState.options};
        });
    }

    render () {
        const options = this.state.options.map((label, index) => 
            <Radio key={index} disabled>
                <FormControl
                    type="text"
                    name={ 'option-' + index + '-label'}
                    defaultValue={label}
                    bsClass="form-control"
                />
                <Button value={index} bsStyle="link" bsClass="btn btn-link link-circle" onClick={this.removeOption}>
                X
                </Button>
            </Radio>
        );
        return (
            <div className="multiple-choice-container">
                {options}
                <Radio key="add_option" disabled>
                    <FormControl
                        type="text"
                        name="add_option"
                        placeholder="Add Option"
                        bsClass="form-control"
                        onBlur={this.addOption}
                    />
                </Radio>
            </div>
        );
    }
}
