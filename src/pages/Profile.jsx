import React, { useEffect, useState } from "react";
import {
  FaCamera,
  FaCheck,
  FaEdit,
  FaEnvelope,
  FaFileAlt,
  FaIdBadge,
  FaSave,
  FaTimes,
  FaUser,
} from "react-icons/fa";

import api from "../api";
import { toast } from "react-toastify";

import "../Styles/Profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function getProfile() {
      try {
        setIsLoading(true);

        const token = localStorage.getItem("accessToken");

        const response = await api.get(
          "http://localhost:8000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("PROFILE:", response.data);

        setProfile(response.data.data);
      } catch (error) {
        console.log("PROFILE ERROR:", error);

        toast.error(
          error.response?.data?.message ||
            "Failed to load profile"
        );
      } finally {
        setIsLoading(false);
      }
    }

    getProfile();
  }, []);

  function handleEdit() {
    setFirstName(profile.firstName || "");
    setLastName(profile.lastName || "");
    setBio(profile.bio || "");

    setSelectedImage(null);

    setImagePreview(
      profile.profileImage
        ? `http://localhost:8000/${profile.profileImage}`
        : null
    );

    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
    setSelectedImage(null);
    setImagePreview(null);
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be less than 10MB");
      return;
    }

    setSelectedImage(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  }

  async function handleSave(event) {
    event.preventDefault();

    if (!firstName.trim()) {
      toast.error("First name is required");
      return;
    }

    if (!lastName.trim()) {
      toast.error("Last name is required");
      return;
    }

    if (bio.length > 300) {
      toast.error("Bio must be 300 characters or less");
      return;
    }

    try {
      setIsSaving(true);

      const token = localStorage.getItem("accessToken");

      const formData = new FormData();

      formData.append(
        "firstName",
        firstName.trim()
      );

      formData.append(
        "lastName",
        lastName.trim()
      );

      formData.append(
        "bio",
        bio.trim()
      );

      if (selectedImage) {
        formData.append(
          "profileImage",
          selectedImage
        );
      }

      const response = await api.put(
        "http://localhost:8000/api/auth/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "UPDATE PROFILE:",
        response.data
      );

      const updatedProfile =
        response.data.data;

      setProfile(updatedProfile);

      localStorage.setItem(
        "firstName",
        updatedProfile.firstName
      );

      localStorage.setItem(
        "lastName",
        updatedProfile.lastName
      );

      setIsEditing(false);
      setSelectedImage(null);
      setImagePreview(null);

      toast.success(
        "Profile updated successfully"
      );
    } catch (error) {
      console.log(
        "UPDATE PROFILE ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <main className="ph-profile-page">
        <div className="ph-profile-loading">
          <div className="ph-profile-loading-spinner" />

          <h2>Loading profile...</h2>

          <p>
            Please wait while we load your account.
          </p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="ph-profile-page">
        <div className="ph-profile-empty">
          <div className="ph-profile-empty-icon">
            <FaUser />
          </div>

          <h1>Profile Not Found</h1>

          <p>
            We could not load your profile information.
          </p>
        </div>
      </main>
    );
  }

  const profileImageUrl = profile.profileImage
    ? `http://localhost:8000/${profile.profileImage}`
    : null;

  if (!isEditing) {
    return (
      <main className="ph-profile-page">
        <div className="ph-profile-background-glow ph-profile-background-glow-one" />

        <div className="ph-profile-background-glow ph-profile-background-glow-two" />

        <div className="ph-profile-container">
          <header className="ph-profile-page-header">
            <span className="ph-profile-page-label">
              ACCOUNT
            </span>

            <h1>My Profile</h1>

            <p>
              View and manage your ProductHub account
              information.
            </p>
          </header>

          <section className="ph-profile-card">
            <div className="ph-profile-card-top">
              <div className="ph-profile-avatar">
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                  />
                ) : (
                  <span>
                    {profile.firstName
                      ?.charAt(0)
                      .toUpperCase()}
                  </span>
                )}
              </div>

              <div className="ph-profile-identity">
                <span className="ph-profile-identity-label">
                  ACCOUNT PROFILE
                </span>

                <h2>
                  {profile.firstName}{" "}
                  {profile.lastName}
                </h2>

                <div className="ph-profile-email">
                  <FaEnvelope />

                  <span>
                    {profile.email}
                  </span>
                </div>
              </div>

              <div className="ph-profile-role">
                <FaIdBadge />

                <span>
                  {profile.role}
                </span>
              </div>
            </div>

            <div className="ph-profile-divider" />

            <div className="ph-profile-information">
              <div className="ph-profile-information-header">
                <div>
                  <span className="ph-profile-section-label">
                    PERSONAL INFORMATION
                  </span>

                  <h3>Account details</h3>
                </div>

                <button
                  type="button"
                  className="ph-profile-edit-button"
                  onClick={handleEdit}
                >
                  <FaEdit />
                  <span>Edit Profile</span>
                </button>
              </div>

              <div className="ph-profile-details-grid">
                <div className="ph-profile-detail">
                  <span>First Name</span>

                  <strong>
                    {profile.firstName}
                  </strong>
                </div>

                <div className="ph-profile-detail">
                  <span>Last Name</span>

                  <strong>
                    {profile.lastName}
                  </strong>
                </div>

                <div className="ph-profile-detail ph-profile-detail-full">
                  <span>Email Address</span>

                  <strong>
                    {profile.email}
                  </strong>
                </div>

                <div className="ph-profile-detail ph-profile-detail-full">
                  <span>Bio</span>

                  <strong>
                    {profile.bio || "No bio added yet."}
                  </strong>
                </div>

                <div className="ph-profile-detail">
                  <span>Account Type</span>

                  <strong>
                    {profile.role}
                  </strong>
                </div>
              </div>
            </div>

            <div className="ph-profile-card-footer">
              <FaCheck />

              <span>
                Your account information is securely
                connected to your ProductHub profile.
              </span>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="ph-profile-page">
      <div className="ph-profile-background-glow ph-profile-background-glow-one" />

      <div className="ph-profile-background-glow ph-profile-background-glow-two" />

      <div className="ph-profile-container">
        <header className="ph-profile-page-header">
          <span className="ph-profile-page-label">
            ACCOUNT SETTINGS
          </span>

          <h1>Edit Profile</h1>

          <p>
            Update your personal profile information.
          </p>
        </header>

        <form
          className="ph-profile-card"
          onSubmit={handleSave}
        >
          <div className="ph-profile-edit-top">
            <div className="ph-profile-edit-avatar-wrapper">
              <div className="ph-profile-avatar ph-profile-avatar-edit">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                  />
                ) : (
                  <span>
                    {firstName
                      ?.charAt(0)
                      .toUpperCase()}
                  </span>
                )}
              </div>

              <label
                htmlFor="ph-profile-image"
                className="ph-profile-camera"
              >
                <FaCamera />
              </label>
            </div>

            <div className="ph-profile-edit-intro">
              <span className="ph-profile-section-label">
                PROFILE PHOTO
              </span>

              <h2>Update your profile image</h2>

              <p>
                Choose a clear image for your
                ProductHub profile.
              </p>

              <label
                htmlFor="ph-profile-image"
                className="ph-profile-image-button"
              >
                <FaCamera />
                Choose Image
              </label>

              <input
                id="ph-profile-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="ph-profile-hidden-file"
              />

              <small>
                Maximum file size: 10MB
              </small>
            </div>
          </div>

          <div className="ph-profile-divider" />

          <div className="ph-profile-information">
            <div className="ph-profile-information-header">
              <div>
                <span className="ph-profile-section-label">
                  PERSONAL INFORMATION
                </span>

                <h3>Update your profile</h3>
              </div>
            </div>

            <div className="ph-profile-form-grid">
              <div className="ph-profile-form-group">
                <label htmlFor="ph-first-name">
                  First Name
                </label>

                <div className="ph-profile-input-wrapper">
                  <FaUser />

                  <input
                    id="ph-first-name"
                    type="text"
                    value={firstName}
                    onChange={(event) =>
                      setFirstName(event.target.value)
                    }
                    placeholder="Enter first name"
                  />
                </div>
              </div>

              <div className="ph-profile-form-group">
                <label htmlFor="ph-last-name">
                  Last Name
                </label>

                <div className="ph-profile-input-wrapper">
                  <FaUser />

                  <input
                    id="ph-last-name"
                    type="text"
                    value={lastName}
                    onChange={(event) =>
                      setLastName(event.target.value)
                    }
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="ph-profile-form-group ph-profile-form-group-full">
                <label htmlFor="ph-bio">
                  Bio
                </label>

                <div className="ph-profile-input-wrapper ph-profile-textarea-wrapper">
                  <FaFileAlt />

                  <textarea
                    id="ph-bio"
                    value={bio}
                    onChange={(event) =>
                      setBio(event.target.value)
                    }
                    placeholder="Tell something about yourself..."
                    maxLength={300}
                    rows={5}
                  />
                </div>

                <small>
                  {bio.length}/300 characters
                </small>
              </div>
            </div>
          </div>

          <div className="ph-profile-form-actions">
            <button
              type="button"
              className="ph-profile-cancel-button"
              onClick={handleCancel}
              disabled={isSaving}
            >
              <FaTimes />
              Cancel
            </button>

            <button
              type="submit"
              className="ph-profile-save-button"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <span className="ph-profile-save-spinner" />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Profile;