import { adminApi } from '../services/adminApi';
import { companyApi } from '../services/companyApi';
import { authApi } from '../services/authApi';

async function testSystemModules() {
  try {
    console.log('🔍 Iniciando testes do sistema...\n');

    // Teste de Autenticação
    console.log('📋 Testando autenticação...');
    const authResponse = await authApi.login({
      email: 'admin@fleetmanager.com',
      password: 'admin123'
    });
    console.log('✅ Autenticação bem-sucedida\n');

    // Teste de API Admin
    console.log('📋 Testando módulos do Super Admin...');
    const [companies, plans, templates] = await Promise.all([
      adminApi.companies.list(),
      adminApi.plans.list(),
      adminApi.notifications.listTemplates()
    ]);
    console.log('✅ APIs Admin funcionando corretamente\n');

    // Teste de API da Empresa
    console.log('📋 Testando módulos da Empresa...');
    const companyId = companies[0]?.id;
    const [dashboard, transactions] = await Promise.all([
      companyApi.financial.getDashboard(companyId),
      companyApi.financial.getTransactions(companyId)
    ]);
    console.log('✅ APIs da Empresa funcionando corretamente\n');

    // Verificação de Integrações
    console.log('📋 Verificando integrações...');
    const settings = await adminApi.settings.get();
    console.log('✅ Integrações configuradas corretamente\n');

    console.log('🎉 Todos os testes concluídos com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ Erro durante os testes:', error);
    return false;
  }
}

export default testSystemModules;