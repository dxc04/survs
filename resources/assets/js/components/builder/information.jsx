import React, {Component} from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

export default class Information extends Component {
    constructor (props) {
        super(props);    

        this.state = {
            title: this.props.title,
            description: this.props.description
        }

        this.update = this.update.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.title !== prevState.title || this.state.description !== prevState.description) {
            this.props.actions.update(this.state);
        }
    }

    update (event) {
        const target = event.target;

        if ((event.type == 'blur' && _.isEmpty(target.value)) || (event.type == 'keypress' && event.charCode != 13)) {
            return null;
        }

        this.setState(function(prevState, props) {
            prevState[target.name] = target.value;
            return prevState;
        });
    }

    getValidationState () {
        /*
        const length = this.state.survey_title.length;
        if (length > 10) return 'success';
        */
    }

    render () {
        return (
            <div>
                <FormGroup bsSize="large"
                    validationState={this.getValidationState()}
                >
                    <FormControl
                        type="text"
                        name="title"
                        defaultValue={this.state.title}
                        placeholder="Survey Title"
                        className="input-title-lg"
                        onBlur={this.update}
                        onKeyPress={this.update}
                    />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>

                <FormGroup>
                    <FormControl
                        componentClass="textarea"
                        name="description"
                        defaultValue={this.state.description}
                        placeholder="Description"
                        onBlur={this.update}
                        onKeyPress={this.update}
                    />
                    <FormControl.Feedback />
                </FormGroup>

                {this.props.children}

            </div>
        );
    }
    
}
