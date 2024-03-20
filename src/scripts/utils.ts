import { render } from "datocms-structured-text-to-plain-text";
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
    const plainText = render(document);
    const words = plainText ? plainText.trim().split(/\s+/).length : 0;
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

export function prioritizeCategoryProjectsSort(category) {
    function compare(a, b) {
        if (a.category == category) {
            return -1;
        }
        return 0;
    }
    return compare
}

export function getSortedAndFilteredProjects(projects, projectTitleToOmit, prioritizedCategory) {
    const filtered = projects.filter((project) => project.title != projectTitleToOmit)
    const sorted = filtered.sort(prioritizeCategoryProjectsSort(prioritizedCategory))
    return sorted
}
