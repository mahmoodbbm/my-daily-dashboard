export const getQueryParam = (param: string | string[] | undefined): string => {
  if (Array.isArray(param) && param.length > 0) {
    return param[0];
  } else if (typeof param === "string") {
    return param;
  }
  return "";
};
