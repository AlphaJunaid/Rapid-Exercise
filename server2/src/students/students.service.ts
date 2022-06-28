import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentInput } from './input/create-student.input';
import { UpdateStudentInput } from './input/update-student.input';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const student = this.studentsRepository.create(createStudentInput);

    return await this.studentsRepository.save(student);
  }

  async findOne(studId: string): Promise<Student> {
    const stud = await this.studentsRepository.findOne({
      where: [{ id: studId }],
    });
    if (!stud) {
      throw new NotFoundException(`Student #${studId} not found`);
    }
    return stud;
  }

  async findAll(): Promise<Array<Student>> {
    return await this.studentsRepository.find();
  }

  async update(
    studId: string,
    updateStudentInput: UpdateStudentInput,
  ): Promise<Student> {
    const stud = await this.studentsRepository.preload({
      id: studId,
      ...updateStudentInput,
    });
    if (!stud) {
      throw new NotFoundException(`User #${studId} not found`);
    }
    return this.studentsRepository.save(stud);
  }

  async remove(id: string): Promise<Student> {
    const stud = await this.findOne(id);
    await this.studentsRepository.remove(stud);

    return {
      id: id,
      name: '',
      dob: null,
      email: '',
    };
  }

  async deleteAll(table: string) {
    await this.studentsRepository.clear();
    return 'Deleted';
  }
}
