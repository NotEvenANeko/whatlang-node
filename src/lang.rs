use napi::bindgen_prelude::*;
use napi_derive::napi;
use whatlang::Lang;

#[napi(js_name = "Lang")]
#[derive(Clone)]
pub struct JsLang {
  lang: Lang,
}

impl JsLang {
  pub(crate) fn from_iso639_1(code: &str) -> Option<Self> {
    // from https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    match code {
      "eo" => Some(Lang::Epo),
      "en" => Some(Lang::Eng),
      "ru" => Some(Lang::Rus),
      "zh" => Some(Lang::Cmn),
      "es" => Some(Lang::Spa),
      "pt" => Some(Lang::Por),
      "it" => Some(Lang::Ita),
      "bn" => Some(Lang::Ben),
      "fr" => Some(Lang::Fra),
      "de" => Some(Lang::Deu),
      "uk" => Some(Lang::Ukr),
      "ka" => Some(Lang::Kat),
      "ar" => Some(Lang::Ara),
      "hi" => Some(Lang::Hin),
      "ja" => Some(Lang::Jpn),
      "he" => Some(Lang::Heb),
      "yi" => Some(Lang::Yid),
      "pl" => Some(Lang::Pol),
      "am" => Some(Lang::Amh),
      "jv" => Some(Lang::Jav),
      "ko" => Some(Lang::Kor),
      "nb" => Some(Lang::Nob),
      "da" => Some(Lang::Dan),
      "sv" => Some(Lang::Swe),
      "fi" => Some(Lang::Fin),
      "tr" => Some(Lang::Tur),
      "nl" => Some(Lang::Nld),
      "hu" => Some(Lang::Hun),
      "cs" => Some(Lang::Ces),
      "el" => Some(Lang::Ell),
      "bg" => Some(Lang::Bul),
      "be" => Some(Lang::Bel),
      "mr" => Some(Lang::Mar),
      "kn" => Some(Lang::Kan),
      "ro" => Some(Lang::Ron),
      "sl" => Some(Lang::Slv),
      "hr" => Some(Lang::Hrv),
      "sr" => Some(Lang::Srp),
      "mk" => Some(Lang::Mkd),
      "lt" => Some(Lang::Lit),
      "lv" => Some(Lang::Lav),
      "et" => Some(Lang::Est),
      "ta" => Some(Lang::Tam),
      "vi" => Some(Lang::Vie),
      "ur" => Some(Lang::Urd),
      "th" => Some(Lang::Tha),
      "gu" => Some(Lang::Guj),
      "uz" => Some(Lang::Uzb),
      "pa" => Some(Lang::Pan),
      "az" => Some(Lang::Aze),
      "id" => Some(Lang::Ind),
      "te" => Some(Lang::Tel),
      // pes - Iranian Persian - https://en.wikipedia.org/wiki/Iranian_Persian
      // is a variety of Persian -- fas in ISO639-3, fa in ISO639-1
      // I don't know if it's correct to use 'fa' to infer Iranian Persian here.
      "fa" => Some(Lang::Pes),
      "ml" => Some(Lang::Mal),
      "or" => Some(Lang::Ori),
      "my" => Some(Lang::Mya),
      "ne" => Some(Lang::Nep),
      "si" => Some(Lang::Sin),
      "km" => Some(Lang::Khm),
      "tk" => Some(Lang::Tuk),
      "ak" => Some(Lang::Aka),
      "zu" => Some(Lang::Zul),
      "sn" => Some(Lang::Sna),
      "af" => Some(Lang::Afr),
      "la" => Some(Lang::Lat),
      "sk" => Some(Lang::Slk),
      "ca" => Some(Lang::Cat),
      "tl" => Some(Lang::Tgl),
      "hy" => Some(Lang::Hye),
      _ => None,
    }
    .map(|l| JsLang { lang: l })
  }

  pub(crate) fn to_iso639_1(&self) -> &str {
    match self.lang {
      Lang::Epo => "eo",
      Lang::Eng => "en",
      Lang::Rus => "ru",
      Lang::Cmn => "zh",
      Lang::Spa => "es",
      Lang::Por => "pt",
      Lang::Ita => "it",
      Lang::Ben => "bn",
      Lang::Fra => "fr",
      Lang::Deu => "de",
      Lang::Ukr => "uk",
      Lang::Kat => "ka",
      Lang::Ara => "ar",
      Lang::Hin => "hi",
      Lang::Jpn => "ja",
      Lang::Heb => "he",
      Lang::Yid => "yi",
      Lang::Pol => "pl",
      Lang::Amh => "am",
      Lang::Jav => "jv",
      Lang::Kor => "ko",
      Lang::Nob => "nb",
      Lang::Dan => "da",
      Lang::Swe => "sv",
      Lang::Fin => "fi",
      Lang::Tur => "tr",
      Lang::Nld => "nl",
      Lang::Hun => "hu",
      Lang::Ces => "cs",
      Lang::Ell => "el",
      Lang::Bul => "bg",
      Lang::Bel => "be",
      Lang::Mar => "mr",
      Lang::Kan => "kn",
      Lang::Ron => "ro",
      Lang::Slv => "sl",
      Lang::Hrv => "hr",
      Lang::Srp => "sr",
      Lang::Mkd => "mk",
      Lang::Lit => "lt",
      Lang::Lav => "lv",
      Lang::Est => "et",
      Lang::Tam => "ta",
      Lang::Vie => "vi",
      Lang::Urd => "ur",
      Lang::Tha => "th",
      Lang::Guj => "gu",
      Lang::Uzb => "uz",
      Lang::Pan => "pa",
      Lang::Aze => "az",
      Lang::Ind => "id",
      Lang::Tel => "te",
      // pes - Iranian Persian - https://en.wikipedia.org/wiki/Iranian_Persian
      // is a variety of Persian -- fas in ISO639-3, fa in ISO639-1
      // I don't know if it's correct to use 'fa' to infer Iranian Persian here.
      Lang::Pes => "fa",
      Lang::Mal => "ml",
      Lang::Ori => "or",
      Lang::Mya => "my",
      Lang::Nep => "ne",
      Lang::Sin => "si",
      Lang::Khm => "km",
      Lang::Tuk => "tk",
      Lang::Aka => "ak",
      Lang::Zul => "zu",
      Lang::Sna => "sn",
      Lang::Afr => "af",
      Lang::Lat => "la",
      Lang::Slk => "sk",
      Lang::Cat => "ca",
      Lang::Tgl => "tl",
      Lang::Hye => "hy",
    }
  }
}

#[napi]
impl JsLang {
  #[napi(factory, ts_return_type = "Lang")]
  pub fn with_code(#[napi(ts_arg_type = "LangCode")] code: String) -> Result<Self> {
    Lang::from_code(code)
      .map(|l| JsLang { lang: l })
      .ok_or(Error::from_reason("Unknown language code"))
  }

  #[napi(factory, js_name = "withCodeISO6391", ts_return_type = "Lang")]
  pub fn with_code_iso639_1(#[napi(ts_arg_type = "LangCodeISO6391")] code: String) -> Result<Self> {
    JsLang::from_iso639_1(&code).ok_or(Error::from_reason("Unknown language code"))
  }

  #[napi(ts_return_type = "LangCode", getter)]
  pub fn code(&self) -> String {
    self.lang.code().to_string()
  }

  #[napi(ts_return_type = "LangCodeISO6391", js_name = "codeISO6391", getter)]
  pub fn code_iso639_1(&self) -> String {
    String::from(self.to_iso639_1())
  }

  #[napi(getter)]
  pub fn name(&self) -> String {
    self.lang.name().to_string()
  }

  #[napi(getter)]
  pub fn eng_name(&self) -> String {
    self.lang.eng_name().to_string()
  }

  #[napi]
  pub fn all() -> Vec<JsLang> {
    Lang::all().iter().map(|&l| l.into()).collect()
  }
}

impl From<Lang> for JsLang {
  fn from(value: Lang) -> Self {
    JsLang { lang: value }
  }
}

impl From<JsLang> for Lang {
  fn from(value: JsLang) -> Self {
    value.lang
  }
}
