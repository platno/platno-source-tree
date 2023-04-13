import _ from "lodash";

import a from "./a";
import b from "./b";
import c from "./c";

const component = () => {
  console.log("c", c);

  const element = document.createElement('div');

  element.innerHTML = _.join(['Test', a, b, c], ' ');

  return element;
};

document.body.appendChild(component());
