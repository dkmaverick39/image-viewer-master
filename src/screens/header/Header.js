import React from 'react';
import ReactDOM from 'react-dom';
import './Header.css';
import profile_small from "../../assets/images/profile_small.png";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import { Redirect } from "react-router-dom";

class Header extends React.Component{

    constructor(){
        super();
        this.state = {
            "openModal_1":false,
            "redirectToProfile" : false,
            "redirectToLogin" : false
        };
        this.handleModalClose_1 = this.handleModalClose_1.bind(this);
        this.handleModalOpen_1 = this.handleModalOpen_1.bind(this);
        this.redirectToProfilePage = this.redirectToProfilePage.bind(this);
        this.logout = this.logout.bind(this);
    }


    handleModalOpen_1(){       
       this.setState({
           "openModal_1":true
       })
    }

    handleModalClose_1(){
        this.setState({
            "openModal_1":false
        })
     }
 
     redirectToProfilePage(){
         this.setState({
             "redirectToProfile" : true
         })
         
     }

     logout (){
        this.setState({
            "redirectToLogin" : true
        })
     }

    render(){
        const {isProfilePage,isHomePage} = this.props;
        const {redirectToProfile,redirectToLogin} = this.state;

        if(redirectToProfile){
            return <Redirect to = "/profile"/>
        }
        if(redirectToLogin){
            return <Redirect to = "/logout"/>
        }

        return(
           <div className="header">
               <span>Image Viewer</span>
               {isHomePage ? <span className="sub_header">
                <Paper component="form">
                    <IconButton type="submit" style={{padding:"10px"}} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase                   
                        placeholder="Search "
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    
                </Paper> 
                <img  style={{marginRight:"20px",marginLeft:"20px"}} src={profile_small} onClick={this.handleModalOpen_1} />
               </span> : ""}
               {isProfilePage ? <span style={{marginRight:"20px"}}><img src={profile_small}/></span> : ""}
           
              
               <Modal
                    open={this.state.openModal_1}
                    onClose={this.handleModalClose_1}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div className="iconModal">
                        <div onClick={this.redirectToProfilePage}>My Account</div>
                        <hr/>
                        <div onClick={this.logout}>Logout</div>
                    </div>
                </Modal>



           </div>
           
        );
    }

}

export default Header;