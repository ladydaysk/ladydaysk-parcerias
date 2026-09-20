# Site da Dayane · mídia kit

Site de uma página para creator de conteúdo, com foco em métricas e em fechar parcerias com marcas.

Visual próprio, diferente do site da Lauriane: fontes Fraunces + DM Sans, grade de vídeos estilo perfil, bento de métricas com barras, acordeão de formatos. Sem preloader, sem cursor customizado, sem moldura de celular.

## O que precisa ser preenchido

### 1. Vídeos (o mais importante)
Tudo fica na lista `VIDEOS`, no **topo do `main.js`**. Cada item:

```js
{ url: 'https://www.instagram.com/reel/XXXXXXX/', views: '4,2M', titulo: 'Rotina que virou trend', tag: 'organico', capa: 'assets/img/capa-1.jpg' }
```

- `url` — link do post no Instagram ou no TikTok. Com o link preenchido, o card abre o post **dentro do site**, em uma janela, e o vídeo toca ali.
- `views` — o texto que aparece grande no card.
- `titulo` — legenda curta.
- `tag` — `organico`, `publi` ou `ugc` (é o que os filtros usam).
- `capa` — opcional. Sem ela o card mostra um fundo neutro. Para a capa, tire um print do primeiro quadro do vídeo e salve em `assets/img/`.

Links aceitos: `instagram.com/reel/...`, `instagram.com/p/...`, `tiktok.com/@perfil/video/...`.
Links curtos (`vm.tiktok.com`) não funcionam para embutir: abra o link no navegador e copie o endereço completo.

### 2. Contato
- `main.js`, constante `WHATSAPP`: número com DDI + DDD, só dígitos.
- `index.html`, rodapé: links do Instagram e do TikTok.

### 3. Nome e @
Trocar `Dayane` e `@dayane` no `<title>`, no logo (topo e rodapé), na seção "Quem é a Dayane" e na constante `NOME` do `main.js`.

### 4. Números (seção "Os números" e topo)
Marcados com `EDITAR` no HTML. Os valores animam sozinhos: o número real vai em `data-countup` (com ponto decimal) e o sufixo em `data-suffix`.
Exemplo: `data-countup="4.2" data-suffix="M"` mostra `4,2M`.
As barras usam `data-bar="80"` (porcentagem da barra preenchida).

### 5. Trabalhos entregues
Lista da seção "Trabalhos entregues": ano, marca, formato e resultado.

### 6. Fotos
Em `assets/img/`:
- `capa-1.jpg` e `capa-2.jpg` — as duas capas verticais do topo
- `dayane-retrato.jpg` — foto vertical da seção "Quem é a Dayane"
- `capa-1.jpg` a `capa-9.jpg` — capas dos vídeos da grade

## Publicar no GitHub Pages

```bash
git init
git add .
git commit -m "Site da Dayane"
git branch -M main
git remote add origin https://github.com/sdrgreenhub/dayane.git
git push -u origin main
```

Depois, no repositório: Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `root`.

## Paleta e fontes

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#fbf8f4` | Fundo |
| `--soft` | `#f4ede5` | Seções alternadas |
| `--ink` | `#1b1714` | Texto e blocos escuros |
| `--accent` | `#c47a4e` | Destaques e botões |

Fontes: **Fraunces** (títulos e números) e **DM Sans** (texto).
