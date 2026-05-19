import {
  LayoutDashboard,
  Package,
  Boxes,
  FileText,
  Route,
  Users,
  MapPin,
  type LucideIcon,
} from "lucide-react";

export const NAV_ITEMS: {
  key: string;
  href: string;
  icon: LucideIcon;
  section?: "main" | "management";
}[] = [
  { key: "dashboard", href: "#", icon: LayoutDashboard, section: "main" },
  { key: "cargo", href: "/dispatcher/cargo", icon: Package, section: "main" },
  { key: "myCargo", href: "#", icon: Boxes, section: "main" },
  { key: "offers", href: "#", icon: FileText, section: "main" },
  { key: "trips", href: "#", icon: Route, section: "management" },
  { key: "driverManagers", href: "#", icon: Users, section: "management" },
  { key: "gps", href: "#", icon: MapPin, section: "management" },
];

export const SIDEBAR_COLLAPSED_KEY = "sarbon_sidebar_collapsed";
