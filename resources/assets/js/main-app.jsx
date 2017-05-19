import React from "react";
import ReactDOM from "react-dom";
import SurveyBuilder from "./components/survey-builder.jsx";

const survey = {
    title: '',
    description: '',
    questions: [],
    question_types: {
        multiple_choice: 'Multiple Choice',
        checkboxes: 'Checkboxes'
    }
};

ReactDOM.render(
    <SurveyBuilder survey={survey} />,
    document.getElementById('survey-creation')
);
