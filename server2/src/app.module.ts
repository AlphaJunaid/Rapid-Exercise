import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import { StudentsModule } from './students/students.module';
import {
  ApolloDriver,
  ApolloDriverConfig,
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    // GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        // driver: ApolloFederationDriver,
      autoSchemaFile: './schema.gql',
        debug: true,
        playground: true,
      }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'fortude',
        database: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
      }),
    FilesModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
