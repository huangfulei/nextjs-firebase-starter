export interface INavItem {
  name: string;
  href?: string;
  subItems?: INavItem[];
}
