import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todosRepository: Repository<Todo>,
  ) {}

  //create
  createTodo(todo: CreateTodoDto) {
    const newTodo = this.todosRepository.create(todo);

    return this.todosRepository.save(newTodo);
  }

  //read

  getTodos(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  async getOneTodo(id: number): Promise<Todo> {
    const todo = this.todosRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException("Todo with specific id doesn't exist");
    }
    return todo;
  }

  //update
  async updateTodo(id: number) {
    const todo = await this.getOneTodo(id);

    if (!todo) {
      throw new NotFoundException("Todo with specific id doesn't exist");
    }

    const updatedTodo = { ...todo, completed: !todo.completed };

    return this.todosRepository.save(updatedTodo);
  }

  //delete
  async deleteTodo(id: number) {
    const todo = await this.getOneTodo(id);

    if (!todo) {
      throw new NotFoundException("Todo doesn't exist");
    }

    return this.todosRepository.remove(todo);
  }
}
