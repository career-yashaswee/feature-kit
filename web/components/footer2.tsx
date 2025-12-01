import { Logo, LogoImage, LogoText } from "@/components/shadcnblocks/logo";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  logo = {
    src: "",
    alt: "Feature Kit",
    title: "Feature Kit",
    url: "/",
  },
  tagline = "Discover and copy niche components for your web projects.",
  menuItems = [
    {
      title: "Product",
      links: [
        { text: "Kits", url: "/kits" },
        { text: "Features", url: "/features" },
        { text: "Documentation", url: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "GitHub", url: "https://github.com" },
        { text: "Twitter", url: "https://twitter.com" },
        { text: "Support", url: "#" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} Feature Kit. All rights reserved.`,
  bottomLinks = [
    { text: "Terms", url: "#" },
    { text: "Privacy", url: "#" },
  ],
}: Footer2Props) => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Logo url={logo.url}>
                  {logo.src ? (
                    <LogoImage
                      src={logo.src}
                      alt={logo.alt}
                      title={logo.title}
                      className="h-10 dark:invert"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground text-sm font-bold">
                        FK
                      </span>
                    </div>
                  )}
                  <LogoText className="text-xl">{logo.title}</LogoText>
                </Logo>
              </div>
              <p className="mt-4 text-muted-foreground">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-muted-foreground mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-primary underline">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
