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

class EditCategory extends Component {
  state = {
    category: [],
    name: "",
    prev: "",
    isOpen: false
  };
  handleOpen = () => {
    this.setState({
      isOpen: true,
      category: this.props.data,
      name: this.props.data.name,
      prev: this.props.data.name
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

  handleEdit = event => {
    let data = this.state.name;
    console.log(data);
    fetch("/editCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: data, prev: this.state.prev })
    })
      .then(response => response.json())
      .catch(err => console.log(err));
    this.setState({
      name: "",
      isOpen: false
    });
    window.location.reload();
  };

  componentDidMount() {
    fetch("/displayCategory")
      .then(res => res.json())
      .then(data => {
        this.setState({
          category: data
        });
      })
      .catch(err => console.log("caught error", err));
  }
  render() {
    return (
      <Fragment>
        <RButton color={green} buttonText={"Edit"} onClick={this.handleOpen} />
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
              <Typography variant={"headline"} style={{ textAlign: "center" }}>
                Fill the Category Form:
              </Typography>
              <InputLabel>Name:</InputLabel>
              <RTextfield
                style={{ width: 250 }}
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
                buttonText={"Ok"}
                onClick={this.handleEdit}
                style={{ marginLeft: 20 }}
              />
              <RButton
                color={red}
                buttonText={"Cancel"}
                onClick={this.handleClose}
                style={{ marginLeft: 300 }}
              />
            </form>
          </Paper>
        </Modal>
      </Fragment>
    );
  }
}

export default EditCategory;
