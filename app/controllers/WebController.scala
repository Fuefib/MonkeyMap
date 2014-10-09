package controllers

import play.api.mvc.Controller
import scala.concurrent.Future
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.mvc.Action
import play.api.mvc.SimpleResult

object WebController extends Controller {

  def main() = Action.async(parse.empty) { request =>

    Future { Ok(views.html.home()) };

  }

}