const base = "https://corsproxy.io/?https://www.fruityvice.com/api/fruit";

async function fruit(endpoint) {
  const url = `${base}${endpoint}`;

  try {
    const result = await fetch(url);
    const data = await result.json();

    // console.log(data);
    renderFruit(data); //call for method
  } catch (error) {
    console.log(error.message);
  }
}

fruit("/all"); //to call the method with endpoint /all

function renderFruit(data) {
  const wrappEl = document.getElementById("wrapper");
  while (wrappEl.firstChild) {
    wrappEl.firstChild.remove();
  }

  data.forEach((e, i) => {
    const divEl = document.createElement("div");
    divEl.style.border = "2px solid black";
    const fruit = document.createElement("h1");
    fruit.textContent = e.name;

    const lbl1 = document.createElement("label");
    lbl1.textContent = `Family: ${e.family}`;

    const lbl2 = document.createElement("label");
    lbl2.textContent = `Genus: ${e.genus}`;

    const fruitArr = [];
    const imgEl = document.createElement("img");
    imgEl.src = `./pic/fruit.png`;

    const btn = document.createElement("button");
    btn.textContent = "Nutritions values";

    btn.addEventListener("click", () => {
      const dialogEl = document.createElement("dialog");
      const divD = document.createElement("div");

      const headD = document.createElement("h2");
      headD.classList.add("h2Css");
      headD.textContent = "Nutritions values";

      const pD = document.createElement("p");
      pD.classList.add("pCss");
      for (let nutri in e.nutritions) {
        pD.innerHTML += `${nutri.charAt(0).toUpperCase() + nutri.slice(1)}: ${
          e.nutritions[nutri]
        }<br>`;
      }

      const btnD = document.createElement("button");
      btnD.classList.add("btnCss");
      btnD.textContent = "Close";

      btnD.addEventListener("click", () => {
        dialogEl.remove();
      });

      divD.append(headD, pD, btnD);
      dialogEl.append(divD);
      wrappEl.append(dialogEl); //append dialog to wrapper in the body
      dialogEl.show();
    });

    divEl.append(fruit, lbl1, lbl2, imgEl, btn);
    wrappEl.append(divEl);
  });
}

const formE = document.getElementById("form");
const inputE = document.getElementById("input");

formE.addEventListener("submit", (e) => {
  e.preventDefault();
  const fruitName = inputE.value;
  fruit(`/family/${fruitName}`); //call the method with endpoint which is in this case family name of fruit
  inputE.value = "";
});

// formE.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const fruitName = inputE.value;
//   fruit(`/${fruitName}`); //call the method with endpoint which is in this case family name of fruit
//   inputE.value = "";
// });
