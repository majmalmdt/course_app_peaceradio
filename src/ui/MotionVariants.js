export const listVariants = {
    hidden: {
        x: 0,
        transition: {
            when: "afterChildren",
        },
    },
    visible: {
        x: 0,
        transition: {
            type: "spring", stiffness: 500,
            when: "beforeChildren",
            staggerChildren: 0.15,
            delayChildren: 0.1,
        }
    },
}
export const listItemYVariants = {
    hidden: {
        opacity: 0, y: 10,
    },
    visible: {
        opacity: 1, y: 0,
    },
}
export const listItemXVariants = {
    hidden: {
        opacity: 0, x: 10,
    },
    visible: {
        opacity: 1, x: 0
    },
}