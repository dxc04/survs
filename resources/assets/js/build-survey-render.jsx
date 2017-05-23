import React from "react";
import ReactDOM from "react-dom";
import SurveyBuilder from "./components/builder/survey-builder.jsx";

ReactDOM.render(
    <SurveyBuilder survey={SurveyVars.survey} question_types={SurveyVars.question_types} />,
    document.getElementById('survey-creation')
);
