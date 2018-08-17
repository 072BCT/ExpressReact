import React, {Component, Fragment} from "react";

import RButton from "../../Header/Navbar/RButton";
import red from "@material-ui/core/colors/red";
import Modal from "@material-ui/core/Modal/Modal";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import TextField from "@material-ui/core/TextField/TextField";
import green from "@material-ui/core/colors/green";
import Grid from "@material-ui/core/Grid/Grid";

import cyan from "@material-ui/core/colors/cyan";
import Edit from "@material-ui/icons/Edit";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import sortBy from "lodash/sortBy";
import Add from "@material-ui/icons/Add";

class LinkProject extends Component {
    state = {
        isOpen: false,
        number: 3,
        orgData: "",
        stuData: "",
        supData: "",
        proData: "",
        batData: "",
        catData: "",

        name1: "",
        name2: "",
        name3: "",
        name4: "",
        roll1: "",
        roll2: "",
        roll3: "",
        roll4: "",
        project: "",
        supervisor: "",
        batch: "",
        category: [],
    };
    handleOpen = () => {
        this.setState({
            isOpen: true
        });
    };
    handleClose = () => {
        this.setState({
            stuData: this.state.orgData,
            isOpen: false,
            number: 3,
            name1: "",
            name2: "",
            name3: "",
            name4: "",
            roll1: "",
            roll2: "",
            roll3: "",
            roll4: "",
            project: "",
            supervisor: "",
            batch: "",
            res: ""
        });
    };

    handleSubmit = event => {
        if (
            this.state.name1 !== "" &&
            this.state.name2 !== "" &&
            this.state.name3 !== "" &&
            this.state.project !== "" &&
            this.state.supervisor !== "" &&
            this.state.category !== ""
        ) {
            fetch("/studentProjectAdd", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    n: this.state.number,
                    name1: this.state.name1,
                    name2: this.state.name2,
                    name3: this.state.name3,
                    name4: this.state.name4,
                    category: this.state.category,
                    project: this.state.project,
                    supervisor: this.state.supervisor,
                    batch: this.state.batch
                })
            })
                .then(res => res.json())
                .then(json => {
                    if (json.result === "Success") {
                        alert("Success");
                        setInterval(window.location.reload(), 100);
                    } else {
                        alert(json.result);
                    }
                })
                .catch(err => console.log(err));
        }
        event.preventDefault();
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentDidUpdate(_, prevState, __) {
        if (this.state.batch !== prevState.batch) {
            if (this.state.batch !== "") {
                const newData = this.state.orgData.filter(
                    data => data.Batch_batch_no === this.state.batch
                );
                this.setState({
                    stuData: newData
                });
            }
        }
    }

    componentDidMount() {
        fetch("/studentDisplay")
            .then(res => res.json())
            .then(json =>
                this.setState({
                    stuData: json[0],
                    supData: json[1],
                    proData: json[2],
                    batData: json[4],
                    orgData: json[0],
                    catData: json[5],
                })
            )
            .catch(err => console.log(err));
    }

    render() {
        let stu_num = () => {
            let check = this.state.number;
            if (check === 3) {
                return (
                    <Fragment>
                        <br/>
                        <InputLabel>Student 1</InputLabel>
                        <br/>
                        <Fragment>
                            <InputLabel>Name :</InputLabel>
                            <Select
                                value={this.state.name1}
                                name={"name1"}
                                onChange={this.handleChange}
                                required={true}
                                style={{marginLeft: 10, width: 200}}
                            >
                                {sortBy(this.state.stuData, ["name"]).map(item => (
                                    <MenuItem value={item.name} key={item.roll_no}>
                                        {item.name} ({item.roll_no})
                                    </MenuItem>
                                ))}
                            </Select>
                            <br/>
                            <br/>
                        </Fragment>
                        <InputLabel>Student 2</InputLabel>
                        <br/>
                        <Fragment>
                            <InputLabel>Name :</InputLabel>
                            <Select
                                value={this.state.name2}
                                name={"name2"}
                                onChange={this.handleChange}
                                required={true}
                                style={{marginLeft: 10, width: 200}}
                            >
                                {sortBy(this.state.stuData, ["name"]).map(item => (
                                    <MenuItem value={item.name} key={item.roll_no}>
                                        {item.name} ({item.roll_no})
                                    </MenuItem>
                                ))}
                            </Select>
                            <br/>
                            <br/>
                        </Fragment>
                        <InputLabel>Student 3</InputLabel>
                        <br/>
                        <Fragment>
                            <InputLabel>Name :</InputLabel>
                            <Select
                                value={this.state.name3}
                                name={"name3"}
                                onChange={this.handleChange}
                                required={true}
                                style={{marginLeft: 10, width: 200}}
                            >
                                {sortBy(this.state.stuData, ["name"]).map(item => (
                                    <MenuItem value={item.name} key={item.roll_no}>
                                        {item.name} ({item.roll_no})
                                    </MenuItem>
                                ))}
                            </Select>
                            <br/>
                        </Fragment>
                    </Fragment>
                );
            } else if (check === 4) {
                return (
                    <Fragment>
                        <br/>
                        <InputLabel variant={"title"}>Student 1</InputLabel>
                        <br/>
                        <Fragment>
                            <InputLabel>Name :</InputLabel>
                            <Select
                                value={this.state.name1}
                                name={"name1"}
                                onChange={this.handleChange}
                                required={true}
                                style={{marginLeft: 10, width: 200}}
                            >
                                {sortBy(this.state.stuData, ["name"]).map(item => (
                                    <MenuItem value={item.name} key={item.roll_no}>
                                        {item.name} ({item.roll_no})
                                    </MenuItem>
                                ))}
                            </Select>
                            <br/>
                            <br/>
                        </Fragment>
                        <InputLabel>Student 2</InputLabel>
                        <br/>
                        <Fragment>
                            <InputLabel>Name :</InputLabel>
                            <Select
                                value={this.state.name2}
                                name={"name2"}
                                onChange={this.handleChange}
                                required={true}
                                style={{marginLeft: 10, width: 200}}
                            >
                                {sortBy(this.state.stuData, ["name"]).map(item => (
                                    <MenuItem value={item.name} key={item.roll_no}>
                                        {item.name} ({item.roll_no})
                                    </MenuItem>
                                ))}
                            </Select>
                            <br/>
                            <br/>
                        </Fragment>
                        <InputLabel>Student 3</InputLabel>
                        <br/>
                        <Fragment>
                            <InputLabel>Name :</InputLabel>
                            <Select
                                value={this.state.name3}
                                name={"name3"}
                                onChange={this.handleChange}
                                required={true}
                                style={{marginLeft: 10, width: 200}}
                            >
                                {sortBy(this.state.stuData, ["name"]).map(item => (
                                    <MenuItem value={item.name} key={item.roll_no}>
                                        {item.name} ({item.roll_no})
                                    </MenuItem>
                                ))}
                            </Select>
                            <br/>
                            <br/>
                        </Fragment>
                        <InputLabel>Student 4</InputLabel>
                        <br/>
                        <Fragment>
                            <InputLabel>Name :</InputLabel>
                            <Select
                                value={this.state.name4}
                                name={"name4"}
                                onChange={this.handleChange}
                                required={true}
                                style={{marginLeft: 10, width: 200}}
                            >
                                {sortBy(this.state.stuData, ["name"]).map(item => (
                                    <MenuItem value={item.name} key={item.roll_no}>
                                        {item.name} ({item.roll_no})
                                    </MenuItem>
                                ))}
                            </Select>
                            <br/>
                            <br/>
                        </Fragment>
                    </Fragment>
                );
            }
        };
        return (
            <Fragment>
                <br/>
                <RButton
                    color={cyan}
                    buttonText={"Link Project"}
                    onClick={this.handleOpen}
                    style={{marginLeft: 10}}
                >
                    <Add/>
                </RButton>
                <Modal
                    open={this.state.isOpen}
                    onClose={this.handleClose}
                    style={{
                        paddingTop: 50,
                        paddingLeft: 50,
                        paddingRight: 50,
                        paddingBottom: 50
                    }}
                >
                    <form onSubmit={this.handleSubmit}>
                        <Paper elevation={3}>
                            <Typography
                                variant={"headline"}
                                style={{textAlign: "center", paddingTop: 30}}
                            >
                                Add the details of the project:
                            </Typography>
                            <br/>
                            <Grid container spacing={24}>
                                <Grid item xs={7}>
                                    <InputLabel>Batch:</InputLabel>
                                    <Select
                                        value={this.state.batch}
                                        name={"batch"}
                                        onChange={this.handleChange}
                                        required={true}
                                        style={{marginLeft: 5}}
                                    >
                                        {sortBy(this.state.batData, ["year"]).map(item => (
                                            <MenuItem value={item.year} key={item.year}>
                                                {item.year}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <br/>
                                    <br/>
                                    <InputLabel>Number of Student: </InputLabel>
                                    <Select
                                        name={"number"}
                                        value={this.state.number}
                                        onChange={this.handleChange}
                                        style={{textAlign: "center"}}
                                    >
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                    </Select>
                                    {stu_num()}
                                </Grid>
                                <Grid item xs={5}>
                                    <InputLabel>Project Name:</InputLabel>
                                    <br/>
                                    <Select
                                        value={this.state.project}
                                        name={"project"}
                                        onChange={this.handleChange}
                                        required={true}
                                        style={{marginLeft: 5, width: 250}}
                                    >
                                        {sortBy(this.state.proData, ["name"]).map(item => (
                                            <MenuItem value={item.name} key={item.idProject}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <br/>
                                    <br/>
                                    <InputLabel>SuperVisor:</InputLabel>
                                    <br/>
                                    <Select
                                        value={this.state.supervisor}
                                        name={"supervisor"}
                                        onChange={this.handleChange}
                                        required={true}
                                        style={{marginLeft: 5, width: 250}}
                                    >
                                        {sortBy(this.state.supData, ["name"]).map(item => (
                                            <MenuItem value={item.name} key={item.idInstructor}>
                                                {item.Title}{item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <br/>
                                    <br/>
                                    <InputLabel>Category:</InputLabel>
                                    <br/>
                                    <Select
                                        value={this.state.category}
                                        name={"category"}
                                        onChange={this.handleChange}
                                        multiple={true}
                                        style={{marginLeft: 5, width: 250}}
                                    >
                                        {sortBy(this.state.catData, ["name"]).map(item => (
                                            <MenuItem value={item.name} key={item.name}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <span>
                    <RButton
                        color={green}
                        buttonText={"Submit"}
                        style={{marginRight: "auto"}}
                        type={"submit"}
                    />
                  </span>
                                    <span>
                    <RButton
                        color={red}
                        buttonText={"Cancel"}
                        onClick={this.handleClose}
                        style={{marginLeft: 200}}
                    />
                  </span>
                                </Grid>
                            </Grid>
                        </Paper>
                    </form>
                </Modal>
            </Fragment>
        );
    }
}

export default LinkProject;
