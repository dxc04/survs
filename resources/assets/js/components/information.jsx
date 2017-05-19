import React, {Component} from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

export default class Information extends Component {
    constructor (props) {
        super(props);    

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (event) {
        this.setState({
           [name]: event.target.value,
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
                        name="survey_title"
                        value={this.props.title}
                        placeholder="Survey Title"
                        className="input-title-lg"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                    <HelpBlock></HelpBlock>
                </FormGroup>

                <FormGroup>
                    <FormControl
                        componentClass="textarea"
                        name="description"
                        value={this.props.description}
                        placeholder="Description"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                </FormGroup>

                {this.props.children}

            </div>
        );
    }
    
}
