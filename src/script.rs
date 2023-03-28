use napi::bindgen_prelude::*;
use napi_derive::napi;

use whatlang::Script;

use crate::JsLang;

#[napi(js_name = "Script")]
#[derive(Clone)]
pub struct JsScript {
  script: Script,
}

#[napi]
impl JsScript {
  // can't generate dts without constructor or factory :(
  #[napi(constructor)]
  pub fn __throw() -> Result<Self> {
    Err(Error::from_reason("Unimplemented!"))
  }

  #[napi(getter)]
  pub fn name(&self) -> String {
    self.script.name().to_string()
  }

  #[napi(getter)]
  pub fn langs(&self) -> Vec<JsLang> {
    self.script.langs().iter().map(|&l| l.into()).collect()
  }

  #[napi]
  pub fn all() -> Vec<JsScript> {
    Script::all().iter().map(|&s| s.into()).collect()
  }
}

impl From<Script> for JsScript {
  fn from(value: Script) -> Self {
    JsScript { script: value }
  }
}

impl From<JsScript> for Script {
  fn from(value: JsScript) -> Self {
    value.script
  }
}
