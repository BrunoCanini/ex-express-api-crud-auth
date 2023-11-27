module.exports = {
    title: {
        in: ["body"],
        notEmpty:{
            errorMessage: "title mancante"
        },
        isString: {
            errorMessage: "title deve essere una stringa"
        }
    },
    slug: {
        in: ["body"],
        isString: {
            errorMessage: "lo slug deve essere una stringa"
        }
    },
    image:{
        in: ["body"],
        isString: {
            errorMessage: "l image deve essere una stringa"
        }
    },
    content:{
        in: ["body"],
        isString: {
            errorMessage: "il content deve essere una stringa"
        }
    },
}