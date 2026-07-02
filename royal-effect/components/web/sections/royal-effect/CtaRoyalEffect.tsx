import React from "react";
import { CtaFooter } from "@/components/web/sections/shared/CtaFooter";
import { CtaAboutFooterData } from "@/libs/constants/CtaFooterData";

const CtaAbout = () => {
  return (
    <>
      <CtaFooter {...CtaAboutFooterData} />
    </>
  );
};

export default CtaAbout;
