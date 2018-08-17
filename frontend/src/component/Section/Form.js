import React, {Component, Fragment} from 'react';
import RButton from "../../Header/Navbar/RButton";
import red from "@material-ui/core/colors/red";
import Modal from "@material-ui/core/Modal/Modal";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import TextField from "@material-ui/core/TextField/TextField";
import green from "@material-ui/core/colors/green";
import Grid from "@material-ui/core/Grid/Grid";
import Select from "@material-ui/core/Select/Select";
import Divider from "@material-ui/core/Divider/Divider";
import cyan from "@material-ui/core/colors/cyan";
import Add from "@material-ui/icons/Add";

class Form extends Component {
    state = {
        isOpen: false,
        number : 3,
        projectName: "",
        supervisorName: "",
        studentName: [],
        studentRoll: [],
    };

    formData = (projectName, supervisorName, studentName) => {
        fetch('/formData',{
            body: JSON.stringify({project: projectName,supervisor: supervisorName, name: studentName}),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
            .then(res => res.json())
            .then(res => console.log(res))
    };



    handleOpen = () => {
      this.setState({
          isOpen : true
      })
    };
    handleClose = () => {
        this.setState(
            {
                isOpen : false,
                number : 3
            }
        )
    };

    handleChange = name => event => {
        this.setState({
            [name] : Number(event.target.value)
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.formData(this.state.projectName, this.state.supervisorName, this.state.studentName);
        this.setState({
            projectName: "",
            supervisorName: "",
            studentName: [],
            open: false,
        });
        console.log(this.state)

    };
    render() {
        let stu_num = () => {
            let check = this.state.number;
          if (check === 3) {
                return (
                    <Fragment>
                        <Typography variant={"title"}>Student 1</Typography>
                      <Fragment>
                          <InputLabel>
                              Name :
                          </InputLabel>
                          <TextField
                              id={"batch"}
                              onChange={this.handleChange}
                              margin={'normal'}
                              autoFocus={true}
                              required={true}
                          />
                          <InputLabel>
                              Roll No. :
                          </InputLabel>
                          <TextField
                              id={"roll"}
                              onChange={this.handleChange}
                              margin={'normal'}
                              autoFocus={true}
                              required={true}
                          /><br/>
                      </Fragment><Divider/>
                        <Typography variant={"title"}>Student 2</Typography>
                        <Fragment>
                          <InputLabel>
                              Name :
                          </InputLabel>
                          <TextField
                              id={"batch"}
                              onChange={this.handleChange}
                              margin={'normal'}
                              autoFocus={true}
                              required={true}
                          />
                          <InputLabel>
                              Roll No. :
                          </InputLabel>
                          <TextField
                              id={"roll"}
                              onChange={this.handleChange}
                              margin={'normal'}
                              autoFocus={true}
                              required={true}
                          /><br/>
                      </Fragment><Divider/>
                        <Typography variant={"title"}>Student 3</Typography>
                        <Fragment>
                          <InputLabel>
                              Name :
                          </InputLabel>
                          <TextField
                              id={"batch"}
                              onChange={this.handleChange}
                              margin={'normal'}
                              autoFocus={true}
                              required={true}
                          />
                          <InputLabel>
                              Roll No. :
                          </InputLabel>
                          <TextField
                              id={"roll"}
                              onChange={this.handleChange}
                              margin={'normal'}
                              autoFocus={true}
                              required={true}
                          /><br/>
                      </Fragment><Divider/>
                    </Fragment>
                  )
          }

          else if (check ===4){
              return (
                  <Fragment>
                      <Typography variant={"title"}>Student 1</Typography>
                      <Fragment>
                          <InputLabel>
                              Name :
                          </InputLabel>
                          <TextField
                              id={"batch"}
                              onChange={this.handleChange}
                              margin={'normal'}
                              autoFocus={true}
                              required={true}
                          />
                          <InputLabel>
                              Roll No. :
                          </InputLabel>
                          <TextField
                              id={"roll"}
                              onChange={this.handleChange}
                              margin={'normal'}
                              autoFocus={true}
                              required={true}
                          /><br/>
                      </Fragment><Divider/>
                      <Typography variant={"title"}>Student 2</Typography>
                        <Fragment>
                          <InputLabel>
                              Name :
                          </InputLabel>
                          <TextField
                              id={"batch"}
                              onChange={this.handleChange}
                              margin={'normal'}
                              autoFocus={true}
                              required={true}
                          />
                          <InputLabel>
                              Roll No. :
                          </InputLabel>
                          <TextField
                              id={"roll"}
                              onChange={this.handleChange}
                              margin={'normal'}
                              autoFocus={true}
                              required={true}
                          /><br/>
                      </Fragment><Divider/>
                      <Typography variant={"title"}>Student 3</Typography>
                        <Fragment>
                          <InputLabel>
                              Name :
                          </InputLabel>
                          <TextField
                              id={"batch"}
                              onChange={this.handleChange}
                              margin={'normal'}
                              autoFocus={true}
                              required={true}
                          />
                          <InputLabel>
                              Roll No. :
                          </InputLabel>
                          <TextField
                              id={"roll"}
                              onChange={this.handleChange}
                              margin={'normal'}
                              autoFocus={true}
                              required={true}
                          /><br/>
                      </Fragment><Divider/>
                      <Typography variant={"title"}>Student 4</Typography>
                      <Fragment>
                          <InputLabel>
                              Name :
                          </InputLabel>
                          <TextField
                              id={"batch"}
                              onChange={this.handleChange}
                              margin={'normal'}
                              autoFocus={true}
                              required={true}
                          />
                          <InputLabel>
                              Roll No. :
                          </InputLabel>
                          <TextField
                              id={"roll"}
                              onChange={this.handleChange}
                              margin={'normal'}
                              autoFocus={true}
                              required={true}
                          /><br/>
                      </Fragment><Divider/>
                    </Fragment>
              )
          }
        };
        return <Fragment>
            <br/>
            <RButton color={cyan} buttonText={"Add Project"} onClick={this.handleOpen} style={{marginLeft: 10}}><Add/></RButton>
            <Modal
                open={this.state.isOpen}
                onClose={this.handleClose}
                style={{paddingTop: 50, paddingLeft: 200, paddingRight: 200, paddingBottom: 50}}>
                <form>
                    <Paper elevation={3}>
                        <Typography variant={"headline"} style={{textAlign: 'center', paddingTop: 30}}>
                            Enter the details of the project:
                        </Typography><br/>
                        <Grid container spacing={24}>
                             <Grid item xs={7}>
                                <InputLabel>Number of Student: </InputLabel>
                                <Select
                                    value={this.state.number}
                                    onChange={this.handleChange('number')}
                                >
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                </Select>

                                {stu_num()}
                            </Grid>
                            <Grid item xs={5}>
                                <InputLabel>
                                    Project Name:
                                </InputLabel><br/>
                                <TextField
                                    id={"project_name"}
                                    onChange={this.handleChange}
                                    margin={'normal'}
                                    autoFocus={true}
                                    required={true}
                                    fullWidth={true}
                                /><br/>
                                <Divider/>
                                <InputLabel>
                                    SuperVisor:
                                </InputLabel><br/>
                                <TextField
                                    id={"supervisor"}
                                    onChange={this.handleChange}
                                    margin={'normal'}
                                    autoFocus={true}
                                    required={true}
                                    fullWidth={true}
                                /><br/>
                                <Divider/>
                                <InputLabel>
                                    Batch:
                                </InputLabel><br/>
                                <TextField
                                    id={"batch"}
                                    onChange={this.handleChange}
                                    margin={'normal'}
                                    autoFocus={true}
                                    required={true}
                                    fullWidth={true}
                                />
                                <Divider/>
                                <br/><br/><br/>
                                <span>
                                <RButton color={green} buttonText={"Submit"} style = {{paddingLeft: 30}} onClick = {this.handleSubmit}/>
                                </span>
                                <span>
                                <RButton color={red} buttonText={"Cancel"} onClick={this.handleClose} style = {{paddingLeft: 30}} />
                                </span>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </Modal>
        </Fragment>;
    }
}

export default Form;
