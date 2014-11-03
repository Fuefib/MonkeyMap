name := "MonkeyMap"

version := "1.0-SNAPSHOT"

scalaVersion in ThisBuild := "2.10.4"

scalacOptions in ThisBuild ++= Seq("-feature", "-language:reflectiveCalls")

scalacOptions in (ThisBuild, Test) ++= Seq("-Yrangepos")

publishMavenStyle in ThisBuild := true

parallelExecution in (ThisBuild, Test) := true

libraryDependencies ++= Seq(
  "org.reactivemongo" %% "play2-reactivemongo" % "0.10.5.0.akka22",
  "org.slf4j" % "slf4j-api" % "1.7.5",
  "org.slf4j" % "jcl-over-slf4j" % "1.7.5",
  "org.slf4j" % "jul-to-slf4j" % "1.7.5")


resolvers in ThisBuild ++= Seq(
  "Canal Release Repository" at "http://vod.canal-bis.com/nexus/content/groups/public/",
  "Canal Snapshots Repository" at "http://vod.canal-bis.com/nexus/content/repositories/snapshots/",
  "Local Maven Repository" at "file:///data/repo-aws/",
  "TAMU Release Repository" at "https://maven.library.tamu.edu/content/repositories/releases/",
  "rediscala" at "https://raw.github.com/etaty/rediscala-mvn/master/releases/",
  "org.sedis" at "http://pk11-scratch.googlecode.com/svn/trunk",
  "Typesafe releases" at "http://repo.typesafe.com/typesafe/releases/",
  "Typesafe snapshots" at "http://repo.typesafe.com/typesafe/snapshots/",
  "Sonatype releases" at "http://oss.sonatype.org/content/repositories/releases/",
  "Sonatype snapshots" at "http://oss.sonatype.org/content/repositories/snapshots/")

play.Project.playScalaSettings
