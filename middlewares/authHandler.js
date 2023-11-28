const { json } = require("express");

module.export = (req, res, next)=>{

    // leggere il bear token dal header della richiesta
    const bearer = req.headers.authorization;

    // stringa che inizia con Berear seguita da uno spazio e poi con il token
    // controllo

    if(!bearer || !bearer.startsWith("Bearer ")){
        throw new AuthError ("Bearer token mancante o malformato");
    }

    // estraggo solo il token
    const token = bearer.split(" ")[1];


    // verificare che il token sia valido
    const isValid = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    // passare i dati dall utente alla req in modo che possiamo accederci nei controller
    req["user"] = user;

    // next
    next();

};