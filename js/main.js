document.addEventListener("selectionchange", (e) => e.preventDefault());

const paintField = document.querySelector(".paint__field");

createField(60);

paintField.addEventListener("mouseover", onPaintTileHover);
paintField.addEventListener("click", onTileClick);
paintField.addEventListener("mouseout", onPaintTileOut);

let lastTile = null;

function onPaintTileHover(event) {
  const currentTarget = event.target;

  if (!isTile(event)) {
    return;
  }

  if (isSaved(event)) {
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

  if (isSaved(event)) {
    return;
  }

  removeColor(event);
}

function onTileClick(event) {
  toggleSaveColor(event);
}

function toggleSaveColor(event) {
  if (!isTile(event)) {
    return;
  }

  if (isSaved(event)) {
    unsaveColor(event);
  } else {
    saveColor(event);
  }
}

function addColor(event) {
  const currentTarget = event.target;

  if (!isTile(event)) {
    return;
  }

  currentTarget.style.backgroundColor = getRandomColor();
}

function saveColor(event) {

  if (!isTile(event)) {
    return;
  }

  event.target.classList.add("paint__tile--saved");
}

function removeColor(event) {
  const currentTarget = event.target;

  if (!isTile(event)) {
    return;
  }

  currentTarget.style.removeProperty("background-color");
}

function unsaveColor(event) {

  if (!isTile(event)) {
    return;
  }

  event.target.classList.remove("paint__tile--saved");
}

function isSaved(event) {
  return event.target.classList.contains("paint__tile--saved");
}

function isTile(event) {
  return event.target.classList.contains("paint__tile");
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
