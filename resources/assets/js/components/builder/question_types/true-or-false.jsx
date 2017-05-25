import React, { Component } from 'react';
import Radio from 'react-bootstrap/lib/Radio';
import FormControl from 'react-bootstrap/lib/FormControl';

export default class TrueOrFalse extends Component {
    constructor (props) {
        super(props);    

        this.state = {
            question_details : {
                options: _.isEmpty(this.props.details) 
                ?  [
                    'True',
                    'False'
                ]
                : this.props.details.options
            }
        }

        this.update = this.update.bind(this);
        this.updateOption = this.updateOption(this);
    }

    update () {
        this.props.actions.update(this.state.question_details);
    }

    updateOption (event) {
        let target = event.target;
        this.setState(function(prevState, props) {
            prevState.question_details.options[target.name] = target.value;
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
                        name="1"
                        defaultValue="True"
                        bsClass="form-control"
                        onChange={this.updateOption}
                    />
                </Radio>
                <Radio disabled>
                    <FormControl
                        type="text"
                        name="2"
                        defaultValue="False"
                        bsClass="form-control"
                        onChange={this.updateOption}
                    />
                </Radio>
            </div>
        );
    }
}
