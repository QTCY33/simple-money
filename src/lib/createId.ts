let id: number = parseInt(window.localStorage.getItem("_idMac") || "0") || 0;
function createId() {
  id++;
  return id;
}

export default createId;
