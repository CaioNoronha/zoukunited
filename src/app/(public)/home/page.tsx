import About from "./sections/about";
import Intro from "./sections/intro";

export default function Home() {
  return (
    <div className="relative w-full overflow-x-hidden">
      <Intro />
      <About />
    </div>
  );
}