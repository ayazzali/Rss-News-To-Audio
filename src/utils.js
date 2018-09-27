/** just string */
export function addItemTo_localStorage(key, data) {
  let prv = localStorage.getItem(key);
  localStorage.setItem(key, (prv || "") + data);
}
export const l = console.log;
export const addItem = addItemTo_localStorage;
