package controllers

import play.api.mvc.Controller
import scala.concurrent.Future
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.mvc.Action

object WebController extends Controller {

  def main() = Action.async {
    Future { Ok(views.html.home()) }
  }

}