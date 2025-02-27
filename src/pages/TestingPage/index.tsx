import React from "react";
import { Header } from "../../components/Header";
import { AltPostWriter } from "../../components/AltPostWriter";



export const TestingPage: React.FC = () => {

  return (
    <div className="main-wrapper">
      <Header theme="base" loggedIn={false}/>
      <AltPostWriter/>
    </div>
  );
};
