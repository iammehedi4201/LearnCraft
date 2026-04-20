import { Nav } from "@/components/nav";
import { HeaderSection } from "./components/header-section";
import { SectionBasicTypes } from "./components/section-basic-types";
import { SectionInterfaces } from "./components/section-interfaces";
import { SectionUtilityTypes } from "./components/section-utility-types";
import { SectionGenerics } from "./components/section-generics";
import { SectionTypeNarrowing } from "./components/section-type-narrowing";
import { SectionExpressComparison } from "./components/section-express-comparison";
import { SectionMiniChallenge } from "./components/section-mini-challenge";
import { SectionCommonMistakesAndSummary } from "./components/section-common-mistakes-and-summary";

export const metadata = {
  title: "TypeScript Essentials | NestJS Elite Mastery",
  description: "Learn the core TypeScript concepts required to master NestJS.",
};

export default function NJ01TypeScript() {
  return (
    <>
      <Nav />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <HeaderSection />
        <SectionBasicTypes />
        <SectionInterfaces />
        <SectionUtilityTypes />
        <SectionGenerics />
        <SectionTypeNarrowing />
        <SectionExpressComparison />
        <SectionMiniChallenge />
        <SectionCommonMistakesAndSummary />
      </div>
    </>
  );
}
