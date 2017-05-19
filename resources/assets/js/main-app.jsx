import React from "react";
import ReactDOM from "react-dom";
import SurveyBuilder from "./components/survey-builder.jsx";

const questions = [];
const question_types = {
    multiple_choice: 'Multiple Choice',
    checkboxes: 'Checkboxes'
};

ReactDOM.render(
    <SurveyBuilder questions={questions} question_types={question_types} />,
    document.getElementById('survey-creation')
);
