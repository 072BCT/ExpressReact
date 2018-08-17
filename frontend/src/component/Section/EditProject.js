import React, {Component, Fragment} from "react";

import RButton from "../../Header/Navbar/RButton";
import red from "@material-ui/core/colors/red";
import Modal from "@material-ui/core/Modal/Modal";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import green from "@material-ui/core/colors/green";
import Grid from "@material-ui/core/Grid/Grid";

import cyan from "@material-ui/core/colors/cyan";
import Edit from "@material-ui/icons/Edit";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import sortBy from "lodash/sortBy";

class EditProject extends Component {
    state = {
        isOpen: false,
        orgData: [],
        number: this.props.data.studentName.split(",").length,
        allData: [],
        supData: [],
        proData: [],
        batData: [],
        id: this.props.id,
        data: this.props.data,
        name1: this.props.data.studentName.split(",")[0],
        name2: this.props.data.studentName.split(",")[1],
        name3: this.props.data.studentName.split(",")[2],
        name4: this.props.data.studentName.split(",")[3],
        roll1: this.props.data.studentRoll.split(",")[0],
        roll2: this.props.data.studentRoll.split(",")[1],
        roll3: this.props.data.studentRoll.split(",")[2],
        roll4: this.props.data.studentRoll.split(",")[3],
        project: this.props.data.projectName,
        supervisor: this.props.data.supervisorName,
        batch: this.props.data.year,
        category: this.props.data.category.split(",")
    };
    handleOpen = () => {
        this.setState({
            isOpen: true
        });
    };
    handleClose = () => {
        this.setState({
            isOpen: false,
            number: this.props.data.studentName.split(",").length,
            name1: this.props.data.studentName.split(",")[0],
            name2: this.props.data.studentName.split(",")[1],
            name3: this.props.data.studentName.split(",")[2],
            name4: this.props.data.studentName.split(",")[3],
            roll1: this.props.data.studentRoll.split(",")[0],
            roll2: this.props.data.studentRoll.split(",")[1],
            roll3: this.props.data.studentRoll.split(",")[2],
            roll4: this.props.data.studentRoll.split(",")[3],
            project: this.props.data.projectName,
            supervisor: this.props.data.supervisorName,
            batch: this.props.data.year,
            allData: this.state.orgData,
            category: this.props.data.category.split(",")
        });
    };

    handleSubmit = event => {
        fetch("/studentProjectEdit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.state.id,
                n: this.state.number,
                name1: this.state.name1,
                name2: this.state.name2,
                name3: this.state.name3,
                name4: this.state.name4,
                roll1: this.state.roll1,
                roll2: this.state.roll2,
                roll3: this.state.roll3,
                roll4: this.state.roll4,
                project: this.state.project,
                supervisor: this.state.supervisor,
                category: this.state.category,
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.result === "Success") {
                    alert("Success");
                    setInterval(window.location.reload(), 100);
                }
                else {
                    alert(json.result)
                }
            })
            .catch(err => console.log(err));
        event.preventDefault();
    };
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentDidMount() {
        fetch("/studentDisplay")
            .then(res => res.json())
            .then(json =>
                this.setState({
                    orgData: json[0],
                    allData: json[0],
                    supData: json[1],
                    proData: json[2],
                    batData: json[4],
                    catData: json[5],
                })
            )
            .catch(err => console.log(err));
    }

    componentDidUpdate(_, prevState, __) {
        if (this.state.batch !== prevState.batch) {
            if (this.state.batch !== "") {
                const newData = this.state.orgData.filter(
                    data => data.Batch_batch_no === this.state.batch
                );
                this.setState({
                    allData: newData
                });
            }
        }
    }

    render() {
        let stu_num = () => {
            let stuName = this.state.data.studentName.split(",");
            let check = stuName.length;
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
                                style={{marginLeft: 10}}
                            >
                                {sortBy(this.state.allData, ["name"]).filter(data => data.Batch_batch_no === this.state.batch).map(item => (
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
                                style={{marginLeft: 10}}
                            >
                                {sortBy(this.state.allData, ["name"]).filter(data => data.Batch_batch_no === this.state.batch).map(item => (
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
                                style={{marginLeft: 10}}
                            >
                                {sortBy(this.state.allData, ["name"]).filter(data => data.Batch_batch_no === this.state.batch).map(item => (
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
                                style={{marginLeft: 10}}
                            >
                                {sortBy(this.state.allData, ["name"]).filter(data => data.Batch_batch_no === this.state.batch).map(item => (
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
                                style={{marginLeft: 10}}
                            >
                                {sortBy(this.state.allData, ["name"]).filter(data => data.Batch_batch_no === this.state.batch).map(item => (
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
                                style={{marginLeft: 10}}
                            >
                                {sortBy(this.state.allData, ["name"]).filter(data => data.Batch_batch_no === this.state.batch).map(item => (
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
                                style={{marginLeft: 10}}
                            >
                                {sortBy(this.state.allData, ["name"]).filter(data => data.Batch_batch_no === this.state.batch).map(item => (
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
                    buttonText={"Edit"}
                    onClick={this.handleOpen}
                    style={{marginLeft: 10}}
                >
                    <Edit/>
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
                                Edit the details of the project:
                            </Typography>
                            <br/>
                            <Grid container spacing={24}>
                                <Grid item xs={7}>
                                    <InputLabel>Batch: </InputLabel>
                                    <Select value={this.state.batch} name={"batch"} onChange={this.handleChange}>
                                        {this.state.batData.map(item => (
                                            <MenuItem value={item.year} key={item.year}>
                                                {item.year}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <br/>
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
                                        style={{marginLeft: 5}}
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
                                        style={{marginLeft: 5}}
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
                                        style={{marginLeft: 5}}
                                        multiple={true}
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

export default EditProject;
