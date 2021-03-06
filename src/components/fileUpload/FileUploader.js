import React from "react";
import DataService from "../../services/DataService";
import { Button } from "react-bootstrap";
import "./FileUploader.css";

class FileUploader extends React.Component {
  client = new DataService();

  state = {
    formData: null,
    imageURL: `https://socialapp-api.herokuapp.com/users/${this.client.getUsername()}/picture`,
  };

  createFormData = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("picture", file);

    this.setState({ formData }, this.upload);
  };

  setFallbackImage = (event) => {
    event.target.scr =
      "https://image.shutterstock.com/image-vector/avatar-vector-male-profile-gray-260nw-538707355.jpg";
  };

  upload = () => {
    if (this.state.formData === null) return;

    this.client.uploadPicture(this.state.formData).then((response) => {
      if (response.data.statusCode === 200) {
        this.updatePicture();
      }
    });
  };

  updatePicture() {
    const timestamp = Date.now();
    const imageURL = `https://socialapp-api.herokuapp.com/users/${this.client.getUsername()}/picture?t=${timestamp}`;
    this.setState({ imageURL });
  }

  render() {
    return (
      <div className="FileUploader">
        <div className="image-Preview">
          <img
            alt="user"
            src={this.state.imageURL}
            onError={this.setFallbackImage}
            width={200}
          />

          <h6>Upload Picture - RESTRICTED TO 200kb-</h6>
          <div className="ChooseFile">
            <Button
              size="sm"
              variant="dark"
              as="input"
              type="file"
              accept="image/*"
              name="picture"
              onChange={this.createFormData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default FileUploader;
