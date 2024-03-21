import http from "http";
const port = 8080;
http
  .createServer((req, res) => {
    // console.log(req);
    if (req.url == "/") {
      res.end("day la trang chu");
    } else if (req.url == "/products") {
      res.end("day la trang san pham");
    } else {
      res.end("404");
    }
  })
  .listen(8080, () => {
    console.log("listening on port 8080");
  });
