
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="space-y-4">
        <div className="relative mb-4 h-40 w-40 mx-auto">
          <div className="absolute inset-0 rounded-full bg-muted/50 flex items-center justify-center text-7xl font-bold text-muted-foreground/50">
            404
          </div>
        </div>
        <h1 className="text-4xl font-bold">Page not found</h1>
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="flex justify-center gap-2 pt-4">
          <Button variant="outline" asChild>
            <Link to="/">Go back</Link>
          </Button>
          <Button asChild>
            <Link to="/">Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
