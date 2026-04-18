
export function SectionExpressComparison() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">5. Express.js vs NestJS — Types in Action</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
          <h3 className="font-semibold text-lg mb-4 text-red-600 dark:text-red-400">❌ Express.js (no types)</h3>
          <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
            {`// No type safety — bugs hide until runtime
app.post('/users', (req, res) => {
  const name = req.body.name;  
  // is name a string? a number? 
  // undefined? We don't know!
  
  const user = createUser(name);
  res.json(user);
});`}
          </pre>
          <p className="text-xs text-red-600 dark:text-red-400 mt-3 italic">
            ⚠️ The &quot;name&quot; could be anything. You won&apos;t find out it&apos;s wrong until a real user hits this endpoint and the app crashes.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
          <h3 className="font-semibold text-lg mb-4 text-emerald-600 dark:text-emerald-400">✅ NestJS (full type safety)</h3>
          <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
            {`// Types enforce correctness at compile time
@Post()
create(@Body() dto: CreateUserDto): User {
  // dto is guaranteed to match
  // CreateUserDto shape
  // Validated before this runs!
  
  return this.userService.create(dto);
}`}
          </pre>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-3 italic">
            ✅ The DTO guarantees the shape. If the request body is wrong, NestJS rejects it automatically — before your code even runs.
          </p>
        </div>
      </div>
    </section>
  );
}
