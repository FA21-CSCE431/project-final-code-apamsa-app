import React from "react";
import { SocialIcon } from "react-social-icons";
import { Icon, Stack } from "@mui/material";

const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Stack spacing={2}>
        <SocialIcon network="facebook" />
        <SocialIcon network="linkedin" />
      </Stack>
    </div>
  );
};

export default Footer;
