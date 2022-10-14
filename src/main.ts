import "./assets/css/base.css";
import { formatDate } from "./utils/format-date";
import _ from "lodash";
console.log("test");
const getDate = () => {
  console.log(formatDate());
};
getDate();

const re = Promise.resolve("jell");
re.then((res) => {
  console.log(res);
  console.log(_.join(["hello", "world"]));
});
