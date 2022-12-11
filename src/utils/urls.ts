import Avatar from "@/assets/images/avatar.jpg";

export const getAvatar = (link?: string) => {
  return link || Avatar;
};
