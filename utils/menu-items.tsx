import {
  HomeIcon,
  Image as PhotoIcon,
  MapPin,
  Settings,
  Theater,
  UsersIcon,
  UserCog,
  Replace,
  TheaterIcon,
  UsersRound,
  Calendar,
  BookOpenText,
  InfoIcon,
  HeadsetIcon,
} from "lucide-react";

export const dashboardMenuItems = () => {
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
  ];
};
export const clientMenuItems = () => {
  return [
    {
      name: "صفحه اصلی",
      pathname: "/",
      icon: <HomeIcon className="h-3 w-3" />,
    },
    {
      name: "نمایش ها",
      pathname: "/shows",
      icon: <TheaterIcon className="h-3 w-3" />,
    },
    {
      name: "خانواده تئاتر اصفهان",
      pathname: "/family",
      icon: <UsersRound className="h-3 w-3" />,
    },
    {
      name: "تالار یاد ایام",
      pathname: "/memories",
      icon: <Calendar className="h-3 w-3" />,
    },
    {
      name: "مقالات",
      pathname: "/article",
      icon: <BookOpenText className="h-3 w-3" />,
    },
    {
      name: "درباره ما",
      pathname: "/about-us",
      icon: <InfoIcon className="h-3 w-3" />,
    },
    {
      name: "تماس با ما",
      pathname: "/contact-us",
      icon: <HeadsetIcon className="h-3 w-3" />,
    },
  ];
};
export const manageItems = () => {
  return [
    {
      name: "مدیریت تغییرات",
      pathname: "/dashboard/admin/changes",
      icon: <Replace className="h-3 w-3" />,
      row: "second",
    },
  ];
};
