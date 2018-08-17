import React, {Component, Fragment} from 'react';
import RAppBar from "./RAppBar";
import blue from "@material-ui/core/colors/blue";
import yellow from "@material-ui/core/colors/yellow";
import RButton from "./RButton";
import green from "@material-ui/core/colors/green";

class Navbar extends Component {
   render() {
        return (
            <Fragment>
                <RAppBar title={"B.E. Major Project"} color={blue} AppButtonText={"Clear"} AppButtonColor={yellow}/>
            </Fragment>
        );
    }
}

export default Navbar;
