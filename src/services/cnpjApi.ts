import { z } from 'zod';

const cnpjResponseSchema = z.object({
  cnpj: z.string(),
  razao_social: z.string(),
  nome_fantasia: z.string().nullable(),
  cep: z.string(),
  municipio: z.string(),
  uf: z.string(),
  logradouro: z.string(),
  numero: z.string(),
  complemento: z.string().nullable(),
  bairro: z.string(),
  telefone: z.string().nullable(),
  email: z.string().nullable(),
  cnae_fiscal: z.number(),
  cnae_fiscal_descricao: z.string()
});

export type CNPJData = z.infer<typeof cnpjResponseSchema>;

export const cnpjApi = {
  lookup: async (cnpj: string): Promise<CNPJData> => {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    
    if (cleanCNPJ.length !== 14) {
      throw new Error('CNPJ inválido');
    }

    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCNPJ}`);
    
    if (!response.ok) {
      throw new Error('CNPJ não encontrado');
    }

    const data = await response.json();
    return cnpjResponseSchema.parse(data);
  }
};