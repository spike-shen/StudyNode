//joi用于input validation的包。对象
const Joi = require("joi");
const express = require("express");
const app = express();

//调用express.json方法时，该方法返回一个middleware（中间体），用use方法在处理请求流程中使用这个中间体
app.use(express.json());

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

//环境变量（进程运行时才产生的变量）中管理端口的属性是PORT，用process对象读取PORT属性
//在CMD中set PORT=5000   MAC上 export PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

//###GET请求处理
// //params型客户端输入/api/1  ——————>{"id":"1"}
// app.get('/api/:id',(req,res)=>{
//     res.send(req.params);
// });
// //query形式客户端输入/api/?sortBy=name  ——————>{"sortBy":"name"}
// app.get('/api/',(req,res)=>{
//     res.send(req.query);
// });
app.get("/", (req, res) => {
  res.send("get ok");
});
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("the course with the given ID was not found"); //前面加return等价于{语句，return }  ————>使之后代码不执行
  res.send(course);
});

//###post请求处理(create a new course)
//需要打开express获取请求体中json对象的功能，因为该功能默认关闭   写在顶部区域app.use(express.json());
app.post("/api/courses", (req, res) => {
  //joi包进行输入验证

  //   const schema = {
  //     name: Joi.string().min(3).required(),
  //   };
  //   const result = Joi.validate(req.body, schema);
  //   if (result.error) {
  //     res.status(400).send(result.error.details[0].message);
  //     return;
  //   }

  const { error } = validateCourse(req.body); //对象解构result.error
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

//###put请求处理(update)
app.put("/api/courses/:id", (req, res) => {
  //look up the  course
  //if not existing,return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("the course with the given ID was not found");

  //validate
  //if invalid ,return 400-bad requst
  const { error } = validateCourse(req.body); //对象解构result.error
  if (error) return res.status(400).send(error.details[0].message);

  //update course
  //return the updated course
  course.name = req.body.name;
  res.send(course);
});

//###delete请求处理
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("the course with given id was not find");

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

//将验证课程和结果包装成函数
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}
