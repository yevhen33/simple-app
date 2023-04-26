import { elementCreate } from "../../helper/utils/elementCreate";

export function errorPage() {
  
  const wrapper = elementCreate({
    elem: "div",
    class: "err",
    content: `<h1>Ooops, Error 404!!! <br><br>Page not found</h1>`
  });

  return wrapper;

}