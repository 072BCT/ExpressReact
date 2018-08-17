import React, { Component, Fragment } from "react";
import pink from "@material-ui/core/colors/pink";
import DeleteIcon from "@material-ui/icons/Delete";
import Done from "@material-ui/icons/Done";
import Clear from "@material-ui/icons/Clear";

import RButton from "../../Header/Navbar/RButton";
import Modal from "@material-ui/core/Modal/Modal";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";

class DeleteProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      id: this.props.data
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = () => {
    this.setState({
      isOpen: false
    });
    fetch("/deleteProject",{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({id:this.state.id})
    }).then(res=>console.log(res))
        .catch(err=>console.log(err));
  };

  handleClick = () => {
    this.setState({
      isOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };
  render() {
    return (
      <Fragment>
        <RButton color={pink} buttonText={"Delete"} onClick={this.handleClick}>
          <DeleteIcon />
        </RButton>
          <Modal open={this.state.isOpen} onClose={this.handleClose}>
            <Dialog open={this.state.isOpen} onClose={this.handleClose}>
              <DialogContent>
                <DialogContentText id="alert-dialog-body">
                  <Typography
                    color={"textSecondary"}
                    variant={"caption"}
                    style={{ fontSize: 20 }}
                  >
                    Are you sure you want to delete this Record?
                  </Typography>
                </DialogContentText>
              </DialogContent>
              <Divider />
              <DialogActions style={{ paddingTop: 100 }}>
                <RButton
                  onClick={this.handleSubmit}
                  color={red}
                  buttonText={"Yes"}
                  style={{ marginRight: "auto" }}
                >
                  <Done />
                </RButton>
                <RButton
                  color={green}
                  buttonText={"No"}
                  style={{ marginLeft: 175 }}
                  onClick={this.handleClose}
                >
                  <Clear />
                </RButton>
              </DialogActions>
            </Dialog>
          </Modal>
      </Fragment>
    );
  }
}

export default DeleteProject;
