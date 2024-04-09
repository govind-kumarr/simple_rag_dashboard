import axios from "axios";

for (let i = 0; i < 100000000; i++) {
  axios.get("https://emily.support/");
}
