import React from "react";
import Avatar from "react-avatar-edit";

const ProfileAvatar = ({ preview, setPreview }) => {
  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (pv) => {
    setPreview(pv);
  };

  return (
    <div>
      <Avatar
        width={150}
        height={150}
        onCrop={onCrop}
        onClose={onClose}
        src={preview}
      />
      {preview && <img src={preview} alt="Choose avatar" />}
    </div>
  );
};

export default ProfileAvatar;
