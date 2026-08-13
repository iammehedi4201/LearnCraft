import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import { SectionContainer, TopicHeader, SectionHeading, AnalogyBox, SummaryBox, Divider, ExerciseBox, ComparisonTable, InfoCallout } from "./shared-components";

export function CompositionSection() {
  return (
    <SectionContainer number={7} title="Composition">

      <div className="mb-16">
        <TopicHeader number={1} title="What is Composition?" description='Composition means building objects by combining smaller objects together. Instead of saying "A is a type of B" (inheritance), you say "A has B" (composition).' color="primary" />

        <AnalogyBox emoji="🚗" title="Think about it like this">
          <p>A car is NOT an engine. A car <strong>HAS</strong> an engine, <strong>HAS</strong> wheels, <strong>HAS</strong> a battery, and <strong>HAS</strong> a stereo. You build a car by putting smaller parts together — that&apos;s composition!</p>
          <p className="mt-2">Similarly, in code, you can build a complex object by giving it smaller objects as properties.</p>
        </AnalogyBox>

        <EnhancedCodeBlock code={`// Small, focused classes
class Engine {
  constructor(horsepower) {
    this.horsepower = horsepower;
    this.isRunning = false;
  }
  start() {
    this.isRunning = true;
    console.log("🔧 Engine started (" + this.horsepower + " HP)");
  }
  stop() {
    this.isRunning = false;
    console.log("🔧 Engine stopped");
  }
}

class GPS {
  navigate(destination) {
    console.log("📍 Navigating to " + destination + "...");
  }
}

class Stereo {
  playMusic(song) {
    console.log("🎵 Playing: " + song);
  }
}

// Composition: Car HAS an Engine, HAS a GPS, HAS a Stereo
class Car {
  constructor(brand, horsepower) {
    this.brand = brand;
    this.engine = new Engine(horsepower); // HAS an engine
    this.gps = new GPS();                 // HAS a GPS
    this.stereo = new Stereo();           // HAS a stereo
  }

  startTrip(destination) {
    console.log("🚗 " + this.brand + " is ready!");
    this.engine.start();
    this.gps.navigate(destination);
    this.stereo.playMusic("Road Trip Mix");
  }
}

const myCar = new Car("Toyota", 200);
myCar.startTrip("Beach");
// 🚗 Toyota is ready!
// 🔧 Engine started (200 HP)
// 📍 Navigating to Beach...
// 🎵 Playing: Road Trip Mix`} language="javascript" />
      </div>

      <Divider />

      <div className="mb-16">
        <TopicHeader number={2} title="Inheritance vs Composition" description='The golden rule: Use inheritance for "IS A" relationships. Use composition for "HAS A" relationships.' color="amber" />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 rounded-2xl bg-[#7b52ac]/5 border border-[#7b52ac]/10">
            <h5 className="font-bold text-[#7b52ac] dark:text-[#b4b8d7] mb-3">🧬 Inheritance (IS A)</h5>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>Dog <strong>IS A</strong> Animal ✅</li>
              <li>Admin <strong>IS A</strong> User ✅</li>
              <li>Car <strong>IS A</strong> Vehicle ✅</li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl bg-[#e7e9f5]/50 dark:bg-[#212a5d]/40 border border-[#b4b8d7] dark:border-[#212a5d]">
            <h5 className="font-bold text-[#344b8f] dark:text-[#7f6fbe] mb-3">🧩 Composition (HAS A)</h5>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>Car <strong>HAS A</strong> Engine ✅</li>
              <li>User <strong>HAS A</strong> Address ✅</li>
              <li>Order <strong>HAS</strong> Products ✅</li>
            </ul>
          </div>
        </div>

        <EnhancedCodeBlock code={`// ─── WRONG: Using inheritance for "HAS A" ───
// A Player IS NOT an Inventory!
class Inventory {
  constructor() { this.items = []; }
  addItem(item) { this.items.push(item); }
}
// ❌ BAD — Player is not an inventory
// class Player extends Inventory { }

// ─── RIGHT: Using composition for "HAS A" ───
class Player {
  constructor(name) {
    this.name = name;
    this.inventory = new Inventory(); // Player HAS an inventory
    this.health = 100;
  }

  pickUp(item) {
    this.inventory.addItem(item);
    console.log(this.name + " picked up " + item);
  }
}

const player = new Player("Mehedi");
player.pickUp("Sword"); // Mehedi picked up Sword
player.pickUp("Shield"); // Mehedi picked up Shield
console.log(player.inventory.items); // ["Sword", "Shield"]`} language="javascript" />

        <ComparisonTable headers={["", "Inheritance", "Composition"]} rows={[
          ["Relationship", '"IS A"', '"HAS A"'],
          ["Keyword", "extends", "Create object as property"],
          ["Flexibility", "Rigid — stuck with parent", "Flexible — swap parts easily"],
          ["Coupling", "Tight — child depends on parent", "Loose — parts are independent"],
          ["When to use", "Clear family relationship", "Building from smaller parts"],
        ]} />

        <InfoCallout emoji="🏆" title="Famous rule: Prefer composition over inheritance">
          <p>Many experienced developers say: <strong>&quot;Prefer composition over inheritance.&quot;</strong> This does NOT mean &quot;never use inheritance.&quot; It means: when you&apos;re unsure, composition is usually the safer choice because it&apos;s more flexible and easier to change later.</p>
        </InfoCallout>
      </div>

      <Divider />

      <div className="mb-16">
        <TopicHeader number={3} title="More Composition Examples" description="Let us see more real-world examples of composition in action." color="emerald" />

        <div className="mb-8">
          <SectionHeading>📌 Example — Order has Products and a Payment</SectionHeading>
          <EnhancedCodeBlock code={`class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

class Payment {
  constructor(method) {
    this.method = method;
    this.isPaid = false;
  }
  pay(amount) {
    this.isPaid = true;
    console.log("💰 Paid $" + amount + " via " + this.method);
  }
}

// Order is COMPOSED of Products and a Payment
class Order {
  constructor(customerName) {
    this.customerName = customerName;
    this.products = [];      // HAS products
    this.payment = null;     // HAS a payment
  }

  addProduct(product) {
    this.products.push(product);
  }

  getTotal() {
    return this.products.reduce((sum, p) => sum + p.price, 0);
  }

  checkout(paymentMethod) {
    this.payment = new Payment(paymentMethod);
    this.payment.pay(this.getTotal());
    console.log("✅ Order placed for " + this.customerName);
  }
}

const order = new Order("Mehedi");
order.addProduct(new Product("Laptop", 999));
order.addProduct(new Product("Mouse", 25));
order.checkout("Credit Card");
// 💰 Paid $1024 via Credit Card
// ✅ Order placed for Mehedi`} language="javascript" />
        </div>
      </div>

      <SummaryBox>
        <strong>Composition</strong> means building objects by combining smaller objects. Use &quot;HAS A&quot; for composition and &quot;IS A&quot; for inheritance. Composition is more flexible because you can swap parts easily. When unsure, prefer composition over inheritance.
      </SummaryBox>

      <div className="mt-6" />

      <QuickCheck question='Should a "Car" extend an "Engine" class? Why or why not?' answer='No! A Car is NOT an Engine. A Car HAS an Engine. Use composition: this.engine = new Engine(). Use inheritance only for "IS A" relationships.' />

      <div className="mt-6" />

      <ExerciseBox level="intermediate" title="Build a Computer with Composition"
        description={`Create small classes: CPU (brand, cores), RAM (size in GB), Storage (type, size).\nThen create a Computer class that HAS a CPU, HAS RAM, HAS Storage.\nAdd a showSpecs() method that prints all the specs.`}
        solution={`class CPU {
  constructor(brand, cores) {
    this.brand = brand;
    this.cores = cores;
  }
}

class RAM {
  constructor(sizeGB) {
    this.sizeGB = sizeGB;
  }
}

class Storage {
  constructor(type, sizeGB) {
    this.type = type;
    this.sizeGB = sizeGB;
  }
}

class Computer {
  constructor(name, cpuBrand, cpuCores, ramGB, storageType, storageGB) {
    this.name = name;
    this.cpu = new CPU(cpuBrand, cpuCores);
    this.ram = new RAM(ramGB);
    this.storage = new Storage(storageType, storageGB);
  }

  showSpecs() {
    console.log("--- " + this.name + " ---");
    console.log("CPU: " + this.cpu.brand + " (" + this.cpu.cores + " cores)");
    console.log("RAM: " + this.ram.sizeGB + " GB");
    console.log("Storage: " + this.storage.sizeGB + " GB " + this.storage.type);
  }
}

const myPC = new Computer("Gaming PC", "Intel i9", 16, 32, "SSD", 1000);
myPC.showSpecs();`} />

    </SectionContainer>
  );
}
