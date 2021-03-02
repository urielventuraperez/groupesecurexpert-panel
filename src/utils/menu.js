import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

export const publicItems = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Customers'
  },
  {
    href: '/app/companies',
    icon: ShoppingBagIcon,
    title: 'Companies'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    href: '/app/faq',
    icon: HelpOutlineOutlinedIcon,
    title: 'Faq'
  }
];

export const protectedItems = [
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings',
    role: '0'
  },
  {
    href: '/app/register',
    icon: UserPlusIcon,
    title: 'Register',
    role: '0'
  }
]
