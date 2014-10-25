package controllers

import play.api.libs.json._
import play.api.mvc._

import play.modules.reactivemongo.MongoController


abstract class JsonController extends Controller with MongoController {

  def buildGreaterThanExistsQuery(param: String, value: Json.JsValueWrapper) = {
    Json.obj(param -> Json.obj("$gt" -> value))
  }

}
