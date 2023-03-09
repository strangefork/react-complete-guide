import React from 'react';

import './NewExpense.css';
import ExpenseForm from './ExpenseForm';

const NewExpense = (props) => {
    const saveExpenseDataHandler = (newExpenseData) => {
        const expenseData = {...newExpenseData, id: Math.random().toString()};
        props.onNewExpense(expenseData);
    };

    return (
        <div className="new-expense">
            <ExpenseForm onSaveExpense={saveExpenseDataHandler}/>
        </div>
    );
};

export default NewExpense;