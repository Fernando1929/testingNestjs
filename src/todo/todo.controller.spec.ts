import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TodoController', () => {
  let controller: TodoController;
  let mockTodo: Todo = new Todo();
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService, {
        provide: getRepositoryToken(Todo),
        useValue: {
          save: jest.fn().mockResolvedValue(mockTodo),
          find: jest.fn().mockResolvedValue({mockTodo})

        }
      }],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    todoService =  module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of todos', async () => {
      const result = [
        {
          "id":1,
          "name":"foo",
          "completed": false
        }
      ];
      jest.spyOn(todoService, 'findAll').mockImplementation(() => Promise.resolve(result));
      expect(await controller.findAll()).toBe(result);
    })
  })
});
