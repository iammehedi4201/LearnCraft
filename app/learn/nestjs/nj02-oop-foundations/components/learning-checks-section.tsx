import { QuickCheck } from "./quick-check";
import { SectionContainer, SectionHeading, Divider, PredictOutputBox } from "./shared-components";

export function LearningChecksSection() {
  return (
    <SectionContainer number={14} title="Learning Checks">

      <div className="mb-10 p-5 rounded-2xl bg-[#e7e9f5]/60 dark:bg-[#212a5d]/40 border border-[#b4b8d7] dark:border-[#212a5d]">
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Test your understanding! Try to answer each question <strong>before</strong> revealing the answer. Then try the &quot;Predict the Output&quot; challenges.
        </p>
      </div>

      {/* ── Quick Questions ── */}
      <div className="mb-16">
        <SectionHeading>❓ Quick Questions</SectionHeading>

        <QuickCheck question="1. What is a class?" answer="A class is a blueprint or template for creating objects. It describes what data (properties) and actions (methods) an object should have." />
        <div className="mt-4" />
        <QuickCheck question="2. What is an object?" answer="An object is a real thing created from a class. It holds actual data values and can perform actions defined by the class." />
        <div className="mt-4" />
        <QuickCheck question='3. What does "new" do?' answer="The 'new' keyword creates a brand new object from a class. It: (1) creates empty object, (2) sets 'this' to it, (3) runs constructor, (4) returns the object." />
        <div className="mt-4" />
        <QuickCheck question="4. Why do we use a constructor?" answer="To give each object its own unique starting data at the moment it is created. Without a constructor, every object would start with the same default values." />
        <div className="mt-4" />
        <QuickCheck question='5. What does "this" refer to?' answer="'this' refers to the current object — the object that is being created (in constructor) or the object that called the method." />
        <div className="mt-4" />
        <QuickCheck question="6. What is encapsulation?" answer="Encapsulation means keeping data protected (private) and controlling how it can be changed through public methods. It prevents direct, unchecked access to data." />
        <div className="mt-4" />
        <QuickCheck question="7. What is the difference between encapsulation and abstraction?" answer="Encapsulation PROTECTS data from outside access. Abstraction HIDES complexity and shows only simple interfaces. Encapsulation = locked safe. Abstraction = ATM button." />
        <div className="mt-4" />
        <QuickCheck question='8. What does "extends" do?' answer="'extends' makes a child class inherit all properties and methods from a parent class. The child gets everything for free and can add its own features." />
        <div className="mt-4" />
        <QuickCheck question='9. What is "super()" for?' answer="super() calls the parent class's constructor from inside a child class's constructor. It passes data up to the parent so the parent can set up its properties." />
        <div className="mt-4" />
        <QuickCheck question="10. What is polymorphism?" answer='Polymorphism means "many forms" — the same method name behaves differently depending on which object calls it. It eliminates the need for large if/else chains.' />
        <div className="mt-4" />
        <QuickCheck question="11. When should you use composition instead of inheritance?" answer='Use composition for "HAS A" relationships (Car HAS Engine). Use inheritance for "IS A" relationships (Dog IS Animal). When unsure, prefer composition.' />
        <div className="mt-4" />
        <QuickCheck question="12. What is a static method?" answer="A static method belongs to the class itself, not to any object. It's called with ClassName.method() and cannot use 'this' to refer to an object." />
        <div className="mt-4" />
        <QuickCheck question="13. What does # before a property name do?" answer="The # symbol makes a property truly private in JavaScript. No code outside the class can read or change it. Example: this.#password" />
        <div className="mt-4" />
        <QuickCheck question="14. Is OOP always better than procedural programming?" answer="No! Procedural is better for small scripts and simple tasks. OOP is better for large, complex applications. Use the right tool for the job." />
      </div>

      <Divider />

      {/* ── Predict the Output ── */}
      <div className="mb-16">
        <SectionHeading>🔮 Predict the Output</SectionHeading>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Try to predict what each code snippet will print <strong>before</strong> revealing the answer.</p>

        <PredictOutputBox code={`class Animal {
  constructor(name) { this.name = name; }
  speak() { console.log(this.name + " makes a sound"); }
}

class Dog extends Animal {
  speak() { console.log(this.name + " barks"); }
}

const a = new Animal("Cat");
const d = new Dog("Rex");
a.speak();
d.speak();`} answer={"Cat makes a sound\nRex barks"} />

        <PredictOutputBox code={`class Counter {
  #count = 0;
  increment() { this.#count++; }
  get value() { return this.#count; }
}

const c = new Counter();
c.increment();
c.increment();
c.increment();
console.log(c.value);`} answer="3" />

        <PredictOutputBox code={`class Box {
  static count = 0;
  constructor(color) {
    this.color = color;
    Box.count++;
  }
}

new Box("red");
new Box("blue");
new Box("green");
console.log(Box.count);`} answer="3" />

        <PredictOutputBox code={`class Shape {
  area() { return 0; }
}

class Circle extends Shape {
  constructor(r) { super(); this.r = r; }
  area() { return Math.PI * this.r * this.r; }
}

class Square extends Shape {
  constructor(s) { super(); this.s = s; }
  area() { return this.s * this.s; }
}

const shapes = [new Circle(5), new Square(4)];
shapes.forEach(s => console.log(s.area().toFixed(2)));`} answer={"78.54\n16.00"} />

        <PredictOutputBox code={`class Person {
  constructor(name) { this.name = name; }
  greet() { return "Hi, I am " + this.name; }
}

class Student extends Person {
  constructor(name, grade) {
    super(name);
    this.grade = grade;
  }
  greet() {
    return super.greet() + " (Grade: " + this.grade + ")";
  }
}

const s = new Student("Mehedi", "A");
console.log(s.greet());`} answer="Hi, I am Mehedi (Grade: A)" />
      </div>

    </SectionContainer>
  );
}
