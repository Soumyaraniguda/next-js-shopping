//https://www.npmjs.com/package/slugify
/**
 * replacement: '-',  // replace spaces with replacement character, defaults to `-`
  remove: undefined, // remove characters that match regex, defaults to `undefined`
  lower: false,      // convert to lower case, defaults to `false`
  strict: false,     // strip special characters except replacement, defaults to `false`
  locale: 'vi',      // language code of the locale to use
  trim: true         // trim leading and trailing replacement chars, defaults to `true`
 */

/**
 * TODO need to add the above parameters to create good slug
 * @param {string to create slug} data
 * @param {characters want to put in between the words} replacement
 * @returns slug created with string
 */
export const createSlug = (data, replacement = "-") => {
  if (data) {
    const dataInLowerCase = data.toLowerCase();
    return dataInLowerCase.replace(" ", replacement);
  }
  return null;
};
