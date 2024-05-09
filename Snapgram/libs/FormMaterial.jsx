import * as yup from "yup";

const initialValuesSignup = {
  username: "",
  lastname: "",
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const initialValuesCreate = {
  caption: "",
  location: "",
  tags: "",
};

const validationSchemaSignup = yup.object({
  username: yup.string().required().min(3),
  lastname: yup.string().required().min(5),
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});

const validationSchemaLogin = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});

const validationSchemaCreate = yup.object({
  caption: yup.string().required("Minimum 5 characters.").min(5),
  location: yup.string().required().min(2),
  tags: yup.string().required("Atleast 1 tags is required"),
});

const URL = "http://localhost:3000";

const links = [
  {
    icon: "home-outline",
    activeIcon: "home-sharp",
    name: "home",
    link: "/Deshboard",
  },
  {
    icon: "image-outline",
    activeIcon: "image-sharp",
    name: "explore",
    link: "/Deshboard/Explore",
  },
  {
    icon: "person-outline",
    activeIcon: "person-sharp",
    name: "people",
    link: "/Deshboard/People",
  },
  {
    icon: "bookmark-outline",
    activeIcon: "bookmark-sharp",
    name: "save",
    link: "/Deshboard/Save",
  },
  {
    icon: "images-outline",
    activeIcon: "images-sharp",
    name: "create post",
    link: "/Deshboard/Create",
  },
];

const tabs = [
  { tabName: "posts", icon: "images-outline" },
  { tabName: "liked posts", icon: "heart-outline" },
];

const adjustingURL = (user) => {
  const Isavatar = user?.avatar?.startsWith("https")
    ? user.avatar
    : `http://localhost:3000/${user?.avatar}`;
  return Isavatar;
};

export {
  initialValuesSignup,
  validationSchemaSignup,
  initialValuesLogin,
  validationSchemaLogin,
  initialValuesCreate,
  validationSchemaCreate,
  URL,
  links,
  tabs,
  adjustingURL,
};
