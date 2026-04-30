"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";

export function Section6ExpressVsNestJS() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">6. Express vs NestJS — With Decorators</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
          <h3 className="font-semibold text-lg mb-4 text-red-600 dark:text-red-400">Express (manual wiring)</h3>
          <EnhancedCodeBlock
            code={`// Every route must be manually registered
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", validateBody, createUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, admin, deleteUser);

app.use("/users", router);
// 👆 Lots of manual wiring`}
            language="typescript"
          />
          <p className="text-xs text-red-600 dark:text-red-400 mt-3 italic">
            ⚠️ Route registration is separate from the handler. You have to trace two files to understand one endpoint.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800">
          <h3 className="font-semibold text-lg mb-4 text-emerald-600 dark:text-emerald-400">NestJS (declarative)</h3>
          <EnhancedCodeBlock
            code={`@Controller('users')
class UsersController {
  @Get()
  findAll() { ... }

  @Get(':id')
  findOne(@Param('id') id: string) { ... }

  @Post()
  create(@Body() dto: CreateUserDto) { ... }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id, @Body() dto) { ... }

  @Delete(':id')
  @UseGuards(AuthGuard, AdminGuard)
  remove(@Param('id') id: string) { ... }
}
// 👆 Self-documenting, declarative`}
            language="typescript"
          />
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-3 italic">
            ✅ Everything is in one place. The decorator <em>IS</em> the documentation. You can read the route, method, guards, and parameters at a glance.
          </p>
        </div>
      </div>
    </section>
  );
}
