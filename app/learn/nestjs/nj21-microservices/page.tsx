/**
 * NJ-21 — Microservices Basics
 */
"use client";
import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ21Microservices(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"><span className="font-display font-bold text-sm tracking-wider whitespace-nowrap">NJ-21</span></div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Microservices Basics</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-emerald-600" /></div><h4 className="font-display text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">NestJS Concept</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">NestJS has first-class microservices support with built-in transport layers: TCP, Redis, RabbitMQ, Kafka, gRPC, NATS, and MQTT.</p></div>
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Express has no microservices support. You'd need to manually set up message brokers and serialization. NestJS abstracts all of this.</p></div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Monolith vs Microservices</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// 🏢 MONOLITH — Single application handles everything
// app.module.ts
@Module({
  imports: [
    UsersModule,     // All in one process
    OrdersModule,    // All share same DB
    PaymentsModule,  // All deploy together
    NotificationsModule,
  ],
})
export class AppModule {}

// ✅ Good for: Small-medium apps, MVPs, small teams
// ❌ Bad for: Very large scale, independent deployments

// 🏗️ MICROSERVICES — Each service is independent
// users-service/       → Manages user data
// orders-service/      → Manages orders
// payments-service/    → Handles payments
// notifications-service/ → Sends emails/SMS
//
// Each has its own:
// - Codebase
// - Database
// - Deployment
// - Scaling
//
// They communicate via messages (TCP, Redis, RabbitMQ, Kafka)`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. TCP Microservice</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`npm install @nestjs/microservices

// ✅ MICROSERVICE (the "server" that listens for messages)
// users-service/main.ts
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.TCP,
      options: { host: '0.0.0.0', port: 3001 },
    },
  );
  await app.listen();
  console.log('Users microservice running on port 3001');
}
bootstrap();

// users.controller.ts — Uses @MessagePattern instead of @Get
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersController {
  @MessagePattern({ cmd: 'get_users' })
  getUsers() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'get_user' })
  getUser(@Payload() data: { id: number }) {
    return this.usersService.findOne(data.id);
  }

  @MessagePattern({ cmd: 'create_user' })
  createUser(@Payload() data: CreateUserDto) {
    return this.usersService.create(data);
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. API Gateway (Client)</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ API GATEWAY — the HTTP-facing app that talks to microservices
// gateway/app.module.ts
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3001 },
      },
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 3002 },
      },
    ]),
  ],
  controllers: [GatewayController],
})
export class AppModule {}

// gateway.controller.ts
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class GatewayController {
  constructor(
    @Inject('USERS_SERVICE') private usersClient: ClientProxy,
  ) {}

  @Get()
  getUsers() {
    // Send message to users microservice
    return this.usersClient.send({ cmd: 'get_users' }, {});
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersClient.send({ cmd: 'get_user' }, { id: +id });
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersClient.send({ cmd: 'create_user' }, dto);
  }
}

// Flow: Browser → API Gateway (HTTP) → Users Service (TCP) → Response`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">4. Event-Based Communication</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`// ✅ Events are fire-and-forget (no response expected)

// Emitting an event from the gateway:
@Post()
async createOrder(@Body() dto: CreateOrderDto) {
  const order = await this.ordersClient.send({ cmd: 'create_order' }, dto).toPromise();
  
  // Fire event — notification service will pick it up
  this.notificationsClient.emit('order_created', {
    orderId: order.id,
    userEmail: dto.email,
  });
  
  return order;
}

// Listening for events in notification service:
@Controller()
export class NotificationsController {
  @EventPattern('order_created')
  async handleOrderCreated(@Payload() data: { orderId: number; userEmail: string }) {
    await this.emailService.send(
      data.userEmail,
      'Order Confirmed',
      \`Your order #\${data.orderId} has been placed!\`
    );
  }
}

// 🔑 Key Difference:
// @MessagePattern → request/response (like HTTP)
// @EventPattern   → fire-and-forget (like webhooks)`}
            </pre>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Create a TCP-based Users microservice and an API Gateway</li>
            <li>Send messages from the gateway to the microservice and back</li>
            <li>Add an event-based notification when a user is created</li>
            <li>Bonus: Try swapping TCP for Redis as the transport layer</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">Move to <Link href="/learn/nestjs/nj22-deployment" className="font-bold underline hover:text-emerald-600">NJ-22 — Production Deployment</Link> — the final lesson. Deploy your NestJS app to production!</p>
        </section>
      </div>
    </>
  );
}

