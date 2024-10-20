const a = () => {
  console.log("Executando a()");
};

const b = () => {
  console.log("Executando b()");
};

const c = () => {
  console.log("Executando c()");
  a();
  b();
};

c();
