import Input from "../../form/Input";

const Register = () => {
  const handleOnChange = (e) => {};

  return (
    <section>
      <h1>Register</h1>
      <form>
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o nome"
          handleOnChange={handleOnChange}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o telefone"
          handleOnChange={handleOnChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o e-mail"
          handleOnChange={handleOnChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a senha"
          handleOnChange={handleOnChange}
        />
        <Input
          text="Confirmação"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleOnChange}
        />
        <input type="submit" value="Cadastrar"></input>
      </form>
    </section>
  );
};

export default Register;
