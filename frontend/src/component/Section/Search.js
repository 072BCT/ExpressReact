import React, {Component} from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import red from "@material-ui/core/colors/red";
import RButton from "../../Header/Navbar/RButton";
import Divider from "@material-ui/core/Divider";
import LinkProject from "./LinkProject";
import Clear from "@material-ui/icons/Clear";
import Print from '@material-ui/icons/Print';
import XLSX from 'xlsx/xlsx'
import sortBy from 'lodash/sortBy';
import Grid from "@material-ui/core/Grid/Grid";
import DisplayProject from "./DisplayProject";
import green from "@material-ui/core/colors/green";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supervisor: "",
            category: [],
            batch: "",
            program: "",
            supervisorData: [],
            categoryData: [],
            batchData: [],
            orgData: [],
            data: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    componentDidMount() {
        fetch("/selection")
            .then(res => res.json())
            .then(data =>
                this.setState({
                    supervisorData: data[0],
                    categoryData: data[1],
                    batchData: data[2],
                    orgData: data[4],
                    data: data[4]
                })
            )
            .catch(err => console.log(err));
    }

    componentDidUpdate(_, prevState, __) {
        if (this.state.category !== prevState.category || this.state.supervisor !== prevState.supervisor || this.state.batch !== prevState.batch || this.state.program !== prevState.program) {
            if (
                this.state.category !== "" ||
                (this.state.supervisor !== "" || this.state.batch !== "" || this.state.program !== "")
            ) {
                let newData = this.state.orgData.filter(item => {
                    return (
                        item.category.includes(this.state.category) &&
                        item.supervisorName.includes(this.state.supervisor) &&
                        item.year.includes(this.state.batch) &&
                        item.program.includes(this.state.program)
                    );
                });
                this.setState({
                    data: newData
                });
            }
        }
    }

    /*handleView = () => {
        if (
            this.state.category !== "" ||
            (this.state.supervisor !== "" || this.state.batch !== "" || this.state.program !== "")
        ) {
            let newData = this.state.orgData.filter(item => {
                return (
                    item.category.includes(this.state.category) &&
                    item.supervisorName.includes(this.state.supervisor) &&
                    item.year.includes(this.state.batch) &&
                    item.program.includes(this.state.program)
                );
            });
            this.setState({
                data: newData
            });
        }
    };*/

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleClear = () => {
        this.setState({
            supervisor: "",
            category: [],
            batch: "",
            data: this.state.orgData,
            program: "",
        });
    };

    handlePrint = () => {
        let workbook = XLSX.utils.book_new();
        /*let mappedData = this.state.data.map(item => (
             [item.category, item.studentName, item.studentRoll, item.title + item.supervisorName]
        ));*/
        let printValue = this.state.data;
        printValue.map(item => {
                item["Student\nBatch"] = item.year;
                item["Programme"] = item.program;
                item["Project\nTitle"] = item.projectName.split(" ").join("\n");
                item["Category"] = item.category.split(" " || ",").join("\n");
                item["Student\nName"] = item.studentName.split(",").join("\n");
                item["Student\nRoll"] = item.studentRoll.split(",").join("\n").toUpperCase();
                item["Supervisor\nName"] = item.title + item.supervisorName;
                delete item.Project_idProject;
                delete item.title;
                delete item.year;
                delete item.program;
                delete item.projectName;
                delete item.category;
                delete item.studentRoll;
                delete item.studentName;
                delete item.supervisorName;
            }
        );
        let sheet = XLSX.utils.json_to_sheet(printValue);
        sheet['!cols']=[{},{},{wch:15},{wch:15},{wch:25},{wch:20},{wch:25}];
        XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet 1');
        XLSX.writeFile(workbook, "Project.xlsx")
    };

    render() {
        return (
            <Grid container>
                <Grid item xs={2}>
                    <InputLabel>Category:</InputLabel>
                    <br/>
                    <Select
                        value={this.state.category}
                        onChange={this.handleChange}
                        fullWidth={true}
                        name={"category"}
                        multiple={true}
                    >
                        {this.state.categoryData.map(item => (
                            <MenuItem value={item.name} key={item.name}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <Divider/>
                    <br/>
                    <br/>
                    <InputLabel>Supervisors:</InputLabel>
                    <br/>
                    <br/>
                    <Select
                        value={this.state.supervisor}
                        onChange={this.handleChange}
                        fullWidth={true}
                        name={"supervisor"}
                    >
                        {sortBy(this.state.supervisorData, "name").map(item => (
                            <MenuItem value={item.name} key={item.idInstructor}>
                                {item.Title}{item.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <Divider/>
                    <br/>
                    <br/>
                    <InputLabel>Student Batch:</InputLabel>
                    <br/>
                    <br/>
                    <Select
                        value={this.state.batch}
                        onChange={this.handleChange}
                        fullWidth={true}
                        name={"batch"}
                    >
                        {this.state.batchData.map(item => (
                            <MenuItem value={item.year} key={item.year}>
                                {item.year}
                            </MenuItem>
                        ))}
                    </Select>
                    <Divider/>
                    <br/>
                    <br/>
                    <InputLabel>Program:</InputLabel>
                    <br/>
                    <br/>
                    <Select
                        value={this.state.program}
                        onChange={this.handleChange}
                        fullWidth={true}
                        name={"program"}
                    >
                        <MenuItem value={"BCT"}>BCT</MenuItem>
                        <MenuItem value={"BEX"}>BEX</MenuItem>
                    </Select>
                    <Divider/>
                    <br/>
                    {/*<RButton
                        color={green}
                        buttonText={"View"}
                        style={{marginTop: 20, marginLeft: 10}}
                        onClick={this.handleView}
                    >
                        <Eye/>
                    </RButton>*/}
                    <br/>
                    <RButton
                        color={red}
                        buttonText={"Reset Filter"}
                        style={{marginTop: 20, marginLeft: 10}}
                        onClick={this.handleClear}
                    >
                        <Clear/>
                    </RButton>
                    <br/>
                    <LinkProject/>
                    <br/>
                    <br/>
                    <RButton color={green} buttonText={"Download"} onClick={this.handlePrint} style={{marginLeft: 10}}>
                        <Print/>
                    </RButton>
                </Grid>
                <Grid item xs={10}>
                    <DisplayProject data={sortBy(this.state.data, "projectName")}/>
                </Grid>
            </Grid>
        );
    }
}

export default Search;
