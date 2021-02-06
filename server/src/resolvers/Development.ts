import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import Users from '../types/entities/Users';

@Resolver(Users)
export class DevelopmentUserResolver{
  @Query(() => [Users])
  async usersList(){
    const users = await Users.find()
    return users
  }

  @Mutation(() => Users)
  async userInfo(
    @Arg('id', () => Int) id: number
  ){
    const user = await Users.findOne(id)
    return user
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Arg('id', () => Int) id: number
  ){
    try {
      Users.delete(id)
    } catch (error) {
      console.log(error)
      return false
    }
    return true
  }
}
