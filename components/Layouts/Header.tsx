import Link from "next/link";
import ThemeToggle from "../Theme/ThemeToggle";
import { Button } from "../ui/button";
import useTempMode from "@/hooks/useTempMode";
import { toggleTempMode } from "@/redux/slices/ui-slice";
import { useAppDispatch } from "@/redux/hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Container from "../Theme/Container";

const Header = () => {
  const { isMetric, tempSign } = useTempMode();
  const dispatch = useAppDispatch();

  return (
    <header className="p-4 border-b">
      <Container className="flex justify-between items-center">
        <h1 className="hidden font-bold sm:inline-block">
          <Link href="/">WeatherApp</Link>
        </h1>
        <nav>
          <ul className="flex gap-4 text-foreground">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => dispatch(toggleTempMode())}
                >
                  {tempSign}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Switch to {!isMetric ? "Celsius" : "Fahrenheit"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
};

export default Header;
