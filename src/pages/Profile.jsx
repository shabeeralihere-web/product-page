import React from "react";

function Profile() {

  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  return (
    <div className="profile-page">

      <div className="profile-header">

        <p className="page-label">
          ACCOUNT
        </p>

        <h1>
          My Profile
        </h1>

        <p>
          View your account information.
        </p>

      </div>


      <div className="profile-card">

        <div className="profile-avatar">
          {firstName?.charAt(0).toUpperCase()}
        </div>


        <div className="profile-info">

          <div className="profile-field">
            <span>First Name</span>
            <strong>{firstName}</strong>
          </div>


          <div className="profile-field">
            <span>Last Name</span>
            <strong>{lastName}</strong>
          </div>


          <div className="profile-field">
            <span>Email</span>
            <strong>{email}</strong>
          </div>


          <div className="profile-field">
            <span>Account Type</span>
            <strong>
              {role}
            </strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;