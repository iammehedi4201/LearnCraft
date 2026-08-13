"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import { Playground } from "@/components/playground/Playground";
import { SectionContainer, TopicHeader, SectionHeading, AnalogyBox, SummaryBox, Divider, ComparisonTable, InfoCallout } from "./shared-components";

export function CompositionSection() {
  return (
    <SectionContainer number={7} title="Composition">

      <div className="mb-16">
        <TopicHeader number={1} title="What is Composition?" description='Composition means building objects by combining smaller objects together. Instead of saying "A is a type of B" (inheritance), you say "A has B" (composition).' color="primary" />

        <AnalogyBox emoji="🚗" title="Think about it like this">
          <p>A car is NOT an engine. A car <strong>HAS</strong> an engine, <strong>HAS</strong> wheels, <strong>HAS</strong> a battery, and <strong>HAS</strong> a stereo. You build a car by putting smaller parts together — that&apos;s composition!</p>
          <p className="mt-2">Similarly, in code, you can build a complex object by giving it smaller objects as properties.</p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Car Composed of Engine, GPS & Stereo</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Small, focused component classes
class Engine {
  constructor(public horsepower: number, public isRunning: boolean = false) {}

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
  navigate(destination: string) {
    console.log("📍 GPS navigating to " + destination + "...");
  }
}

class Stereo {
  playMusic(song: string) {
    console.log("🎵 Stereo playing: " + song);
  }
}

// Composition: Car HAS an Engine, HAS a GPS, HAS a Stereo
class Car {
  engine: Engine;
  gps: GPS;
  stereo: Stereo;

  constructor(public brand: string, horsepower: number) {
    this.engine = new Engine(horsepower); // HAS an engine
    this.gps = new GPS();                 // HAS a GPS
    this.stereo = new Stereo();           // HAS a stereo
  }

  startTrip(destination: string) {
    console.log("🚗 " + this.brand + " is ready for the trip!");
    this.engine.start();
    this.gps.navigate(destination);
    this.stereo.playMusic("Highway Star");
  }
}

const myCar = new Car("Toyota Supra", 382);
myCar.startTrip("Mount Fuji");`}
            height="380px"
          />
        </div>
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
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
            <h5 className="font-bold text-ds-feature-base mb-3">🧩 Composition (HAS A)</h5>
            <ul className="space-y-2 text-sm text-ds-text-sub">
              <li>Car <strong>HAS A</strong> Engine ✅</li>
              <li>Player <strong>HAS A</strong> Inventory ✅</li>
              <li>Order <strong>HAS</strong> Products ✅</li>
            </ul>
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Player HAS An Inventory</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class Inventory {
  items: string[] = [];

  addItem(item: string) {
    this.items.push(item);
    console.log("📦 Stored: " + item);
  }

  showItems() {
    console.log("Inventory contents: " + this.items.join(", "));
  }
}

// Player HAS an Inventory (not extends Inventory!)
class Player {
  inventory: Inventory;

  constructor(public name: string, public health: number = 100) {
    this.inventory = new Inventory();
  }

  pickUp(item: string) {
    console.log(this.name + " found a " + item + "!");
    this.inventory.addItem(item);
  }
}

const player = new Player("Hero Mehedi");
player.pickUp("Mythic Sword");
player.pickUp("Health Potion");
player.pickUp("Dragon Shield");
player.inventory.showItems();`}
            height="360px"
          />
        </div>

        <ComparisonTable headers={["", "Inheritance", "Composition"]} rows={[
          ["Relationship", '"IS A"', '"HAS A"'],
          ["Keyword", "extends", "Create object as property"],
          ["Flexibility", "Rigid — stuck with parent", "Flexible — swap parts easily"],
          ["Coupling", "Tight — child depends on parent", "Loose — parts are independent"],
          ["When to use", "Clear family relationship", "Building from smaller parts"],
        ]} />

        <InfoCallout emoji="🏆" title="Famous rule: Prefer composition over inheritance">
          <p>Many experienced developers say: <strong>&quot;Prefer composition over inheritance.&quot;</strong> When you&apos;re unsure, composition is usually the safer choice because it&apos;s more flexible and easier to change later.</p>
        </InfoCallout>
      </div>

      <Divider />

      <SummaryBox>
        <strong>Composition</strong> means building objects by combining smaller objects. Use &quot;HAS A&quot; for composition and &quot;IS A&quot; for inheritance. Composition is more flexible because you can swap parts easily. When unsure, prefer composition over inheritance.
      </SummaryBox>

      <div className="mt-6" />

      <QuickCheck question='Should a "Car" extend an "Engine" class? Why or why not?' answer='No! A Car is NOT an Engine. A Car HAS an Engine. Use composition: this.engine = new Engine(). Use inheritance only for "IS A" relationships.' />

      {/* ── Interactive Practice Exercise ── */}
      <div className="mt-8">
        <SectionHeading>💻 Practice Exercise: Computer Composition</SectionHeading>
        <Playground
          runtime="typescript"
          language="TypeScript"
          exercise={{
            id: "oop-composition-computer-ex",
            title: "Build a Computer with Composition",
            instructions: `Create small classes:
1. CPU: constructor(brand: string, cores: number)
2. RAM: constructor(sizeGB: number)
3. Storage: constructor(type: string, sizeGB: number)
4. Computer: constructor(name, cpuBrand, cpuCores, ramGB, storageType, storageGB) that initializes this.cpu, this.ram, this.storage
5. Method showSpecs() that logs: "--- [name] ---", "CPU: [brand] ([cores] cores)", "RAM: [sizeGB] GB", "Storage: [sizeGB] GB [type]"`,
            starterCode: `class CPU {
  // Your code here
}

class RAM {
  // Your code here
}

class Storage {
  // Your code here
}

class Computer {
  // Your composition code here
}

const myPC = new Computer("Gaming Rig", "Intel i9", 16, 32, "NVMe SSD", 2000);
myPC.showSpecs();
`,
            solutionCode: `class CPU {
  constructor(public brand: string, public cores: number) {}
}

class RAM {
  constructor(public sizeGB: number) {}
}

class Storage {
  constructor(public type: string, public sizeGB: number) {}
}

class Computer {
  cpu: CPU;
  ram: RAM;
  storage: Storage;

  constructor(
    public name: string,
    cpuBrand: string,
    cpuCores: number,
    ramGB: number,
    storageType: string,
    storageGB: number
  ) {
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

const myPC = new Computer("Gaming Rig", "Intel i9", 16, 32, "NVMe SSD", 2000);
myPC.showSpecs();`,
            hints: [
              "CPU has brand and cores. RAM has sizeGB. Storage has type and sizeGB.",
              "In Computer's constructor, instantiate each component: this.cpu = new CPU(cpuBrand, cpuCores), etc.",
              "showSpecs() accesses the properties of this.cpu, this.ram, and this.storage.",
            ],
            tests: [
              {
                name: "CPU, RAM, Storage, and Computer classes exist",
                code: `if (typeof CPU !== 'function' || typeof RAM !== 'function' || typeof Storage !== 'function' || typeof Computer !== 'function') throw new Error("Missing classes");`,
              },
              {
                name: "Computer correctly instantiates sub-objects",
                code: `const _pc = new Computer("PC", "AMD", 8, 16, "SSD", 512); if (!(_pc.cpu instanceof CPU)) throw new Error("Computer must have a CPU instance"); if (!(_pc.ram instanceof RAM)) throw new Error("Computer must have a RAM instance");`,
              },
              {
                name: "Computer has showSpecs method",
                code: `const _pc2 = new Computer("PC", "AMD", 8, 16, "SSD", 512); if (typeof _pc2.showSpecs !== 'function') throw new Error("showSpecs method missing");`,
              },
            ],
            difficulty: "intermediate",
          }}
          height="420px"
        />
      </div>

    </SectionContainer>
  );
}
