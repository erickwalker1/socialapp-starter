import React from "react";
import Card from "react-bootstrap/Card";
import FileUploader from "../fileUpload/FileUploader";
import { userIsAuthenticated } from "../../redux/HOCs";
import "./ProfileContent.css";


class ProfileContent extends React.Component {
  render() {
    return (
      <div className="card">
        <Card style={{ width: "30rem" , height: "40rem"}}>
          <FileUploader />
        </Card>
      </div>
    );
  }
}

export default userIsAuthenticated(ProfileContent);