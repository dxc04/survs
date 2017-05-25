import React from "react";
import ReactDOM from "react-dom";
import SurveyPublisher from "./components/publisher/survey-publisher.jsx";

ReactDOM.render(
    <SurveyPublisher survey={SurveyVars.survey} />,
    document.getElementById('publish-survey-container')
);
