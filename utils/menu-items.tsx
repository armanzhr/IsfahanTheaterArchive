import {
  HomeIcon,
  Image as PhotoIcon,
  MapPin,
  Settings,
  Theater,
  UsersIcon,
} from "lucide-react";

export const menuItems = () => {
  return [
    {
      name: "پیشخوان",
      pathname: "/dashboard",
      icon: <HomeIcon className="h-3 w-3" />,
    },
    {
      name: "عوامل و نقش ها",
      pathname: "/dashboard/people",
      icon: <UsersIcon className="h-3 w-3" />,
    },
    {
      name: "نمایش ها",
      pathname: "/dashboard/shows",
      icon: <Theater className="h-3 w-3" />,
    },
    {
      name: "محل های اجرا",
      pathname: "/dashboard/venues",
      icon: <MapPin className="h-3 w-3" />,
    },
    {
      name: "رسانه",
      pathname: "/dashboard/medias",
      icon: <PhotoIcon className="h-3 w-3" />,
    },
    {
      name: "تنظیمات",
      pathname: "/dashboard/settings",
      icon: <Settings className="h-3 w-3" />,
    },
  ];
};
