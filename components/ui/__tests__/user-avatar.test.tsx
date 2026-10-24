import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { UserAvatar } from "../user-avatar";

describe("UserAvatar Component", () => {
  it("renders an img element with referrerPolicy='no-referrer' when src is provided", () => {
    const markup = renderToStaticMarkup(
      <UserAvatar
        src="https://lh3.googleusercontent.com/a/test-avatar"
        name="Mehedi Hasan"
        size="sm"
      />
    );

    expect(markup).toContain("<img");
    expect(markup).toContain('src="https://lh3.googleusercontent.com/a/test-avatar"');
    expect(markup).toContain('referrerPolicy="no-referrer"');
    expect(markup).toContain('crossorigin="anonymous"');
    expect(markup).toContain('alt="Mehedi Hasan"');
  });

  it("renders an initials fallback badge when src is undefined or null", () => {
    const markup = renderToStaticMarkup(
      <UserAvatar
        src={null}
        name="Mehedi"
        size="sm"
      />
    );

    expect(markup).not.toContain("<img");
    expect(markup).toContain("M");
    expect(markup).toContain("bg-gradient-to-tr");
  });

  it("extracts two initials on larger sizes (md, lg) when full name is provided", () => {
    const markup = renderToStaticMarkup(
      <UserAvatar
        src={null}
        name="Mehedi Hasan"
        size="lg"
      />
    );

    expect(markup).toContain("MH");
  });

  it("falls back to 'U' when name is not provided", () => {
    const markup = renderToStaticMarkup(
      <UserAvatar
        src={null}
        name=""
        size="sm"
      />
    );

    expect(markup).toContain("U");
  });
});
