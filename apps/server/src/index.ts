import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import jobRoutes from "./routes/jobs.routes";

const app = express();

app.use(cors());
const PORT = 8080;

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);

app.listen(PORT, () => {
  console.log(" 🚀 Server listening on https://localhost:8080/ 🚀");
});

export default app;
