import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import lime from "@material-ui/core/colors/lime";
import RButton from "./RButton";
import Modal from "@material-ui/core/Modal/Modal";
import Paper from "@material-ui/core/Paper/Paper";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import Typography from "@material-ui/core/Typography/Typography";
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import AddStudent from "../../component/Section/AddStudent";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import EditStudent from "../../component/Section/EditStudent";
import DeleteStudent from "../../component/Section/DeleteStudent";
import yellow from "@material-ui/core/colors/yellow";
import {BrowserRouter, Link} from "react-router-dom";

class Student extends Component {
  state = {
    isOpen: false,
    students: [],
      batch:[],
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
    window.location.reload();
  };

  handleOpen = () => {
    this.setState({
      isOpen: true
    });
  };
  componentDidMount() {
    fetch("/studentDisplay")
      .then(res => res.json())
      .then(data => this.setState({ students: data[0], batch:data[4] }));
  }

  render() {
    console.log(this.state);
    let headings = this.props.title.map(heading => {
      return (
        <TableCell key={heading}>
          <Typography variant={"title"}>{heading}</Typography>
        </TableCell>
      );
    });
    let rows = this.state.students.map(student => {
      return (
        <TableRow key={student.idStudent}>
          <TableCell>{student.Batch_batch_no}</TableCell>
          <TableCell>{student.name}</TableCell>
          <TableCell>{student.roll_no}</TableCell>
          <TableCell>
            <EditStudent data={student} />
            <DeleteStudent data={student.idStudent} />
          </TableCell>
        </TableRow>
      );
    });
    return (
      <Fragment>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <RButton
            color={yellow}
            buttonText={"Back"}
            style={{ marginRight: 20 }}
          />
        </Link>
        <AddStudent batch={this.state.batch} />
        <Table>
          <TableHead>
            <TableRow>{headings}</TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </Fragment>
    );
  }
}

export default Student;
