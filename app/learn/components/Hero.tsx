"use client";

import { useState, useEffect, useRef } from 'react';

const snippets = [
  {
    id: 'javascript',
    label: 'JavaScript',
    color: 'text-amber-400',
    code: `// Async Pipeline & Closures
const withRetry = (fn, retries = 3) => async (...args) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn(...args);
    } catch (err) {
      if (attempt === retries) throw err;
    }
  }
};`
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    color: 'text-blue-400',
    code: `type Result<T, E = Error> = 
  | { success: true; data: T } 
  | { success: false; error: E };

async function execute<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    return { success: true, data: await fn() };
  } catch (err) {
    return { success: false, error: err as E };
  }
}`
  },
  {
    id: 'oop',
    label: 'OOP & SOLID',
    color: 'text-purple-400',
    code: `interface MessageBroker {
  publish(topic: string, event: object): Promise<void>;
}

class OrderDispatcher {
  constructor(private readonly broker: MessageBroker) {}

  async onOrderCreated(orderId: string): Promise<void> {
    await this.broker.publish('order.created', { orderId });
  }
}`
  },
  {
    id: 'react',
    label: 'React 19',
    color: 'text-cyan-400',
    code: `export function LiveMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    const unsub = telemetry.subscribe(setMetrics);
    return () => unsub();
  }, []);

  return <MetricGrid items={metrics} />;
}`
  },
  {
    id: 'nextjs',
    label: 'Next.js 15',
    color: 'text-slate-100',
    code: `export default async function Page() {
  const stats = await getMetrics();
  
  return (
    <Dashboard data={stats} />
  );
}`
  },
  {
    id: 'redux',
    label: 'Redux',
    color: 'text-purple-400',
    code: `export const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: {}, totalCount: 0 },
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const id = action.payload.id;
      state.items[id] = (state.items[id] || 0) + 1;
      state.totalCount += 1;
    }
  }
});`
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    color: 'text-emerald-400',
    code: `import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
});

server.listen(3000);`
  },
  {
    id: 'express',
    label: 'Express.js',
    color: 'text-amber-300',
    code: `const app = express();
app.use(express.json());

app.post('/api/checkout', authGuard, async (req, res) => {
  const result = await paymentService.charge(req.body);
  res.status(200).json({ success: true, txn: result.id });
});

app.listen(8080);`
  },
  {
    id: 'nestjs',
    label: 'NestJS',
    color: 'text-rose-400',
    code: `@Controller('metrics')
export class MetricsController {
  constructor(private readonly service: MetricsService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.service.getSystemHealth();
  }
}`
  },
  {
    id: 'postgresql',
    label: 'PostgreSQL',
    color: 'text-blue-300',
    code: `BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;

SELECT stock FROM inventory WHERE product_id = 101 FOR UPDATE;

UPDATE inventory SET stock = stock - 1 WHERE product_id = 101;
INSERT INTO audit_log (event, ref_id) VALUES ('CHECKOUT', 101);

COMMIT;`
  },
  {
    id: 'mongodb',
    label: 'MongoDB',
    color: 'text-emerald-400',
    code: `const topSpenders = await db.collection('orders').aggregate([
  { $match: { status: 'COMPLETED' } },
  { $group: { _id: '$userId', total: { $sum: '$amount' } } },
  { $sort: { total: -1 } },
  { $limit: 5 }
]).toArray();`
  },
  {
    id: 'prisma',
    label: 'Prisma',
    color: 'text-cyan-300',
    code: `const order = await prisma.$transaction(async (tx) => {
  await tx.inventory.update({
    where: { productId: 101 },
    data: { stock: { decrement: 1 } }
  });
  return tx.order.create({ data: { userId, total } });
});`
  },
  {
    id: 'system-design',
    label: 'System Design',
    color: 'text-purple-300',
    code: `// Rate Limiter: Sliding Window Counter
async function isAllowed(ip: string, limit = 100): Promise<boolean> {
  const now = Date.now();
  const windowKey = \`rate:\${ip}:\${Math.floor(now / 60000)}\`;
  const count = await redis.incr(windowKey);
  if (count === 1) await redis.expire(windowKey, 60);
  return count <= limit;
}`
  }
];

export function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % snippets.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (tabsRef.current) {
      const activeBtn = tabsRef.current.children[activeTab] as HTMLElement | undefined;
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeTab]);

  const activeSnippet = snippets[activeTab];
  const codeLines = activeSnippet.code.split('\n');

  return (
    <section className="relative pt-20 pb-20 lg:pt-36 lg:pb-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ds-info-lighter border border-ds-info-light mb-8 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ds-info-base opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ds-info-base"></span>
              </span>
              <span className="text-xs font-bold tracking-wider text-ds-info-dark uppercase">Studio Grade Learning</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-ds-text-strong mb-8 leading-[0.9] text-balance">
              Master the <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-ds-feature-base to-ds-info-base">Modern Web</span>
            </h1>

            <p className="text-lg lg:text-xl text-ds-text-sub mb-12 max-w-lg leading-relaxed text-balance">
              Skip the surface-level tutorials. Learn the architectural patterns and
              production-ready practices used by elite engineering teams at scale.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button className="w-full sm:w-auto px-8 py-4 bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white font-semibold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-ds-feature-base/10">
                Start Learning Now
              </button>
              <button className="flex items-center gap-2 text-ds-text-sub font-semibold hover:text-ds-text-strong transition-colors group">
                View Curriculum
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side: Interactive Code Window */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-ds-feature-base to-ds-info-base rounded-[2rem] blur opacity-10 dark:opacity-20 transition duration-1000"></div>
            <div className="relative rounded-[1rem] bg-ds-bg-white border border-ds-stroke-soft overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-ds-stroke-soft bg-ds-bg-weak gap-3">
                <div className="flex gap-2 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-ds-error-base/80" />
                  <div className="w-3 h-3 rounded-full bg-ds-warning-base/80" />
                  <div className="w-3 h-3 rounded-full bg-ds-success-base/80" />
                </div>
                <div 
                  ref={tabsRef}
                  className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5 max-w-[calc(100%-80px)] select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  {snippets.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveTab(i)}
                      className={`text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap px-2.5 py-1 rounded-md shrink-0 cursor-pointer ${
                        activeTab === i 
                          ? `${s.color} font-black bg-white/[0.08] shadow-sm` 
                          : 'text-ds-text-disabled hover:text-ds-text-sub hover:bg-white/[0.03]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Content */}
              <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto min-h-[250px] selection:bg-ds-feature-light/20">
                <div className="flex gap-6">
                  <div className="text-ds-text-disabled text-right select-none font-mono">
                    {codeLines.map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <pre className="text-ds-text-strong font-mono">
                    <code>
                      {codeLines.map((line, i) => (
                        <div key={i} className="whitespace-pre">
                          {line.split(/([{}()@[\],.;'"`]|--|\/\/)/).map((part, j) => {
                            if (['{', '}', '(', ')', '[', ']', '@', ';', ','].includes(part)) return <span key={j} className="text-ds-feature-base">{part}</span>;
                            if (part.match(/['"`].*['"`]/)) return <span key={j} className="text-ds-success-dark">{part}</span>;
                            if (part.startsWith('//') || part.startsWith('--')) return <span key={j} className="text-slate-500 italic">{part}</span>;
                            if (part.match(/useQuery|export|async|function|class|@Controller|@Get|@UseGuards|const|let|return|import|from|type|interface|private|readonly|await|try|catch|SELECT|UPDATE|INSERT|COMMIT|BEGIN|WHERE|FROM|FOR|SET|INTO|VALUES/)) return <span key={j} className="text-ds-info-base font-semibold">{part}</span>;
                            return <span key={j}>{part}</span>;
                          })}
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Window Footer */}
              <div className="px-6 py-3 bg-ds-bg-weak border-t border-ds-stroke-soft flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${activeSnippet.color.replace('text-', 'bg-')} animate-pulse`} />
                  <span className="text-[10px] text-ds-text-soft font-bold uppercase tracking-widest">{activeSnippet.label} Architecture</span>
                </div>
                <div className="text-[10px] text-ds-text-disabled font-mono font-bold">UTF-8</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
