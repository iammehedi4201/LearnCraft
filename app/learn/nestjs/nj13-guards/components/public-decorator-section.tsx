"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 7 — THE @PUBLIC() ROUTE BYPASS PATTERN
// ═══════════════════════════════════════════════════════════

export function PublicDecoratorSection() {
  return (
    <SectionContainer number={7} title="The @Public() Route Bypass Pattern">
      {/* ── 7.1 Secure by Default Architecture ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Secure-by-Default Architecture"
          description="Protect every endpoint globally, then explicitly open public endpoints like login and register."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔒</span> Why Global Guard + @Public() Is Best Practice
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            If you have to remember to add <code>@UseGuards(AuthGuard)</code> to every new controller, a developer will eventually forget one, creating a critical security hole.
          </p>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed mb-3">
            Instead, apply <strong>JwtAuthGuard globally</strong>, and create a <code>@Public()</code> decorator to selectively bypass authentication for open routes:
          </p>
          <EnhancedCodeBlock
            code={`// public.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// jwt-auth.guard.ts
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // ⭐ If the route is decorated with @Public(), bypass token check:
    if (isPublic) {
      return true;
    }

    // Otherwise, perform standard token verification...
    const request = context.switchToHttp().getRequest();
    return Boolean(request.headers['authorization']);
  }
}

// auth.controller.ts
@Controller('auth')
export class AuthController {
  @Public() // Accessible to everyone without a token!
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="Industry Standard: Protect the entire app by default with a Global Guard, then mark public routes with @Public()." />

        <QuickCheck
          question="Why is 'Secure by Default' (Global Guard + @Public) safer than manually adding @UseGuards to individual controllers?"
          answer="Because if a developer creates a new controller and forgets to add a guard, it is still securely protected by default rather than exposed publicly."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
