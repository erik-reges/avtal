import { GitCommitHorizontal } from "lucide-react";
import { ModeToggle } from "./dark-mode/mode-toggle";
import { Button } from "./ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { signOut, useSession } from "@/lib/auth";
import { sessionStore } from "@/lib/store";

export function Nav() {
  const { data, isPending } = useSession();
  const navigate = useNavigate();

  const { user, session } = sessionStore.getState();

  console.log(session);

  const handleLogout = () => {
    const email = user?.email! ?? undefined;
    signOut({
      fetchOptions: {
        onSuccess: () => {
          sessionStore.setState({ user: null, session: null });
          navigate({
            to: "/signin",
            search: { email },
          });
        },
      },
    });
  };

  return (
    <nav className="flex items-center justify-between  border-primary/30 px-6 pt-1">
      <Link to={data?.session ? "/app" : "/"}>
        <div className=" py-2 flex items-center justify-center gap-3 cursor-pointer">
          <span className="text-lg md:text-lg font-semibold ">
            anställningsavtal
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        {!isPending && data?.session && (
          <div>
            {/* <ModeToggle /> */}
            <Button
              className="text-xs rounded-lg h-8"
              variant="outline"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}

        {!isPending && !data?.session && (
          <>
            <Button
              variant="link"
              className=" hidden md:flex text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link to="/signup">Sign up</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="px-4 border-primary text-foreground/90 hover:bg-none hover:text-foreground"
            >
              <Link to="/signin" search={{ email: undefined }}>
                Sign in
                <span className="ml-1">→</span>
              </Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
