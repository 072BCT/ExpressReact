import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import red from "@material-ui/core/colors/red";
import RButton from "../../Header/Navbar/RButton";
import green from "@material-ui/core/colors/green";
import Modal from "@material-ui/core/Modal/Modal";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Done from "@material-ui/icons/Done";
import Clear from "@material-ui/icons/Clear";

class DeleteStudent extends Component {
    state = {
        id: this.props.data,
        student: [],
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

    handleDelete = () => {
        fetch("/deleteStudent", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: this.state.id})
        }).then(res => console.log(res))
            .catch(err => console.log(err));
    };

    componentDidMount() {
        fetch('/display')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    student: data
                });
            })
            .catch(err => console.log('caught error', err));

    };

    render() {
        return (
            <Fragment>
                <RButton color={red} buttonText={"DELETE"} onClick={this.handleOpen}/>
                <Modal open={this.state.isOpen} onClose={this.handleClose}>
                    <Dialog open={this.state.isOpen} onClose={this.handleClose}>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-body">
                                <Typography
                                    color={"textSecondary"}
                                    variant={"caption"}
                                    style={{fontSize: 20}}
                                >
                                    Are you sure you want to delete this Record?
                                </Typography>
                            </DialogContentText>
                        </DialogContent>
                        <Divider/>
                        <DialogActions style={{paddingTop: 100}}>
                            <form onSubmit={this.handleDelete}>
                                <RButton
                                    type={"submit"}
                                    color={red}
                                    buttonText={"Yes"}
                                    style={{marginRight: "auto"}}
                                >
                                    <Done/>
                                </RButton>
                                <RButton
                                    color={green}
                                    buttonText={"No"}
                                    style={{marginLeft: 175}}
                                    onClick={this.handleClose}
                                >
                                    <Clear/>
                                </RButton>
                            </form>
                        </DialogActions>
                    </Dialog>
                </Modal>
            </Fragment>
        );
    }
}

export default DeleteStudent;
