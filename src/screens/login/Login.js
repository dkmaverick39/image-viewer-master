import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Login.css';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { Redirect } from 'react-router-dom';

class Login extends React.Component{

    constructor(){
        super();
        this.state={
            username:'Deepak',
            password:'abc123',
            usernameError:false,
            passwordError:false,
            redirectToHomePage : false,
            loginValidationError : false
        }
    }
    

    setUsername = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
        if(e.target.value == '' || e.target.value == undefined){
            this.setState({'usernameError':true});
        }else{
            this.setState({'usernameError':false});
        }
    }


    setPassword = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
        if(e.target.value == '' || e.target.value == undefined){
            this.setState({'passwordError':true});
        }else{
            this.setState({'passwordError':false});
        }
    }


    validateLogin = (e) =>{
        if(!this.state.username){
            this.setState({'usernameError':true});
        }
        if(!this.state.password){
            this.setState({'passwordError':true});
        }    
        let username = this.state.username;
        let password = this.state.password;
        if(username == 'Deepak' && password == 'abc123'){
            this.setState({
                redirectToHomePage : true
            })
        }else{
            this.setState({
                loginValidationError : true
            })
        }
    }


    render(){
        
        const {redirectToHomePage,loginValidationError} = this.state;
        if(redirectToHomePage){
            return <Redirect to ="/home" />
        }

        return(
            <div className="loginCard">
                <Card>
                    <CardContent>

                        <div style={{paddingLeft:'30px'}}>
                        
                            <h2>LOGIN</h2>
                            <br/>                          
                            <FormControl>
                               <InputLabel htmlFor="my-username">Username * </InputLabel>
                               <Input  id="my-username" aria-describedby="my-helper-text" name="username" onChange={this.setUsername}/>
                            </FormControl>
                            <div className="userpasswordError">{this.state.usernameError ? 'required' : "" }</div>
                            <br/><br/>
                            <FormControl>
                               <InputLabel htmlFor="my-password">Password * </InputLabel>
                               <Input  id="my-password" aria-describedby="my-helper-text" name="password" type="password" onChange={this.setPassword}/>
                            </FormControl>
                            <div className="userpasswordError">{this.state.passwordError ? 'required' : "" }</div>
                            <br/>
                            {loginValidationError ? <div style={{color:"red"}}>Incorrect username and/or password</div> : ""}
                            <br/>
                            <Button variant="contained" color="primary" onClick={this.validateLogin}>
                                Login
                            </Button>

                        </div>

                    </CardContent>
                </Card>
            </div>
        )
    }

}

export default Login;