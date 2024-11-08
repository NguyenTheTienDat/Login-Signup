const User = require('../models/User');

// Xử lý đăng ký
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).send("User registered successfully!");
    } catch (error) {
        res.status(400).send("Error registering user");
    }
};

// Xử lý đăng nhập
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await user.comparePassword(password)) {
        req.session.userId = user._id;
        res.send("Login successful!");
    } else {
        res.status(401).send("Invalid username or password");
    }
};

// Đăng xuất
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send("Error logging out");
        res.send("Logged out successfully!");
    });
};
