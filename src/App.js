import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'
import superagent from 'superagent'
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react'
import Modal from 'react-modal'
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class App extends Component {



  constructor(){
    super()
    this.state ={
      images:['https://www.facebook.com','https://res.cloudinary.com/dwf2trfxx/image/upload/v1516718797/cmvv0uymooqzuefmvzph.jpg'],
      modalIsOpen: false
    }


    this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


openModal() {
    this.setState({modalIsOpen: true});
  }
 
  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   this.subtitle.style.color = '#f00';
  // }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  uploadFile(files){
    console.log(files)
    const image = files[0]
    const cloudName = 'dwf2trfxx'
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    // 'https://api.cloudinary.com/v1_1/' +cloudName+ '/image/upload'
    const timeStamp = Date.now()/1000
    const upload_preset = 'f6mse0zt'
    const ParamStr = `timestamp=${timeStamp}&upload_preset=${upload_preset}kTowo7VlmBizyQSl6ejnh9lefD0`
    const signature = sha1(ParamStr)

    const params ={
      'api_key': '698866976363767',
      'timestamp': timeStamp,
      'upload_preset': upload_preset,
      'signature':signature
    }

 let uploadRequest = superagent.post(url)
 uploadRequest.attach('file', image)
 Object.keys(params).forEach( key =>{
  uploadRequest.field(key, params[key])
 })
 uploadRequest.end( (err, resp)=>{
  if(err){
    console.log(err)
    return
  }
  console.log('upload complete:'+ JSON.stringify(resp.body))
  this.setState({
    images: resp.body
  })
  console.log(resp.body.secure_url)
  const imgUrl = resp.body.secure_url
  ///take the imgUrl and insert it into database with user id
 })

  }
  render() {
    
    const list = this.state.images.map((img, i)=>{
      console.log(this.state.images)
    return(
        <li key={i}>
          <img style={{width:90}}src={this.state.images[i]}/>
        </li>
      )
  })

    return (
      <div className="App">
        <button onClick={this.openModal}>Upload image now </button>
        <ul>
         {list}
        </ul>
        <Modal
//         isOpen={true}
//         closeTimeoutMS={300}
//         style= {
//           {
//   overlay : {
//     position          : 'fixed',
//     top               : 30,
//     // left              : 0,
//     // right             : 0,
//     // bottom            : 0,
//     margin: '0 auto',
//     width:              800,
//     height:             500,
//     backgroundColor   : 'rgba(0,0,0,.7)'
//   },
//   content : {
//     position                   : 'absolute',
//     // top                        : '40px',
//     // left                       : '40px',
//     // right                      : '40px',
//     // bottom                     : '40px',
//     margin: '0 auto',
//     width:200,
//     border                     : '1px solid #ccc',
//     background                 : '#fff',
//     overflow                   : 'auto',
//     WebkitOverflowScrolling    : 'touch',
//     borderRadius               : '4px',
//     outline                    : 'none',
//     padding                    : '20px'
 
//   }
// }
// //         }
//         contentLabel="Modal"
isOpen={this.state.modalIsOpen}
          // onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <h3>Drag and Drop photos below or Click to upload a file </h3>
        <Dropzone id="me" onDrop={this.uploadFile.bind(this)}/>
        <button onClick={this.closeModal}>close</button>
</Modal>
      </div>
    );
  }
}

export default App;
