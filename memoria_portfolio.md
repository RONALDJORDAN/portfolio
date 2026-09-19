# Memória Técnica e Arquitetural — Portfólio Jordan Ronald

> **Data de Inicialização/Revisão:** 2026-09-14 08:44:24-03:00  
> **Nome do Projeto:** `portfolio`  
> **Arquiteto de Software:** Jordan Ronald  
> **Repositório:** `RONALDJORDAN/portfolio`  
> **Status:** Em Produção / Otimização Contínua  

---

## 1. Visão Geral do Sistema

O presente ecossistema é o portfólio oficial de engenharia de software de Jordan Ronald, concebido para demonstrar proficiência em engenharia de baixo nível (Pure C), aplicações de missão crítica (.NET 8 WPF com arquitetura Zero-Leak), visão computacional (Vision7 / OpenCV), ecossistemas reativos web (React 18, Next.js 14, TypeScript) e arquiteturas corporativas orientadas a microsserviços e governança de TI.

O ecossistema é composto por 7 interfaces integradas de maneira bidirecional:
1. `index.html` — Hub central com animação 3D Three.js, visualização de habilidades, galeria interativa Bento Grid com 3D Flip e Bento Footer conectado.
2. `curriculo.html` — Currículo técnico executivo pronto para recrutadores com regras de impressão CSS (@media print) e download de PDF.
3. `innovrpa.html` — Estudo de caso: INNOVRPA (Motor híbrido Zero-Leak em Pure C + .NET 8 WPF).
4. `innovstock.html` — Estudo de caso: INNOVSTOCK (Plataforma Cloud PWA com leitor QR e sincronização em tempo real via Firebase).
5. `lagoinha-smc.html` — Estudo de caso: LAGOINHA SMC (CRM Web Full-Stack em Next.js 14 + PostgreSQL + Prisma).
6. `innovcore-ti.html` — Estudo de caso: INNOVCORE TI (Governança corporativa de TI e telemetria WMI em C# .NET 8).
7. `projetos-innov.html` — Estudo de caso: PROJETOS INNOV (Monorepo Turborepo + CI/CD + Design System compartilhado).

---

## 2. Padrões de Design System e Identidade Visual (Regra 60-30-10)

- **Fundo Base Dominante (60%):** `#090b10` / `#0c1017` / `#111111` — Interface editorial escura em alto contraste, minimizando a fadiga visual e destacando interfaces gráficas.
- **Estruturas Secundárias (30%):** Bordas em `rgba(255, 255, 255, 0.08)` a `0.15`, painéis de vidro fosco com `backdrop-filter: blur(16px)` e tipografia neutra em `#ffffff` e `#94a3b8`.
- **Pontos Focais e Acentos Semânticos (10%):**
  - **Emerald (`#10b981`):** Automação, RPA, baixo nível e estabilidade Zero-Leak.
  - **Sky/Cyan (`#0284c7` / `#38bdf8`):** Nuvem, PWA, Firebase e sincronização WebSocket.
  - **Indigo (`#6366f1`):** Web ERP, Next.js 14, CRM e governança de dados.
  - **Purple (`#8b5cf6` / `#513ba6`):** Hardware, telemetria WMI e sistemas enterprise.
  - **Pink (`#ec4899`):** Orquestração, monorepo e esteiras de CI/CD.
  - **Amber/Yellow (`#fbbf24`):** Emblema geométrico de Jordan Ronald.

---

## 3. Decisões Arquiteturais e Registro de Mudanças

### [2026-09-14 08:44:24-03:00] — Auditoria e Modernização Integral
- **Eliminação de Redundâncias no Bento Grid:** Remoção de 5 cards repetidos por colagem acidental no `index.html`.
- **Restauração do Bento Footer Conectado:** Reintrodução da seção `.site-bento-footer` no `index.html`, padronizando o rodapé interativo em todas as 7 páginas e ativando a animação `initFooterAnimations()` do GSAP.
- **Ativação de Filtros Reativos de Categoria:** Inclusão de botões estilizados `.bento-filter-btn` no cabeçalho de *Selected Works*, conectando-se ao motor de filtragem com transições GSAP em tempo real.
- **Remoção de Links Inexistentes:** Supressão da referência a `../modelo3/index.html` e adição de controles de navegação rápida.
- **Aprimoramento de SEO e Metadados:** Inclusão de esquema Schema.org JSON-LD semântico para identificação formal do autor e dos trabalhos.
- **Registro do Desenvolvedor:** Implementação de assinatura no console do navegador e metadados de autoria.

---

## 4. Registro do Desenvolvedor
- **Autor / Arquiteto:** Jordan Ronald
- **Identificador:** `JORDAN_RONALD_SW_ARCHITECT_2026`
- **Email:** `ronaldjordan.dev@gmail.com`
- **GitHub:** `https://github.com/RONALDJORDAN`
