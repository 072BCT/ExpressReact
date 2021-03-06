import React, { Component, Fragment } from "react";
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
import {yellow} from "@material-ui/core/colors/index";

class AddProject extends Component {
  state = {
    project: [],
    name: "",
    year:"",
    isOpen: false
  };
  handleOpen = () => {
    this.setState({
      isOpen: true
    });
  };
  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    console.log(this.state.name);
    fetch("/newProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: this.state.name})
    })
      .then(response => response.json())
      .catch(err => console.log(err));
  };

   componentDidMount(){
      fetch('/displayProject')
          .then(res => res.json())
          .then(data => {
              this.setState({
                  project: data
              });
          })
          .catch(err => console.log('caught error',err))
    };
  render() {
    return (
      <Fragment>
        <span style={{marginLeft: 1000}}>
        <RButton
          color={yellow}
          buttonText={"Add Project"}
          onClick={this.handleOpen}
        />
        </span>
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
          <Paper elevation={1}>
            <form onSubmit={this.handleSubmit}>
              <Typography variant={"headline"} style={{ textAlign: "center" }}>
                Fill the Project Form:
              </Typography>
              <InputLabel>Name:</InputLabel>
              <RTextfield
                style={{width: 250}}
                value={this.state.name}
                name={"name"}
                required={true}
                autoFocus={true}
                onChange={this.handleChange}
              />
              <br />
              <br />
              <RButton
                color={green}
                buttonText={"Submit"}
                type={"submit"}
                style={{marginLeft:20}}
              />
              <RButton
                color={red}
                buttonText={"Cancel"}
                onClick={this.handleClose}
                style={{marginLeft:300}}
              />
            </form>
          </Paper>
        </Modal>
      </Fragment>
    );
  }
}

export default AddProject;
