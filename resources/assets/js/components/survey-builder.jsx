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

        this.onRemoveQuestion = this.onRemoveQuestion.bind(this);
        this.onAddQuestion = this.onAddQuestion.bind(this);
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

    onRemoveQuestion (id) {
        this.setState(function(prevState, props) {
            return {questions: _.filter(prevState.questions, ['id', id])};
        });
    }

    buildQuestions () {
        return this.state.questions.map((question) => 
            <Question 
                questions={this.state.questions}
                key={question.id}
                id={question.id}
                actions={{remove: () => this.onRemoveQuestion }}
            />
        );
    }

    render() {
        const children = this.buildQuestions();
        return (
            <Survey addQuestion={this.onAddQuestion}>
                <Information />
                {children}
            </Survey>
        );
    }
    
}
