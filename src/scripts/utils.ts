import { render } from "datocms-structured-text-to-html-string";
import type { StructuredText, Heading } from "datocms-structured-text-utils";

const ordinalSuffixes = {
    "en": {
        "one": "st",
        "two": "nd",
        "few": "rd",
        "other": "th"
    }
};

class OrdinalFormat {
    #rules;
    #suffixes;

    constructor(locale) {
        if (!(locale in ordinalSuffixes)) throw new Error(`Unhandled locale: ${locale}`);
        this.#suffixes = ordinalSuffixes[locale];
        this.#rules = new Intl.PluralRules(locale, { type: "ordinal" });
    }

    withOrdinalSuffix(x) {
        if (typeof x != "number") throw new TypeError(`Expected Number but received ${typeof x}`);
        if (x < 1) throw new RangeError(`Expected a number > 0 but received ${x}`);
        const ordinal = this.#rules.select(x);
        if (!(ordinal in this.#suffixes)) throw new Error(`Unexpected ordinal ${ordinal}`);
        const suffix = this.#suffixes[ordinal];
        return `${x}${suffix}`;
    }
}

export function getDateYear(dateString, locale = "en") {
    const date = new Date(dateString);
    return date.toLocaleString(locale, { year: 'numeric' });
}

export function getDateWithOrdinalSuffix(dateString, locale = "en") {
    const date = new Date(dateString);
    const day = date.toLocaleString(locale, { day: 'numeric' });
    const month = date.toLocaleString(locale, { month: 'short' });
    const year = date.toLocaleString(locale, { year: 'numeric' });

    const formatter = new OrdinalFormat(locale);
    return `${month} ${formatter.withOrdinalSuffix(Number(day))}, ${year}`
}


export function getTimeToReadDastDocument(document: StructuredText, wordsPerMinute = 225) {
    const options = {
        renderBlock({ record, adapter: { renderNode } }) {
            return renderNode("p", {}, record.image.title)
        },
    };
    const text = render(document, options);
    const words = text ? text.trim().split(/\s+/).length : 0;
    const timeToRead = Math.ceil(words / wordsPerMinute);
    return timeToRead
}

export function getHeadingsFromDastDocument(document: StructuredText, headingLevel = 1, addIntroduction = true) {
    const blocks = document.value.document.children;
    const headings = blocks.filter((block) => block.type == "heading" && block.level == headingLevel).map((node) => node.children[0].value);

    if (addIntroduction) {
        headings.splice(0, 0, 'Introduction');
    }
    return headings
}

export function sortByCategory(category, prioritize = true) {
    function compareProjects(projectA, projectB) {
        const isProjectACategory = projectA.category === category;
        const isProjectBCategory = projectB.category === category;

        if (isProjectACategory) {
            return prioritize ? -1 : 1;
        } else if (isProjectBCategory) {
            return prioritize ? 1 : -1;
        }
        return 0;
    }
    return compareProjects
}

export function slugify(str) {
    return String(str)
        .normalize('NFKD') // split accented characters into their base characters and diacritical marks
        .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
        .trim() // trim leading or trailing whitespace
        .toLowerCase() // convert to lowercase
        .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
}