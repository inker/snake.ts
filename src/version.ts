/* eslint-disable eslint-comments/no-use */

const meta = document.createElement('meta')
meta.name = 'modification-date'
// @ts-ignore
meta.content = __MODIFICATION_DATE__ // eslint-disable-line no-undef
document.head.appendChild(meta)
