import Footer from "./Footer";
import { getSettingsData } from "@/lib/fetchers";

export default async function SiteFooter() {
  const settings = await getSettingsData();
  const logoUrl = settings?.logoUrl || "";
  const companyName = settings?.companyName || "Rackup IT Solution";
  const footerText = settings?.footerText || "Leading Web and Desktop Development Solutions";

  return (
    <Footer
      logoUrl={logoUrl}
      companyName={companyName}
      footerText={footerText}
    />
  );
}
