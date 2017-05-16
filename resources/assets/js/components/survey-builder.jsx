import React, {Component} from "react";
import ReactDOM from "react-dom";
import Survey from "./survey.jsx";
import Information from "./information.jsx";
import Question from "./question.jsx";

export default class SurveyBuilder extends Component {
    constructor(props) {
        super(props);    

        this.state = {
            questions: []
        };

    }

    onAddQuestion () {
        this.setState(function(prevState, props) {
            prevState.questions.push({
                id: 'new' + (prevState.questions.length + 1),
                type: 'multiple'
            });
            return {questions: prevState.questions};
        });
    }

    buildQuestions () {
        return this.state.questions.map((question) => 
            <Question key={question.id} id={question.id} />
        );
    }

    render() {
        const children = this.buildQuestions();
        return (
            <Survey addQuestion={this.onAddQuestion.bind(this)}>
                <Information />
                {children}
            </Survey>
        );
    }
    
}
