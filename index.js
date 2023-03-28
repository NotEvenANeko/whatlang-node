const { existsSync, readFileSync } = require('fs')
const { join } = require('path')

const { platform, arch } = process

let nativeBinding = null
let localFileExisted = false
let loadError = null

function isMusl() {
  // For Node 10
  if (!process.report || typeof process.report.getReport !== 'function') {
    try {
      const lddPath = require('child_process').execSync('which ldd').toString().trim()
      return readFileSync(lddPath, 'utf8').includes('musl')
    } catch (e) {
      return true
    }
  } else {
    const { glibcVersionRuntime } = process.report.getReport().header
    return !glibcVersionRuntime
  }
}

switch (platform) {
  case 'android':
    switch (arch) {
      case 'arm64':
        localFileExisted = existsSync(join(__dirname, 'whatlang-node.android-arm64.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./whatlang-node.android-arm64.node')
          } else {
            nativeBinding = require('@notevenaneko/whatlang-node-android-arm64')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm':
        localFileExisted = existsSync(join(__dirname, 'whatlang-node.android-arm-eabi.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./whatlang-node.android-arm-eabi.node')
          } else {
            nativeBinding = require('@notevenaneko/whatlang-node-android-arm-eabi')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Android ${arch}`)
    }
    break
  case 'win32':
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(join(__dirname, 'whatlang-node.win32-x64-msvc.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./whatlang-node.win32-x64-msvc.node')
          } else {
            nativeBinding = require('@notevenaneko/whatlang-node-win32-x64-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'ia32':
        localFileExisted = existsSync(join(__dirname, 'whatlang-node.win32-ia32-msvc.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./whatlang-node.win32-ia32-msvc.node')
          } else {
            nativeBinding = require('@notevenaneko/whatlang-node-win32-ia32-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(join(__dirname, 'whatlang-node.win32-arm64-msvc.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./whatlang-node.win32-arm64-msvc.node')
          } else {
            nativeBinding = require('@notevenaneko/whatlang-node-win32-arm64-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Windows: ${arch}`)
    }
    break
  case 'darwin':
    localFileExisted = existsSync(join(__dirname, 'whatlang-node.darwin-universal.node'))
    try {
      if (localFileExisted) {
        nativeBinding = require('./whatlang-node.darwin-universal.node')
      } else {
        nativeBinding = require('@notevenaneko/whatlang-node-darwin-universal')
      }
      break
    } catch {}
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(join(__dirname, 'whatlang-node.darwin-x64.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./whatlang-node.darwin-x64.node')
          } else {
            nativeBinding = require('@notevenaneko/whatlang-node-darwin-x64')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(join(__dirname, 'whatlang-node.darwin-arm64.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./whatlang-node.darwin-arm64.node')
          } else {
            nativeBinding = require('@notevenaneko/whatlang-node-darwin-arm64')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on macOS: ${arch}`)
    }
    break
  case 'freebsd':
    if (arch !== 'x64') {
      throw new Error(`Unsupported architecture on FreeBSD: ${arch}`)
    }
    localFileExisted = existsSync(join(__dirname, 'whatlang-node.freebsd-x64.node'))
    try {
      if (localFileExisted) {
        nativeBinding = require('./whatlang-node.freebsd-x64.node')
      } else {
        nativeBinding = require('@notevenaneko/whatlang-node-freebsd-x64')
      }
    } catch (e) {
      loadError = e
    }
    break
  case 'linux':
    switch (arch) {
      case 'x64':
        if (isMusl()) {
          localFileExisted = existsSync(join(__dirname, 'whatlang-node.linux-x64-musl.node'))
          try {
            if (localFileExisted) {
              nativeBinding = require('./whatlang-node.linux-x64-musl.node')
            } else {
              nativeBinding = require('@notevenaneko/whatlang-node-linux-x64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(join(__dirname, 'whatlang-node.linux-x64-gnu.node'))
          try {
            if (localFileExisted) {
              nativeBinding = require('./whatlang-node.linux-x64-gnu.node')
            } else {
              nativeBinding = require('@notevenaneko/whatlang-node-linux-x64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'arm64':
        if (isMusl()) {
          localFileExisted = existsSync(join(__dirname, 'whatlang-node.linux-arm64-musl.node'))
          try {
            if (localFileExisted) {
              nativeBinding = require('./whatlang-node.linux-arm64-musl.node')
            } else {
              nativeBinding = require('@notevenaneko/whatlang-node-linux-arm64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(join(__dirname, 'whatlang-node.linux-arm64-gnu.node'))
          try {
            if (localFileExisted) {
              nativeBinding = require('./whatlang-node.linux-arm64-gnu.node')
            } else {
              nativeBinding = require('@notevenaneko/whatlang-node-linux-arm64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'arm':
        localFileExisted = existsSync(join(__dirname, 'whatlang-node.linux-arm-gnueabihf.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./whatlang-node.linux-arm-gnueabihf.node')
          } else {
            nativeBinding = require('@notevenaneko/whatlang-node-linux-arm-gnueabihf')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Linux: ${arch}`)
    }
    break
  default:
    throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`)
}

if (!nativeBinding) {
  if (loadError) {
    throw loadError
  }
  throw new Error(`Failed to load native binding`)
}

const { Info, Lang, Script, Detector, detect, detectLang, detectScript } = nativeBinding

module.exports.Info = Info
module.exports.Lang = Lang
module.exports.Script = Script
module.exports.Detector = Detector
module.exports.detect = detect
module.exports.detectLang = detectLang
module.exports.detectScript = detectScript
module.exports.LangCode = {
  Epo: 'epo',
  Eng: 'eng',
  Rus: 'rus',
  Cmn: 'cmn',
  Spa: 'spa',
  Por: 'por',
  Ita: 'ita',
  Ben: 'ben',
  Fra: 'fra',
  Deu: 'deu',
  Ukr: 'ukr',
  Kat: 'kat',
  Ara: 'ara',
  Hin: 'hin',
  Jpn: 'jpn',
  Heb: 'heb',
  Yid: 'yid',
  Pol: 'pol',
  Amh: 'amh',
  Jav: 'jav',
  Kor: 'kor',
  Nob: 'nob',
  Dan: 'dan',
  Swe: 'swe',
  Fin: 'fin',
  Tur: 'tur',
  Nld: 'nld',
  Hun: 'hun',
  Ces: 'ces',
  Ell: 'ell',
  Bul: 'bul',
  Bel: 'bel',
  Mar: 'mar',
  Kan: 'kan',
  Ron: 'ron',
  Slv: 'slv',
  Hrv: 'hrv',
  Srp: 'srp',
  Mkd: 'mkd',
  Lit: 'lit',
  Lav: 'lav',
  Est: 'est',
  Tam: 'tam',
  Vie: 'vie',
  Urd: 'urd',
  Tha: 'tha',
  Guj: 'guj',
  Uzb: 'uzb',
  Pan: 'pan',
  Aze: 'aze',
  Ind: 'ind',
  Tel: 'tel',
  Pes: 'pes',
  Mal: 'mal',
  Ori: 'ori',
  Mya: 'mya',
  Nep: 'nep',
  Sin: 'sin',
  Khm: 'khm',
  Tuk: 'tuk',
  Aka: 'aka',
  Zul: 'zul',
  Sna: 'sna',
  Afr: 'afr',
  Lat: 'lat',
  Slk: 'slk',
  Cat: 'cat',
  Tgl: 'tgl',
  Hye: 'hye',
}
module.exports.LangCodeISO6391 = {
  Eo: 'eo',
  En: 'en',
  Ru: 'ru',
  Zh: 'zh',
  Es: 'es',
  Pt: 'pt',
  It: 'it',
  Bn: 'bn',
  Fr: 'fr',
  De: 'de',
  Uk: 'uk',
  Ka: 'ka',
  Ar: 'ar',
  Hi: 'hi',
  Ja: 'ja',
  He: 'he',
  Yi: 'yi',
  Pl: 'pl',
  Am: 'am',
  Jv: 'jv',
  Ko: 'ko',
  Nb: 'nb',
  Da: 'da',
  Sv: 'sv',
  Fi: 'fi',
  Tr: 'tr',
  Nl: 'nl',
  Hu: 'hu',
  Cs: 'cs',
  El: 'el',
  Bg: 'bg',
  Be: 'be',
  Mr: 'mr',
  Kn: 'kn',
  Ro: 'ro',
  Sl: 'sl',
  Hr: 'hr',
  Sr: 'sr',
  Mk: 'mk',
  Lt: 'lt',
  Lv: 'lv',
  Et: 'et',
  Ta: 'ta',
  Vi: 'vi',
  Ur: 'ur',
  Th: 'th',
  Gu: 'gu',
  Uz: 'uz',
  Pa: 'pa',
  Az: 'az',
  Id: 'id',
  Te: 'te',
  Fa: 'fa',
  Ml: 'ml',
  Or: 'or',
  My: 'my',
  Ne: 'ne',
  Si: 'si',
  Km: 'km',
  Tk: 'tk',
  Ak: 'ak',
  Zu: 'zu',
  Sn: 'sn',
  Af: 'af',
  La: 'la',
  Sk: 'sk',
  Ca: 'ca',
  Tl: 'tl',
  Hy: 'hy',
}
