const paintField = document.querySelector(".paint__field");

createField(60);

paintField.addEventListener("mouseover", onPaintTileHover);
// paintField.addEventListener("click", onToggleColorSave);
paintField.addEventListener("mouseout", onPaintTileOut);

let lastTile = null;

function onPaintTileHover(event) {
  const currentTarget = event.target;

  const isTile = currentTarget.classList.contains("paint__tile");
  const isSaved = currentTarget.classList.contains("paint__tile--saved");

  if (!isTile) {
    return;
  }

  if (isSaved) {
    return;
  }

  addColor(event);

  lastTile = currentTarget;
}

function onPaintTileOut(event) {
  if (!lastTile) {
    return;
  }

  console.log("out");

  if (lastTile.classList.contains("paint__tile--saved") === true) {
    return;
  }

  removeColor(event);
}

function addColor(event) {
  const currentTarget = event.target;

  if (currentTarget.classList.contains("paint__tile") === false) {
    return;
  }

  currentTarget.style.backgroundColor = getRandomColor();
}

function removeColor(event) {
  const currentTarget = event.target;

  if (currentTarget.classList.contains("paint__tile") === false) {
    return;
  }

  currentTarget.style.removeProperty("background-color");
}

function createField(tilesAmount) {

  const tilesArray = [];

  for (let i = 0; i < tilesAmount; i += 1) {
    const tile = document.createElement("div");

    tile.classList.add("paint__tile");

    tilesArray.push(tile);
  }

  paintField.append(...tilesArray);
}

function getRandomColor() {
  return `#${getRandomHex()}${getRandomHex()}${getRandomHex()}`;
}

function getRandomHex() {
  return Math.round(Math.random() * 255).toString(16).padStart(2, "0");
}
