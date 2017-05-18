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
                id: _.uniqueId('new_question_'),
                type: 'multiple_choice',
                details: {
                    options: [
                        'Option 1',
                        'Option 2',
                        'Option 3'
                    ]        
                }
            });
            return {questions: prevState.questions};
        });
    }

    onRemoveQuestion (id) {
        this.setState(function(prevState, props) {
            return {
                questions: _.remove(prevState.questions, (n) => {
                    return id != n.id;    
                })
            };
        });
    }

    buildQuestions () {
        return this.state.questions.map((question) => 
            <Question 
                key={question.id}
                id={question.id}
                actions={{remove: this.onRemoveQuestion }}
                question={question}
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
