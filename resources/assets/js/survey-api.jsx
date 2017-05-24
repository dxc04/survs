export default class SurveyApi {
 
    constructor (props) {
        const config = window.REQUEST_CONFIG;
        this.survey_api = axios.create(config);
    }

    save(data) {
        axios.post('/survey/save', data)
        .then(function (response) {
           // console.log(response);
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

}
