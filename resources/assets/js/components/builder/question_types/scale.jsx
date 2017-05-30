import React, { Component } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';

export default class Scale extends Component {
    constructor (props) {
        super(props);    
	this.state = {
            question_details : {
                range: _.isEmpty(this.props.details.range) 
                ?  {
                    min: {'value': 1, 'label': ''},
                    max: {'value': 5, 'label': ''}
                }
                : this.props.details.range
            }
        }

        this.update = this.update.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.updateLabel = this.updateLabel.bind(this);
    }

    update () {
        this.props.actions.update(this.state.question_details);
    }

    updateValue (event) {
        const target = event.target;
        this.setState(function(prevState, props) {
	    prevState.question_details.range[target.dataset.range_value]['value'] = target.value;
	    return {question_details: prevState.question_details};
        });

        this.update();
    }

    updateLabel (event) {
    	const target = event.target;
	if ((event.type == 'blur' && _.isEmpty(target.value)) || (event.type == 'keypress' && event.charCode!=13)) {
            return null;
        }
        
	this.setState(function(prevState, props) {
            prevState.question_details.range[target.dataset.range_label]['label'] = target.value;
            return {question_details: prevState.question_details};
        });

        this.update();
    }

    render () {
	const range = this.state.question_details.range;
        return (
            <div className="scale-container">
            	<div className="row" style={{width: "140px"}}>
		    <div className="col-md-4">
		    	<FormControl componentClass="select" defaultValue={range.min.value} onChange={this.updateValue} data-range_value='min' className="scale-select">
                    	    <option key="0" value="0">0</option>
		    	    <option key="1" value="1">1</option>
                    	</FormControl>
		    </div>
		    <div className="col-md-4">
		    	<div className="select-label">to</div>
                    </div>
		    <div className="col-md-4">
		        <FormControl componentClass="select" defaultValue={range.max.value} onChange={this.updateValue} data-range_value="max" className="scale-select">
                    	    {_.map(_.range(2,11), (t,i) => 
                	    	<option key={t} value={t}>{t}</option>
		    	    )}
		        </FormControl>
		    </div>
		</div>
		<div>
		    <span className="scale-label">{range.min.value}</span>
		    <FormControl
			type="text"
                    	name="scale-min-label"
			placeholder="Label (Optional)"
			data-range_label="min"
                    	defaultValue={range.min.label}
                    	bsClass="form-control"
			onBlur={this.updateLabel}
			onKeyPress={this.updateLabel}
                    />
		</div>
		<div>
		    <span className="scale-label">{range.max.value}</span>
		    <FormControl
			type="text"
                    	placeholder="Label (Optional)"
			name="scale-min-label"
                    	data-range_label="max"
			defaultValue={range.max.label}
                    	bsClass="form-control"
			onBlur={this.updateLabel}
			onKeyPress={this.updateLabel}
                    />
		</div>
            </div>
        );
    }
}
