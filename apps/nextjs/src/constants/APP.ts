import { INavItem } from "~/interfaces/navItem";

export const navItems: INavItem[] = [
  { name: "home", href: "/" },
  { name: "skincare", href: "/products/skincare" },
  {
    name: "jewellery",
    href: "/products/jewellery",
    subItems: [
      { name: "all", href: "/products/jewellery" },
      { name: "bracelets", href: "/products/jewellery/bracelets" },
      { name: "necklaces", href: "/products/jewellery/necklaces" },
      { name: "earrings", href: "/products/jewellery/earrings" },
      { name: "rings", href: "/products/jewellery/rings" },
    ],
  },
  { name: "sales", href: "/products/categories/sales" },
  { name: "blog", href: "/blog" },
  // { name: "video_gallery", href: "/videoGallery" },
  { name: "about_us", href: "/aboutUs" },
];
