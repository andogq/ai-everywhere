const FLAGS = "gmi";
const SEARCH_TERMS = ["ai", "artificial intelligence", "a\\.i\\."].flatMap(
    (term) => [
        [new RegExp(`^${term}$`, FLAGS), [false, false]],
        [new RegExp(`^${term}(\\W)`, FLAGS), [false, true]],
        [new RegExp(`(\\W)${term}$`, FLAGS), [true, false]],
        [new RegExp(`(\\W)${term}(\\W)`, FLAGS), [true, true]],
    ],
);

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
        (value, [regex, [start, end]]) =>
            value.replaceAll(regex, (_, ...groups) => {
                let term = randomTerm();

                if (start) {
                    term = groups.shift() + term;
                }

                if (end) {
                    term += groups.shift();
                }

                return term;
            }),
        node.nodeValue,
    );
}
