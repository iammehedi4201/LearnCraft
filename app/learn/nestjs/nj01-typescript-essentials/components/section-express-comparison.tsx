import { EnhancedCodeBlock, ExplainerSection } from "@/components/enhanced-code-display";

export function SectionExpressComparison() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">5. Express.js vs NestJS — Types in Action</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 flex flex-col">
          <h3 className="font-semibold text-lg mb-4 text-red-600 dark:text-red-400">❌ Express.js (no types)</h3>
          <div className="flex-grow">
            <EnhancedCodeBlock 
              code={`app.post('/users', (req, res) => {
  const name = req.body.name;  
  const user = createUser(name);
  res.json(user);
});`}
            />
          </div>
          <ExplainerSection title="The Problem" variant="danger">
            The <code>name</code> could be anything—a string, a number, undefined, or null. You won't find out it's wrong until a real user hits the endpoint and the app crashes.
          </ExplainerSection>
        </div>

        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 flex flex-col">
          <h3 className="font-semibold text-lg mb-4 text-emerald-600 dark:text-emerald-400">✅ NestJS (full type safety)</h3>
          <div className="flex-grow">
            <EnhancedCodeBlock 
              code={`@Post()
create(@Body() dto: CreateUserDto): User {
  return this.userService.create(dto);
}`}
            />
          </div>
          <ExplainerSection title="The Solution" variant="success">
            The DTO guarantees the shape before your code runs. If the request body is wrong, NestJS automatically rejects it — validation happens at the framework level, not in your code.
          </ExplainerSection>
        </div>
      </div>
    </section>
  );
}
