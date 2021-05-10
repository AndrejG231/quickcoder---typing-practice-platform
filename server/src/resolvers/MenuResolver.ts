import { Query, Resolver } from "type-graphql";
import Menu from "../utilities/practices/generateMenu";
import MenuResponse from "../types/responses/menuResponse";

@Resolver()
class MenuResolver {
  @Query(() => [MenuResponse])
  async getMenu() {
    return Menu;
  }
}

export default MenuResolver;
