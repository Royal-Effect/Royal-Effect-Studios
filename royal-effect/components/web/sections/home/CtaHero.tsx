import React from "react";
import { CtaFooter } from "@/components/web/sections/shared/CtaFooter";
import {CtaHeroFooterData} from "@/libs/constants/CtaFooterData";

const CtaHero = () => {
  return (
    <>
      <CtaFooter {...CtaHeroFooterData} />
    </>
  );
};

export default CtaHero;
