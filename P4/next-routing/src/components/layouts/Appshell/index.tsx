import Navbar from "../navbar";
import Footer from "../footer";

type AppShellProps = {
  children: React.ReactNode;
}

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  return (
    <main>
      <Navbar />
      {children}
      <div>
        <Footer />
      </div>
    </main>
  );
};

export default AppShell;