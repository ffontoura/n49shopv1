import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            html {
                // overflow-x: hidden;
            }

      @font-face {
        font-family: "icomoon";
        src: url("https://austral.vteximg.com.br/arquivos/icomoon.eot.css?v=0.0.8");
        src: url("https://austral.vteximg.com.br/arquivos/icomoon.eot.css?v=0.0.8#iefix") format("embedded-opentype"),url("https://austral.vteximg.com.br/arquivos/icomoon.ttf.css?v=0.0.8") format("truetype"),url("https://austral.vteximg.com.br/arquivos/icomoon.woff.css?v=0.0.8") format("woff"),url("https://austral.vteximg.com.br/arquivos/icomoon.svg.css?v=0.0.8#icomoon") format("svg");
        font-weight: normal;
        font-style: normal;
        font-display: block
      }
      
      [class^="icon-"],[class*=" icon-"] {
          font-family: "icomoon" !important;
          speak: never;
          font-style: normal;
          font-weight: normal;
          font-variant: normal;
          text-transform: none;
          line-height: 1;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale
      }

      .ql-editor{
        padding: 0px !important;
      }

      summary::marker{
        display: none !important;
      }

      details summary::-webkit-details-marker {
        display: none !important;
      }

      details > summary {
        list-style: none !important;
      }

      summary.filter::marker{
        display: none !important;
    }
    
    details summary.filter::-webkit-details-marker {
        display: none !important;
    }
    
      details summary.filter p::after {
        content: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTE2MDUgNy40MTUyM0M5Ljk2OTM3IDcuMzY1MiA5Ljk5OTU2IDcuMjk3MjIgOS45OTk5OSA3LjIyNjE3QzEwLjAwMDMgNy4xOTA5MSA5Ljk5MzA3IDcuMTU1OTYgOS45Nzg2NCA3LjEyMzQ1QzkuOTY0MiA3LjA5MDk0IDkuOTQyOSA3LjA2MTU2IDkuOTE2MDUgNy4wMzcxMUw1LjIwMzE5IDIuNTc5MDRDNS4xNzcwNyAyLjU1NCA1LjE0NTk1IDIuNTM0MTIgNS4xMTE2NCAyLjUyMDU2QzUuMDc3MzMgMi41MDY5OSA1LjA0MDUyIDIuNSA1LjAwMzMzIDIuNUM0Ljk2NjE0IDIuNSA0LjkyOTMyIDIuNTA2OTkgNC44OTUwMSAyLjUyMDU2QzQuODYwNyAyLjUzNDEyIDQuODI5NTggMi41NTQgNC44MDM0NiAyLjU3OTA0TDAuMDg5NjExIDcuMDM3MTFDMC4wNjE5MDkxIDcuMDYxNjIgMC4wMzk3MDM1IDcuMDkxMTYgMC4wMjQzMTU1IDcuMTIzOTVDMC4wMDg5Mjc0OSA3LjE1Njc1IDAuMDAwNjcxNjUgNy4xOTIxNCAzLjkzMDQ2ZS0wNSA3LjIyODAyQy0wLjAwMDU5MzA0MSA3LjI2MzkgMC4wMDY0MTEwMyA3LjI5OTUzIDAuMDIwNjM0NyA3LjMzMjc5QzAuMDM0ODU4MyA3LjM2NjA1IDAuMDU2MDEwOSA3LjM5NjI3IDAuMDgyODMzNCA3LjQyMTY0QzAuMTA5NjU2IDcuNDQ3MDIgMC4xNDE2IDcuNDY3MDMgMC4xNzY3NjYgNy40ODA0OEMwLjIxMTkzMSA3LjQ5Mzk0IDAuMjQ5NTk4IDcuNTAwNTYgMC4yODc1MjYgNy40OTk5NkMwLjMyNTQ1MyA3LjQ5OTM2IDAuMzYyODY2IDcuNDkxNTYgMC4zOTc1MzcgNy40NzdDMC40MzIyMDkgNy40NjI0NCAwLjQ2MzQzIDcuNDQxNDQgMC40ODkzNDQgNy40MTUyM0w1LjAwMzMzIDMuMTQ2MjNMOS41MTYzMSA3LjQxNTIzQzkuNTQyNSA3LjQ0MDE2IDkuNTczNjQgNy40NTk5NCA5LjYwNzk0IDcuNDczNDNDOS42NDIyNSA3LjQ4NjkzIDkuNjc5MDMgNy40OTM4OCA5LjcxNjE4IDcuNDkzODhDOS43NTMzMyA3LjQ5Mzg4IDkuNzkwMTEgNy40ODY5MyA5LjgyNDQxIDcuNDczNDNDOS44NTg3MSA3LjQ1OTk0IDkuODg5ODYgNy40NDAxNiA5LjkxNjA1IDcuNDE1MjNaIiBmaWxsPSIjNTg4MUNBIi8+Cjwvc3ZnPgo=");
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(-50%, -50%) rotate(0deg);
        transition-duration: 0.3s;
        transition-timing-function: ease;
        transition-delay: 0s;
        transition-property: all;
      }

      details[open] summary.filter p::after {
        content: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuOTE2MDUgNy40MTUyM0M5Ljk2OTM3IDcuMzY1MiA5Ljk5OTU2IDcuMjk3MjIgOS45OTk5OSA3LjIyNjE3QzEwLjAwMDMgNy4xOTA5MSA5Ljk5MzA3IDcuMTU1OTYgOS45Nzg2NCA3LjEyMzQ1QzkuOTY0MiA3LjA5MDk0IDkuOTQyOSA3LjA2MTU2IDkuOTE2MDUgNy4wMzcxMUw1LjIwMzE5IDIuNTc5MDRDNS4xNzcwNyAyLjU1NCA1LjE0NTk1IDIuNTM0MTIgNS4xMTE2NCAyLjUyMDU2QzUuMDc3MzMgMi41MDY5OSA1LjA0MDUyIDIuNSA1LjAwMzMzIDIuNUM0Ljk2NjE0IDIuNSA0LjkyOTMyIDIuNTA2OTkgNC44OTUwMSAyLjUyMDU2QzQuODYwNyAyLjUzNDEyIDQuODI5NTggMi41NTQgNC44MDM0NiAyLjU3OTA0TDAuMDg5NjExIDcuMDM3MTFDMC4wNjE5MDkxIDcuMDYxNjIgMC4wMzk3MDM1IDcuMDkxMTYgMC4wMjQzMTU1IDcuMTIzOTVDMC4wMDg5Mjc0OSA3LjE1Njc1IDAuMDAwNjcxNjUgNy4xOTIxNCAzLjkzMDQ2ZS0wNSA3LjIyODAyQy0wLjAwMDU5MzA0MSA3LjI2MzkgMC4wMDY0MTEwMyA3LjI5OTUzIDAuMDIwNjM0NyA3LjMzMjc5QzAuMDM0ODU4MyA3LjM2NjA1IDAuMDU2MDEwOSA3LjM5NjI3IDAuMDgyODMzNCA3LjQyMTY0QzAuMTA5NjU2IDcuNDQ3MDIgMC4xNDE2IDcuNDY3MDMgMC4xNzY3NjYgNy40ODA0OEMwLjIxMTkzMSA3LjQ5Mzk0IDAuMjQ5NTk4IDcuNTAwNTYgMC4yODc1MjYgNy40OTk5NkMwLjMyNTQ1MyA3LjQ5OTM2IDAuMzYyODY2IDcuNDkxNTYgMC4zOTc1MzcgNy40NzdDMC40MzIyMDkgNy40NjI0NCAwLjQ2MzQzIDcuNDQxNDQgMC40ODkzNDQgNy40MTUyM0w1LjAwMzMzIDMuMTQ2MjNMOS41MTYzMSA3LjQxNTIzQzkuNTQyNSA3LjQ0MDE2IDkuNTczNjQgNy40NTk5NCA5LjYwNzk0IDcuNDczNDNDOS42NDIyNSA3LjQ4NjkzIDkuNjc5MDMgNy40OTM4OCA5LjcxNjE4IDcuNDkzODhDOS43NTMzMyA3LjQ5Mzg4IDkuNzkwMTEgNy40ODY5MyA5LjgyNDQxIDcuNDczNDNDOS44NTg3MSA3LjQ1OTk0IDkuODg5ODYgNy40NDAxNiA5LjkxNjA1IDcuNDE1MjNaIiBmaWxsPSIjNTg4MUNBIi8+Cjwvc3ZnPgo=");
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(-50%, -50%) rotate(180deg);
      }

      .icon-menu:before {
          content: ""
      }

      .icon-plus:before {
          content: ""
      }

      .icon-minus:before {
          content: ""
      }

      .icon-arrow:before {
          content: ""
      }

      .icon-close:before {
          content: ""
      }

      .icon-delete:before {
          content: ""
      }

      .icon-search:before {
          content: ""
      }

      .icon-phone:before {
          content: ""
      }

      .icon-user:before {
          content: ""
      }

      .icon-minicart:before {
          content: ""
      }

      .icon-heart:before {
          content: ""
      }

      .icon-heart-full:before {
          content: ""
      }

      .icon-mouse:before {
          content: ""
      }

      .icon-share:before {
          content: ""
      }

      .icon-edit:before {
          content: ""
      }

      .icon-email:before {
          content: ""
      }

      .icon-check:before {
          content: ""
      }

      .icon-zoom:before {
          content: ""
      }

      .icon-warning:before {
          content: ""
      }

      .icon-hanger:before {
          content: ""
      }

      .icon-rule:before {
          content: ""
      }

      .icon-security:before {
          content: ""
      }

      .icon-arroba:before {
          content: ""
      }

      .icon-embalagem:before {
          content: ""
      }

      .icon-notification:before {
          content: ""
      }

      .icon-pin:before {
          content: ""
      }

      .icon-play:before {
          content: ""
      }

      .icon-facebook:before {
          content: ""
      }

      .icon-whatsapp:before {
          content: ""
      }

      .icon-instagram:before {
          content: ""
      }

      .icon-youtube:before {
          content: ""
      }

      .icon-pinterest:before {
          content: ""
      }
      .minicart__remove i::before {
        content: "";
        font-size: 16px;
    }
    `,
        }}
      />
    </Head>
  );
}

export default GlobalTags;
