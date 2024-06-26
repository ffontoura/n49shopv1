const __idTenant = 1125

window.SizebayPrescript = () => ({
  getPermalink() {
    const permalink = 'https://www.austral.com.br' + window.location.pathname
    return permalink
  },
  getAnchor() {
   return {
     mobile: 'div.inline--default.product__select',
     web: 'div.inline--default.product__select',
   }
  },
  getTenantId() {
    return __idTenant
  },
  getButtons() {
    return {
      order: [
        { name: 'vfr', text: null },
        { name: 'chart', text: null },
      ],
      position: 'after',
      class: 'vfr__button--clean',
    }
  },
  getLanguage() {
    return 'br'
  },
  getRecommendationText() {
    return {
      default: 'Recomendamos {size} para {profileName}',
      simplified: 'Recomendamos o tamanho {size} para <b>VocÃª</b>',
      order: 'before',
      anchor: '.vfr__container',
    }
  },
})

function insertStyle(ref) {
  let linkElem = document.createElement('link')
  linkElem.setAttribute('rel', 'stylesheet')
  linkElem.setAttribute('type', 'text/css')
  linkElem.setAttribute('href', ref)
  document.querySelector('body').appendChild(linkElem)
}

function insertScript(ref) {
  let app = document.createElement('script')
  app.id = 'szb-vfr__base'
  app.setAttribute('src', ref)
  document.querySelector('head').appendChild(app)
}

function init() {
  let implantation = 'https://vfr-v3-production.sizebay.technology/V4/implantation/index.js'
  insertScript(implantation)
}

function customStyle() {
  let style = `https://static.sizebay.technology/${__idTenant}/styles_v4.css`
  insertStyle(style)
}

function SizebayInit() {
  init()

  if (
    document.querySelectorAll('div[id*="product-image-gallery"]').length ||
    document.querySelectorAll('main.product__main').length
  ) {
    customStyle()

    let payload = {
      permalink: SizebayPrescript().getPermalink(),
      tenantId: SizebayPrescript().getTenantId(),
      buttons: SizebayPrescript().getButtons(),
      anchor: SizebayPrescript().getAnchor(),
      lang: SizebayPrescript().getLanguage(),
      recommendation: SizebayPrescript().getRecommendationText(),
    }
    let bool = true

    let loaded = setInterval(() => {
      if (!document.querySelectorAll('.vfr__container').length && bool) {
        if (typeof window?.Sizebay?.Implantation === 'function') {
          window?.Sizebay?.Implantation(payload)
          bool = false
        }
      }

      if (document.querySelectorAll('#szb-vfr-button').length > 0) {
        clearInterval(loaded)
      }
    }, 1000)
  }
}

SizebayInit()