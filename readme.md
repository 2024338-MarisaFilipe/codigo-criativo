# CÓDIGO CRIATIVO

## Ingredientes

#### Direcionamento / Input

Com a configuração base pronta, já tinha em mente uma experiência em interseção com Projeto em Artes, Tecnologias e Multimédia I, criar uma animação a partir de imagens de ressonância, movidas pelo scroll do mouse.

Através dos temas de fratura e instabilidade, representados pela próprias secções de fraturamento do crânio, decidi preencher estas feridas ou buracos escuros do cérebro com uma espécie de organismo ou textura viva que iria cicatrizar o que está furado por camadas. A tipografia seria representada de forma oral pelo "Cocktail", uma contração de todos os meus poemas para um poema com intensidade completa.

![Experiencia de composição 1](processo1.png)
![Experiencia de composição 2](processo2.png)

Contudo, tive um bloqueio e não consegui decifrar como iria cicatrizar estas fraturas com composições antes de programar. O projeto final surgiu a partir desta problemática, tentando repensar no código como uma ligadura lógica e criativa a este bloqueio desta temática.

Escolhi a **fontes de dados ou input**:
- **2)** Interação com o computador
- **3)** Imagens estáticas (que inclusive mencionei na aula: as imagens médicas (ressonâncias, TACs))
- **5)** Som
- **8)** random e progressões

#### Referência / Expressão

As **formas de expressão** que defini foram:
- 4. Relação som ↔ imagem
- 6. Tratamento de imagem em tempo real

**Output** que formulei o conceito: Cicatrização (**Conceito**) + Interação de Imagens com Áudio (**Input**) + Imagem/Som em Tempo Real (**Expressão**) = "Como sou por dentro" (**Artefacto Digital**)

##### Referências Visuais e Bibliotecas de Código
Para explorar a conexão visual entre os pontos visitei alguns projetos artísticos de programação que disponibilizavam o próprio código e de forma concreta utilizei como base para formatar o meu como queria:
- [Hit testing](https://paperjs.org/examples/hit-testing/)
- [The best way to show an animation](https://stackoverflow.com/questions/23226710/what-is-the-best-way-to-show-an-animation-using-images-as-frames)
- [Load Sound](https://p5js.org/reference/p5/loadSound/)
- [Radial Rainbows](https://paperjs.org/examples/radial-rainbows/)
- [Javascript for Artists](https://javascriptforartists.com/)
- [Media Element](https://p5js.org/reference/p5.MediaElement/stop/)

#### Uso de LLMs (AI) e Processo Simplificado do Código

Utilizei os recursos ChatGPT, Ecosia AI e Gemini como ferramentas de acompanhamento/assistência.

Mexi com a animação por scroll e frames em tempo real. Usei o `smoothness` para suavizar a transição entre imagens. Ligo e desligo o áudio com a barra de espaço (`keydown`) e movo as peças ao **clicar no ecrã** (`onMouseDown`) permite mudar.  A função `createBlob` desenha as formas orgânicas aleatórias. Os vetores das formas são personalizáveis e só mudam com cada refresh.

