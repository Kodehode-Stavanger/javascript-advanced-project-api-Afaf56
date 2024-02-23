async function fruit() {
  try {
    // const result = await fetch("https://wolnelektury.pl/api/audiobooks/");
    const result = await fetch("https://www.fruityvice.com/api/fruit/all", {
      mode: "no-cors",
    });

    const data = await result.json();
    console.log(data);

    renderFruit(data); //call for method
  } catch (error) {
    console.log(error.message);
  }
}

fruit(); //to call the method

function renderFruit(data) {
  const wrappEl = document.getElementById("wrapper");
  data.forEach((e) => {
    // const img = document.createElement("img");
    // img.style.width = "300px";
    // img.style.height = "300px";
    // img.src = e.simple_thumb;

    const pEl = document.createElement("p");
    pEl.textContent = e.name;

    wrappEl.append(pEl);
  });
}
