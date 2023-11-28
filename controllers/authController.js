const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {validationResult, matchedData} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {

    const validation = validationResult(req);

    if(!validation.isEmpty()){
        return res.status(422).json(validation.array())
    }

    const datiIngresso = matchedData(req);
    console.log(datiIngresso)

    // andiamo a criptare la password
    
    datiIngresso.password = await bcrypt.hash(datiIngresso.password, 10)

    const user = await prisma.user.create({
        data: {
            ...datiIngresso,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        }
    })

    // const token = jwt.sign(user, process.env.JWT_SECRET, {expiresIn: "1d"})

    return res.json({user, token});
}

async function login(req, res) {

    async function comparePasswords(password, hashedPassword) {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    }
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });

    delete user.password;

    res.json({ token, user });
}

module.exports = {
    register,
    login
}