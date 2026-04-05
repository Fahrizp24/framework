import { render } from "@testing-library/react";
import AppShell from "@/components/layouts/Appshell";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: () => ({ data: null }),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe("AppShell Component", () => {
  it("renders Navbar when pathname is not disabled", () => {
    (useRouter as jest.Mock).mockReturnValue({ pathname: "/home" });
    const { container } = render(
      <AppShell>
        <div>Content</div>
      </AppShell>
    );
    expect(container).toMatchSnapshot();
  });

  it("does not render Navbar when pathname is disabled (e.g. /404)", () => {
    (useRouter as jest.Mock).mockReturnValue({ pathname: "/404" });
    const { container } = render(
      <AppShell>
        <div>Content</div>
      </AppShell>
    );
    expect(container).toMatchSnapshot();
  });
});
