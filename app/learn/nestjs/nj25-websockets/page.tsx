/**
 * NJ-25 — WebSockets (Real-time)
 */
"use client";
import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NJ25WebSockets(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="group relative glass-card rounded-3xl p-8 mb-12 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex h-12 w-16 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/20"><span className="font-display font-bold text-sm tracking-wider whitespace-nowrap">NJ-25</span></div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">WebSockets (Real-time)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">NestJS Concept</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">NestJS provides Gateways to handle real-time events using Socket.io or WS. Gateways are just classes decorated with @WebSocketGateway(), allowing you to use all other NestJS features (DI, Guards, Pipes).</p></div>
              <div className="space-y-3"><div className="flex items-center gap-2 mb-2"><div className="h-5 w-5 rounded-full bg-blue-500/10 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-blue-600" /></div><h4 className="font-display text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Express.js Comparison</h4></div><p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">In Express, you manually wrap the server with Socket.io. In NestJS, real-time events are integrated into the architecture like normal controllers.</p></div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500" />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Basic Gateway</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`npm install @nestjs/websockets @nestjs/platform-socket.io

// chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },  // Configure CORS for connections
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;  // Reference to the Socket.io server instance

  // ✅ Listening for events
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(\`Message from \${client.id}: \${data}\`);
    
    // ✅ Emitting events (Broadcasting)
    this.server.emit('onMessage', {
      source: client.id,
      content: data,
    });
  }

  // ✅ Connection hooks
  handleConnection(client: Socket) {
    console.log(\`Client connected: \${client.id}\`);
  }

  handleDisconnect(client: Socket) {
    console.log(\`Client disconnected: \${client.id}\`);
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Rooms & P2P</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`@SubscribeMessage('join_room')
handleJoinRoom(
  @MessageBody() roomName: string,
  @ConnectedSocket() client: Socket,
) {
  client.join(roomName);  // Add client to a room
  return { status: 'OK', room: roomName };
}

@SubscribeMessage('room_msg')
handleRoomMessage(
  @MessageBody() data: { room: string; message: string },
) {
  // ✅ Emit to a specific room only
  this.server.to(data.room).emit('broadcast', data.message);
}`}
            </pre>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Elite Integration (DI, Guards, Pipes)</h2>
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
              {`@WebSocketGateway()
export class SecureGateway {
  constructor(private usersService: UsersService) {}

  @UseGuards(WsAuthGuard)  // ✅ Use standard NestJS Guards!
  @UsePipes(new ValidationPipe()) // ✅ Use standard NestJS Pipes!
  @SubscribeMessage('secure_event')
  async handleSecureEvent(@MessageBody() dto: SecureDto) {
    const user = await this.usersService.findById(dto.userId);
    return { success: true, user: user.name };
  }
}

// 🔑 Note: Use context.switchToWs() in Guards/Interceptors
// const client = context.switchToWs().getClient<Socket>();
// const data = context.switchToWs().getData();`}
            </pre>
          </div>
        </section>

        <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
          <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
            <li>Create a simple <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">NotificationGateway</code> that emits an event whenever a new user joins</li>
            <li>Implement a room-based chat where users can join specific channels</li>
            <li>Add <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">WsAuthGuard</code> that verifies a JWT provided in the connection's query parameters</li>
            <li>Use <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">ack</code> callbacks from the client to confirm message delivery</li>
          </ul>
        </section>

        <section className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-lg">
          <h3 className="font-semibold text-lg mb-3 text-emerald-900 dark:text-emerald-400">📝 Next Step</h3>
          <p className="text-emerald-900 dark:text-emerald-300">Move to <Link href="/learn/nestjs/nj26-scheduling" className="font-bold underline hover:text-emerald-600">NJ-26 — Task Scheduling (Cron)</Link> to automate background operations.</p>
        </section>
      </div>
    </>
  );
}

