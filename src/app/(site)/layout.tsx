import { GlobalLayout } from "@/components/layout";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <GlobalLayout>{children}</GlobalLayout>;
}

