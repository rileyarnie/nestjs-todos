import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post('new')
  createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.createTodo(createTodoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getTodos() {
    return this.todosService.getTodos();
  }

  @Get(':id')
  getOneTodo(@Param('id') id: string) {
    return this.todosService.getOneTodo(parseInt(id));
  }

  @Put(':id')
  updateTodo(@Param('id') id: string) {
    return this.todosService.updateTodo(parseInt(id));
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todosService.deleteTodo(parseInt(id));
  }
}
