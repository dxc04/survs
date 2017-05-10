import React, {Component} from 'react';

export default class Survey extends Component {
    constructor(props) {
        super(props);    

        this.state = {
            survey_title: ''    
        }
    }

    handleChange(e) {
        this.setState({
           survey_title: e.target.value 
        });
    }


    getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    },

    render() {
        <form>
            <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationState()}
            >
                <FormControl
                    type="text"
                    value={this.state.survey_title}
                    placeholder="Survey Title"
                    onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>Validation is based on string length.</HelpBlock>
            </FormGroup>
            {this.props.children}
        </form>
    }
    
}
