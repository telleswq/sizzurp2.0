export type ViaCepResponse = {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
};

export async function fetchAddressByCep(cep: string) {
  const cleanCep = cep.replace(/\D/g, "");

  if (cleanCep.length !== 8) return null;

  const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
  const data: ViaCepResponse = await res.json();

  if (data.erro) return null;

  return data;
}
