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
        <SocialIcon network="facebook" url="https://business.facebook.com/TAMU.APAMSA/" />
        <SocialIcon network="instagram" url="https://www.instagram.com/tamucomapamsa/" />
        <SocialIcon network="mailto" url="mailto:apamsa.tamucom@gmail.com" />
        <SocialIcon url="https://linktr.ee/tamucomapamsa" />
      </Stack>
    </div>
  );
};

export default Footer;
