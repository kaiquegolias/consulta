function buscarCliente() {
  const cpfCnpj = document.getElementById("cpfCnpj").value.trim();

  if (cpfCnpj === "") {
    alert("Por favor, insira o CPF ou CNPJ.");
    return;
  }

  // Mostrar indicador de carregamento
  const loadingIndicator = document.getElementById("loadingIndicator");
  if (loadingIndicator) loadingIndicator.style.display = "block";

  fetch(`https://agilhomolog.onrender.com/api/clientes/${encodeURIComponent(cpfCnpj)}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status === 404 ? "Cliente não encontrado" : "Erro na requisição");
      }
      return response.json();
    })
    .then(cliente => {
      const tbody = document.getElementById("dadosCliente");
      tbody.innerHTML = `
        <tr>
          <td>${cliente.nome_empresa || 'N/A'}</td>
          <td>${cliente.cpf_cnpj || 'N/A'}</td>
          <td>${cliente.telefone || 'N/A'}</td>
          <td>${cliente.cep || 'N/A'}</td>
          <td>${cliente.endereco || 'N/A'}</td>
          <td>${cliente.cidade || 'N/A'}</td>
          <td>${cliente.uf || 'N/A'}</td>
          <td>${cliente.email || 'N/A'}</td>
          <td>${cliente.concessionaria || 'N/A'}</td>
          <td>${cliente.unidade_consumidora || 'N/A'}</td>
          <td>${cliente.potencia || 'N/A'}</td>
          <td>${cliente.tensao_rede || 'N/A'}</td>
          <td>${cliente.tensao_secundaria || 'N/A'}</td>
          <td>${Array.isArray(cliente.tipo_subestacao) ? cliente.tipo_subestacao.join(", ") : (cliente.tipo_subestacao || 'N/A')}</td>
          <td>${Array.isArray(cliente.forma_pagamento) ? cliente.forma_pagamento.join(", ") : (cliente.forma_pagamento || 'N/A')}</td>
        </tr>
      `;
      document.getElementById("tabelaCliente").style.display = "table";
    })
    .catch(error => {
      console.error("Erro ao buscar cliente:", error);
      alert(error.message || "Cliente não encontrado no banco de dados, por gentileza verifique se os dados inseridos estão corretos. Se o erro persistir, entre em contato com o suporte técnico.");
    })
    .finally(() => {
      // Esconder indicador de carregamento
      if (loadingIndicator) loadingIndicator.style.display = "none";
    });
}
