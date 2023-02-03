import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import accountRouter from "./routers/account.routes";
import adminRouter from "./routers/admin.routes";
import commentRouter from "./routers/comment.routes";
import likeRouter from "./routers/like.routes";
import messageRouter from "./routers/message.routes";
import userRouter from "./routers/user.routes";
import workshopRouter from "./routers/workshop.routes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/art-workshops");
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("database connection established");
});

const router = express.Router();

router.use("/account", accountRouter);
router.use("/admin", adminRouter);
router.use("/comment", commentRouter);
router.use("/like", likeRouter);
router.use("/message", messageRouter);
router.use("/user", userRouter);
router.use("/workshop", workshopRouter);

app.use("/", router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
