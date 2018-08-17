import React, { Component, Fragment } from "react";
import RButton from "../../Header/Navbar/RButton";
import Modal from "@material-ui/core/Modal/Modal";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import RTextfield from "../../container/RTextField";
import lime from "@material-ui/core/colors/lime";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";

class AddCategory extends Component {
  state = {
    category: [],
    name: "",
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

  handleSubmit = event => {
    let data = this.state.name;
    console.log(data);
    fetch("/newCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: data})
    })
      .then(response => response.json())
      .catch(err => console.log(err));
    this.setState({
      name: "",
      isOpen: false
    });
    event.preventDefault();
    window.location.reload();
  };

  componentDidMount(){
      fetch('/displayCategory')
          .then(res => res.json())
          .then(data => {
              this.setState({
                  category: data
              });
          })
          .catch(err => console.log('caught error',err))
    };
  render() {
    return (
      <Fragment>
        <RButton
          color={lime}
          buttonText={"Add Category"}
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
            <form onSubmit={this.handleSubmit}>
              <Typography variant={"headline"} style={{ textAlign: "center" }}>
                Fill the Category Form:
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
                  style={{marginLeft: 30}}
                color={green}
                buttonText={"Submit"}
                onClick={this.handleSubmit}
              />
              <RButton
                  style={{marginLeft:300}}
                color={red}
                buttonText={"Cancel"}
                onClick={this.handleClose}
              />
            </form>
          </Paper>
        </Modal>
      </Fragment>
    );
  }
}

export default AddCategory;
