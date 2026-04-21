import { Nav } from "@/components/nav";
import { HeaderSection } from "./components/header-section";
import { ClassesObjectsSection } from "./components/classes-objects-section";
import { EncapsulationSection } from "./components/encapsulation-section";
import { InheritanceSection } from "./components/inheritance-section";
import { PolymorphismSection } from "./components/polymorphism-section";
import { AbstractionSection } from "./components/abstraction-section";
import { ClosingSections } from "./components/closing-sections";

export default function NJ02OOP(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <HeaderSection />
        <ClassesObjectsSection />
        <EncapsulationSection />
        <InheritanceSection />
        <PolymorphismSection />
        <AbstractionSection />
        <ClosingSections />
      </div>
    </>
  );
}
