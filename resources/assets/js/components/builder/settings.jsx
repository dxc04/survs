import React, {Component} from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';

export default class Settings extends Component {
    constructor (props) {
        super(props);    

        this.state = {
            isShowingModal: false,
            settings: this.props.settings
        }

        this.update = this.update.bind(this);
        this.showSettings = this.showSettings.bind(this);
        this.closeSettings = this.closeSettings.bind(this);
        this.updateSettings = this.updateSettings.bind(this);
    }

    updateSettings (event) {
        this.props.actions.updateSettings(this.state);
    }

    update (event) {
        const target = event.target;

        this.setState(function(prevState, props) {
            prevState.settings[target.name] = target.value;
            return prevState;
        });
    }

    showSettings() {
        this.setState(function (prevState, props) {
            prevState.isShowingModal = true;
        });
    }

    closeSettings() {
        this.setState(function (prevState, props) {
            prevState.isShowingModal = false
        });
    }

    render () {
        return (
            <div>
                <a className="btn btn-circle btn-lg" title="Settings" onClick={this.showSettings}>
                    <i className="fa fa-cog" aria-hidden="true"></i>
                </a>
                <Modal
                    show={this.state.isShowingModal}
                    onHide={this.closeSettings}
                    aria-labelledby="ModalHeader"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'>Settings</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="col-md-4">
                            <div className="select-label">Questions per Page: </div>
                        </div>
                        <div className="col-md-4">
                            <FormControl
                                name="questions_per_page"
                                componentClass="select"
                                defaultValue={this.state.settings.page}
                                className="scale-select"
                                onChange={this.update}
                            >
                                {_.map(_.range(1,11), (t,i) => 
                                    <option key={t} value={t}>{t}</option>
                                )}
                            </FormControl>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="default" bsSize="small" onClick={this.updateSettings}>
                            Save
                        </Button>
                        <Button bsStyle="default" bsSize="small" onClick={this.closeSettings}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
     }
}
