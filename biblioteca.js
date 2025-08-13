let prompt = require("prompt-sync")();

let Clientes = [];
let Livros = [];

let senhaCorreta = "Senai1234";
let tentativasSenha = 0;

while (tentativasSenha < 3) {
  let senhaDigitada = prompt("Digite a senha para acessar o sistema:");
  if (senhaDigitada === senhaCorreta) {
    console.log("Senha Correta! Acesso concedido.");
    break;
  } else {
    tentativasSenha++;
    console.log(
      "Senha Incorreta. tentativas restantes" + (3 - tentativasSenha)
    );
  }
}

if (tentativasSenha === 3) {
  console.log("Acesso não Autorizado. Você excedeu o número de tentativas");
  Process.exit();
}

let opcao;

do {
  opcao = prompt(
    "\n--- MENU ---\n" +
      "1 - Cadastrar Cliente\n" +
      "2 - Excluir Cliente\n" +
      "3 - Cadastrar Livro\n" +
      "4 - Excluir Livro\n" +
      "5 - Visualizar Informações\n" +
      "6 - Cadastrar Cliente em Livro\n" +
      "7 - Sair\n" +
      "Escolha uma opção: "
  );

  switch (opcao) {
    case "1":
      // Cadastro de novo Cliente:
      let nomeCliente = prompt("Digite o nome do Cliente: ");
      if (nomeCliente.trim() !== "") {
        Clientes.push({ nome: nomeCliente.trim(), filme: null });
        console.log("Cliente cadastrado com sucesso!");
      } else {
        console.log("Nome de cliente inválido.");
      }
      break;

    case "2":
      // Exclusão do Cliente:
      let nomeExcluirCliente = prompt("Digite o nome do cliente a excluir: ");
      let indexCliente = Clientes.findIndex(
        (c) => c.nome === nomeExcluirCliente
      );
      if (indexCliente !== -1) {
        Clientes.splice(indexCliente, 1);
        console.log("Cliente excluído com sucesso!");
      } else {
        console.log("Cliente não encontrado.");
      }
      break;

    case "3":
      // Cadastrar Livro:
      let nomeLivro = prompt("Digite o nome do Livro: ");
      if (nomeLivro.trim() !== "") {
        Livros.push(nomeLivro.trim());
        console.log("Livro cadastrado com sucesso!");
      } else {
        console.log("Nome do livro inválido.");
      }
      break;

    case "4":
      // Exclusão do Livro:
      let nomeExcluirLivro = prompt("Digite o nome do Livro a excluir: ");
      let indexLivro = Livros.indexOf(nomeExcluirLivro);
      if (indexLivro !== -1) {
        Livros.splice(indexLivro, 1);
        // Desvincula o livro dos clientes
        Clientes.forEach((cliente) => {
          if (cliente.livro === nomeExcluirLivro) {
            cliente.livro = null;
          }
        });
        console.log("Livro excluído com sucesso!");
      } else {
        console.log("Livro não encontrado.");
      }
      break;

    case "5":
      // Visualizar informações:
      console.log("\n--- Clientes Cadastrados ---");
      if (Clientes.length > 0) {
        Clientes.forEach((cliente) => {
          console.log(
            `- ${cliente.nome} (Livro: ${
              cliente.livro ? cliente.livro : "Não matriculado"
            })`
          );
        });
      } else {
        console.log("Nenhum cliente cadastrado.");
      }

      console.log("\n--- Livros Cadastrados ---");
      if (Livros.length > 0) {
        Livros.forEach((livro) => {
          console.log("- " + livro);
        });
      } else {
        console.log("Nenhum livro cadastrado.");
      }
      break;

    case "6":
      // Matricular Cliente em Livro:
      if (Clientes.length === 0 || Livros.length === 0) {
        console.log("É necessário ter clientes e livros cadastrados.");
        break;
      }

      let nomeMatricula = prompt(
        "Digite o nome do cliente que deseja alugar o livro: "
      );
      let clienteEncontrado = Clientes.find((c) => c.nome === nomeMatricula);

      if (!clienteEncontrado) {
        console.log("Cliente não encontrado.");
        break;
      }

      console.log("\n--- Livros Disponíveis ---");
      Livros.forEach((livro, index) => {
        console.log(`${index + 1} - ${livro}`);
      });

      let escolha = parseInt(prompt("Escolha o número do livro alugado: "));

      if (escolha >= 1 && escolha <= Livros.length) {
        clienteEncontrado.livro = Livros[escolha - 1];
        console.log(
          `Cliente '${clienteEncontrado.nome}' cadastrado no livro '${clienteEncontrado.livro}'.`
        );
      } else {
        console.log("Escolha inválida.");
      }
      break;

    case "7":
      console.log("Saindo do sistema... Até logo!");
      break;

    default:
      console.log("Opção inválida. Tente novamente.");
  }
} while (opcao !== "7");
