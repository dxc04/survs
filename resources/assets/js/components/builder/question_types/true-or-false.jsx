import React, { Component } from 'react';
import Radio from 'react-bootstrap/lib/Radio';
import FormControl from 'react-bootstrap/lib/FormControl';

export default class TrueOrFalse extends Component {
    constructor (props) {
        super(props);    
        this.state = {
            question_details : {
                options: [
                    'True',
                    'False'
                ]
            }
        }

        this.update = this.update.bind(this);
        this.updateOption = this.updateOption.bind(this);
    }

    update () {
        this.props.actions.update(this.state.question_details);
    }

    updateOption (event) {
        const target = event.target;
        const new_val = target.value;

        if ((event.type == 'blur' && _.isEmpty(new_val)) || (event.type == 'keypress' && event.charCode!=13)) {
            return null;
        }
        this.setState(function(prevState, props) {
            prevState.question_details.options[target.name] = new_val;
            return {question_details: prevState.question_details};
        });

        this.update();
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
                        onBlur={this.updateOption}
                        onKeyPress={this.updateOption}
                    />
                </Radio>
                <Radio disabled>
                    <FormControl
                        type="text"
                        name="option_2"
                        defaultValue="False"
                        bsClass="form-control"
                        onBlur={this.updateOption}
                        onKeyPress={this.updateOption}
                    />
                </Radio>
            </div>
        );
    }
}
