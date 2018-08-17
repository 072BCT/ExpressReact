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
import { BrowserRouter, Link } from "react-router-dom";
import AddProject from "../../component/Section/AProject";
import EProject from "../../component/Section/EProject";
import DProject from "../../component/Section/DProject";
import yellow from "@material-ui/core/colors/yellow";

class Project extends Component {
  state = {
    isOpen: false,
    project: []
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
  };

  handleOpen = () => {
    this.setState({
      isOpen: true
    });
  };
  componentDidMount() {
    fetch("/studentDisplay")
      .then(res => res.json())
      .then(data => this.setState({ project: data[2] }));
  }

  render() {
    let headings = (
      <Fragment>
        <TableCell>
          <Typography variant={"title"}>Name</Typography>
        </TableCell>
        <TableCell>
          <Typography variant={"title"}>Action</Typography>
        </TableCell>
      </Fragment>
    );
    let rows = this.state.project.map(project => {
      return (
        <TableRow key={project.idProject}>
          <TableCell>{project.name}</TableCell>
          <TableCell>
            <EProject data={project} />
            <DProject data={project.idProject} />
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
        <AddProject />
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

export default Project;
