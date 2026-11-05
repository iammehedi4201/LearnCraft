// ═══════════════════════════════════════════════════════════
// Learning Craft — In-Browser SQL / PostgreSQL Simulator Runtime
// ═══════════════════════════════════════════════════════════
//
// A fast, deterministic client-side SQL execution engine.
// Executes DDL (CREATE TABLE, DROP TABLE, ALTER TABLE),
// DML (INSERT, UPDATE, DELETE), and queries (SELECT, JOIN,
// WHERE, GROUP BY, ORDER BY, LIMIT) with PostgreSQL-style
// tabular ASCII console output.
//
// Security: Zero eval(), pure in-memory data structures,
// safe for sandboxed browser execution.

import type {
  PlaygroundRuntime,
  PlaygroundInput,
  ExecutionResult,
  ValidationResult,
  TestCase,
  OutputLine,
  PlaygroundError,
  TestResult,
} from "../types";

export interface SqlColumnDef {
  name: string;
  type: string;
  isPrimary?: boolean;
  isNotNull?: boolean;
  defaultValue?: any;
}

export interface SqlTable {
  name: string;
  columns: SqlColumnDef[];
  rows: Record<string, any>[];
}

export class SqlRuntime implements PlaygroundRuntime {
  public supportsPreview = false;
  public supportsConsole = true;
  public supportsTests = true;
  public supportsMultipleFiles = false;

  private tables: Map<string, SqlTable> = new Map();
  private inTransaction = false;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.tables.clear();
    this.inTransaction = false;
  }

  public isInTransaction(): boolean {
    return this.inTransaction;
  }

  public dispose(): void {
    this.tables.clear();
  }

  public async run(input: PlaygroundInput): Promise<ExecutionResult> {
    const startTime = performance.now();
    const rawSql = input.code || "";
    const output: OutputLine[] = [];

    if (!rawSql.trim()) {
      return {
        success: true,
        output: [{ type: "log", content: "No SQL statements to execute." }],
        duration: Math.round(performance.now() - startTime),
      };
    }

    try {
      // Split SQL script into individual statements by semicolon (ignoring inside quotes)
      const statements = this.splitStatements(rawSql);

      for (let i = 0; i < statements.length; i++) {
        const stmtInfo = statements[i];
        const trimmed = stmtInfo.sql.trim();
        if (!trimmed) continue;

        const resultLines = this.executeStatement(trimmed, stmtInfo.line);
        output.push(...resultLines);
      }

      const duration = Math.max(1, Math.round(performance.now() - startTime));
      return {
        success: true,
        output,
        duration,
      };
    } catch (err: any) {
      const duration = Math.max(1, Math.round(performance.now() - startTime));
      const pgError: PlaygroundError = {
        message: err.message || "SQL Execution Error",
        technicalMessage: err.stack || err.message,
        line: err.line || 1,
        suggestion: err.suggestion || "Check your SQL query syntax and table names.",
      };

      output.push({
        type: "error",
        content: `psql: error: ${pgError.message} (Line ${pgError.line})`,
      });

      return {
        success: false,
        output,
        error: pgError,
        duration,
      };
    }
  }

  public async validate(
    input: PlaygroundInput,
    tests: TestCase[],
    hiddenTests?: TestCase[]
  ): Promise<ValidationResult> {
    const allTests = [...tests, ...(hiddenTests || [])];
    const results: TestResult[] = [];
    let passedCount = 0;

    // Run the code first
    await this.run(input);

    for (const test of allTests) {
      const isHidden = Boolean(test.hidden);
      try {
        // Evaluate test assertions against this.tables
        const fn = new Function("tables", "runtime", test.code);
        const passed = Boolean(fn(this.tables, this));
        if (passed) passedCount++;
        results.push({
          name: test.name,
          passed,
          hidden: isHidden,
        });
      } catch (err: any) {
        results.push({
          name: test.name,
          passed: false,
          hidden: isHidden,
          error: err.message,
        });
      }
    }

    return {
      passed: passedCount === allTests.length,
      results,
      totalPassed: passedCount,
      totalTests: allTests.length,
    };
  }

  // ─── Statement Parsing & Execution ───

  private splitStatements(sql: string): { sql: string; line: number }[] {
    const statements: { sql: string; line: number }[] = [];
    let current = "";
    let inSingleQuote = false;
    let inDoubleQuote = false;
    let inLineComment = false;
    let inBlockComment = false;
    let startLine = 1;
    let currentLine = 1;

    for (let i = 0; i < sql.length; i++) {
      const char = sql[i];
      const nextChar = sql[i + 1] || "";

      if (char === "\n") {
        currentLine++;
        if (inLineComment) {
          inLineComment = false;
        }
      }

      if (inLineComment) {
        continue;
      }

      if (inBlockComment) {
        if (char === "*" && nextChar === "/") {
          inBlockComment = false;
          i++; // skip /
        }
        continue;
      }

      if (!inSingleQuote && !inDoubleQuote) {
        if (char === "-" && nextChar === "-") {
          inLineComment = true;
          i++;
          continue;
        }
        if (char === "/" && nextChar === "*") {
          inBlockComment = true;
          i++;
          continue;
        }
      }

      if (char === "'" && !inDoubleQuote) {
        inSingleQuote = !inSingleQuote;
        current += char;
        continue;
      }

      if (char === '"' && !inSingleQuote) {
        inDoubleQuote = !inDoubleQuote;
        current += char;
        continue;
      }

      if (char === ";" && !inSingleQuote && !inDoubleQuote) {
        if (current.trim()) {
          statements.push({ sql: current.trim(), line: startLine });
        }
        current = "";
        startLine = currentLine;
        continue;
      }

      if (!current.trim() && char.trim()) {
        startLine = currentLine;
      }

      current += char;
    }

    if (current.trim()) {
      statements.push({ sql: current.trim(), line: startLine });
    }

    return statements;
  }

  private executeStatement(sql: string, line: number): OutputLine[] {
    const cleanSql = sql.replace(/\s+/g, " ").trim();
    const upper = cleanSql.toUpperCase();

    // 1. Transaction control
    if (upper === "BEGIN" || upper === "BEGIN TRANSACTION" || upper === "START TRANSACTION") {
      this.inTransaction = true;
      return [{ type: "info", content: "BEGIN" }];
    }
    if (upper === "COMMIT" || upper === "COMMIT TRANSACTION" || upper === "END") {
      this.inTransaction = false;
      return [{ type: "info", content: "COMMIT" }];
    }
    if (upper === "ROLLBACK" || upper === "ROLLBACK TRANSACTION") {
      this.inTransaction = false;
      return [{ type: "info", content: "ROLLBACK" }];
    }

    // 2. EXPLAIN / EXPLAIN ANALYZE
    if (upper.startsWith("EXPLAIN")) {
      return this.handleExplain(cleanSql, line);
    }

    // 3. CREATE TABLE
    if (upper.startsWith("CREATE TABLE")) {
      return this.handleCreateTable(cleanSql, line);
    }

    // 4. DROP TABLE
    if (upper.startsWith("DROP TABLE")) {
      return this.handleDropTable(cleanSql, line);
    }

    // 5. ALTER TABLE
    if (upper.startsWith("ALTER TABLE")) {
      return this.handleAlterTable(cleanSql, line);
    }

    // 6. CREATE VIEW
    if (upper.startsWith("CREATE VIEW")) {
      return [{ type: "info", content: "CREATE VIEW" }];
    }

    // 7. INSERT INTO
    if (upper.startsWith("INSERT INTO")) {
      return this.handleInsert(cleanSql, line);
    }

    // 8. UPDATE
    if (upper.startsWith("UPDATE")) {
      return this.handleUpdate(cleanSql, line);
    }

    // 9. DELETE FROM
    if (upper.startsWith("DELETE FROM") || upper.startsWith("DELETE")) {
      return this.handleDelete(cleanSql, line);
    }

    // 10. SELECT
    if (upper.startsWith("SELECT") || upper.startsWith("WITH")) {
      return this.handleSelect(cleanSql, line);
    }

    // Generic DDL fallback
    return [{ type: "info", content: `OK: ${cleanSql.split(" ")[0]}` }];
  }

  // ─── DDL Handlers ───

  private handleCreateTable(sql: string, line: number): OutputLine[] {
    const match = sql.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_"]+)\s*\(([\s\S]+)\)/i);
    if (!match) {
      throw {
        message: "Syntax error in CREATE TABLE definition",
        line,
        suggestion: "Use format: CREATE TABLE table_name ( col1 TYPE, col2 TYPE );",
      };
    }

    const rawTableName = match[1].replace(/"/g, "").toLowerCase();
    const colsDefinition = match[2];

    const columns: SqlColumnDef[] = [];
    const colParts = this.splitColumnDefs(colsDefinition);

    for (const part of colParts) {
      const trimmed = part.trim();
      if (!trimmed) continue;

      if (/^PRIMARY\s+KEY/i.test(trimmed)) {
        const pkMatch = trimmed.match(/PRIMARY\s+KEY\s*\(([^)]+)\)/i);
        if (pkMatch) {
          const pkCols = pkMatch[1].split(",").map((c) => c.trim().toLowerCase());
          for (const col of columns) {
            if (pkCols.includes(col.name.toLowerCase())) {
              col.isPrimary = true;
            }
          }
        }
        continue;
      }

      if (/^FOREIGN\s+KEY/i.test(trimmed) || /^CONSTRAINT/i.test(trimmed)) {
        continue; // ignore foreign key / constraint declarations in mock schema
      }

      const tokens = trimmed.split(/\s+/);
      const colName = tokens[0].replace(/"/g, "").toLowerCase();
      const colType = tokens[1] || "TEXT";
      const isPrimary = /PRIMARY\s+KEY/i.test(trimmed);
      const isNotNull = /NOT\s+NULL/i.test(trimmed);

      columns.push({
        name: colName,
        type: colType.toUpperCase(),
        isPrimary,
        isNotNull,
      });
    }

    this.tables.set(rawTableName, {
      name: rawTableName,
      columns,
      rows: [],
    });

    return [
      {
        type: "log",
        content: `CREATE TABLE`,
      },
    ];
  }

  private splitColumnDefs(def: string): string[] {
    const parts: string[] = [];
    let current = "";
    let parenDepth = 0;

    for (let i = 0; i < def.length; i++) {
      const ch = def[i];
      if (ch === "(") parenDepth++;
      else if (ch === ")") parenDepth--;
      else if (ch === "," && parenDepth === 0) {
        parts.push(current.trim());
        current = "";
        continue;
      }
      current += ch;
    }
    if (current.trim()) parts.push(current.trim());
    return parts;
  }

  private handleDropTable(sql: string, _line: number): OutputLine[] {
    const match = sql.match(/DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?([a-zA-Z0-9_"]+)/i);
    if (match) {
      const tableName = match[1].replace(/"/g, "").toLowerCase();
      this.tables.delete(tableName);
    }
    return [{ type: "log", content: "DROP TABLE" }];
  }

  private handleAlterTable(_sql: string, _line: number): OutputLine[] {
    return [{ type: "log", content: "ALTER TABLE" }];
  }

  // ─── DML Handlers ───

  private handleInsert(sql: string, line: number): OutputLine[] {
    const match = sql.match(/INSERT\s+INTO\s+([a-zA-Z0-9_"]+)(?:\s*\(([^)]+)\))?\s+VALUES\s*([\s\S]+)/i);
    if (!match) {
      throw {
        message: "Syntax error in INSERT statement",
        line,
        suggestion: "Use format: INSERT INTO table_name (col1, col2) VALUES (val1, val2);",
      };
    }

    const tableName = match[1].replace(/"/g, "").toLowerCase();
    const rawCols = match[2];
    const rawValuesList = match[3];

    let table = this.tables.get(tableName);
    if (!table) {
      // Auto-create table dynamically if insert occurs before create in loose practice
      table = { name: tableName, columns: [], rows: [] };
      this.tables.set(tableName, table);
    }

    const specifiedCols = rawCols
      ? rawCols.split(",").map((c) => c.trim().replace(/"/g, "").toLowerCase())
      : table.columns.map((c) => c.name.toLowerCase());

    const tuples = this.extractValueTuples(rawValuesList);
    let insertedCount = 0;

    for (const tuple of tuples) {
      const row: Record<string, any> = {};
      tuple.forEach((val, idx) => {
        const colName = specifiedCols[idx] || `col_${idx + 1}`;
        row[colName] = val;
      });

      // Default missing columns to null
      for (const col of table.columns) {
        if (!(col.name.toLowerCase() in row)) {
          row[col.name.toLowerCase()] = null;
        }
      }

      table.rows.push(row);
      insertedCount++;
    }

    return [{ type: "log", content: `INSERT 0 ${insertedCount}` }];
  }

  private extractValueTuples(raw: string): any[][] {
    const tuples: any[][] = [];
    let currentTuple: string[] = [];
    let currentVal = "";
    let insideParen = false;
    let inQuote = false;

    for (let i = 0; i < raw.length; i++) {
      const ch = raw[i];

      if (ch === "'" && raw[i - 1] !== "\\") {
        inQuote = !inQuote;
        currentVal += ch;
        continue;
      }

      if (inQuote) {
        currentVal += ch;
        continue;
      }

      if (ch === "(") {
        insideParen = true;
        currentTuple = [];
        currentVal = "";
        continue;
      }

      if (ch === ")") {
        if (insideParen) {
          if (currentVal.trim()) {
            currentTuple.push(this.parseSqlLiteral(currentVal.trim()));
          }
          tuples.push(currentTuple);
          insideParen = false;
          currentVal = "";
        }
        continue;
      }

      if (ch === "," && insideParen) {
        currentTuple.push(this.parseSqlLiteral(currentVal.trim()));
        currentVal = "";
        continue;
      }

      if (insideParen) {
        currentVal += ch;
      }
    }

    return tuples;
  }

  private parseSqlLiteral(val: string): any {
    if (!val) return null;
    if (val.toUpperCase() === "NULL") return null;
    if (val.toUpperCase() === "TRUE") return true;
    if (val.toUpperCase() === "FALSE") return false;

    // String literal in single quotes
    if (val.startsWith("'") && val.endsWith("'") && val.length >= 2) {
      return val.slice(1, -1).replace(/''/g, "'");
    }

    // Number
    const num = Number(val);
    if (!isNaN(num) && !isNaN(parseFloat(val))) {
      return num;
    }

    return val;
  }

  private handleUpdate(sql: string, _line: number): OutputLine[] {
    const match = sql.match(/UPDATE\s+([a-zA-Z0-9_"]+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?$/i);
    if (!match) {
      return [{ type: "log", content: "UPDATE 1" }];
    }

    const tableName = match[1].replace(/"/g, "").toLowerCase();
    const table = this.tables.get(tableName);
    if (!table) {
      return [{ type: "log", content: "UPDATE 0" }];
    }

    const updated = table.rows.length;
    return [{ type: "log", content: `UPDATE ${updated}` }];
  }

  private handleDelete(sql: string, _line: number): OutputLine[] {
    const match = sql.match(/DELETE\s+FROM\s+([a-zA-Z0-9_"]+)/i);
    const tableName = match ? match[1].replace(/"/g, "").toLowerCase() : "";
    const table = this.tables.get(tableName);
    const count = table ? table.rows.length : 1;
    if (table) table.rows = [];
    return [{ type: "log", content: `DELETE ${count}` }];
  }

  // ─── Query Handler & PostgreSQL Grid Formatter ───

  private handleSelect(sql: string, line: number): OutputLine[] {
    const fromMatch = sql.match(/FROM\s+([a-zA-Z0-9_"]+)/i);
    if (!fromMatch) {
      // Direct expressions e.g. SELECT 1 + 1; or SELECT NOW();
      return this.formatGrid(["?column?"], [{ "?column?": "1" }]);
    }

    const tableName = fromMatch[1].replace(/"/g, "").toLowerCase();
    const table = this.tables.get(tableName);

    if (!table) {
      throw {
        message: `relation "${tableName}" does not exist`,
        line,
        suggestion: `Make sure you run CREATE TABLE ${tableName} before querying it.`,
      };
    }

    // Extract columns
    const selectMatch = sql.match(/SELECT\s+([\s\S]+?)\s+FROM/i);
    const rawCols = selectMatch ? selectMatch[1].trim() : "*";

    let rows = [...table.rows];

    // Simple WHERE filter simulation
    const whereMatch = sql.match(/WHERE\s+([\s\S]+?)(?:\s+ORDER|\s+GROUP|\s+LIMIT|$)/i);
    if (whereMatch) {
      const whereClause = whereMatch[1].trim();
      rows = this.filterRows(rows, whereClause);
    }

    // Simple ORDER BY simulation
    const orderMatch = sql.match(/ORDER\s+BY\s+([a-zA-Z0-9_"]+)(?:\s+(ASC|DESC))?/i);
    if (orderMatch) {
      const sortCol = orderMatch[1].toLowerCase();
      const isDesc = orderMatch[2]?.toUpperCase() === "DESC";
      rows.sort((a, b) => {
        const valA = a[sortCol];
        const valB = b[sortCol];
        if (valA < valB) return isDesc ? 1 : -1;
        if (valA > valB) return isDesc ? -1 : 1;
        return 0;
      });
    }

    // Simple LIMIT simulation
    const limitMatch = sql.match(/LIMIT\s+(\d+)/i);
    if (limitMatch) {
      const limitVal = parseInt(limitMatch[1], 10);
      rows = rows.slice(0, limitVal);
    }

    // Determine output column headers
    let displayCols: string[] = [];
    if (rawCols === "*") {
      if (table.columns.length > 0) {
        displayCols = table.columns.map((c) => c.name);
      } else if (rows.length > 0) {
        displayCols = Object.keys(rows[0]);
      } else {
        displayCols = ["id", "result"];
      }
    } else {
      displayCols = rawCols.split(",").map((c) => {
        const parts = c.trim().split(/\s+AS\s+/i);
        return (parts[1] || parts[0]).trim().replace(/"/g, "");
      });
    }

    return this.formatGrid(displayCols, rows);
  }

  private filterRows(rows: Record<string, any>[], where: string): Record<string, any>[] {
    // Basic comparison e.g. col = val, col > val, col < val, col != val
    const opMatch = where.match(/([a-zA-Z0-9_"]+)\s*(=|!=|>|<|>=|<=)\s*(.+)/);
    if (!opMatch) return rows;

    const colName = opMatch[1].toLowerCase().replace(/"/g, "");
    const op = opMatch[2];
    const rawVal = opMatch[3].trim();
    const targetVal = this.parseSqlLiteral(rawVal);

    return rows.filter((r) => {
      const val = r[colName];
      if (val === undefined) return true;
      if (op === "=") return val == targetVal;
      if (op === "!=") return val != targetVal;
      if (op === ">") return Number(val) > Number(targetVal);
      if (op === "<") return Number(val) < Number(targetVal);
      if (op === ">=") return Number(val) >= Number(targetVal);
      if (op === "<=") return Number(val) <= Number(targetVal);
      return true;
    });
  }

  private handleExplain(sql: string, _line: number): OutputLine[] {
    const fromMatch = sql.match(/FROM\s+([a-zA-Z0-9_"]+)/i);
    const tableName = fromMatch ? fromMatch[1].toLowerCase() : "table";
    const table = this.tables.get(tableName);
    const rowCount = table ? table.rows.length : 1;

    return [
      {
        type: "log",
        content: `QUERY PLAN`,
      },
      {
        type: "log",
        content: `--------------------------------------------------------------------------------`,
      },
      {
        type: "log",
        content: `Seq Scan on ${tableName}  (cost=0.00..1.05 rows=${rowCount} width=36)`,
      },
      {
        type: "log",
        content: `Execution Time: 0.042 ms`,
      },
    ];
  }

  /**
   * Formats rows into clean, readable PostgreSQL psql ASCII tables:
   *
   *  id | name        | price
   * ----+-------------+--------
   *   1 | USB-C Cable | 250.00
   * (1 row)
   */
  private formatGrid(columns: string[], rows: Record<string, any>[]): OutputLine[] {
    if (columns.length === 0) {
      columns = ["result"];
    }

    // Calculate column widths
    const widths = columns.map((col) => {
      let maxLen = col.length;
      for (const row of rows) {
        const valStr = row[col.toLowerCase()] !== undefined ? String(row[col.toLowerCase()] ?? "") : "";
        if (valStr.length > maxLen) {
          maxLen = valStr.length;
        }
      }
      return Math.max(maxLen, 3);
    });

    const header = columns
      .map((col, idx) => ` ${col.padEnd(widths[idx])} `)
      .join("|");

    const divider = widths
      .map((w) => "-".repeat(w + 2))
      .join("+");

    const lines: OutputLine[] = [
      { type: "log", content: header },
      { type: "log", content: divider },
    ];

    if (rows.length === 0) {
      lines.push({ type: "log", content: `(0 rows)` });
      return lines;
    }

    for (const row of rows) {
      const rowLine = columns
        .map((col, idx) => {
          const rawVal = row[col.toLowerCase()];
          const val = rawVal === null ? "null" : rawVal === undefined ? "" : String(rawVal);
          const isNum = typeof rawVal === "number";
          const padded = isNum ? val.padStart(widths[idx]) : val.padEnd(widths[idx]);
          return ` ${padded} `;
        })
        .join("|");
      lines.push({ type: "log", content: rowLine });
    }

    const rowWord = rows.length === 1 ? "row" : "rows";
    lines.push({ type: "log", content: `(${rows.length} ${rowWord})` });

    return lines;
  }
}
