import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  Flame,
  Building,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Menu({ user_type, user_id }) {
  // init router
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 px-2">
          <span className="[&>svg]:w-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-7 w-7"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* profile section */}
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>

          {user_type == "agent" ||
            (user_type == "seller" && (
              <Link href="/billing">
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                  <DropdownMenuShortcut></DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        {/* properies section */}

        {user_type == "seller" && (
          <DropdownMenuGroup>
            <Link href={`/property/${user_id}`}>
              <DropdownMenuItem>
                <Building className="mr-2 h-4 w-4" />
                <span>My properties</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/new-property">
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>New property</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        )}

        <DropdownMenuSeparator />

        {/* auctions section */}

        <Link href="/auction">
          <DropdownMenuItem>
            <Flame className="mr-2 h-4 w-4" />
            <span>Auctions</span>
          </DropdownMenuItem>
        </Link>

        <Link href="/property">
          <DropdownMenuItem>
            <Tag className="mr-2 h-4 w-4" />
            <span>For sale</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* log out  */}
        <DropdownMenuItem
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
