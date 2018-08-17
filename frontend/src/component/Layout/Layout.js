import React, {Component, Fragment} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Navbar from "../../Header/Navbar/Navbar";
import Search from "../Section/Search";

class Layout extends Component {
    render() {
        return (
            <Fragment>
                <Grid container spacing={8}>
                   <Grid item xs ={12}>
                     <Navbar/>
                   </Grid>
                    <Grid item xs = {12}>
                        <Search />
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

export default Layout;
