/**
 * @type {import { "express-validator" }.Schema}
 */

module.exports = {
    name: {
        in: ["body"],
        notEmpty:{
            options:{
                ignore_whitespace: true,
            },
            errorMessage: "il nome inserito non è valido"
        },
    },
    email: {
        in: ["body"],
        isEmail: true,
        notEmpty: true,
        errorMessage: "l emai inserita non è valida"
    },
    password:{
        in: ["body"],
        isStrongPassword: {
            options: {
                minLenght: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            }
        },
        errorMessage: "password inserita non valida"  
    },
}