const FLAGS = "gmi";
const SEARCH_TERMS = ["ai", "artificial intelligence", "a.i."].flatMap((term) => [
    new RegExp(`^${term}`, FLAGS),
    new RegExp(`(\\W)${term}(\\W)`, FLAGS),
    new RegExp(`${term}$`, FLAGS),
]);

const REPLACEMENT_TERMS = [
    "interns",
    "intern",
    "the interns",
    "the intern",
    "a group of interns",
    "unpaid interns",
    "unpaid intern",
    "the unpaid interns",
    "the unpaid intern",
    "a group of unpaid interns",
];

function randomTerm() {
    return REPLACEMENT_TERMS[
        Math.floor(Math.random() * REPLACEMENT_TERMS.length)
    ];
}

const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false,
);

let node;
while ((node = walker.nextNode())) {
    node.nodeValue = SEARCH_TERMS.reduce(
        (value, regex) =>
            value.replaceAll(regex, (_, p1, p2) => {
                // If this regex has capture groups, ensure they're retained in the result
                if (typeof p1 === "string" && typeof p2 === "string") {
                    return p1 + randomTerm() + p2;
                }

                // No capture group, just random term
                return randomTerm();
            }),
        node.nodeValue,
    );
}
