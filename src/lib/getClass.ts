export const getClass = (...classNames: any[]) =>
    classNames
      .filter((className) => !!className)
      .join(" ")
      .trim();