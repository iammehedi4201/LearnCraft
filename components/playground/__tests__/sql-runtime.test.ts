import { describe, it, expect } from "vitest";
import { SqlRuntime } from "../runtimes/sql-runtime";

describe("SqlRuntime", () => {
  it("executes PostgreSQL PG-01 starter code cleanly", async () => {
    const runtime = new SqlRuntime();
    const code = `CREATE TABLE products (
  id INTEGER,
  name TEXT,
  price NUMERIC(10, 2)
);

INSERT INTO products (id, name, price)
VALUES (1, 'USB-C Cable', 250.00);

SELECT * FROM products;`;

    const result = await runtime.run({ code, language: "sql" });
    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
    expect(result.output.length).toBeGreaterThan(0);

    const fullOutput = result.output.map((o) => o.content).join("\n");
    expect(fullOutput).toContain("CREATE TABLE");
    expect(fullOutput).toContain("INSERT 0 1");
    expect(fullOutput).toContain("USB-C Cable");
    expect(fullOutput).toContain("250");
    expect(fullOutput).toContain("(1 row)");
  });

  it("handles syntax errors gracefully with helpful error messages", async () => {
    const runtime = new SqlRuntime();
    const result = await runtime.run({
      code: "SELECT * FROM non_existent_table;",
      language: "sql",
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.error?.message).toContain('relation "non_existent_table" does not exist');
    expect(result.error?.suggestion).toContain("CREATE TABLE");
  });
});

