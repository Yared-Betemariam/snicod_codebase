import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { SiApple, SiWindows } from "react-icons/si";

const DownloadButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="my-2 outline-none">
        <Button className="h-10 text-base hover:opacity-80 gap-3 duration-300 transition-all button-gradient-bg w-58 px-4">
          <span>Download Snicod</span> <Download className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-58 rounded p-0 py-2 bg-zinc-900 border-zinc-300/25 text-zinc-100">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <SiWindows className="mr-3 size-4" />
            <span>Download for Windows (exe)</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SiApple className="mr-2 size-5" />
            <span>Download for Macos (dmg)</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DownloadButton;
