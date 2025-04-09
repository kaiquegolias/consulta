function buscarCliente() {
  const cpfCnpj = document.getElementById("cpfCnpj").value.trim();

  if (cpfCnpj === "") {
    alert("Por favor, insira o CPF ou CNPJ.");
    return;
  }

  fetch(`http://localhost:3000/api/clientes/${encodeURIComponent(cpfCnpj)}`)
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
          <td>${Array.isArray(cliente.tipo_subestacao) ? cliente.tipo_subestacao.join(", ") : cliente.tipo_subestacao}</td>
          <td>${Array.isArray(cliente.forma_pagamento) ? cliente.forma_pagamento.join(", ") : cliente.forma_pagamento}</td> <!-- ✅ Aqui -->
        </tr>
      `;
      document.getElementById("tabelaCliente").style.display = "table";
    })
    .catch(error => {
      console.error("Erro ao buscar cliente:", error);
      alert("Cliente não encontrado no banco de dados, por gentileza verifique se os dados inseridos estão corretos. Se o erro persistir, entre em contato com o suporte técnico.");
    });
}
