import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const USER = {
  email: "test@example.com",
  // hashed password for "123456"
  password: bcrypt.hashSync("123456", 10),
};

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  if (email !== USER.email || !bcrypt.compareSync(password, USER.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, "secret-key", { expiresIn: "1h" });
  res.status(200).json({ token });
}
