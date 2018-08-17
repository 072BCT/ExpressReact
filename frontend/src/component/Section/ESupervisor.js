import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import TextField from "@material-ui/core/TextField/TextField";
import RButton from "../../Header/Navbar/RButton";
import Modal from "@material-ui/core/Modal/Modal";
import Paper from "@material-ui/core/Paper/Paper";
import cyan from "@material-ui/core/colors/cyan";
import Typography from "@material-ui/core/Typography/Typography";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import RTextfield from "../../container/RTextField";
import lime from "@material-ui/core/colors/lime";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

class ESupervisor extends Component {
    state = {
        supervisor: [],
        name: "",
        isOpen: false,
        id: '',
        designation: ""
    };
    handleOpen = () => {
        this.setState({
            isOpen: true,
            supervisor: this.props.data,
            name: this.props.data.name,
            designation: this.props.data.Title,
            id: this.props.data.idInstructor
        });
    };
    handleClose = () => {
        this.setState({
            isOpen: false
        });
    };
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleEdit = () => {
        let data = {
            name: this.state.name,
            id: this.state.id,
            designation: this.state.designation
        };
        console.log(data);
        fetch("/editSupervisor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .catch(err => console.log(err));
        this.setState({
            name: "",
            id: "",
            designation:"",
            isOpen: false
        });
        window.location.reload();
    };

    componentDidMount() {
        fetch('/displaySupervisor')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    supervisor: data
                });
            })
            .catch(err => console.log('caught error', err))
    };

    render() {
        return (
            <Fragment>
                <RButton
                    color={green}
                    buttonText={"Edit"}
                    onClick={this.handleOpen}
                />
                <Modal
                    open={this.state.isOpen}
                    onClose={this.handleClose}
                    style={{
                        paddingTop: 100,
                        paddingLeft: 400,
                        paddingRight: 400,
                        paddingBottom: 100
                    }}
                >
                    <Paper elevation={2}>
                        <form onSubmit={this.handleEdit}>
                            <Typography variant={"headline"} style={{textAlign: "center"}}>
                                Fill the Supervisor Form:
                            </Typography>
                            <InputLabel>Designation:</InputLabel>
                            <Select value={this.state.designation} style={{width: 100, textAlign: 'center'}}
                                    name={"designation"} onChange={this.handleChange}>
                                <MenuItem value={"Dr."}>Dr.</MenuItem>
                                <MenuItem value={"Mr."}>Mr.</MenuItem>
                                <MenuItem value={"Mrs."}>Mrs.</MenuItem>
                                <MenuItem value={"Prof."}>Prof.</MenuItem>
                                <MenuItem value={"Prof.Dr."}>Prof.Dr.</MenuItem>
                            </Select>
                            <br/>
                            <br/>
                            <InputLabel>Name:</InputLabel>
                            <RTextfield
                                style={{width: 250}}
                                value={this.state.name}
                                name={"name"}
                                required={true}
                                autoFocus={true}
                                onChange={this.handleChange}
                            />
                            <br/>
                            <br/>
                            <RButton
                                color={green}
                                buttonText={"Ok"}
                                type={"submit"}
                                style={{marginLeft: 20}}
                            />
                            <RButton
                                color={red}
                                buttonText={"Cancel"}
                                onClick={this.handleClose}
                                style={{marginLeft: 300}}
                            />
                        </form>
                    </Paper>
                </Modal>
            </Fragment>
        );
    }
}

export default ESupervisor;
