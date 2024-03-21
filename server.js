import express from "express";
const app = express();
const port = 3000;
app.use(express.json());
import router from "./routers/product.js";
import connects from "./connect/database.js";
import authrouter from "./routers/auth.js";
import routerbook from "./routers/book.js";
// {
// // const products = [
// //   {
// //     id: 1,
// //     name: "San pham 1",
// //     price: 25000,
// //   },
// //   {
// //     id: 2,
// //     name: "San pham 2",
// //     price: 29000,
// //   },
// //   {
// //     id: 3,
// //     name: "San pham 3",
// //     price: 50000,
// //   },
// // ];

// // app.get("/:danhmuccha/:danhmuccon", (req, res) => {
// //   const parent = req.params.danhmuccha;
// //   const children = req.query.danhmuccon;
// //   const result = `tim tu khoa${parent} va ${children}`;
// //   res.send(result);

// //   // res.send("Trang chu");
// // });

// // app.use(express.json());
// // app.post("/products", (req, res) => {
// //   const body = req.body;

// //   console.log(body);
// //   res.send(body);
// // });

// // app.get("/search", (req, res) => {
// //   const parent = req.params.danhmuccha;
// //   const children = req.query.danhmuccon;
// //   const result = `tim tu khoa${parent} va ${children}`;
// //   res.send(result);

// //   // res.send("Trang chu");
// // });

// // app.get("/products", (req, res) => {
// //   res.send(products);
// // });
// // app.get("/products/:id", (req, res) => {
// //   const id = req.params.id;
// //   const product = products.filter((data) => {
// //     return data.id == id;
// //   });
// //   res.send(product);
// // });

// //1.Cho đường dẫn dạng sau:
// // http://localhost:8080/?search = "Iphone 10"
// // Xây dựng API trả về từ iphone 10
// // app.get("/", (req, res) => {
// //   const search = req.query.search;
// //   if (search) {
// //     res.send(`Hiển thị  ${search}`);
// //   } else {
// //     res.status(400).send("lỗi");
// //   }
// // });

// // // 2: Cho url dạng sau :http://localhost:8080/products/990
// // // Xây dựng API trả về số 990
// // app.get("/products/:id", (req, res) => {
// //   const productId = req.params.id;
// //   res.send(`Trả về số ${productId}`);
// // });

// const addProduct = (data) => {
//   // localStorage.setItem("products", JSON.stringify(data));
//   const productInLocal = localStorage.getItem("products");
//   if (productInLocal == null) {
//     localStorage.setItem("products", JSON.stringify([data]));
//   } else {
//     const products = JSON.parse(productInLocal);
//     products.push(data);
//     localStorage.setItem("products", JSON.stringify(products));
//   }
//   // console.log(data);
//   return data;
// };

// const productList = () => {
//   const productInLocal = localStorage.getItem("products");
//   if (productInLocal == null) {
//     return {};
//   } else {
//     const products = JSON.parse(productInLocal);
//     return products;
//   }
// };
// const getProductById = (pid) => {
//   //Lấy danh sách sản phẩm
//   const products = productList();
//   //Dùng filter để lọc sản phẩm
//   const product = products.filter(({ id }) => {
//     return id == pid;
//   });
//   return product;
// };

// const upDate = (pid, data) => {
//   //Lấy danh sách sản phẩm
//   const products = productList();
//   let index = -1; //Ban đầu vị trí ngoài mảng
//   for (let i = 0; i < products.length; i++) {
//     if (products[i].id == pid) {
//       index = i;
//       break;
//     }
//   }
//   //Sau khi xác định được vị trí thì cập nhật
//   if (index > -1) {
//     products[index].name = data.name ?? products[index].name;
//     products[index].price = data.price ?? products[index].price;
//     localStorage.setItem("products", JSON.stringify(products));
//     return { status: true, message: "Sửa sản phẩm thành công" };
//   }
//   return { status: false, message: "Lỗi" };
// };

// const Del = (pid) => {
//   //Lấy DS sản phẩm
//   const products = productList();
//   const newProducts = products.filter(({ id }) => {
//     return id != pid;
//   });
//   if (newProducts.length < products.length) {
//     localStorage.setItem("products", JSON.stringify(newProducts));
//     return { status: true, message: "xóa sản phẩm thành công" };
//   } else {
//     return { status: false, message: "Lỗi" };
//   }
// };
// app.get("/products", (req, res) => {
//   res.send(productList());
// });
// app.get("/products/:id", (req, res) => {
//   //Lấy thông tin người dùng gửi
//   const id = req.params.id;
//   res.send(getProductById(id));
// });

// app.post("/products", (req, res) => {
//   const data = req.body;
//   const info = addProduct(data);
//   res.send({ status: true, data: info, message: "Thêm sản phẩm thành công" });
// });
// app.put("/products/:id", (req, res) => {
//   const id = req.params.id;
//   const data = req.body;
//   res.send(upDate(id, data));
// });
// app.delete("/products/:id", (req, res) => {
//   const id = req.params.id;
//   res.send(Del(id));
// });
// //buoi 4
// app.post(
//   "/products",
//   (req, res, next) => {
//     const token = req.headers.authorization;
//     // console.log(token)
//     if (token == "Bearer 123456") {
//       next();
//     } else {
//       res.json({ status: false, message: "Invalid token" });
//     }
//   },
//   (req, res) => {
//     const data = req.body;
//     const info = addProduct(data);
//     res.send({ status: true, data: info, message: "add product successfully" });
//   }
// );
// }
/**buoi 6 */

app.use("/api", router);
app.use("/auth", authrouter);
app.use("/book", routerbook);
app.listen(port, async () => {
  await connects();
  console.log(`Endpoint: http://localhost:${port}`);
});
