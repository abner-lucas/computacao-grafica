# 🧊 Portal de Computação Gráfica — IFPA Campus Breves

Bem-vindo ao repositório oficial da disciplina de **Computação Gráfica** do **Instituto Federal de Educação, Ciência e Tecnologia do Pará (IFPA) — Campus Breves**, ministrada pelo **Prof. Me. Ábner Lucas**.

Este repositório está estruturado como um **portal educacional integrado**, centralizando projetos práticos, visualizadores 3D interativos utilizando **WebGL** e **Three.js**, além de roteiros didáticos e templates de atividades avaliativas.

---

## 📂 Estrutura do Repositório

```text
computacao-grafica/
│
├── index.html                           # Portal Principal da Disciplina (Página inicial)
├── portal.css                           # Estilos modernos e responsivos do Portal
├── portal.js                            # Elemento 3D geométrico interativo com Three.js no Hero
│
├── 01-pagina-com-3d/                    # [Projeto 01] Primeiro projeto prático de introdução ao Three.js
│   ├── index.html                       # Página web simples com canvas 3D
│   ├── codigo.js                        # Script com Three.js, cena, câmera e iluminação básica
│   ├── estilo.css                       # Estilos do container e da página
│   └── aviaozinho.glb                   # Malha 3D de avião utilizada como exemplo inicial
│
├── 02-atividade-site-com-modelos-3d/    # [Atividade 02] 3ª Avaliação Prática — "Mundo 3D"
│   ├── index.html                       # Sub-hub de navegação da Atividade 02
│   │
│   ├── pagina-orientacoes/              # Roteiro didático oficial passo a passo (6 etapas)
│   │   ├── dist/                        # Versão estática compilada pronta para execução direta
│   │   │   ├── index.html               # Página do roteiro pronta (sem necessidade de build)
│   │   │   └── assets/                  # Bundles JS e CSS compilados
│   │   ├── src/                         # Código-fonte da aplicação (React, Vite, Tailwind CSS)
│   │   └── package.json                 # Dependências do projeto de orientações
│   │
│   └── webpage-modelo-3d/               # Template de código base para os estudantes
│       ├── index.html                   # Estrutura com cartões lado a lado para a dupla
│       ├── codigo.js                    # Script Three.js com OrbitControls e suporte a 2 modelos
│       ├── estilo.css                   # Estilização com cartões com visual de céu
│       └── aviaozinho.glb               # Modelo 3D de referência
│
├── LICENSE                              # Licença de uso
└── README.md                            # Documentação geral do repositório
```

---

## 🚀 Como Executar Localmente

### Opção 1: Visual Studio Code + Live Server (Recomendado)
1. Abra a pasta do repositório no **VS Code**.
2. Instale a extensão **Live Server** (Ritwick Dey).
3. Clique com o botão direito no arquivo `index.html` (da raiz) e selecione **"Open with Live Server"**.
4. O portal será aberto automaticamente no seu navegador em `http://127.0.0.1:5500/`.

> **Dica:** O uso de um servidor local como o *Live Server* ou Python é fundamental para que o navegador consiga carregar arquivos `.glb` locais sem bloqueios de política de mesma origem (CORS).

### Opção 2: Python HTTP Server
No terminal aberto na raiz do repositório, execute:
```bash
python -m http.server 8000
```
Em seguida, acesse no navegador: `http://localhost:8000/`.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

* **Three.js (r128)**: Motor gráfico JavaScript para renderização 3D WebGL acelerada por hardware no navegador.
* **GLTFLoader**: Carregador oficial do padrão aberto glTF/GLB para malhas, materiais e texturas 3D.
* **OrbitControls**: Controle interativo de rotação de câmera com amortecimento (*damping*) via mouse e touch.
* **HTML5 & CSS3**: Semântica web moderna, layouts com Flexbox/CSS Grid e tipografia com Google Fonts (*Plus Jakarta Sans* e *JetBrains Mono*).
* **Autodesk Tinkercad**: Ferramenta de modelagem paramétrica tridimensional acessível no navegador.
* **Tiiny.host**: Plataforma de hospedagem ágil e estática para publicação de sites compactados em ZIP.

---

## 👨‍🏫 Informações Institucionais

* **Instituição:** Instituto Federal de Educação, Ciência e Tecnologia do Pará (IFPA) — Campus Breves
* **Disciplina:** Computação Gráfica / Programação Web
* **Docente:** Prof. Me. Ábner Lucas