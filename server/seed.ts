import { db } from "./db";
import { blogPosts, seoKeywords } from "@shared/schema";

export async function seedDatabase() {
  try {
    const existingPosts = await db.select().from(blogPosts);
    
    if (existingPosts.length === 0) {
      console.log("Seeding blog posts...");
      
      await db.insert(blogPosts).values([
        {
          title: "Simples Nacional 2024: Tudo que você precisa saber",
          slug: "simples-nacional-2024-guia-completo",
          excerpt: "Entenda as principais regras e mudanças do Simples Nacional para este ano e como elas podem impactar sua empresa.",
          content: `O Simples Nacional é um regime tributário diferenciado, simplificado e favorecido previsto na Lei Complementar nº 123/2006.

## Quem pode optar pelo Simples Nacional?

Podem optar pelo Simples Nacional as microempresas (ME) e empresas de pequeno porte (EPP) que:
- ME: faturamento anual de até R$ 360.000,00
- EPP: faturamento anual entre R$ 360.000,01 e R$ 4.800.000,00

## Principais vantagens

1. **Unificação de tributos**: Pagamento de vários impostos em uma única guia (DAS)
2. **Alíquotas reduzidas**: Variam de 4% a 33%, dependendo da atividade e faturamento
3. **Menos burocracia**: Simplificação das obrigações acessórias

## Mudanças para 2024

O governo tem discutido possíveis alterações nas faixas de faturamento e alíquotas. Fique atento às novidades!

Entre em contato com a BCPrimeON para uma análise personalizada do seu caso.`,
          category: "Tributário",
          author: "Equipe BCPrimeON",
          readTime: "8 min",
          metaTitle: "Simples Nacional 2024 - Guia Completo | BCPrimeON",
          metaDescription: "Entenda tudo sobre o Simples Nacional em 2024. Regras, alíquotas, vantagens e mudanças. Guia completo para empresários.",
          keywords: "simples nacional, mei, microempresa, impostos, tributário",
          published: true,
        },
        {
          title: "Como abrir uma empresa do zero: Guia completo",
          slug: "como-abrir-empresa-guia-completo",
          excerpt: "Um passo a passo detalhado de tudo que você precisa para abrir sua empresa de forma correta e legal.",
          content: `Abrir uma empresa pode parecer complicado, mas com o planejamento certo, o processo é mais simples do que você imagina.

## Passo 1: Defina o tipo de empresa

- **MEI**: Para faturamento até R$ 81.000/ano
- **ME**: Para faturamento até R$ 360.000/ano
- **EPP**: Para faturamento até R$ 4.800.000/ano

## Passo 2: Escolha a natureza jurídica

- Empresário Individual
- EIRELI
- Sociedade Limitada (LTDA)
- Sociedade Anônima (S.A.)

## Passo 3: Documentação necessária

- CPF e RG dos sócios
- Comprovante de endereço
- Certidão de casamento (se aplicável)

## Passo 4: Registro nos órgãos competentes

1. Junta Comercial
2. Receita Federal (CNPJ)
3. Prefeitura (Inscrição Municipal)
4. Estado (Inscrição Estadual, se necessário)

A BCPrimeON cuida de todo esse processo para você, de forma gratuita!`,
          category: "Gestão",
          author: "João Carlos",
          readTime: "12 min",
          metaTitle: "Como Abrir uma Empresa - Guia Passo a Passo | BCPrimeON",
          metaDescription: "Aprenda como abrir uma empresa do zero. Documentação, tipos de empresa, custos e passo a passo completo.",
          keywords: "abrir empresa, cnpj, mei, me, registro empresa",
          published: true,
        },
        {
          title: "MEI: Limite de faturamento e como se regularizar",
          slug: "mei-limite-faturamento-regularizacao",
          excerpt: "Saiba qual é o limite de faturamento do MEI e o que fazer se você ultrapassar esse valor.",
          content: `O MEI (Microempreendedor Individual) é uma categoria empresarial simplificada com limite de faturamento.

## Limite atual

O limite de faturamento do MEI é de R$ 81.000,00 por ano, equivalente a R$ 6.750,00 por mês em média.

## O que acontece se ultrapassar?

Se você ultrapassar o limite em até 20% (até R$ 97.200,00):
- Paga uma guia complementar
- Continua como MEI até dezembro

Se ultrapassar mais de 20%:
- Deve migrar para ME retroativamente
- Paga impostos pela diferença

## Como migrar para ME?

1. Faça o desenquadramento no Portal do Simples Nacional
2. Atualize seus dados na Junta Comercial
3. Contrate um contador

A BCPrimeON realiza todo o processo de migração para você!`,
          category: "MEI",
          author: "Maria Helena",
          readTime: "6 min",
          metaTitle: "Limite MEI 2024 - Faturamento e Regularização | BCPrimeON",
          metaDescription: "Entenda o limite de faturamento do MEI e saiba como se regularizar caso ultrapasse. Dicas e orientações.",
          keywords: "mei, limite faturamento, desenquadramento, microempreendedor",
          published: true,
        },
        {
          title: "BPO Financeiro: O que é e como pode ajudar sua empresa",
          slug: "bpo-financeiro-o-que-e",
          excerpt: "Descubra como a terceirização da gestão financeira pode reduzir custos e aumentar a eficiência.",
          content: `BPO Financeiro (Business Process Outsourcing) é a terceirização das atividades do departamento financeiro da empresa.

## O que inclui o BPO Financeiro?

- Contas a pagar e receber
- Conciliação bancária
- Fluxo de caixa
- Relatórios gerenciais
- Cobrança de clientes

## Vantagens do BPO Financeiro

1. **Redução de custos**: Economia com salários, benefícios e estrutura
2. **Foco no negócio**: Mais tempo para o core business
3. **Expertise**: Equipe especializada cuidando das finanças
4. **Tecnologia**: Acesso a ferramentas de gestão avançadas

## Quando contratar?

- Quando os custos internos estão altos
- Quando falta expertise financeira
- Quando o crescimento exige mais controle

O Finance-ON da BCPrimeON oferece BPO Financeiro completo para sua empresa!`,
          category: "Finanças",
          author: "Roberto Almeida",
          readTime: "7 min",
          metaTitle: "BPO Financeiro - O que é e Vantagens | BCPrimeON",
          metaDescription: "Entenda o que é BPO Financeiro e como a terceirização pode ajudar sua empresa a crescer.",
          keywords: "bpo financeiro, terceirização, gestão financeira, contas pagar",
          published: true,
        },
        {
          title: "Planejamento tributário: Economize legalmente nos impostos",
          slug: "planejamento-tributario-economia-impostos",
          excerpt: "Estratégias legais para reduzir a carga tributária da sua empresa e aumentar a lucratividade.",
          content: `O planejamento tributário é um conjunto de estratégias legais para reduzir a carga de impostos da empresa.

## Por que fazer planejamento tributário?

O Brasil tem uma das maiores cargas tributárias do mundo. Com planejamento adequado, é possível economizar significativamente.

## Estratégias comuns

1. **Escolha do regime tributário**: Simples, Presumido ou Real
2. **Aproveitamento de incentivos fiscais**
3. **Recuperação de créditos tributários**
4. **Reestruturação societária**

## Quando fazer?

- No início das atividades
- Ao mudar de atividade
- Quando o faturamento muda significativamente
- Anualmente, para revisar

## Economia média

Empresas que fazem planejamento tributário economizam em média:
- Simples Nacional: até 30%
- Lucro Presumido: até 25%
- Lucro Real: até 40%

Consulte os especialistas da BCPrimeON para uma análise personalizada!`,
          category: "Tributário",
          author: "Ana Paula",
          readTime: "10 min",
          metaTitle: "Planejamento Tributário - Economize nos Impostos | BCPrimeON",
          metaDescription: "Aprenda estratégias legais de planejamento tributário para reduzir impostos e aumentar lucros.",
          keywords: "planejamento tributário, economia impostos, elisão fiscal, impostos",
          published: true,
        },
      ]);
      
      console.log("Blog posts seeded successfully!");
    }

    const existingKeywords = await db.select().from(seoKeywords);
    
    if (existingKeywords.length === 0) {
      console.log("Seeding SEO keywords...");
      
      await db.insert(seoKeywords).values([
        { keyword: "contabilidade digital", category: "Serviços" },
        { keyword: "contador online", category: "Serviços" },
        { keyword: "abrir empresa grátis", category: "Conversão" },
        { keyword: "abrir cnpj", category: "Conversão" },
        { keyword: "mei", category: "MEI" },
        { keyword: "desenquadramento mei", category: "MEI" },
        { keyword: "mei para me", category: "MEI" },
        { keyword: "simples nacional", category: "Tributário" },
        { keyword: "planejamento tributário", category: "Tributário" },
        { keyword: "bpo financeiro", category: "Financeiro" },
        { keyword: "consultoria contábil", category: "Serviços" },
        { keyword: "escritório de contabilidade", category: "Serviços" },
      ]);
      
      console.log("SEO keywords seeded successfully!");
    }

    console.log("Database seed completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
