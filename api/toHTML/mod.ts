type Attribute = [string, string];

interface OpeningTag {
  tag: string,
  attributes?: Attribute[]
}

/** 
takes a tag, content and optional attributes and returns a string representing an HTML element 
@param {string} tag - the tag, e.g. 'div', 'h1', 'span' etc.
@param {string} content - the content inside the tag
@param {Attribute} attributes - optional attributes that are applied to the opening tag, for example ['id', 'this-is-an-unique-id-123']
@returns {string} - the string representing an HTML element 
*/
export const toHTML = (tag: string, content: string, ...attributes: Attribute[]): string => [
  buildOpeningTagHTML({ tag, attributes }),
  content,
  buildClosingTagHTML(tag),
].join('');

const buildAttributeHTML = ([name, value]: Attribute): string => `${name}="${value}"`;

const buildAttributesHTML = (attributes: Attribute[]): string => attributes.reduce((acc, curr) => `${acc} ${buildAttributeHTML(curr)}`, '').trim();

const buildOpeningTagHTML = ({ tag, attributes }: OpeningTag): string =>
  attributes?.length
    ? `<${tag} ${(buildAttributesHTML(attributes))}>`
    : `<${tag}>`;

const buildClosingTagHTML = (tag: string): string => `</${tag}>`;
