# Fleet Manager

Sistema completo de gestão de frotas desenvolvido com React, TypeScript e Tailwind CSS.

## Funcionalidades

- Gestão de veículos e equipamentos
- Controle de manutenção preventiva e corretiva
- Gestão de motoristas e operadores
- Rastreamento e telemetria
- Gestão financeira
- Relatórios e dashboards
- Sistema de notificações
- Multi-idiomas (pt-BR, en-US, es-ES)

## Tecnologias

- React 18
- TypeScript
- Tailwind CSS
- React Query
- React Router
- React Hook Form
- i18next
- Recharts
- Lucide Icons

## Requisitos

- Node.js 18+
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/fleet-manager.git
cd fleet-manager
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes reutilizáveis
  ├── contexts/      # Contextos React
  ├── hooks/         # Custom hooks
  ├── i18n/          # Configuração de internacionalização
  ├── pages/         # Páginas da aplicação
  ├── services/      # Serviços e APIs
  └── types/         # Definições de tipos TypeScript
```

## Ambientes

- **Super Admin**: Acesso total ao sistema, gestão de empresas e configurações globais
  - Email: admin@fleetmanager.com
  - Senha: admin123

- **Admin da Empresa**: Gestão da empresa específica
  - Email: company@example.com
  - Senha: company123

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.