"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER MIDDLEWARE MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Middleware Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Pitfalls with NestJS Middleware"
          description="Avoid these common bugs when working with raw request pipelines."
          color="primary"
        />

        <MistakeBox
          title="Forgetting to Call next() in Middleware"
          description="If you do not call next() and do not send a response, the request hangs until the client times out."
          wrong={`use(req: Request, res: Response, next: NextFunction) {
  console.log('Logging request...');
  // ❌ Forgot next()! Request hangs forever!
}`}
          right={`use(req: Request, res: Response, next: NextFunction) {
  console.log('Logging request...');
  next(); // ✅ Proceeds to next step
}`}
        />

        <MistakeBox
          title="Adding Middleware to providers: [] without configure()"
          description="Middleware classes cannot simply be added to providers: []. They must be registered via the configure(consumer) method in NestModule."
          wrong={`// ❌ Wrong: Adding middleware to providers array:
@Module({
  providers: [RequestLoggerMiddleware],
})
export class AppModule {}`}
          right={`// ✅ Correct: Implement NestModule and use configure(consumer):
@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}`}
        />

        <MistakeBox
          title="Calling next() and res.send() Simultaneously"
          description="Calling next() after already sending a response with res.send() causes 'Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent'."
          wrong={`if (blocked) {
  res.status(403).send('Blocked');
}
next(); // ❌ Wrong! Called next() after sending response!`}
          right={`if (blocked) {
  return res.status(403).send('Blocked'); // ✅ Early return
}
next();`}
        />

        <QuickCheck
          question="What happens if a middleware sends a response via res.send() AND also calls next()?"
          answer="Node.js throws an 'ERR_HTTP_HEADERS_SENT' error because downstream handlers attempt to send headers on an already-finished HTTP response."
        />
      </div>
    </SectionContainer>
  );
}
