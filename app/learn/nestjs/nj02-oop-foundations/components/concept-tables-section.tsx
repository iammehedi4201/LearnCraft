import { SectionContainer, SectionHeading, ComparisonTable, SummaryBox, Divider } from "./shared-components";

export function ConceptTablesSection() {
  return (
    <SectionContainer number={13} title="Concept Comparison Tables">

      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Quick reference tables for all the major OOP concepts. Use these tables to review and compare concepts at a glance.
        </p>
      </div>

      <div className="mb-10">
        <SectionHeading>📊 Core OOP Vocabulary</SectionHeading>
        <ComparisonTable headers={["Concept", "Simple Meaning", "Example"]} rows={[
          ["Class", "Blueprint / template", "class User { }"],
          ["Object", "Real thing from the blueprint", 'new User("Mehedi")'],
          ["Property", "Data inside an object", "this.name, this.age"],
          ["Method", "Action inside an object", "login(), deposit()"],
          ["Constructor", "Setup function on creation", "constructor(name) { }"],
          ["this", "The current object", "this.name"],
          ["new", "Create an object from a class", "new User(...)"],
          ["Static", "Belongs to the class, not objects", "User.totalUsers"],
          ["Getter", "Safe way to READ private data", "get balance() { }"],
          ["Setter", "Safe way to CHANGE private data", "set name(v) { }"],
          ["private", "Restricts access to defining class", "private password: string"],
        ]} />
      </div>

      <Divider />

      <div className="mb-10">
        <SectionHeading>📊 Class vs Object</SectionHeading>
        <ComparisonTable headers={["", "Class", "Object"]} rows={[
          ["What is it?", "A blueprint / template", "A real thing built from the blueprint"],
          ["How many?", "Write ONE class", "Create MANY objects"],
          ["Has data?", "No — describes what data should exist", "Yes — holds actual values"],
          ["Use directly?", "No — must create an object first", "Yes — use in your code"],
          ["Keyword", "class", "new"],
        ]} />
      </div>

      <Divider />

      <div className="mb-10">
        <SectionHeading>📊 The Four OOP Pillars</SectionHeading>
        <ComparisonTable headers={["Pillar", "Simple Meaning", "Key Mechanism", "Example"]} rows={[
          ["Encapsulation", "Protect data from outside", "private access modifier", "private balance: number"],
          ["Abstraction", "Hide complexity, show simplicity", "Private methods", "makeCoffee() hides 4 steps"],
          ["Inheritance", "Child gets parent's code free", "extends + super()", "Dog extends Animal"],
          ["Polymorphism", "Same method, different behavior", "Method overriding", "animal.makeSound()"],
        ]} />
      </div>

      <Divider />

      <div className="mb-10">
        <SectionHeading>📊 Encapsulation vs Abstraction</SectionHeading>
        <ComparisonTable headers={["", "Encapsulation", "Abstraction"]} rows={[
          ["Focus", "PROTECTING data", "HIDING complexity"],
          ["How", "Private fields + public methods", "Simple methods hide complex internals"],
          ["Goal", "Prevent bad changes", "Make code easy to use"],
          ["Analogy", "Locked safe", "ATM button"],
        ]} />
      </div>

      <Divider />

      <div className="mb-10">
        <SectionHeading>📊 Inheritance vs Composition</SectionHeading>
        <ComparisonTable headers={["", "Inheritance", "Composition"]} rows={[
          ["Relationship", '"IS A"', '"HAS A"'],
          ["Keyword", "extends", "Object as property"],
          ["Flexibility", "Rigid", "Flexible — swap parts easily"],
          ["Coupling", "Tight", "Loose"],
          ["Example", "Dog IS A Animal", "Car HAS A Engine"],
          ["When to use", "Clear family relationship", "Building from parts"],
        ]} />
      </div>

      <Divider />

      <div className="mb-10">
        <SectionHeading>📊 Property vs Method</SectionHeading>
        <ComparisonTable headers={["", "Property", "Method"]} rows={[
          ["What is it?", "Data (adjective)", "Action (verb)"],
          ["Holds", "A value", "Code that runs"],
          ["Access", "object.name", "object.login()"],
          ["Examples", "name, age, price, isActive", "login(), deposit(), calculate()"],
        ]} />
      </div>

      <Divider />

      <div className="mb-10">
        <SectionHeading>📊 Instance Method vs Static Method</SectionHeading>
        <ComparisonTable headers={["", "Instance Method", "Static Method"]} rows={[
          ["Belongs to", "Each object", "The class itself"],
          ["Call with", "object.method()", "ClassName.method()"],
          ["Uses this?", "Yes", "No"],
          ["Need new?", "Yes", "No"],
          ["Example", "user1.greet()", "User.getTotal()"],
        ]} />
      </div>

      <Divider />

      <div className="mb-10">
        <SectionHeading>📊 Object Literal vs Class</SectionHeading>
        <ComparisonTable headers={["", "Object Literal", "Class"]} rows={[
          ["Syntax", "const obj = { }", "class Name { }"],
          ["Create multiple?", "Tedious — copy-paste", "Easy — use new"],
          ["Inheritance?", "No", "Yes — extends"],
          ["Encapsulation?", "No built-in privacy", "Yes — private access modifier"],
          ["Best for", "One-off config/data objects", "Multiple objects with same structure"],
        ]} />
      </div>

      <SummaryBox>
        Keep these tables as a quick reference. When you&apos;re confused about a concept, come back here and compare. Understanding the <strong>differences</strong> between similar concepts is just as important as understanding each concept individually.
      </SummaryBox>

    </SectionContainer>
  );
}
