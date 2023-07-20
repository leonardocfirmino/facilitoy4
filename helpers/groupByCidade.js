const groupByCidade = (bairros) =>
  bairros.reduce((result, item) => {
    const cidadeExistente = result.find(
      (cidadeAgrupada) => cidadeAgrupada.cidade === item.cidade
    );
    if (!cidadeExistente) {
      result.push({
        cidade: item.cidade,
        bairros: [
          {
            nome: item.bairro,
            valor: item.valor,
            tempo: item.tempo,
            id: item.id,
          },
        ],
      });
    } else {
      cidadeExistente.bairros.push({
        nome: item.bairro,
        valor: item.valor,
        tempo: item.tempo,
        id: item.id,
      });
    }
    return result;
  }, []);
export default groupByCidade;
