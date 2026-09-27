import { useState } from "react";

// Componente = função que devolve o que aparece na tela.
function App() {
  // Cada useState é uma "gaveta de memória" que o React observa.
  // Quando o valor muda, o React redesenha a tela sozinho.
  const [cep, setCep] = useState("");             // texto digitado
  const [endereco, setEndereco] = useState(null); // resultado da busca
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function buscarCep(evento) {
    evento.preventDefault(); // impede o form de recarregar a página

    // Remove tudo que não é número (traço, espaço, letra digitada errado)
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      setErro("Digite um CEP válido com 8 números.");
      setEndereco(null);
      return; // sai da função aqui, nem tenta buscar
    }

    setErro("");
    setEndereco(null);
    setCarregando(true);

    try {
      // fetch = pede informação pra internet
      // await = espera a resposta chegar antes de seguir
      const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const dados = await resposta.json(); // transforma a resposta crua em objeto JS

      // O ViaCEP não dá "erro" de verdade quando o CEP não existe,
      // ele devolve { erro: true }. Por isso checamos assim.
      if (dados.erro) {
        setErro("CEP não encontrado.");
      } else {
        setEndereco(dados);
      }
    } catch (e) {
      // Cai aqui só se algo quebrar de verdade (ex: sem internet)
      setErro("Não foi possível buscar o CEP agora. Tente de novo.");
    } finally {
      // Roda sempre, deu certo ou errado
      setCarregando(false);
    }
  }

  return (
    <div className="card">
      <h1>Buscador de CEP</h1>
      <p className="subtitle">Digite um CEP e a gente busca o endereço pra você.</p>

      <form onSubmit={buscarCep}>
        <input
          type="text"
          placeholder="Ex: 01310930"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          maxLength={9}
        />
        <button type="submit" disabled={carregando}>
          {carregando ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {erro && <p className="error">{erro}</p>}

      {endereco && (
        <div className="result">
          <div className="row"><span>Rua</span><span>{endereco.logradouro || "-"}</span></div>
          <div className="row"><span>Bairro</span><span>{endereco.bairro || "-"}</span></div>
          <div className="row"><span>Cidade</span><span>{endereco.localidade}</span></div>
          <div className="row"><span>Estado</span><span>{endereco.uf}</span></div>
          <div className="row"><span>CEP</span><span>{endereco.cep}</span></div>
        </div>
      )}
    </div>
  );
}

export default App;
