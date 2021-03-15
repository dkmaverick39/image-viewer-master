import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import './Profile.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import { Input, TextField } from '@material-ui/core';
import profile from "../../assets/images/profile.png";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Header from '../header/Header';

class Profile extends React.Component{


    constructor(){
        super();
        this.state = {
          "openImageModal":false,
          "openModal":false,
          "numberOfPosts": 3,
          "numberOfUsersFollowed": 8,
          "numberOfFollowedByUsers" : 7,
          "fullName":"Upgrad Education",
          "imageModalLikes" :0,
          "profileAllDetails" : [],
          "access_token":"IGQVJXTk5FOVFYOGpMMlZA3ZAllYWWo2TzJPZAFdKQjh5eXQ3VXU1YmhWSmpDX1ZAhVmdweHdsbzJIWm0tZAldONmVFTkVWRGRKNlNXcTJjZAjVncGVwa29OLXRoY3Q2SGNFLTN4dlBaRG1HVGx1MHRKR1pPawZDZD"
        };
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.updateFullName = this.updateFullName.bind(this);
        this.handleImageModalOpen = this.handleImageModalOpen.bind(this);
        this.handleImageModalClose = this.handleImageModalClose.bind(this);
        this.decrementLikes = this.decrementLikes.bind(this);
        this.incrementLikes = this.incrementLikes.bind(this);
        this.setComment = this.setComment.bind(this);
        this.addComment = this.addComment.bind(this);
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
                jsonTxt.data!=null && jsonTxt.data.forEach(eachProfileData => {
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

    handleModalOpen(){
         this.setState({
             "openModal" : true
         })
    }

    handleModalClose(){
        this.setState({
            "openModal" : false
        })
    }

    updateFullName(e){
        let fullName = document.getElementById("fullName").value;
        this.setState({
            "fullName" : fullName,
            "openModal" : false
        })
    }
    handleImageModalOpen(eachProfileData){
        //alert(eachProfileData.id);
        this.setState({
            "openImageModal" : true,
            "imageModalUsername":eachProfileData.username,
            "imageModalId":eachProfileData.id,
            "imageModalCaption":eachProfileData.caption,
            "imageModalTags":eachProfileData.tags,
            "imageModalComments":eachProfileData.comments,
            "imageModalMediaUrl":eachProfileData.media_url,
            "imageModalLikes":eachProfileData.likes,

            "imageModalComment_1":""
        })
    }

    decrementLikes(){
       let id = this.state.imageModalId;
       let profileNewDetails = this.state.profileAllDetails.map(eachProfileDetail => {
            if(eachProfileDetail.id == id){
               eachProfileDetail.likes = eachProfileDetail.likes  - 1;
               this.setState({
                  "imageModalLikes":eachProfileDetail.likes
               })
            }
            
            return eachProfileDetail;
        });
        this.setState({
            "profileAllDetails": profileNewDetails,
            
        })
    }

    incrementLikes(){
        let id = this.state.imageModalId;
        let profileNewDetails = this.state.profileAllDetails.map(eachProfileDetail => {
             if(eachProfileDetail.id == id){
                eachProfileDetail.likes = eachProfileDetail.likes  + 1;
                this.setState({
                    "imageModalLikes":eachProfileDetail.likes
                 })
             }
             
             return eachProfileDetail;
         });
         this.setState({
             "profileAllDetails": profileNewDetails
         })
     }
    
    setComment(e){
       let comment = e.target.value;
       this.setState({
           "imageModalComment_1" : comment
       })

    }

    addComment(id){
       let comment = this.state.imageModalComment_1;
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

    handleImageModalClose(){
        this.setState({
            "openImageModal":false
        })
    }

    render(){
          const {profileAllDetails} = this.state;

        return(
            <Fragment>
                <Header isProfilePage="true"/>
                <div className="profileHead">
                    <div>
                        <img src={profile}/>
                       
                    </div>
                    <div className="profileColumnFlex">
                          <div>Upgrad_sde</div><br/>
                          <div>
                              <span className="marginRight">Posts:{this.state.numberOfPosts}</span>
                              <span className="marginRight">Follows:{this.state.numberOfUsersFollowed}</span>
                              <span>Followed By:{this.state.numberOfFollowedByUsers}</span>
                          </div><br/>
                          <div>
                              {this.state.fullName}
                              <Button color="secondary" variant="fab" onClick={this.handleModalOpen}>
                                   <EditIcon color="secondary" variant="fab"/>
                              </Button>
                          </div>
                    </div>
                </div>
               
                <Modal
                    open={this.state.openModal}
                    onClose={this.handleModalClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={{paddingLeft:"20px",marginTop:"350px",width:"200px",height:"200px",margin:"0 auto",backgroundColor:"white"}}>
                        <p style={{fontSize:"20px",paddingTop:"20px"}}>Edit</p> 
                        <TextField required id="standard-required" label="Full Name" id="fullName" name="fullName" defaultValue={this.state.fullName} />
                        <br/><br/><br/>
                        <Button variant="contained" color="primary" onClick={this.updateFullName}>
                            Update
                        </Button>
                    </div>
                </Modal>

                <div className = "gridDiv">
                    <GridList cellHeight={200} className="gridlist" cols={3} >
                        {profileAllDetails.map((eachProfileData) => (
                            <GridListTile key={eachProfileData.media_url} cols={1}>
                                <img src={eachProfileData.media_url} alt={eachProfileData.caption} onClick={()=>this.handleImageModalOpen(eachProfileData)}/>
                                
                            </GridListTile>
                        ))}
                    </GridList>
                </div> 
                <Modal
                        open={this.state.openImageModal}
                        onClose={this.handleImageModalClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >

                    <div className="imageModal">
                        <div style={{width:"50%"}}>
                            <img src={this.state.imageModalMediaUrl} height="500px" width="300px" />
                        </div>
                        <div style={{width:"50%"}}>
                                <div className="imageModalProfileImg">
                                    <img src={profile}/>
                                    <span style={{marginLeft:"20PX"}}>{this.state.imageModalUsername}</span>
                                </div>
                                <hr/>
                                <p>{this.state.imageModalCaption}</p>
                                <p>{this.state.imageModalTags}</p>
                                {
                                    this.state.imageModalComments != undefined ? this.state.imageModalComments.map(eachComment => {
                                    return <div>{eachComment}</div>
                                    }) : ""

                                }
                                <div className="likesStyle">
                                    <span>{ this.state.imageModalLikes > 0 ? <FavoriteIcon onClick={()=>this.decrementLikes()}/> :<FavoriteBorderIcon  onClick={()=>this.incrementLikes()}/>} </span> &nbsp;
                                    <span>{this.state.imageModalLikes} &nbsp;&nbsp;likes</span>
                                </div>

                                <div className="likesStyle">
                                    <Input name="comment" placeholder="Add a comment"  onChange={(e)=>this.setComment(e,this.state.imageModalId)}/>
                                    &nbsp;&nbsp; &nbsp;&nbsp;
                                    <Button variant="contained" color="primary" onClick={()=>this.addComment(this.state.imageModalId)}>
                                        ADD
                                    </Button>
                                </div>
                        </div>
                    </div>


                </Modal>

            </Fragment>
        )
    }

}


export default Profile;