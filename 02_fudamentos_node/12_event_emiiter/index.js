import { EventEmitter } from "events";

const eventEmiiter = new EventEmitter();

eventEmiiter.on("start", () => {
  console.log("Durante");
});

console.log("Antes");

eventEmiiter.emit("start");

console.log("Depois");
