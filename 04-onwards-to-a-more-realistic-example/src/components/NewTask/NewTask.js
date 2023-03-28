import { useState, useEffect } from 'react';

import useHttp from '../../hooks/use-http';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name;
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  };

  const enterTaskHandler = (taskText) => {
    sendTaskRequest(
      {
        url: 'https://react-http-6f555-default-rtdb.firebaseio.com/tasks.json',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { text: taskText },
      },
      createTask.bind(null, taskText) //Bind allows us to pre-configure the function. The first param is defining "this", and the second param is the first param that createTask receives.
    );
  };

  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
