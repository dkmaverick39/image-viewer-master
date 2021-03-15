import  React , { Fragment } from 'react';
import ReactDom from 'react-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import profile from "../../assets/images/profile.png";
import profile_small from "../../assets/images/profile_small.png";

import Header from '../header/Header';



import './Home.css';
import { Button, Input } from '@material-ui/core';

class Home extends React.Component{

      constructor(){
          super();
          this.state = {
            "profileAllDetails" : [],
            "profileAllDetails_bkp" : [],
            "access_token":"IGQVJXTk5FOVFYOGpMMlZA3ZAllYWWo2TzJPZAFdKQjh5eXQ3VXU1YmhWSmpDX1ZAhVmdweHdsbzJIWm0tZAldONmVFTkVWRGRKNlNXcTJjZAjVncGVwa29OLXRoY3Q2SGNFLTN4dlBaRG1HVGx1MHRKR1pPawZDZD"
          }

          this.filterPosts = this.filterPosts.bind(this);
      }

      componentDidMount(){
           let url = "https://graph.instagram.com/me/media?fields=id,caption&access_token="+this.state.access_token;
           var xhr = new XMLHttpRequest();
           xhr.open("GET",url);
           var profileDetailsArr = [];
           
           let globalThis = this;

           xhr.onreadystatechange = function(){
               if(this.readyState == 4){                   
                  let jsonTxt = JSON.parse(xhr.responseText);
                  console.log(jsonTxt.data)
                  jsonTxt.data != undefined && jsonTxt.data.forEach(eachProfileData => {
                      let eachProfile = {
                            "id":"",
                            "caption":"", 
                            "media_url":"",
                            "media_type" :"",
                            "username":"",
                            "timestamp":"",
                            "likes" : 0,
                            "comments":[],
                            "tags" :["#UpgradAssignment","MathsTutorial","#Tech"],
                            "incrementLikes":true
                      }; 
                      eachProfile.id = eachProfileData.id;
                      eachProfile.caption = eachProfileData.caption;
                      profileDetailsArr.push(eachProfile);
                      var xhr_1 = new XMLHttpRequest();
                     
                      var url_1 = "https://graph.instagram.com/"+ eachProfileData.id +"?fields=id,media_type,media_url,username,timestamp&access_token="+globalThis.state.access_token;
                      xhr_1.open("GET",url_1,false); 
                      xhr_1.send();
                      let jsonTxt_1 = JSON.parse(xhr_1.responseText);
                      console.log("jsonTxt_1 ="+xhr_1.responseText)

                      let newArr = profileDetailsArr.map(x =>{
                            if(x.id == jsonTxt_1.id){
                                x["header"] = "This is custom hard coded_"+Date.now()
                                x["media_type"] = jsonTxt_1.media_type;
                                x["media_url"] = jsonTxt_1.media_url;
                                x["username"] = jsonTxt_1.username;
                                x["timestamp"] = jsonTxt_1.timestamp;
                            }
                            return x;
                        })
                        console.log("newArr="+newArr[0].media_url);
                        profileDetailsArr = newArr;
                    })

                    //console.log("profileDetailsArr="+profileDetailsArr[0].media_url)
                    globalThis.setState({
                       "profileAllDetails" : profileDetailsArr
                    })  

                 } 
                                   
 
            } 
 
            xhr.send();
 
        }           
 
      incrementLikes(id){
         //this.setState({"displayColorlessHeartIcon":true});
         let profileNewDetails = this.state.profileAllDetails.map(eachProfileDetail => {
             if(eachProfileDetail.id == id){
                eachProfileDetail.likes = eachProfileDetail.likes + 1;
                eachProfileDetail.incrementLikes=false;
             }
             return eachProfileDetail;
         });
         this.setState({
            "profileAllDetails": profileNewDetails
         })
      }
      
      decrementLikes(id){
        //this.setState({"displayColorlessHeartIcon":false});
        let profileNewDetails = this.state.profileAllDetails.map(eachProfileDetail => {
            if(eachProfileDetail.id == id){
               eachProfileDetail.likes = eachProfileDetail.likes - 1;
               eachProfileDetail.incrementLikes=true;
            }
            
            return eachProfileDetail;
        });
        this.setState({
           "profileAllDetails": profileNewDetails
        })
      }

      setComment = (event,id) =>{
         let comment = event.target.value;
        // alert(comment+ " "+id);
        this.setState({
            ["comment_"+id] : comment
        })
      }

      addComment(id){
          let comment = this.state["comment_"+id];
          let profileNewDetails = this.state.profileAllDetails.map(eachProfileDetail => {
            if(eachProfileDetail.id == id){
               eachProfileDetail.comments.push(comment);
            }
            
            return eachProfileDetail;
        });
        this.setState({
           "profileAllDetails": profileNewDetails
        })
      }

      filterPosts (searchTxt){
        //   if(searchTxt == "" || searchTxt == undefined){
        //       return;
        //   }
         // alert("filterPosts " +searchTxt);
         let profileNewDetails = this.state.profileAllDetails.filter(eachProfileDetail => {
            
            return eachProfileDetail.caption.indexOf(searchTxt) >= 0
            
        });
        this.setState({
           "profileAllDetails": profileNewDetails
        })

      }

      render(){       
           const {profileAllDetails} = this.state;
          console.log(profileAllDetails);
          
          const details = profileAllDetails.length > 0 && profileAllDetails.map( eachCardDetails => {
              
              return  <div className = "cardStyle" >               
                   <Card>           
                    <CardHeader
                        avatar={
                            <img src= {profile}/>
                        }             
                        title={eachCardDetails.header}
                        subheader={eachCardDetails.timestamp}
                    />
                    <img src = {eachCardDetails.media_url} style={{height:"250px",width:"100%"}}/>
                    <hr/>
                    {/* <CardMedia            
                          image={eachCardDetails.media_url}
                          title="Paella dish"
                    /> */}
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                           <b> {eachCardDetails.caption}</b>
                        </Typography>
                        {eachCardDetails.tags.map(eachTag => {
                            return <span style={{color:"blue"}}>{eachTag},</span>
                        })}
                        <div className="likesStyle">
                            <span>{ !eachCardDetails.incrementLikes ? <FavoriteIcon onClick={()=>this.decrementLikes(eachCardDetails.id)}/> :<FavoriteBorderIcon  onClick={()=>this.incrementLikes(eachCardDetails.id)}/>} </span> &nbsp;
                            <span>{eachCardDetails.likes} &nbsp;&nbsp;likes</span>
                        </div>

                        {
                            eachCardDetails.comments.length > 0 ? eachCardDetails.comments.map(eachComment => {
                               return <div>{eachComment}</div>
                            }) : ""

                        }
                        
                        <div className="likesStyle">
                            <Input name="comment" placeholder="Add a comment"  onChange={(e)=>this.setComment(e,eachCardDetails.id)}/>
                              &nbsp;&nbsp; &nbsp;&nbsp;
                            <Button variant="contained" color="primary" onClick={()=>this.addComment(eachCardDetails.id)}>
                                ADD
                            </Button>
                        </div>
                    </CardContent>
                </Card>
               </div>
            });

           return(
               <Fragment>
                    <Header isHomePage="true"  filterInstaPosts = {this.filterPosts}/>
                      
                    <div>{details}</div>
               </Fragment>
          )

      }

}

export default Home;