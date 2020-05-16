///<reference path="../../src/models/Language.ts"/>
module GamesPackage {
  export class BG extends Language{
      constructor() {
          super("ИГРАЙ", "ПРОДЪЛЖИ", "ТВОИТЕ ТОЧКИ: ", "НАЙ-ДОБРИ РЕЗУЛТАТИ: ", "ТРУДНОСТ: ", "ЛЕСНО", "СРЕДНО",
              "ТРУДНО", "ТОЧКИ: ", "РАКЕТИ: ");
      }
  }
}