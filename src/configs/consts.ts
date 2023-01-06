// user matches
export const LIKE_ENUM = "like";
export const DISCARD_ENUM = "discard";

// education levels
export const HIGH_SCHOOL = "high_school";
export const TRADE_TECH_SCHOOL = "trade_tech_school";
export const IN_COLLEGE = "in_college";
export const UNDERGRADUATE_DEGREE = "undergraduate_degree";
export const IN_GRAD_SCHOOL = "in_grad_school";
export const GRADUATE_DEGREE = "graduate_degree";

export const EDUCATION_LEVELS = [
  HIGH_SCHOOL,
  TRADE_TECH_SCHOOL,
  IN_COLLEGE,
  UNDERGRADUATE_DEGREE,
  IN_GRAD_SCHOOL,
  GRADUATE_DEGREE,
];

// drinking
export const FREQUENTLY = "Frequently";
export const SOCIALLY = "Socially";
export const RARELY = "Rarely";
export const NEVER = "Never";
export const SOBER = "Sober";

export const FREQUENCY_OF_DRINKING = [FREQUENTLY, SOCIALLY, RARELY, NEVER, SOBER];

// exercise
export const Regularly = "Regularly";
export const ACTIVE = "Active";
export const ALMOST_NEVER = "Allmost never";
export const FREQUENCY_OF_EXERCISE = [ACTIVE, ALMOST_NEVER, Regularly];

export const FREQUENCY_OF_SMOKING = [SOCIALLY, NEVER, Regularly];

export const WANT_SOME_DAY = "Want someday";
export const DONT_WANT = "Dont want";
export const HAVE_AND_WANT_MORE = "Have and want more";
export const HAVE_AND_DONT_WANT_MORE = "Have and dont want more";
export const NOT_SURE = "Not sure";
export const PLAN_TO_HAVE_CHILDREN = [
  WANT_SOME_DAY,
  DONT_WANT,
  HAVE_AND_WANT_MORE,
  HAVE_AND_DONT_WANT_MORE,
  NOT_SURE,
];
