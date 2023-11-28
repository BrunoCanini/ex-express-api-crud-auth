module.export = {
    email:{
        in: ["body"],
        isEmail: {
            errorMessage:"l email inserita non è valida",
        },
        notEmpty:{
            options:{
                ignore_whitespace: true,
            },
            errorMessage:"l email è obbligatoria",
        }
    },
    password: {
        in: ["body"],
        notEmpty:{
            options:{
                ignore_whitespace: true,
            },
            errorMessage:"la password è obbligatoria",
        }
    }
}