//express的一个核心概念是中间键或者中间函数。中间函数，得到一个请求对象，要么传给客户端，要么传给另一个中间函数
//中间函数例子：1）app.get（）的处理函数
//             2)express.josn() 读取请求，如果req是json格式对象，就是格式化json对象并以此设置req.body属性
// express就是一堆中间函数，收到请求进入管道，一个中间函数接一个中间函数，直到最后一个中间函数传给客户端，走出管道
const Joi = require("joi");
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");

const login = require("./login");
const authenticating = require("./authenticating");

//express的中间键
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); //向客户端提供静态文件

//third-party middleware 只用需要的，不然会降低效率
// https://expressjs.com/
//用helmet加强http heads安全性   morgan进行HTTP请求的日志记录
app.use(helmet());
app.use(morgan("tiny")); //记录结果————>GET /api/courses 200（状态码） 105 - 3.439 ms

//自定义的中间件
app.use(login);
app.use(authenticating);

const courses = [
  {
    id: 1,
    name: "course1",
  },
  {
    id: 2,
    name: "course2",
  },
  {
    id: 3,
    name: "course3",
  },
  {
    id: 4,
    name: "course4",
  },
];

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

app.get("/", (req, res) => {
  res.send("get ok");
});
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("the course with the given ID was not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("the course with the given ID was not found");

  const { error } = validateCourse(req.body); //对象解构result.error
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("the course with given id was not find");

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}
