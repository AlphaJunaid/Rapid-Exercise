// import { Query } from '@nestjs/common';
import {
    Args,
    Mutation,
    Resolver,
    Query,
    ResolveReference,
  } from '@nestjs/graphql';
  import { CreateStudentInput } from './input/create-student.input';
  import { UpdateStudentInput } from './input/update-student.input';
  import { Student } from './student.entity';
  import { StudentsService } from './students.service';
  
  @Resolver(() => Student)
  export class StudentsResolver {
    constructor(private readonly studentsService: StudentsService) {}
  
    @Mutation(() => Student)
    createStudent(
      @Args('createStudentInput') createStudentInput: CreateStudentInput,
    ) {
      return this.studentsService.createStudent(createStudentInput);
    }
  
    @Query(() => [Student])
    findAll() {
      return this.studentsService.findAll();
    }
  
    @Query(() => Student)
    findOne(@Args('studId', { type: () => String }) studId: string) {
      return this.studentsService.findOne(studId);
    }
  
    @Mutation(() => Student)
    updateStudent(
      @Args('updateStudentInput') updateStudentInput: UpdateStudentInput,
    ) {
      return this.studentsService.update(
        updateStudentInput.id,
        updateStudentInput,
      );
    }
  
  @Mutation(() => Student)
  removeStudent(@Args('studId', { type: () => String }) studId: string) {
    return this.studentsService.remove(studId);
  }

  @Mutation(() => String)
  clearAll(@Args('table', { type: () => String }) table: string) {
    return this.studentsService.deleteAll(table);
  }

    // @ResolveReference()
    // resolvereferance(ref: { __typename: string; id: string }) {
    //   return this.studentsService.findOne(ref.id);
    // }
  }