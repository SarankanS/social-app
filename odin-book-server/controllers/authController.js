const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const generateToken = (userId) => {
    return jwt.sign(
        { userId }, 
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    );
}


async function register(req, res){
    try{
        const {username, email, password} = req.body;

        if (!username || !email || !password){
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }]
            }
        });

        if (existingUser){
            return res.status(400).json({ error: 'User already exists '});
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const user = await prisma.user.create({
            data:{
                username,
                email,
                password: hashedPassword
            }
        })

        const token = generateToken(user.id);

        res.status(201).json({
            message: 'User registered succesfully',
            token, 
            user: { id: user.id, username: user.username, email: user.email }
        });
    }
    catch(err){
        res.status(500).json({ error: error.message });
    }
}

async function login(req, res){
    try{
        const { email, password } = req.body;

        if (!email || !password){
            return res.status(500).json({ error: error.message });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user){
            return res.status(401).json({ error: 'Invalid email or password '});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid){
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user.id);

        res.json({
            message: 'Login successful',
            token, 
            user: { id: user.id, username: user.username, email: user.email }
        });

    }catch(err){
        res.status(400).json({ error: error.message });
    }
}

function logout (req, res){
    res.json({ message: 'Logout successful'});
}

async function getCurrentUser(req, res) {
    try{
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, username: true, email: true, createdAt: true}
        })
        res.json(user);

    }catch(error){
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    register,
    login,
    logout,
    getCurrentUser
}