function buscarCliente() {
  const cpfCnpj = document.getElementById("cpfCnpj").value.trim();

  if (cpfCnpj === "") {
    alert("Por favor, insira o CPF ou CNPJ.");
    return;
  }

  fetch(`http://localhost:3000/api/clientes/${cpfCnpj}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Cliente não encontrado");
      }
      return response.json();
    })
    .then(cliente => {
      const tbody = document.getElementById("dadosCliente");
      tbody.innerHTML = `
        <tr>
          <td>${cliente.nome_empresa}</td>
          <td>${cliente.cpf_cnpj}</td>
          <td>${cliente.telefone}</td>
          <td>${cliente.cep}</td>
          <td>${cliente.endereco}</td>
          <td>${cliente.cidade}</td>
          <td>${cliente.uf}</td>
          <td>${cliente.email}</td>
          <td>${cliente.concessionaria}</td>
          <td>${cliente.unidade_consumidora}</td>
          <td>${cliente.potencia}</td>
          <td>${cliente.tensao_rede}</td>
          <td>${cliente.tensao_secundaria}</td>
          <td>${cliente.tipo_subestacao}</td>
        </tr>
      `;
      document.getElementById("tabelaCliente").style.display = "table";
    })
    .catch(error => {
      console.error("Erro na consulta:", error);
      alert("Erro ao buscar cliente.");
    });
}
