import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './students.service';
import { Student } from './student.entity';
import { StudentsResolver } from './students.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentsService, StudentsResolver]
})
export class StudentsModule {}
