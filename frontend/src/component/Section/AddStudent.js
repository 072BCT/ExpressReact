import React, { Component, Fragment } from "react";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import RButton from "../../Header/Navbar/RButton";
import Modal from "@material-ui/core/Modal/Modal";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import RTextfield from "../../container/RTextField";
import lime from "@material-ui/core/colors/lime";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import ReadFromExcel from "./ReadFromExcel";

class AddStudent extends Component {
  state = {
    student: [],
    name: "",
    roll: "",
    batch: "",
    programme: "",
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
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    fetch("/newStudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: this.state.name,
      batch: this.state.batch,
      roll: this.state.roll,
      programme: this.state.programme})
    })
      .then(response => response.json())
      .catch(err => console.log(err));
    this.setState({
      name: "",
      roll: "",
      batch: "",
      programme: "",
      isOpen: false
    });
    window.location.reload();
    event.preventDefault();
  };
  componentDidMount() {
    fetch("/studentDisplay")
      .then(res => res.json())
      .then(data => {
        this.setState({
          student: data[0]
        });
      })
      .catch(err => console.log("caught error", err));
  }
  render() {
    return (
      <Fragment>
        <RButton
          color={lime}
          buttonText={"Add Student"}
          onClick={this.handleOpen}
        />
        <br/>
        <br/>
        <ReadFromExcel/>
        <Modal
          open={this.state.isOpen}
          onClose={this.handleClose}
          style={{
            paddingTop: 100,
            paddingLeft: 280,
            paddingRight: 280,
            paddingBottom: 100
          }}
        >
          <Paper elevation={2}>
            <form onSubmit={this.handleSubmit}>
              <Typography variant={"headline"} style={{ textAlign: "center" }}>
                Fill the Student Form:
              </Typography>

              <InputLabel>Batch: </InputLabel>
              <Select
                name={"batch"}
                value={this.state.batch}
                onChange={this.handleChange}
                style={{ textAlign: "center", width: 200 }}
              >
                <MenuItem value={2070}>2070</MenuItem>
                <MenuItem value={2071}>2071</MenuItem>
              </Select>
              <br />
              <br />
              <InputLabel>Programme: </InputLabel>
              <Select
                name={"programme"}
                value={this.state.programme}
                onChange={this.handleChange}
                style={{ textAlign: "center", width: 200 }}
              >
                <MenuItem value={"BCT"}>BCT</MenuItem>
                <MenuItem value={"BEX"}>BEX</MenuItem>
              </Select>
              <br />
              <br />
              <InputLabel>Name:</InputLabel>
              <RTextfield
                value={this.state.name}
                name={"name"}
                required={true}
                focus={true}
                onChange={this.handleChange}
              />
              <br />
              <br />

              <InputLabel>Roll No:</InputLabel>
              <RTextfield
                value={this.state.roll}
                name={"roll"}
                required={true}
                focus={true}
                onChange={this.handleChange}
                helperText="e.g. 070BCT500"
              />
              <br />
              <br />

              <RButton
                color={green}
                buttonText={"Submit"}
                type={"submit"}
                style={{ marginLeft: 20, marginBottom: 20 }}
              />
              <RButton
                color={red}
                buttonText={"Cancel"}
                onClick={this.handleClose}
                style={{ marginLeft: 500, marginBottom: 20 }}
              />
            </form>
          </Paper>
        </Modal>
      </Fragment>
    );
  }
}

export default AddStudent;
