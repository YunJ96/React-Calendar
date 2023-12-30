import { Todo } from '../models/index';

interface CreateTodo {
  (
    id: string,
    date: Date,
    todoList: string[],
    completed: boolean[]
  ): Promise<any>;
}

const Error_Message = {
  createTodoError: '일정 생성에 실패했습니다.',
  updateTodoError: '일정 수정에 실패했습니다.',
  deleteTodoError: '일정 삭제에 실패했습니다.',
  getTodoError: '일정을 불러오는 데에 실패했습니다.',
};

const createTodo: CreateTodo = async (email, date, todoList) => {
  try {
    const existingTodoList = await Todo.findOne({ email, date });

    if (existingTodoList) {
      existingTodoList.todoList = existingTodoList.todoList.concat(todoList);
      existingTodoList.completed.push(false);
      await existingTodoList.save();
      return existingTodoList;
    }
    const createTodoList = await Todo.create({
      email,
      date,
      todoList,
      completed: [false],
    });
    return createTodoList;
  } catch (error) {
    throw new Error(Error_Message.createTodoError);
  }
};

const todoService = {
  //todo 추가
  createTodo,
  //todo 완료
  async completeStatusUpdateTodo(email: string, date: Date, todoIndex: number) {
    try {
      const completeStatusUpdatedTodoList = await Todo.findOne({ email, date });
      if (completeStatusUpdatedTodoList) {
        completeStatusUpdatedTodoList.completed[todoIndex] = true;
        await completeStatusUpdatedTodoList.save();
      }
      return completeStatusUpdatedTodoList;
    } catch (error) {
      throw new Error(Error_Message.updateTodoError);
    }
  },
  //todo 삭제
  async deleteTodo(email: string, date: Date, todoIndex: number) {
    try {
      const deletedTodoList = await Todo.findOne({ email, date });

      if (deletedTodoList) {
        deletedTodoList.todoList.splice(todoIndex, 1);
        deletedTodoList.completed.splice(todoIndex, 1);
        await deletedTodoList.save();
        if (deletedTodoList.todoList.length === 0) {
          await Todo.deleteOne({ email, date });
        }
      }
      return deletedTodoList;
    } catch (error) {
      throw new Error(Error_Message.deleteTodoError);
    }
  },
  //todo 조회
  async getTodo(email: string, date: Date) {
    try {
      const getTodo = await Todo.findOne({ email, date });
      return getTodo;
    } catch (error) {
      throw new Error(Error_Message.getTodoError);
    }
  },
};

export default todoService;
