import React from "react";
import AuthService from "../../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="text-left">
      <div>
        <h4 className="font-weight-bold text-dark">HỒ SƠ USER</h4>
      </div>
      <div>
        <p>Username: {currentUser.username}</p>
        <p>Tên: {currentUser.name}</p>
        <p>Email: {currentUser.email}</p>
        <p>Branch: {currentUser.branchId}</p>
        Authorities:
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
