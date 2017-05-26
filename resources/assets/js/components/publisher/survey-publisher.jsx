import React, {Component} from "react";

export default class SurveyPublisher extends Component {
    constructor (props) {
        super(props);

        this.details = this.details.bind(this);
    }

    details (type) {
        switch (type) {
            case 'multiple_choice' :
                return '';
            case 'checkboxes' :
                return; 
            case 'true_or_false' : 
                return '';
            case 'short_answer' :
                return '';
            case 'paragraph' :
                return '';
            default :
                return '';
        }
    }

    render () {
        const children = this.props.survey.questions.map((question, index) => {
            <div>
                <h3>this.props.question</h3>
                {this.details(question.type)}
            </div>
        });

        return (
            <form>
                <div>{this.props.survey.title}</div>
                <div>{this.props.survey.description}</div>
                <div id="survey-questions">
                    {children}
                </div>
            </form>
        );
    }
}

