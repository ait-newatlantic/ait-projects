import React from "react";
import AuthService from "../../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="text-left">
      <div>
        <h4 className="font-weight-bold text-secondary">HỒ SƠ USER</h4>
      </div>
      <div>
        <p>
          <strong>Username:</strong> {currentUser.username}
        </p>
        <p>
          <strong>Tên:</strong> {currentUser.name}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>Branch:</strong> {currentUser.branchId}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
