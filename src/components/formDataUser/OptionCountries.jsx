import classnames from "classnames";
import React from "react";

import { connect } from "react-redux";

// reactstrap components
import {
    FormGroup,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
    UncontrolledTooltip
} from "reactstrap";

import { focusHandler, blurHandler, onChangeNumber } from "helpers/input";

import { serverUrl } from "config";
import { countrys as telephones } from "helpers/countrys"

class OptionCountries extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "Bolivia",
            code: "591",
            flag: "BO"
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const code_area = (this.props.code_area !== null) ? this.props.code_area : "591";

        const found = telephones.find(element => element.code === code_area);
        this.setState({
            flag: found.flag
        });
    }

    handleChange(e) {
        const found = telephones.find(element => element.code === e.target.value);

        document.getElementById("code-label").innerText = "+" + found.code;
        document.getElementById("input-flag").value = found.flag;

        this.setState({
            flag: found.flag
        });
    }

    testUrl(code_area, whatsapp_number) {
        window.open("https://api.whatsap.com/send?phone=" + code_area + whatsapp_number, "blank")
    }

    render() {

        const listItems = telephones.map((telephone) =>
            <option key={telephone.iso_code} value={telephone.code}>{telephone.name + " +" + telephone.code}</option>
        );

        return (
            <>
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <label className="form-control-label" >Código de país:</label>
                            <InputGroup
                                // para hacer focus al input group
                                className={classnames({ focused: this.state.input1 && this.state.input1.focus })}
                            >
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <img src={serverUrl + "/storage/flags/" + this.state.flag + ".png"} alt=""></img>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    onChange={this.handleChange}
                                    type="select"
                                    name="area_code"
                                    defaultValue={this.props.area_code}
                                    onFocus={focusHandler}
                                    onBlur={blurHandler}
                                    maxLength="15"
                                >
                                    {listItems}
                                </Input>
                            </InputGroup>
                            <Input
                                tipe="text"
                                className="d-none"
                                name="flag"
                                defaultValue={this.state.flag}
                                id="input-flag"
                            />
                        </FormGroup>
                    </Col>

                    <Col md="6">
                        <FormGroup>
                            <label className="form-control-label">Número de WathsApp:</label>
                            <InputGroup
                                // para hacer focus al input group
                                className={classnames({ focused: this.state.default && this.state.default.focus })}
                            >
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText id="code-label">
                                        {this.props.code_area !== null ? "+" + this.props.code_area : "+591"}
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type="phone"
                                    name="whatsapp_number"
                                    defaultValue={this.props.whatsapp_number}
                                    placeholder="000-000-000"
                                    onFocus={focusHandler}
                                    onBlur={blurHandler}
                                    onChangeCapture={onChangeNumber}
                                />
                                <InputGroupAddon onClick={e => this.testUrl(this.props.code_area, this.props.whatsapp_number)} id={"tooltip48783807893"} addonType="append" style={{ cursor: "pointer" }}>
                                    <InputGroupText>
                                        <i className="fa fa-external-link-alt" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <UncontrolledTooltip delay={0} target="tooltip48783807893">
                                    Provar enlace
                                </UncontrolledTooltip>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    whatsapp_number: state.userData.whatsapp_number,
    code_area: state.userData.code_area,
});

export default connect(mapStateToProps)(OptionCountries);

