import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ){}

  create(createTodoDto: CreateTodoDto) {
    return this.todoRepository.save(createTodoDto);
  }

  findAll(completed?: boolean) {
    if(!completed){
      return this.todoRepository.find();
    }
    return this.todoRepository.findBy({ completed });
  }

  findOne(id: number) {
    return this.todoRepository.findOneBy({id});
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOneBy({id});
    if(!todo){
      throw new NotFoundException("to do not found");
    }
    todo.name = updateTodoDto.name;
    todo.completed =  updateTodoDto.completed;
    return this.todoRepository.save(todo);
  }

  remove(id: number) {
    return this.todoRepository.delete(id);
  }
}
