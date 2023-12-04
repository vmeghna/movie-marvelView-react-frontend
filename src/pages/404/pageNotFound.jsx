/* eslint-disable no-unused-vars */
import React from "react";
import "./style.scss";
// import pageNotFound from "../404/pageNotFound";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const pageNotFound = () => {
  return (
    <div className="pageNotFound">
      <ContentWrapper>
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
      </ContentWrapper>
    </div>
  );
};

export default pageNotFound;
