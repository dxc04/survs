import React, {Component} from "react";

export default class SurveyPublisher extends Component {
    constructor (props) {
        super(props);
        console.log(props);
    }

    render () {
        return (
            <Survey>
                <Information title={this.props.survey.title} description={this.props.survey.description} />
                <div id="survey-questions">
                    {children}
                </div>
            </Survey>
        );
    }
}

export class Survey extends Component {
    render () {
        return (
            <form>
                {this.props.children}
            </form>
        );
    };
}

export class Information extends Component {
    constructor (props) {
        super(props);
    }
    
    render () {
        return (
            <div>
                <div>{this.props.title}</div>
                <div>{this.props.description}</div>
            </div>
        );
    }
}

export class Question extends Component {
    constructor (props) {
        super(props);

        this.details = this.details.bind(this);
    }

    details () {
        var question = this.props.question;
        switch (question.type) {
            case 'multiple_choice' :
                return <MultipleChoice details={question.details} /> 
            case 'checkboxes' :
                return; 
            case 'true_or_false' : 
                return <TrueOrFalse />;
            case 'short_answer' :
                return <ShortAnswer />; 
            case 'paragraph' :
                return <Paragraph />;
            default :
                return <MultipleChoice 
                            options={_.isEmpty(question.details.options) ? [] : question.details.options}
                        />; 
        }
    }

    render () {
        return (
            <div>
                <h3>this.props.question</h3>
                {this.details}
            </div>
        );
    }
}

