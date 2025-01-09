import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function LoginToggle() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="ghost flex w-auto p-3 items-center gap-2"
        >
          <span className="font-medium">Login</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate("/auth/login")}>
          Member Login
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/auth/signup")}>
          Join BPP
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/auth/login")}>
          Business Community Login
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/auth/business-signup")}>
          Business Community Join
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}