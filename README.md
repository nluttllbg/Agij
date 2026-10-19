# AGIJ FERT — Site Institucional

Site institucional estático da **AGIJ FERT**, consultoria agrícola de Sorriso – MT, com atendimento em Sorriso e região.

- **Tecnologia:** HTML5, CSS3 e JavaScript puro — sem backend, sem banco de dados, sem pacotes e sem etapa de compilação.
- **Canal de contato:** WhatsApp — (66) 99651-2455.
- **Publicação:** compatível com GitHub Pages (todos os caminhos internos são relativos).

---

## Estrutura dos arquivos

```
index.html                 → página única com todo o conteúdo
assets/
  css/
    styles.css             → todo o visual (cores, tipografia, seções, responsivo)
  js/
    main.js                → menu, navegação, efeitos e link do WhatsApp
  images/
    (coloque aqui as fotos — veja a seção "Como substituir as imagens")
README.md                  → este arquivo
```

> Os elementos decorativos (linhas de contorno, texturas, ícones) são feitos em
> CSS e SVG. Nenhuma imagem externa ou de banco de imagens é utilizada.

---

## 1. Como visualizar o site

Não é preciso instalar nada. Escolha uma das opções:

**Opção A — abrir direto no navegador**
1. Clique duas vezes no arquivo `index.html`.
2. O site abre no navegador padrão.

**Opção B — servidor local (recomendado)**

Se o Node.js estiver instalado:

```bash
npx serve .
```

Ou, com Python 3:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000` (ou a porta informada pelo `serve`).

---

## 2. Como substituir as imagens

O site foi construído com **espaços reservados elegantes** para as fotos. Cada
espaço mostra onde a foto deve ficar e o nome do arquivo esperado. Assim que você
coloca o arquivo na pasta `assets/images/` com o nome indicado, **a foto aparece
automaticamente — sem editar nenhuma linha de código** e sem risco de imagem
quebrada.

### Arquivos esperados

| Onde no site                          | Nome do arquivo (obrigatório) | Proporção recomendada |
| ------------------------------------- | ----------------------------- | --------------------- |
| Seção principal (foto de destaque)    | `mudas-solo.jpg`              | 4:3 (paisagem)        |
| Seção Sobre a AGIJ FERT               | `regar-da-muda.jpg`           | 4:3 (paisagem)        |
| Seção Como ajudamos (foto lateral)    | `planta-de-soja.jpg`          | 3:4 (retrato)         |
| Seção "produzindo abaixo do esperado" | `colheita-aerea.jpg`          | 16:9 (paisagem)       |

### Passo a passo

1. Copie suas fotos para a pasta `assets/images/`.
2. Dê a elas o nome base da tabela acima — a **extensão pode ser** `.jpg`,
   `.jpeg`, `.png` ou `.webp` (o site testa automaticamente as variações).
   Ex.: `mudas-solo.jpg`, `mudas-solo.png` ou `mudas-solo.webp` funcionam.
3. Abra o site de novo — as fotos substituem os espaços reservados na hora.

**Alternativa:** se preferir manter o nome original do arquivo (ex.:
`DSC00123.jpg`), edite o atributo `data-file` do elemento correspondente no
`index.html` (busque por `data-slot-image` no arquivo; são 4 ocorrências) e
coloque o nome do arquivo lá. Cada espaço reservado também exibe o nome do
arquivo esperado, para facilitar.

**Dicas de qualidade:**
- Prefira arquivos JPG entre 2000 e 3000 px de largura (fotos de celular já funcionam bem).
- A proporção do espaço foi escolhida para evitar cortes que prejudiquem o conteúdo principal; mesmo assim, a foto é ajustada ao enquadramento com `object-fit: cover`.
- Você pode trocar a descrição falada por leitores de tela (acessibilidade) editando o atributo `data-alt` de cada espaço no `index.html`.

> Se você possuir logotipo da AGIJ FERT, envie o arquivo (idealmente PNG com
> fundo transparente). O logotipo pode substituir a composição tipográfica
> dentro da classe `.brand` no `index.html`.

---

## 3. Como editar textos e a mensagem do WhatsApp

### Textos do site
Todo o conteúdo visível está no `index.html`, em português e organizado por
seções com comentários (`<!-- SOBRE -->`, `<!-- COMO AJUDAMOS -->` etc.). É só
abrir o arquivo em qualquer editor de texto e editar.

Cores e fontes ficam no `assets/css/styles.css`, no bloco de variáveis no
topo do arquivo (`:root { ... }`).

### Número e mensagem do WhatsApp
O link do WhatsApp é montado em **um único lugar**: o arquivo
`assets/js/main.js`, no topo do arquivo:

```js
var WHATSAPP_BASE = "https://wa.me/5566996512455";
var WHATSAPP_MESSAGE = "Olá! Vim pelo site da AGIJ FERT e gostaria de saber mais...";
```

- **Trocou o número?** Altere o `WHATSAPP_BASE` para `https://wa.me/` + `55` +
  DDD + número, sem espaços, sinais ou zeros à esquerda (ex.:
  `https://wa.me/55669999999999`).
- **Quer mudar a mensagem?** Edite apenas o `WHATSAPP_MESSAGE`. O site aplica a
  codificação de URL automaticamente (`encodeURIComponent`).

> Observação: o `index.html` também contém os links prontos (codificados) como
> reserva — assim o site funciona mesmo se o JavaScript estiver desabilitado.
> Se editar o número ou a mensagem no `main.js`, as edições valem na prática
> para o visitante (o script reescreve todos os botões ao carregar a página).

A mensagem abre no WhatsApp **pronta para o produtor revisar e enviar** — ela
nunca é enviada automaticamente.

### Telefone exibido no site
O número aparece como texto nas seções de chamada e contato
(`(66) 99651-2455`). Busque por `99651-2455` no `index.html` para atualizar
também o que é exibido.

---

## 4. Como enviar os arquivos para o GitHub

Pré-requisito: uma conta no [GitHub](https://github.com).

1. No computador, instale o Git: <https://git-scm.com/downloads>.
2. Crie um novo repositório no GitHub (ex.: `agij-fert-site`) — **sem** marcar
   "Add a README".
3. No terminal, dentro da pasta do site (onde está o `index.html`):

```bash
git init
git add index.html assets README.md
git commit -m "Site institucional AGIJ FERT"
git branch -M main
git remote add origin https://github.com/SEU-USERNAME/agij-fert-site.git
git push -u origin main
```

Substitua `SEU-USERNAME` pelo seu usuário do GitHub. Se o Git pedir senha,
use um *Personal Access Token* (GitHub → Settings → Developer settings →
Personal access tokens).

---

## 5. Como publicar pelo GitHub Pages

1. No repositório no GitHub, vá em **Settings → Pages**.
2. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
3. Em **Branch**, selecione `main` e a pasta `/ (root)`. Clique em **Save**.
4. Em alguns minutos o site estará no ar em:

```
https://SEU-USERNAME.github.io/agij-fert-site/
```

Como todos os caminhos do site são relativos, ele também funciona publicado em
subdiretório (ex.: `https://SEU-USERNAME.github.io/meu-site/agij-fert/`).

> Para publicar no domínio principal do usuário (`https://SEU-USERNAME.github.io`),
> publique a raiz de um repositório chamado `SEU-USERNAME.github.io`.

---

## Verificações e manutenção

- **Sem rastreadores:** o site não usa cookies de marketing, analytics nem
  rastreadores.
- **Acessibilidade:** navegação por teclado, foco visível, texto alternativo
  nas imagens, contraste adequado e respeito à preferência de movimento
  reduzido (`prefers-reduced-motion`).
- **Responsividade:** layout prioriza o celular, sem rolagem horizontal, e se
  adapta a telas médias e de desktop.
- **Rodapé:** o ano dos direitos reservados é atualizado automaticamente via
  JavaScript.
