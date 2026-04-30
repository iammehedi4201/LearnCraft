"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { InfoBox } from "./InfoBox";
import { SectionWrapper } from "./SectionWrapper";
import { QuickCheck } from "./QuickCheck";

export function Section4ParameterDecorators() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">4. Parameter Decorators</h2>
      <SectionWrapper>
        <InfoBox variant="info" title="What is a Parameter Decorator?">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            A parameter decorator marks a <strong>specific parameter</strong> of a method. It tells the framework: &quot;Fill this parameter with a specific piece of data from the incoming request.&quot; This is how NestJS <em>automatically</em> extracts <code className="text-sky-600">req.body</code>, <code className="text-sky-600">req.params</code>, and <code className="text-sky-600">req.query</code> for you.
          </p>
        </InfoBox>

        {/* Express vs NestJS parameter handling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 mt-6">
          <div className="p-4 bg-red-500/5 rounded-xl border border-red-100 dark:border-red-900/30">
            <h5 className="text-xs font-bold text-red-600 uppercase mb-2">Express — Manual Extraction</h5>
            <EnhancedCodeBlock
              code={`app.post('/users', (req, res) => {
  const body = req.body;       // manual
  const id = req.params.id;    // manual
  const page = req.query.page; // manual
});`}
              language="typescript"
            />
          </div>
          <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
            <h5 className="text-xs font-bold text-emerald-600 uppercase mb-2">NestJS — Auto via Decorators</h5>
            <EnhancedCodeBlock
              code={`@Post()
create(
  @Body() dto: CreateUserDto,   // auto!
  @Param('id') id: string,      // auto!
  @Query('page') page: number,  // auto!
) { }`}
              language="typescript"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
              How a Parameter Decorator Works Under the Hood
            </h4>
            <EnhancedCodeBlock
              code={`// A parameter decorator receives 3 arguments:
function Body(target: any, propertyKey: string, parameterIndex: number) {
  // target         = class prototype
  // propertyKey    = method name (e.g., "createUser")
  // parameterIndex = which parameter (0, 1, 2...)
  
  console.log(\`@Body applied to parameter \${parameterIndex} of \${propertyKey}\`);
  // Output: "@Body applied to parameter 0 of createUser"
}

class UsersController {
  createUser(@Body dto: any) {
    // NestJS reads the @Body metadata and automatically
    // extracts req.body and passes it as the 'dto' argument
  }
}`}
              language="typescript"
            />
          </div>

          {/* Full NestJS param decorator reference */}
          <InfoBox variant="info" title="NestJS Parameter Decorator Cheat Sheet">
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-3"><code className="text-blue-600 font-bold w-32 shrink-0">@Body()</code><span>→ <code>req.body</code> — the full request body</span></div>
              <div className="flex items-center gap-3"><code className="text-blue-600 font-bold w-32 shrink-0">@Body(&apos;name&apos;)</code><span>→ <code>req.body.name</code> — a specific field from the body</span></div>
              <div className="flex items-center gap-3"><code className="text-blue-600 font-bold w-32 shrink-0">@Param(&apos;id&apos;)</code><span>→ <code>req.params.id</code> — URL parameter like <code>/users/:id</code></span></div>
              <div className="flex items-center gap-3"><code className="text-blue-600 font-bold w-32 shrink-0">@Query(&apos;page&apos;)</code><span>→ <code>req.query.page</code> — query string like <code>?page=2</code></span></div>
              <div className="flex items-center gap-3"><code className="text-blue-600 font-bold w-32 shrink-0">@Headers(&apos;auth&apos;)</code><span>→ <code>req.headers.auth</code> — specific request header</span></div>
              <div className="flex items-center gap-3"><code className="text-blue-600 font-bold w-32 shrink-0">@Req()</code><span>→ the raw Express <code>Request</code> object (escape hatch)</span></div>
              <div className="flex items-center gap-3"><code className="text-blue-600 font-bold w-32 shrink-0">@Res()</code><span>→ the raw Express <code>Response</code> object (escape hatch)</span></div>
            </div>
          </InfoBox>
        </div>

        <QuickCheck
          question={`In NestJS, how do you extract the 'id' from a URL like GET /users/42?`}
          answer={`Use the @Param('id') decorator on the method parameter: findOne(@Param('id') id: string). NestJS reads the metadata and automatically extracts req.params.id and passes "42" as the id argument. You never touch req.params yourself.`}
        />
      </SectionWrapper>
    </section>
  );
}
