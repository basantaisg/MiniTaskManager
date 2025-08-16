import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // 👈 Neon full URL from .env
      entities: [User, Task],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, // required for Neon SSL
      },
    }),
    UsersModule,
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
