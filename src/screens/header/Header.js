import React from 'react';
import ReactDOM from 'react-dom';
import './Header.css';
import profile_small from "../../assets/images/profile_small.png";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';

class Header extends React.Component{

    constructor(){
        super();
    }

    render(){
        const {isProfilePage,isHomePage} = this.props;
        return(
           <div className="header">
               <span>Image Viewer</span>
               {isHomePage ? <span>
                <Paper component="form">
                    <IconButton type="submit" style={{padding:"10px"}} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase                   
                        placeholder="Search "
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    
                </Paper>
               </span> : ""}
               {isProfilePage ? <span style={{marginRight:"20px"}}><img src={profile_small}/></span> : ""}
           </div>
        );
    }

}

export default Header;