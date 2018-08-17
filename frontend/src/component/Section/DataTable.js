import React, { Component, Fragment } from "react";

import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import Typography from "@material-ui/core/Typography/Typography";
import DeleteProject from "./DeleteProject";
import EditProject from "./EditProject";
import sortBy from "lodash";

class DataTable extends Component {

  render() {
    let headings = this.props.heading.map(heading => {
      return (
        <TableCell key={heading}>
          <Typography variant={"title"}>{heading}</Typography>
        </TableCell>
      );
    });
    let rows = this.props.data.map(row => {
      return (
        <TableRow key={row.Project_idProject}>
          <TableCell>{row.year}</TableCell>
            <TableCell>{row.program}</TableCell>
          <TableCell>{row.projectName}</TableCell>
          <TableCell>{row.category.split(",").map(name => (
              <div key={name}>
                  <br/>
                  {name}
              </div>
          ))}</TableCell>
          <TableCell>
            {row.studentName.split(",").map(name => (
              <div key={name}>
                <br />
                {name}
              </div>
            ))}
          </TableCell>
          <TableCell>
            {row.studentRoll.split(",").map(roll => (
              <div style={{ textAlign: "left" }} key={roll}>
                <br />
                <br />
                {roll}
              </div>
            ))}
          </TableCell>
          <TableCell>{row.title}{row.supervisorName}</TableCell>
            <EditProject data={row} allData={this.props.data} id={row.Project_idProject}/>
            <br/><br/>
            <DeleteProject data={row.Project_idProject} />
        </TableRow>
      );
    });
    return (
      <Fragment>
        <Table>
          <TableHead>
            <TableRow>{headings}</TableRow>
          </TableHead>
          <TableBody >{rows}</TableBody>
        </Table>
      </Fragment>
    );
  }
}

export default DataTable;
//.then(json => sortBy(json,'projectName'))