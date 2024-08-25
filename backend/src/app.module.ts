import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { UsersModule } from './apis/users/users.module'
import { AuthModule } from './apis/auth/auth.module'
import { TaxiPartiesModule } from './apis/taxiParties/taxiParties.module'
import { CommentsModule } from './apis/comments/comments.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TaxiPartiesModule,
    CommentsModule,

    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
      playground: process.env.NODE_ENV === 'development', // 개발 환경에서만 활성화
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST, // 컨테이너 IP
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }), 
  ],
})
export class AppModule {}
