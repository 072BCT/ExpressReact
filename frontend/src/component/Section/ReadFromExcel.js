import React from "react";
import Input from '@material-ui/core/Input';
import XLSX from 'xlsx/xlsx';
import RButton from "../../Header/Navbar/RButton";
import orange from "@material-ui/core/colors/orange";
import Modal from "@material-ui/core/Modal/Modal";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import Paper from "@material-ui/core/Paper/Paper";
import RTextfield from "../../container/RTextField";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Grid from "@material-ui/core/Grid/Grid";

import excel from '../../assets/img/Excel.png';

class ReadFromExcel extends React.Component {
    state = {
        batch: "",
        programme: "",
        open: false,
        excelData: [],
        location: "Select Excel File Clicking Button Below",
    };
    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleSelect = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    handleClose = () => {
        this.setState({
            open: false,
            batch: "",
            programme: "",
            location: "Select Excel File Clicking Button Below",
        });
    };

    handleSubmit = () => {
        let worksheet = this.state.excelData.Sheets[this.state.excelData.SheetNames[0]];
        let name = "", i = 1;
        while (name !== "Name") {
            name = worksheet[`A${i}`].v;
            i++;
        }
        for (i; i < this.state.excelData.Strings.length; i++) {
            name = worksheet[`A${i}`] ? worksheet[`A${i}`].v : null;
            let roll = worksheet[`B${i}`] ? worksheet[`B${i}`].v : null;
            let batch = this.state.batch;
            let programme = this.state.programme;
            console.log(name);
            fetch("/newStudent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    batch,
                    roll,
                    programme,
                })
            })
                .then(response => response.json())
                .catch(err => console.log(err));
        }
    };

    handleChange = (e) => {
        let files = e.target.files,
            f = files[0];
        this.setState({
            location: e.target.value
        });
        const reader = new FileReader();
        let workbook = [];
        const self = this;
        reader.onload = (e) => {
            let data = e.target.result;
            workbook = XLSX.read(data, {type: 'array'});
            self.setState({
                excelData: workbook,
            });
        };
        reader.readAsArrayBuffer(f);
    };

    render() {
        return (
            <div>
                <RButton color={orange} buttonText={"Upload File"} onClick={this.handleClickOpen}/>
                <Modal open={this.state.open} onClose={this.handleClose} style={{
                    paddingTop: 100,
                    paddingLeft: 280,
                    paddingRight: 280,
                    paddingBottom: 100
                }}>
                    <Paper elevation={2}>
                        <Grid container>
                            <Grid item xs={6}>
                                <form onSubmit={this.handleSubmit}>
                                    <InputLabel>Enter Batch:</InputLabel>
                                    <br/>
                                    <br/>
                                    <RTextfield value={this.state.batch} required={true} onChange={this.handleSelect}
                                                style={{width: 200}}
                                                name={"batch"}/>
                                    <br/>
                                    <br/>
                                    <InputLabel>Select Programme:</InputLabel>
                                    <br/>
                                    <br/>
                                    <Select value={this.state.programme} onChange={this.handleSelect}
                                            style={{width: 200}}
                                            name={"programme"}>
                                        <MenuItem value={"BCT"}>BCT</MenuItem>
                                        <MenuItem value={"BEX"}>BEX</MenuItem>
                                    </Select>
                                    <br/>
                                    <br/>
                                    <InputLabel>{this.state.location}</InputLabel>
                                    <br/>
                                    <RButton variant="raised" component="label" color={orange}
                                             buttonText={"Upload Excel File"}
                                             style={{marginTop: 20}}>
                                        <Input
                                            onChange={this.handleChange} type="file" style={{display: 'none'}}/>
                                    </RButton>
                                    <br/>
                                    <br/>
                                    <RButton color={green} buttonText={"Submit"} type={"submit"}/>
                                    <RButton style={{marginLeft: 400}} variant={"raised"} onClick={this.handleClose}
                                             color={red} buttonText={"Cancel"}/>
                                </form>
                            </Grid>
                            <Grid item xs={6}>
                                <img src={excel} style={{width:300, height:200}}/>
                                <br/>
                                <InputLabel>"A" Column Should Have Name Header.<br/>
                                    "B" Column Should Have Roll No.<br/>
                                    No Other Column Required
                                </InputLabel>
                            </Grid>
                        </Grid>
                    </Paper>
                </Modal>
            </div>
        );
    }
}

export default ReadFromExcel;
